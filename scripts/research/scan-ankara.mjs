/**
 * Scan the websites of the Ankara institutions in leads/leads-ankara.csv with the
 * site-report check engine and save the raw facts, one JSON line per site.
 *
 *   node scripts/research/scan-ankara.mjs            (resumes: skips hosts already in the output)
 *   node scripts/research/scan-ankara.mjs --limit 5  (try a few first)
 *
 * Output: research/ankara-2026/facts.jsonl   (nothing is rendered or sent anywhere)
 * Only sites with site_type = "site" are scanned. No PageSpeed calls (mobile speed
 * would need Google's API quota; the report only uses what the engine measures itself).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { checkSite } from "../site-report/checks.mjs";
import { evaluate } from "../site-report/score.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const outDir = path.join(root, "research", "ankara-2026");
const outFile = path.join(outDir, "facts.jsonl");
const CONCURRENCY = 4;
const SITE_TIMEOUT_MS = 120_000;

function splitCsvLine(line) {
  const cells = [];
  let cur = "";
  let quoted = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (quoted) {
      if (ch === '"' && line[i + 1] === '"') { cur += '"'; i++; }
      else if (ch === '"') quoted = false;
      else cur += ch;
    } else if (ch === '"') quoted = true;
    else if (ch === ",") { cells.push(cur); cur = ""; }
    else cur += ch;
  }
  cells.push(cur);
  return cells;
}

function readLeads() {
  const text = fs.readFileSync(path.join(root, "leads", "leads-ankara.csv"), "utf8").replace(/^﻿/, "");
  const lines = text.split(/\r?\n/).filter((l) => l.trim());
  const head = splitCsvLine(lines[0]);
  return lines.slice(1).map((l) => {
    const c = splitCsvLine(l);
    return Object.fromEntries(head.map((h, i) => [h, c[i] ?? ""]));
  });
}

const limitArg = process.argv.indexOf("--limit");
const limit = limitArg > -1 ? Number(process.argv[limitArg + 1]) : Infinity;

fs.mkdirSync(outDir, { recursive: true });
const done = new Set();
if (fs.existsSync(outFile)) {
  for (const l of fs.readFileSync(outFile, "utf8").split("\n")) {
    if (!l.trim()) continue;
    try { done.add(JSON.parse(l).leadUrl); } catch { /* ignore a half-written line */ }
  }
}

const leads = readLeads().filter((r) => r.site_type === "site" && r.url);
const queue = leads.filter((r) => !done.has(r.url)).slice(0, limit);
console.log(`${leads.length} sites in the list, ${done.size} already scanned, ${queue.length} to do`);

const withTimeout = (p, ms) =>
  Promise.race([p, new Promise((_, rej) => setTimeout(() => rej(new Error("timeout")), ms))]);

let n = 0;
const workers = Array.from({ length: CONCURRENCY }, async () => {
  while (queue.length) {
    const lead = queue.shift();
    const row = {
      leadUrl: lead.url, name: lead.name, kind: lead.kind, city: lead.city,
      rating: lead.rating, reviews: lead.reviews,
    };
    try {
      const facts = await withTimeout(checkSite(lead.url), SITE_TIMEOUT_MS);
      const result = evaluate(facts);
      row.facts = facts;
      row.score = result.overall;
      row.findings = (result.top ?? []).map((f) => f.id ?? f.title);
    } catch (e) {
      row.error = e.message;
    }
    fs.appendFileSync(outFile, JSON.stringify(row) + "\n");
    n++;
    if (n % 10 === 0) console.log(`${n} done`);
  }
});
await Promise.all(workers);
console.log("finished", n);
