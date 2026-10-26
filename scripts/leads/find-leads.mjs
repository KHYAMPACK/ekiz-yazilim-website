/**
 * Lead finder: lists prep centers / tutoring centers / kindergartens from Google Places.
 *
 *   node scripts/leads/find-leads.mjs --cities "Denizli,İzmir"
 *   node scripts/leads/find-leads.mjs --cities "Ankara" --queries "LGS hazırlık kursu"
 *
 * Needs GOOGLE_PLACES_API_KEY in the environment or in .env.local.
 * Output: leads/leads.csv (git-ignored). Rows with a real website can go straight into
 *   npm run site-report -- --csv leads/leads.csv
 *
 * Flags:
 *   --cities <a,b,c>      cities to search (default: a few large ones)
 *   --queries <a;b;c>     search phrases separated by ; (default: LGS / dershane / etüt)
 *   --max-requests <n>    hard cap on API calls (default 30) so a mistake cannot run up a bill
 *   --out <file>          output CSV (default leads/leads.csv)
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");

const DEFAULT_CITIES = ["Denizli", "İzmir", "Ankara", "İstanbul", "Bursa", "Antalya"];
const DEFAULT_QUERIES = ["LGS hazırlık kursu", "etüt merkezi", "dershane"];

// Only keep businesses that look like education centers; drop obvious noise.
const RELEVANT = /dershane|kurs|etüt|etut|akademi|eğitim|egitim|lgs|kolej|koleji|okul|hazırlık|hazirlik|study|kreş|kres|anaokul/i;
const NOISE = /sürücü|surucu|direksiyon|kuaför|kuafor|güzellik|guzellik|spor|yüzme|yuzme|müzik|muzik|bale|dans|oto|market|restoran|cafe|kafe/i;

const SOCIAL_HOSTS = /instagram\.com|facebook\.com|fb\.com|linktr\.ee|wa\.me|whatsapp\.com|sahibinden|google\.com|goo\.gl|tiktok\.com|youtube\.com/i;

// Public institutions and other non-buyers: not leads.
const PUBLIC_NAME = /halk eğitim|halk egitim|\bmeb\b|müdürlüğü|mudurlugu|belediye|üniversite|universite|hastane|kılavuz|kilavuz|hızlı okuma|hizli okuma|dil merkezi/i;
const PUBLIC_HOST = /\.(gov|edu|k12)\.tr$|\.meb\.|\.bel\.tr$/i;

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

function parseArgs(argv) {
  const flags = {};
  for (let i = 0; i < argv.length; i++) {
    if (argv[i].startsWith("--")) flags[argv[i].slice(2)] = argv[i + 1]?.startsWith("--") || argv[i + 1] === undefined ? true : argv[++i];
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
  if (!res.ok) {
    const msg = data?.error?.message ?? `HTTP ${res.status}`;
    throw new Error(`Places API: ${msg}`);
  }
  return data;
}

const csvCell = (v) => `"${String(v ?? "").replace(/"/g, '""')}"`;

async function main() {
  const flags = parseArgs(process.argv.slice(2));
  const key = loadKey();
  if (!key) {
    console.error("GOOGLE_PLACES_API_KEY not found. Add it to .env.local (never commit it).");
    process.exit(1);
  }

  const cities = (flags.cities ? String(flags.cities).split(",") : DEFAULT_CITIES).map((s) => s.trim()).filter(Boolean);
  const queries = (flags.queries ? String(flags.queries).split(";") : DEFAULT_QUERIES).map((s) => s.trim()).filter(Boolean);
  const maxRequests = Number(flags["max-requests"] ?? 30);
  const out = path.resolve(root, String(flags.out ?? "leads/leads.csv"));

  console.log(`Cities: ${cities.join(", ")}\nQueries: ${queries.join(" | ")}\nRequest cap: ${maxRequests}\n`);

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
          seen.set(p.id, {
            name,
            city,
            site_type: classifySite(p.websiteUri),
            url: classifySite(p.websiteUri) === "site" ? p.websiteUri : "",
            social: classifySite(p.websiteUri) === "social" ? p.websiteUri : "",
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

  const rows = [...seen.values()].sort((a, b) => b.reviews - a.reviews);
  const cols = ["name", "url", "site_type", "phone", "city", "rating", "reviews", "address", "maps", "social", "status", "notes"];
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, "﻿" + [cols.join(","), ...rows.map((r) => cols.map((c) => csvCell(r[c])).join(","))].join("\n"));

  const count = (t) => rows.filter((r) => r.site_type === t).length;
  console.log(
    `\n${rows.length} leads → ${out}\n  with a website: ${count("site")}\n  social page only: ${count("social")}\n  no website: ${count("none")}\n  API requests used: ${requests}`,
  );
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch((e) => {
    console.error(e.message);
    process.exit(1);
  });
}
