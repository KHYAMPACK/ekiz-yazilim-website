/**
 * The engine only looks at /sitemap.xml. WordPress SEO plugins often publish
 * /sitemap_index.xml or /wp-sitemap.xml and list it in robots.txt, so "no /sitemap.xml"
 * overstates "no sitemap". Re-check every site the engine flagged, the fairer way.
 *   node scripts/research/recheck-sitemap.mjs
 * Writes research/ankara-2026/sitemap-recheck.json
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { get } from "../site-report/checks.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const dir = path.join(root, "research", "ankara-2026");
const rows = fs.readFileSync(path.join(dir, "facts.jsonl"), "utf8").split("\n").filter(Boolean).map((l) => JSON.parse(l));

const seen = new Set();
const todo = [];
for (const r of rows) {
  const f = r.facts;
  if (!f || f.unreachable || seen.has(f.host)) continue;
  seen.add(f.host);
  if (!f.sitemap) todo.push(new URL(f.page.finalUrl).origin);
}

const isSitemap = (res) =>
  res.ok && res.status === 200 && /<urlset|<sitemapindex/i.test(res.body) && !/^\s*<(?:!doctype|html)/i.test(res.body);
const PATHS = ["/sitemap_index.xml", "/wp-sitemap.xml", "/sitemap-index.xml", "/sitemap.xml.gz", "/sitemap/sitemap.xml"];

const out = {};
const queue = [...todo];
await Promise.all(
  Array.from({ length: 4 }, async () => {
    while (queue.length) {
      const origin = queue.shift();
      let found = null;
      const robots = await get(`${origin}/robots.txt`, { insecure: true, maxBytes: 200_000 });
      if (robots.ok && robots.status === 200) {
        const m = robots.body.match(/^\s*sitemap:\s*(\S+)/im);
        if (m) {
          const res = await get(m[1], { insecure: true, maxBytes: 500_000 });
          if (isSitemap(res)) found = m[1];
        }
      }
      for (const p of found ? [] : PATHS) {
        const res = await get(origin + p, { insecure: true, maxBytes: 500_000 });
        if (isSitemap(res)) { found = origin + p; break; }
      }
      out[origin] = found;
    }
  }),
);
fs.writeFileSync(path.join(dir, "sitemap-recheck.json"), JSON.stringify(out, null, 2));
const total = Object.keys(out).length;
const has = Object.values(out).filter(Boolean).length;
console.log(`${total} sites without /sitemap.xml; ${has} actually have a sitemap elsewhere; ${total - has} have none`);
