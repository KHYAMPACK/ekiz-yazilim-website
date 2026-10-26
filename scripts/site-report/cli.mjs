/**
 * Site report generator.
 *
 *   node scripts/site-report/cli.mjs https://example.com --name "X Kurs"
 *   node scripts/site-report/cli.mjs --csv leads.csv        (columns: name,url)
 *
 * Flags: --psi (add Google mobile speed score), --no-pdf, --out <dir>
 * Output: reports/<slug>.{json,html,pdf} and, for --csv, reports/summary.csv
 */
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath, pathToFileURL } from "node:url";
import { checkSite } from "./checks.mjs";
import { renderHtml } from "./render.mjs";
import { evaluate } from "./score.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");

function parseArgs(argv) {
  const args = { urls: [], flags: {} };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a.startsWith("--")) {
      const key = a.slice(2);
      if (["name", "csv", "out"].includes(key)) args.flags[key] = argv[++i];
      else args.flags[key] = true;
    } else args.urls.push(a);
  }
  return args;
}

/** Quote-aware CSV line split (handles commas inside "quoted" cells). */
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
      cells.push(cur.trim());
      cur = "";
    } else cur += ch;
  }
  cells.push(cur.trim());
  return cells;
}

function parseCsv(text) {
  const lines = text.replace(/^﻿/, "").split(/\r?\n/).filter((l) => l.trim());
  const split = splitCsvLine;
  const head = split(lines[0]).map((h) => h.toLowerCase());
  const nameIdx = head.findIndex((h) => ["name", "ad", "kurum", "isim"].includes(h));
  const urlIdx = head.findIndex((h) => ["url", "site", "website", "web"].includes(h));
  if (urlIdx === -1) throw new Error("CSV needs a url column (name,url).");
  return lines.slice(1).map((l) => {
    const c = split(l);
    return { name: nameIdx >= 0 ? c[nameIdx] : "", url: c[urlIdx] };
  }).filter((r) => r.url);
}

const slug = (host) => host.replace(/^www\./, "").replace(/[^a-z0-9.-]/gi, "-");

async function loadPuppeteer() {
  const require = createRequire(import.meta.url);
  try {
    return require("puppeteer");
  } catch {
    return (await import("puppeteer")).default;
  }
}

/** Prefer a browser that is already installed (Chrome, then Edge) over puppeteer's download. */
function findBrowser() {
  const pf = process.env["ProgramFiles"] ?? "C:\\Program Files";
  const pf86 = process.env["ProgramFiles(x86)"] ?? "C:\\Program Files (x86)";
  const local = process.env.LOCALAPPDATA ?? "";
  return [
    process.env.CHROME_PATH,
    path.join(pf, "Google", "Chrome", "Application", "chrome.exe"),
    path.join(pf86, "Google", "Chrome", "Application", "chrome.exe"),
    path.join(local, "Google", "Chrome", "Application", "chrome.exe"),
    path.join(pf86, "Microsoft", "Edge", "Application", "msedge.exe"),
    path.join(pf, "Microsoft", "Edge", "Application", "msedge.exe"),
    "/usr/bin/google-chrome",
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  ].find((p) => p && fs.existsSync(p));
}

const dateLabel = () =>
  new Date().toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" });

async function runOne(job, { psi, outDir, browser }) {
  const facts = await checkSite(job.url, { psi });
  const result = evaluate(facts);
  const name = job.name || facts.host.replace(/^www\./, "");
  const base = path.join(outDir, slug(facts.host));

  fs.writeFileSync(`${base}.json`, JSON.stringify({ name, facts, result }, null, 2));
  const html = renderHtml({ name, host: facts.host, date: dateLabel(), result });
  fs.writeFileSync(`${base}.html`, html);

  if (browser) {
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "load" });
    await page.pdf({ path: `${base}.pdf`, format: "A4", printBackground: true, margin: { top: 0, right: 0, bottom: 0, left: 0 } });
    await page.close();
  }
  return { name, host: facts.host, result, base };
}

async function main() {
  const { urls, flags } = parseArgs(process.argv.slice(2));
  const outDir = path.resolve(root, flags.out ?? "reports");
  fs.mkdirSync(outDir, { recursive: true });

  let jobs = urls.map((u) => ({ url: u, name: flags.name ?? "" }));
  if (flags.csv) jobs = parseCsv(fs.readFileSync(path.resolve(flags.csv), "utf8"));
  if (jobs.length === 0) {
    console.error('Usage: node scripts/site-report/cli.mjs <url> [--name "X"] [--psi] | --csv leads.csv');
    process.exit(1);
  }

  let browser = null;
  if (!flags["no-pdf"]) {
    const puppeteer = await loadPuppeteer();
    browser = await puppeteer.launch({
      headless: true,
      executablePath: findBrowser(),
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
  }

  const rows = [];
  const queue = [...jobs];
  const workers = Array.from({ length: Math.min(3, queue.length) }, async () => {
    while (queue.length) {
      const job = queue.shift();
      try {
        const r = await runOne(job, { psi: !!flags.psi, outDir, browser });
        const top = r.result.top[0];
        rows.push({ name: r.name, host: r.host, score: r.result.overall, top: top?.title ?? "", pdf: `${r.base}.pdf` });
        console.log(`${String(r.result.overall).padStart(3)}  ${r.host}  ${top ? "· " + top.title : "· sorun bulunamadı"}`);
      } catch (e) {
        console.error(`FAILED ${job.url}: ${e.message}`);
        rows.push({ name: job.name, host: job.url, score: "", top: `HATA: ${e.message}`, pdf: "" });
      }
    }
  });
  await Promise.all(workers);
  if (browser) await browser.close();

  if (flags.csv) {
    const q = (s) => `"${String(s).replace(/"/g, '""')}"`;
    const csv = ["name,site,score,top_finding,pdf", ...rows.map((r) => [r.name, r.host, r.score, r.top, r.pdf].map(q).join(","))].join("\n");
    fs.writeFileSync(path.join(outDir, "summary.csv"), "﻿" + csv);
    console.log(`\nSummary: ${pathToFileURL(path.join(outDir, "summary.csv")).href}`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
