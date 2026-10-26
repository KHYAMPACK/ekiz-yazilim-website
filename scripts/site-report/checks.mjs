/**
 * Site checks: fetch a site's public pages and collect raw facts.
 * No dependencies; reads only what any visitor can see.
 */
import dns from "node:dns/promises";
import http from "node:http";
import https from "node:https";
import tls from "node:tls";
import zlib from "node:zlib";

const UA =
  "Mozilla/5.0 (compatible; EkizSiteReport/1.0; +https://ekizyazilim.com)";

const CERT_ERRORS = new Set([
  "CERT_HAS_EXPIRED",
  "DEPTH_ZERO_SELF_SIGNED_CERT",
  "SELF_SIGNED_CERT_IN_CHAIN",
  "UNABLE_TO_VERIFY_LEAF_SIGNATURE",
  "UNABLE_TO_GET_ISSUER_CERT_LOCALLY",
  "ERR_TLS_CERT_ALTNAME_INVALID",
  "CERT_NOT_YET_VALID",
  "CERT_UNTRUSTED",
  "HOSTNAME_MISMATCH",
]);

/** GET with redirects, gzip/br support, size cap and timing. Never throws. */
export function get(
  url,
  { insecure = false, timeout = 12000, maxBytes = 2_000_000, follow = 5, chain = [] } = {},
) {
  return new Promise((resolve) => {
    let u;
    try {
      u = new URL(url);
    } catch {
      return resolve({ ok: false, error: "BAD_URL", chain });
    }
    if (u.protocol !== "http:" && u.protocol !== "https:") {
      return resolve({ ok: false, error: "BAD_PROTOCOL", chain });
    }
    const lib = u.protocol === "https:" ? https : http;
    const started = performance.now();
    let settled = false;
    const done = (v) => {
      if (!settled) {
        settled = true;
        resolve(v);
      }
    };

    const req = lib.request(
      u,
      {
        method: "GET",
        rejectUnauthorized: !insecure,
        timeout,
        headers: {
          "user-agent": UA,
          accept: "text/html,application/xhtml+xml,application/xml,*/*;q=0.8",
          "accept-language": "tr-TR,tr;q=0.9,en;q=0.5",
          "accept-encoding": "gzip, deflate, br",
        },
      },
      (res) => {
        const ttfb = performance.now() - started;
        const status = res.statusCode ?? 0;
        const location = res.headers.location;

        if (status >= 300 && status < 400 && location && follow > 0) {
          res.resume();
          const next = new URL(location, u).href;
          return done(
            get(next, {
              insecure,
              timeout,
              maxBytes,
              follow: follow - 1,
              chain: [...chain, { status, from: u.href, to: next }],
            }),
          );
        }

        let stream = res;
        const enc = (res.headers["content-encoding"] ?? "").toLowerCase();
        if (enc === "gzip") stream = res.pipe(zlib.createGunzip());
        else if (enc === "deflate") stream = res.pipe(zlib.createInflate());
        else if (enc === "br") stream = res.pipe(zlib.createBrotliDecompress());

        const parts = [];
        let size = 0;
        stream.on("data", (c) => {
          size += c.length;
          if (size <= maxBytes) parts.push(c);
          else {
            finish();
            req.destroy();
          }
        });
        // Finish only when the decompressed stream ends (res "close" can fire earlier).
        stream.on("error", () => finish());
        stream.on("end", () => finish());
        res.on("error", () => finish());
        res.on("aborted", () => finish());

        function finish() {
          done({
            ok: true,
            status,
            headers: res.headers,
            body: Buffer.concat(parts).toString("utf8"),
            bytes: size,
            ttfb,
            total: performance.now() - started,
            finalUrl: u.href,
            chain,
            insecure,
          });
        }
      },
    );
    req.on("timeout", () => req.destroy(Object.assign(new Error("timeout"), { code: "ETIMEDOUT" })));
    req.on("error", (e) => done({ ok: false, error: e.code ?? e.message, chain, insecure }));
    req.end();
  });
}

/** Read the TLS certificate of host:443 (even if it is invalid). */
export function readCertificate(host, timeout = 8000) {
  return new Promise((resolve) => {
    let settled = false;
    const done = (v) => {
      if (!settled) {
        settled = true;
        resolve(v);
      }
    };
    const socket = tls.connect(
      { host, port: 443, servername: host, rejectUnauthorized: false, timeout },
      () => {
        const cert = socket.getPeerCertificate();
        const authorized = socket.authorized;
        const authError = socket.authorizationError
          ? String(socket.authorizationError)
          : null;
        socket.end();
        if (!cert || !cert.valid_to) return done({ connected: true, hasCert: false });
        const validTo = new Date(cert.valid_to);
        const validFrom = new Date(cert.valid_from);
        const mismatch = tls.checkServerIdentity(host, cert) !== undefined;
        done({
          connected: true,
          hasCert: true,
          authorized,
          authError,
          validFrom: validFrom.toISOString(),
          validTo: validTo.toISOString(),
          daysLeft: Math.floor((validTo.getTime() - Date.now()) / 86400000),
          issuer: cert.issuer?.O ?? cert.issuer?.CN ?? null,
          subject: cert.subject?.CN ?? null,
          hostnameMismatch: mismatch,
        });
      },
    );
    socket.on("timeout", () => {
      socket.destroy();
      done({ connected: false, error: "ETIMEDOUT" });
    });
    socket.on("error", (e) => done({ connected: false, error: e.code ?? e.message }));
  });
}

function attrs(tag) {
  const out = {};
  const re = /([a-zA-Z_:][-a-zA-Z0-9_:.]*)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'>]+))/g;
  let m;
  while ((m = re.exec(tag))) out[m[1].toLowerCase()] = m[2] ?? m[3] ?? m[4] ?? "";
  return out;
}

function decode(s) {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();
}

/** Parse the homepage HTML (regex-based, enough for the checks we make). */
export function analyseHtml(html, pageUrl) {
  const isHttps = pageUrl.startsWith("https:");
  const title = decode((html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] ?? ""));
  const metas = (html.match(/<meta\b[^>]*>/gi) ?? []).map(attrs);
  const metaBy = (key) =>
    metas.find((m) => (m.name ?? m.property ?? "").toLowerCase() === key)?.content ?? "";

  const links = (html.match(/<link\b[^>]*>/gi) ?? []).map(attrs);
  const imgs = (html.match(/<img\b[^>]*>/gi) ?? []).map(attrs);
  const imgNoAlt = imgs.filter((i) => i.alt === undefined).length;

  const robotsMeta = metaBy("robots").toLowerCase();
  const htmlLang = html.match(/<html\b[^>]*>/i)?.[0];
  const lang = htmlLang ? (attrs(htmlLang).lang ?? "") : "";

  const mixed = isHttps
    ? (html.match(/<(?:img|script|link|iframe|source|video|audio)\b[^>]*\b(?:src|href)=["']http:\/\/[^"']+/gi) ?? [])
        .filter((t) => !/rel=["']?(?:canonical|alternate|dns-prefetch)/i.test(t)).length
    : 0;

  const copyright = html.match(
    /(?:©|&copy;|&#169;|copyright)[^0-9<]{0,40}((?:19|20)\d\d)(?:\s*(?:-|–|—|&ndash;)\s*((?:19|20)\d\d))?/i,
  );
  const copyrightYear = copyright ? Number(copyright[2] ?? copyright[1]) : null;

  let platform = null;
  if (/wp-content|wp-includes/i.test(html)) platform = "WordPress";
  else if (/static\.wixstatic\.com|wix\.com/i.test(html)) platform = "Wix";
  else if (/cdn\.shopify\.com/i.test(html)) platform = "Shopify";
  else if (/squarespace/i.test(html)) platform = "Squarespace";
  else if (/webnode|jimdo|weebly/i.test(html)) platform = "Hazır site oluşturucu";
  else if (/_next\/static/i.test(html)) platform = "Next.js";

  const bodyText = html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ");

  return {
    title,
    description: decode(metaBy("description")),
    viewport: metaBy("viewport"),
    canonical: links.find((l) => (l.rel ?? "").toLowerCase() === "canonical")?.href ?? "",
    favicon: links.some((l) => /icon/i.test(l.rel ?? "")),
    ogTitle: !!metaBy("og:title"),
    ogImage: !!metaBy("og:image"),
    lang,
    noindex: /noindex/.test(robotsMeta),
    h1: (html.match(/<h1[\s>]/gi) ?? []).length,
    images: imgs.length,
    imagesNoAlt: imgNoAlt,
    scripts: (html.match(/<script\b[^>]*\bsrc=/gi) ?? []).length,
    mixedContent: mixed,
    phoneLink: /href=["']tel:/i.test(html),
    whatsappLink: /wa\.me\/|api\.whatsapp\.com|web\.whatsapp\.com|whatsapp:\/\//i.test(html),
    copyrightYear,
    platform,
    textLength: decode(bodyText).length,
  };
}

const TWO_LEVEL_TLD = new Set([
  "com.tr", "org.tr", "net.tr", "edu.tr", "k12.tr", "gov.tr", "web.tr", "info.tr",
  "biz.tr", "name.tr", "gen.tr", "co.uk", "org.uk", "com.au",
]);

export function registrableDomain(host) {
  const parts = host.toLowerCase().replace(/^www\./, "").split(".");
  if (parts.length <= 2) return parts.join(".");
  const last2 = parts.slice(-2).join(".");
  return TWO_LEVEL_TLD.has(last2) ? parts.slice(-3).join(".") : last2;
}

/** Domain expiry via RDAP. .tr domains have no public RDAP, so those return unsupported. */
export async function domainExpiry(host) {
  const domain = registrableDomain(host);
  if (domain.endsWith(".tr")) return { domain, supported: false };
  const res = await get(`https://rdap.org/domain/${domain}`, { timeout: 10000, maxBytes: 500_000 });
  if (!res.ok || res.status !== 200) return { domain, supported: true, found: false };
  try {
    const data = JSON.parse(res.body);
    const exp = (data.events ?? []).find((e) => e.eventAction === "expiration")?.eventDate;
    if (!exp) return { domain, supported: true, found: false };
    const date = new Date(exp);
    const status = (data.status ?? []).map((s) => String(s).toLowerCase());
    return {
      domain,
      supported: true,
      found: true,
      expires: date.toISOString(),
      daysLeft: Math.floor((date.getTime() - Date.now()) / 86400000),
      status,
      // "client hold" / "server hold": the registrar or registry has switched the domain off in DNS.
      hold: status.some((s) => s.includes("hold")),
    };
  } catch {
    return { domain, supported: true, found: false };
  }
}

/** Google PageSpeed Insights (mobile). Optional; the free quota can run out. */
export async function pageSpeed(url) {
  const key = process.env.PSI_API_KEY ? `&key=${encodeURIComponent(process.env.PSI_API_KEY)}` : "";
  const api = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&strategy=mobile&category=performance${key}`;
  const res = await get(api, { timeout: 60000, maxBytes: 8_000_000 });
  if (!res.ok || res.status !== 200) return null;
  try {
    const lh = JSON.parse(res.body).lighthouseResult;
    const perf = lh?.categories?.performance?.score;
    if (typeof perf !== "number") return null;
    return {
      performance: Math.round(perf * 100),
      lcpSeconds: lh.audits?.["largest-contentful-paint"]?.numericValue
        ? +(lh.audits["largest-contentful-paint"].numericValue / 1000).toFixed(1)
        : null,
    };
  } catch {
    return null;
  }
}

function looksLikeHtml(body) {
  return /^\s*<(?:!doctype|html)/i.test(body);
}

/** Run every check for one site. */
export async function checkSite(input, { psi = false } = {}) {
  const raw = input.trim();
  const withScheme = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
  const u = new URL(withScheme);
  let host = u.hostname;

  // Many sites only answer on www. (or only on the bare domain): if the name
  // does not resolve at all, try the other form before calling the site down.
  const resolves = (h) => dns.lookup(h).then(() => true, () => false);
  if (!(await resolves(host))) {
    const alt = host.startsWith("www.") ? host.slice(4) : `www.${host}`;
    if (await resolves(alt)) host = alt;
  }
  const origin = `https://${host}`;

  const facts = { input: raw, host, checkedAt: new Date().toISOString() };

  // 1) TLS certificate + HTTPS availability
  facts.cert = await readCertificate(host);

  // 2) Homepage over HTTPS (retry ignoring cert errors so we can still read the page)
  let home = await get(`${origin}/`);
  let certBrokenOnFetch = false;
  if (!home.ok && CERT_ERRORS.has(home.error)) {
    certBrokenOnFetch = true;
    home = await get(`${origin}/`, { insecure: true });
  }
  facts.https = {
    reachable: home.ok,
    error: home.ok ? null : home.error,
    certBrokenOnFetch,
  };

  // 3) If HTTPS is unreachable, see whether the site exists over plain HTTP
  let page = home;
  if (!home.ok) {
    const plain = await get(`http://${host}/`);
    facts.httpOnly = plain.ok;
    if (plain.ok) page = plain;
  }

  if (!page.ok) {
    facts.unreachable = true;
    facts.domain = await domainExpiry(host);
    return facts;
  }

  facts.page = {
    status: page.status,
    finalUrl: page.finalUrl,
    ttfb: +(page.ttfb / 1000).toFixed(2),
    total: +(page.total / 1000).toFixed(2),
    bytes: page.bytes,
    redirects: page.chain.length,
    hsts: !!page.headers["strict-transport-security"],
    ...analyseHtml(page.body, page.finalUrl),
  };

  // 4) Does plain http:// redirect to https://
  const plain = await get(`http://${host}/`, { follow: 5 });
  facts.httpRedirect = plain.ok
    ? plain.finalUrl.startsWith("https:")
    : null;

  // 5) robots.txt and sitemap.xml
  const [robots, sitemap, domain] = await Promise.all([
    get(`${new URL(page.finalUrl).origin}/robots.txt`, { insecure: true, maxBytes: 200_000 }),
    get(`${new URL(page.finalUrl).origin}/sitemap.xml`, { insecure: true, maxBytes: 500_000 }),
    domainExpiry(host),
  ]);
  facts.robotsTxt = robots.ok && robots.status === 200 && !looksLikeHtml(robots.body);
  facts.sitemap =
    sitemap.ok && sitemap.status === 200 && /<urlset|<sitemapindex/i.test(sitemap.body);
  facts.domain = domain;

  // 6) Optional mobile speed from Google
  if (psi) facts.psi = await pageSpeed(`${origin}/`);

  return facts;
}
