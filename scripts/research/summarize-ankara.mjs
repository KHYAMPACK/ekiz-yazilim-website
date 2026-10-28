/**
 * Count the scan results in research/ankara-2026/facts.jsonl.
 *   node scripts/research/summarize-ankara.mjs
 * Writes research/ankara-2026/summary.json and prints it. Percentages use the stated base.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const dir = path.join(root, "research", "ankara-2026");
const rows = fs.readFileSync(path.join(dir, "facts.jsonl"), "utf8").split("\n").filter(Boolean).map((l) => JSON.parse(l));

// The same site can be listed twice (several branches): count each host once.
// Hosts that are not an institution's own website (a webmail login page).
const EXCLUDE = new Set(["webmail.finalegitim.com.tr"]);
const sitemapRecheck = JSON.parse(fs.readFileSync(path.join(dir, "sitemap-recheck.json"), "utf8"));

const seen = new Set();
const sites = [];
for (const r of rows) {
  const host = r.facts?.host ?? r.leadUrl;
  if (seen.has(host) || EXCLUDE.has(host)) continue;
  seen.add(host);
  sites.push(r);
}

const reachable = sites.filter((r) => r.facts && !r.facts.unreachable);
const unreachable = sites.filter((r) => r.facts?.unreachable);
const errors = sites.filter((r) => r.error);

const count = (list, fn) => list.filter(fn).length;
const f = (r) => r.facts;
const p = (r) => r.facts.page;

const checks = {
  // security
  certInvalid: count(reachable, (r) => f(r).cert?.connected && f(r).cert.authorized === false),
  certNoHttps: count(reachable, (r) => !f(r).cert?.connected),
  certExpiresIn30: count(reachable, (r) => f(r).cert?.connected && f(r).cert.authorized && f(r).cert.daysLeft != null && f(r).cert.daysLeft <= 30),
  httpNoRedirect: count(reachable, (r) => f(r).httpRedirect === false),
  mixedContent: count(reachable, (r) => (p(r).mixedContent ?? 0) > 0),
  // search / sharing
  noViewport: count(reachable, (r) => !p(r).viewport),
  noDescription: count(reachable, (r) => !p(r).description),
  noOgImage: count(reachable, (r) => !p(r).ogImage),
  // /sitemap.xml missing AND no sitemap at the other common places or in robots.txt
  noSitemap: count(reachable, (r) => !f(r).sitemap && !sitemapRecheck[new URL(p(r).finalUrl).origin]),
  noRobots: count(reachable, (r) => !f(r).robotsTxt),
  noCanonical: count(reachable, (r) => !p(r).canonical),
  noH1: count(reachable, (r) => (p(r).h1 ?? 0) === 0),
  noindex: count(reachable, (r) => p(r).noindex),
  // content / contact
  noPhoneLink: count(reachable, (r) => !p(r).phoneLink),
  noWhatsapp: count(reachable, (r) => !p(r).whatsappLink),
  oldCopyright: count(reachable, (r) => p(r).copyrightYear && p(r).copyrightYear <= 2023),
  hasCopyright: count(reachable, (r) => p(r).copyrightYear),
  imagesMissingAlt: count(reachable, (r) => (p(r).images ?? 0) > 0 && p(r).imagesNoAlt / p(r).images > 0.5),
  slowTtfb: count(reachable, (r) => (p(r).ttfb ?? 0) > 1.5),
  heavyPage: count(reachable, (r) => (p(r).bytes ?? 0) > 3_000_000),
  // domain
  domainKnown: count(reachable, (r) => f(r).domain?.found),
  domainExpires90: count(reachable, (r) => f(r).domain?.found && f(r).domain.daysLeft <= 90),
};

const platforms = {};
for (const r of reachable) platforms[p(r).platform ?? "Bilinmeyen/özel"] = (platforms[p(r).platform ?? "Bilinmeyen/özel"] ?? 0) + 1;

const scores = reachable.map((r) => r.score).filter((n) => typeof n === "number").sort((a, b) => a - b);
const median = scores.length ? scores[Math.floor(scores.length / 2)] : null;

const unreachableReasons = {};
for (const r of unreachable) {
  const k = f(r).https?.error ?? "unknown";
  unreachableReasons[k] = (unreachableReasons[k] ?? 0) + 1;
}

const summary = {
  scannedRows: rows.length,
  uniqueSites: sites.length,
  reachable: reachable.length,
  unreachable: unreachable.length,
  unreachableReasons,
  scanErrors: errors.length,
  checks,
  platforms,
  score: { median, min: scores[0], max: scores.at(-1), below50: scores.filter((s) => s < 50).length },
  excludedHosts: [...EXCLUDE],
  scanDate: rows[0]?.facts?.checkedAt?.slice(0, 10),
};
fs.writeFileSync(path.join(dir, "summary.json"), JSON.stringify(summary, null, 2));
console.log(JSON.stringify(summary, null, 2));
