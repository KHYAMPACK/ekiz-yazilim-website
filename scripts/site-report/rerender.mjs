/**
 * Re-draw every report in reports/ from its saved .json (no network checks).
 * Use after changing the design in render.mjs:  node scripts/site-report/rerender.mjs [folder]
 */
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import { renderHtml } from "./render.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const dir = path.resolve(root, process.argv[2] ?? "reports");

function findBrowser() {
  const pf = process.env["ProgramFiles"] ?? "C:\\Program Files";
  const pf86 = process.env["ProgramFiles(x86)"] ?? "C:\\Program Files (x86)";
  return [
    process.env.CHROME_PATH,
    path.join(pf, "Google", "Chrome", "Application", "chrome.exe"),
    path.join(pf86, "Google", "Chrome", "Application", "chrome.exe"),
    path.join(pf86, "Microsoft", "Edge", "Application", "msedge.exe"),
    path.join(pf, "Microsoft", "Edge", "Application", "msedge.exe"),
  ].find((p) => p && fs.existsSync(p));
}

const require = createRequire(import.meta.url);
const puppeteer = require("puppeteer");
const browser = await puppeteer.launch({ headless: true, executablePath: findBrowser(), args: ["--no-sandbox"] });

const files = fs.readdirSync(dir).filter((f) => f.endsWith(".json"));
let n = 0;
for (const f of files) {
  const { name, facts, result } = JSON.parse(fs.readFileSync(path.join(dir, f), "utf8"));
  const date = new Date().toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" });
  const html = renderHtml({ name, host: facts.host, date, result });
  const base = path.join(dir, f.replace(/\.json$/, ""));
  fs.writeFileSync(`${base}.html`, html);
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: "load" });
  await page.pdf({ path: `${base}.pdf`, format: "A4", printBackground: true, margin: { top: 0, right: 0, bottom: 0, left: 0 } });
  await page.close();
  n++;
}
await browser.close();
console.log(`Re-drew ${n} reports in ${dir}`);
