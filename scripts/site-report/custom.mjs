/**
 * Hand-written report: one center, one sales angle, no scores.
 *
 *   node scripts/site-report/custom.mjs leads/custom/balgat.json
 *
 * JSON: { name, host, verdict, items: [{ level: "critical"|"high", title, meaning, proof, fix }],
 *         cta?: { title, text }, date? }
 * Writes <file>.html and <file>.pdf next to the JSON.
 */
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { CONTACT, esc, loadFont, reportCss, tile } from "./render.mjs";
import { page2Css, page2Html } from "./page2.mjs";

const LEVEL = { critical: "Acil", high: "Ciddi", medium: "Önemli" };

export function renderCustom(d) {
  const date = d.date ?? new Date().toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" });
  const font = loadFont();
  const items = d.items
    .map(
      (f, i) => `
      <article class="finding sev-${f.level}">
        <div class="f-head">
          <span class="f-no">${i + 1}</span>
          <h3>${esc(f.title)}</h3>
          <span class="chip chip-${f.level}">${LEVEL[f.level] ?? ""}</span>
        </div>
        <p class="f-meaning"><b class="cost">Size maliyeti:</b> ${esc(f.cost ?? f.meaning)}</p>
        ${f.proof ? `<p class="proof">Neden: ${esc(f.proof)}</p>` : ""}
        <p class="f-fix"><b>Biz ne yaparız:</b> ${esc(f.fix)}</p>
      </article>`,
    )
    .join("");
  const cta = d.cta ?? { title: "Bunları sizin için çözelim.", text: "10 dakikalık bir görüşmeyle başlayalım." };

  return `<!doctype html>
<html lang="tr">
<head>
<meta charset="utf-8">
<title>Site Raporu: ${esc(d.name)}</title>
<style>
${reportCss(font)}
${page2Css}
.page { height: auto; min-height: 297mm; gap: 3.4mm; padding: 10mm 14mm 8mm; }
.verdict { font-size: 12.5pt; font-weight: 600; letter-spacing: -.025em; line-height: 1.28; padding: 3mm 5mm; background: var(--card); border: 1px solid var(--line); border-left: 1.8mm solid var(--orange); border-radius: 3.5mm; }
.count { background: var(--ink); color: var(--cream); border-radius: 5mm; padding: 3.6mm 6mm; text-align: center; min-width: 34mm; display: flex; flex-direction: column; justify-content: center; position: relative; overflow: hidden; }
.count::before { content: ""; position: absolute; right: -10mm; top: -12mm; width: 34mm; height: 34mm; border-radius: 50%; background: radial-gradient(circle, rgba(229,138,92,.35), rgba(229,138,92,0) 70%); }
.count b { font-size: 34pt; font-weight: 600; letter-spacing: -.04em; line-height: 1; position: relative; }
.count span { font-size: 8pt; letter-spacing: .2em; text-transform: uppercase; color: var(--orange); font-weight: 600; margin-top: 1.4mm; position: relative; }
.finding { padding: 2.4mm 4.2mm; }
.f-head { margin-bottom: .8mm; } .hero { gap: 6mm; } h1 { font-size: 22pt; } .cta { padding: 4mm 6mm; } header { padding-bottom: 3mm; }
.f-head h3 { font-size: 10.2pt; }
.f-meaning, .f-fix { font-size: 8.4pt; line-height: 1.36; }
.f-fix { margin-top: .8mm; }
.findings { gap: 2.4mm; }
.cost { color: var(--deep); }
.verdict .calc { display: block; margin-top: 1.4mm; font-size: 9pt; font-weight: 500; letter-spacing: 0; color: #3b3a36; }
.proof { font-size: 7.4pt; color: var(--muted); margin-top: 1.1mm; line-height: 1.35; }
.chip-medium { background: var(--card); }
.cta { margin-top: 1mm; }
</style>
</head>
<body>
<main class="page">
  <header>
    <div class="brand">${tile(40)}<span>Ekiz Yazılım</span></div>
    <div class="head-r">Site raporu<span>${esc(date)}</span></div>
  </header>

  <section class="hero">
    <div>
      <p class="eyebrow">Sitenizin durumu</p>
      <h1>${esc(d.name)}</h1>
      <p class="url">${esc(d.host)}</p>
    </div>
    <div class="count"><b>${d.items.length}</b><span>Ciddi bulgu</span></div>
  </section>

  <p class="verdict">${esc(d.verdict)}${d.calc ? `<span class="calc">${esc(d.calc)}</span>` : ""}</p>

  <section>
    <div class="findings">${items}</div>
  </section>

  <section>
    <div class="cta">
      <div>
        <b>${esc(cta.title)}</b>
        <p>${esc(cta.text)} Alan adı ve barındırma sizin adınıza kalır; ne ödediğiniz her kalemiyle yazılı olur.</p>
      </div>
      <div class="contact">
        ${esc(CONTACT.phone)}<br>${esc(CONTACT.email)}<br>${esc(CONTACT.web)}
      </div>
    </div>
    <p class="note">Bulgular, sitenizin herkese açık sayfalarından ${esc(date)} tarihinde ölçülmüştür. Sitenize giriş yapılmaz.</p>
  </section>
</main>
${page2Html()}
</body>
</html>`;
}

function findBrowser() {
  const pf = process.env["ProgramFiles"] ?? "C:\\Program Files";
  const pf86 = process.env["ProgramFiles(x86)"] ?? "C:\\Program Files (x86)";
  return [
    process.env.CHROME_PATH,
    path.join(pf, "Google", "Chrome", "Application", "chrome.exe"),
    path.join(pf86, "Google", "Chrome", "Application", "chrome.exe"),
    path.join(pf86, "Microsoft", "Edge", "Application", "msedge.exe"),
  ].find((p) => p && fs.existsSync(p));
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === path.resolve(new URL(import.meta.url).pathname.replace(/^\//, ""));
if (isMain) {
  const file = process.argv[2];
  if (!file) {
    console.error("Usage: node scripts/site-report/custom.mjs <report.json>");
    process.exit(1);
  }
  const data = JSON.parse(fs.readFileSync(file, "utf8"));
  const base = file.replace(/\.json$/i, "");
  const html = renderCustom(data);
  fs.writeFileSync(`${base}.html`, html);
  const puppeteer = createRequire(import.meta.url)("puppeteer");
  const browser = await puppeteer.launch({ headless: true, executablePath: findBrowser(), args: ["--no-sandbox"] });
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: "load" });
  await page.pdf({ path: `${base}.pdf`, format: "A4", printBackground: true, margin: { top: 0, right: 0, bottom: 0, left: 0 } });
  await browser.close();
  console.log(`${base}.pdf`);
}
