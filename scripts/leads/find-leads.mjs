/**
 * Lead finder: lists prep centers / tutoring centers / kindergartens from Google Places.
 *
 *   node scripts/leads/find-leads.mjs --cities "Çankaya Ankara,Yenimahalle Ankara"
 *   node scripts/leads/find-leads.mjs --refine leads/leads.csv --out leads/clean.csv
 *
 * Needs GOOGLE_PLACES_API_KEY in the environment or in .env.local.
 * Output: leads/leads.csv (git-ignored). Rows with a real website can go straight into
 *   npm run site-report -- --csv leads/leads.csv
 *
 * Flags:
 *   --cities <a,b,c>      places to search; each is appended to the query (default: a few large cities)
 *   --queries <a;b;c>     search phrases separated by ; (default: LGS / etüt / dershane)
 *   --max-requests <n>    hard cap on API calls (default 30) so a mistake cannot run up a bill
 *   --out <file>          output CSV (default leads/leads.csv)
 *   --refine <file>       re-apply the filters to an existing CSV (no API calls)
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");

const DEFAULT_CITIES = ["Ankara", "İstanbul", "İzmir", "Bursa", "Antalya"];
const DEFAULT_QUERIES = ["LGS hazırlık kursu", "etüt merkezi", "dershane"];

// Only keep businesses that look like education centers; drop obvious noise.
const RELEVANT = /dershane|kurs|etüt|etut|akademi|eğitim|egitim|lgs|kolej|koleji|okul|hazırlık|hazirlik|study|kreş|kres|anaokul/i;
const NOISE = /sürücü|surucu|direksiyon|kuaför|kuafor|güzellik|guzellik|spor|yüzme|yuzme|müzik|muzik|bale|dans|oto|market|restoran|cafe|kafe|güvenlik|guvenlik|ilkyardım|ilkyardim|yargı|yargi|hakimlik|sağlık|saglik|hemşire|hemsire|rehabilitasyon|özel eğitim ve|ozel egitim ve|dil eğitim|dil egitim|dil okulu|ingilizce|yabancı dil|yabanci dil|english|bilişim|bilisim|kodlama|robotik|satranç|satranc|ehliyet|pilot|kpss|ales|dgs|pomem|pmyo|besyo|polis|jandarma|askeri|askerî|subay|parkur|asem|tus|dus|ydt|yds|lisans|yüksek lisans|memur|akademisyen/i;

// Public institutions and other non-buyers: not leads.
const PUBLIC_NAME = /halk eğitim|halk egitim|\bmeb\b|müdürlüğü|mudurlugu|belediye|üniversite|universite|hastane|kılavuz|kilavuz|hızlı okuma|hizli okuma|dil merkezi/i;
const PUBLIC_HOST = /\.(gov|edu|k12)\.tr$|\.meb\.|\.bel\.tr$/i;

const SOCIAL_HOSTS = /instagram\.com|facebook\.com|fb\.com|linktr\.ee|wa\.me|whatsapp\.com|sahibinden|google\.com|goo\.gl|tiktok\.com|youtube\.com/i;

export function isRelevant(name, url = "") {
  if (PUBLIC_NAME.test(name)) return false;
  if (url) {
    try {
      if (PUBLIC_HOST.test(new URL(url).hostname)) return false;
    } catch {
      /* ignore bad URLs */
    }
  }
  return RELEVANT.test(name) && !NOISE.test(name);
}

/** "site" = a real website we can check, "social" = only a social/link page, "none" = no website listed. */
export function classifySite(url) {
  if (!url) return "none";
  try {
    const host = new URL(url).hostname;
    return SOCIAL_HOSTS.test(host) ? "social" : "site";
  } catch {
    return "none";
  }
}

/** Normalise a Turkish phone number; mobile numbers (05xx) can be reached on WhatsApp. */
export function phoneInfo(raw) {
  const digits = String(raw ?? "").replace(/\D/g, "");
  const national = digits.replace(/^(0090|90)/, "").replace(/^0/, "");
  const isMobile = /^5\d{9}$/.test(national);
  return { e164: national.length === 10 ? `90${national}` : "", isMobile };
}

const hostOf = (u) => {
  try {
    return new URL(u).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
};

/** Adds contact (whatsapp|call) and kind (chain|independent); a site shared by 3+ rows is a franchise chain. */
export function enrich(rows) {
  const hostCount = new Map();
  for (const r of rows) {
    const h = hostOf(r.url);
    if (h) hostCount.set(h, (hostCount.get(h) ?? 0) + 1);
  }
  return rows.map((r) => {
    const h = hostOf(r.url);
    return {
      ...r,
      contact: phoneInfo(r.phone).isMobile ? "whatsapp" : r.phone ? "call" : "",
      kind: h && hostCount.get(h) > 2 ? "chain" : "independent",
    };
  });
}

const COLUMNS = [
  "name", "url", "site_type", "phone", "contact", "kind", "city",
  "rating", "reviews", "address", "maps", "social", "status", "notes",
];
const csvCell = (v) => `"${String(v ?? "").replace(/"/g, '""')}"`;

function writeCsv(file, rows) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  const body = [COLUMNS.join(","), ...rows.map((r) => COLUMNS.map((c) => csvCell(r[c])).join(","))];
  fs.writeFileSync(file, "﻿" + body.join("\n"));
}

function splitCsvLine(line) {
  const cells = [];
  let cur = "";
  let quoted = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (quoted) {
      if (ch === '"' && line[i + 1] === '"') {
        cur += '"';
        i++;
      } else if (ch === '"') quoted = false;
      else cur += ch;
    } else if (ch === '"') quoted = true;
    else if (ch === ",") {
      cells.push(cur);
      cur = "";
    } else cur += ch;
  }
  cells.push(cur);
  return cells;
}

function readCsv(file) {
  const lines = fs.readFileSync(file, "utf8").replace(/^﻿/, "").split(/\r?\n/).filter((l) => l.trim());
  const head = splitCsvLine(lines[0]);
  return lines.slice(1).map((l) => Object.fromEntries(splitCsvLine(l).map((v, i) => [head[i], v])));
}

function parseArgs(argv) {
  const flags = {};
  for (let i = 0; i < argv.length; i++) {
    if (argv[i].startsWith("--")) {
      flags[argv[i].slice(2)] = argv[i + 1] === undefined || argv[i + 1].startsWith("--") ? true : argv[++i];
    }
  }
  return flags;
}

function loadKey() {
  if (process.env.GOOGLE_PLACES_API_KEY) return process.env.GOOGLE_PLACES_API_KEY.trim();
  for (const f of [".env.local", ".env"]) {
    const p = path.join(root, f);
    if (!fs.existsSync(p)) continue;
    const m = fs.readFileSync(p, "utf8").match(/^\s*GOOGLE_PLACES_API_KEY\s*=\s*(.+?)\s*$/m);
    if (m) return m[1].replace(/^["']|["']$/g, "");
  }
  return null;
}

const FIELDS = [
  "places.id",
  "places.displayName",
  "places.formattedAddress",
  "places.nationalPhoneNumber",
  "places.websiteUri",
  "places.rating",
  "places.userRatingCount",
  "places.googleMapsUri",
  "places.businessStatus",
  "nextPageToken",
].join(",");

async function searchPage(key, textQuery, pageToken) {
  const res = await fetch("https://places.googleapis.com/v1/places:searchText", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": key,
      "X-Goog-FieldMask": FIELDS,
    },
    body: JSON.stringify({
      textQuery,
      languageCode: "tr",
      regionCode: "TR",
      pageSize: 20,
      ...(pageToken ? { pageToken } : {}),
    }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(`Places API: ${data?.error?.message ?? `HTTP ${res.status}`}`);
  return data;
}

function summarise(rows) {
  const n = (f) => rows.filter(f).length;
  return [
    `  independent with a website: ${n((r) => r.url && r.kind === "independent")}`,
    `  franchise chain branches:   ${n((r) => r.kind === "chain")}`,
    `  no website / social only:   ${n((r) => !r.url)}`,
    `  reachable on WhatsApp:      ${n((r) => r.contact === "whatsapp")}`,
  ].join("\n");
}

async function main() {
  const flags = parseArgs(process.argv.slice(2));

  // Re-apply filters to an existing CSV without touching the API.
  if (flags.refine) {
    const src = path.resolve(root, String(flags.refine));
    const out = path.resolve(root, String(flags.out ?? flags.refine));
    const all = readCsv(src);
    const kept = all.filter((r) => isRelevant(r.name, r.url));
    const rows = enrich(kept.map((r) => ({ ...r, reviews: Number(r.reviews) || 0 })));
    writeCsv(out, rows);
    console.log(`Kept ${rows.length} of ${all.length} → ${out}\n${summarise(rows)}`);
    return;
  }

  const key = loadKey();
  if (!key) {
    console.error("GOOGLE_PLACES_API_KEY not found. Add it to .env.local (never commit it).");
    process.exit(1);
  }

  const cities = (flags.cities ? String(flags.cities).split(",") : DEFAULT_CITIES).map((s) => s.trim()).filter(Boolean);
  const queries = (flags.queries ? String(flags.queries).split(";") : DEFAULT_QUERIES).map((s) => s.trim()).filter(Boolean);
  const maxRequests = Number(flags["max-requests"] ?? 30);
  const out = path.resolve(root, String(flags.out ?? "leads/leads.csv"));

  console.log(`Places: ${cities.join(", ")}\nQueries: ${queries.join(" | ")}\nRequest cap: ${maxRequests}\n`);

  const seen = new Map();
  let requests = 0;

  outer: for (const city of cities) {
    for (const q of queries) {
      let token;
      for (let page = 0; page < 3; page++) {
        if (requests >= maxRequests) {
          console.log(`Stopped at the request cap (${maxRequests}).`);
          break outer;
        }
        requests++;
        const data = await searchPage(key, `${q} ${city}`, token);
        for (const p of data.places ?? []) {
          const name = p.displayName?.text ?? "";
          if (!p.id || seen.has(p.id)) continue;
          if (p.businessStatus && p.businessStatus !== "OPERATIONAL") continue;
          if (!isRelevant(name, p.websiteUri)) continue;
          const type = classifySite(p.websiteUri);
          seen.set(p.id, {
            name,
            city,
            site_type: type,
            url: type === "site" ? p.websiteUri : "",
            social: type === "social" ? p.websiteUri : "",
            phone: p.nationalPhoneNumber ?? "",
            rating: p.rating ?? "",
            reviews: p.userRatingCount ?? 0,
            address: p.formattedAddress ?? "",
            maps: p.googleMapsUri ?? "",
          });
        }
        token = data.nextPageToken;
        console.log(`${city} · ${q} · page ${page + 1}: ${seen.size} leads so far`);
        if (!token) break;
        await new Promise((r) => setTimeout(r, 300));
      }
    }
  }

  const rows = enrich([...seen.values()].sort((a, b) => b.reviews - a.reviews));
  writeCsv(out, rows);
  console.log(`\n${rows.length} leads → ${out}\n${summarise(rows)}\n  API requests used: ${requests}`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch((e) => {
    console.error(e.message);
    process.exit(1);
  });
}
