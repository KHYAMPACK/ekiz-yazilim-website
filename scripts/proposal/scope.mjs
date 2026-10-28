/**
 * One-page scope and timeline for a client group. Same design as the site reports. No prices on it.
 *
 *   node scripts/proposal/scope.mjs proposals/anasehir-koleji.json
 *
 * JSON: { client, title, date, summary, pages: [..], included: [..], needs: [..],
 *         timeline: [{ date, label }], later: [..], why: [..], approval }
 * Writes <file>.html and <file>.pdf next to the JSON.
 */
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { CONTACT, esc, loadFont, reportCss, tile } from "../site-report/render.mjs";

const list = (items) => items.map((t) => `<li>${esc(t)}</li>`).join("");

export function renderScope(d) {
  const font = loadFont();
  return `<!doctype html>
<html lang="tr">
<head>
<meta charset="utf-8">
<title>Kapsam ve Takvim: ${esc(d.client)}</title>
<style>
${reportCss(font)}
.page { gap: 3.2mm; padding: 9mm 14mm 8mm; }
h1 { font-size: 23pt; }
.sub { font-size: 10.5pt; color: var(--muted); margin-top: 2mm; max-width: 150mm; line-height: 1.45; }
.summary { font-size: 11.5pt; font-weight: 600; letter-spacing: -.02em; line-height: 1.32; padding: 3.2mm 5mm; background: var(--card); border: 1px solid var(--line); border-left: 1.8mm solid var(--orange); border-radius: 3.5mm; }
.card { background: var(--card); border: 1px solid var(--line); border-radius: 4mm; padding: 3.6mm 5mm; }
.card h2 { color: var(--deep); margin-bottom: 2mm; }
.pages { display: flex; flex-wrap: wrap; gap: 1.6mm; }
.pages span { font-size: 8.6pt; font-weight: 600; padding: 1.2mm 3mm; border-radius: 5mm; background: var(--orange); color: var(--ink); }
.pages span.alt { background: var(--track); border: 1px solid var(--line); }
.cols { display: grid; grid-template-columns: 1.15fr 1fr; gap: 3.5mm; }
ul.ck { list-style: none; display: grid; gap: 1.3mm; font-size: 8.8pt; line-height: 1.36; }
ul.ck li { padding-left: 5mm; position: relative; }
ul.ck li::before { content: ""; position: absolute; left: 0; top: 1.1mm; width: 2.4mm; height: 2.4mm; border-radius: 50%; background: var(--orange); }
ul.ck.muted li::before { background: var(--track); border: 1px solid var(--line); }
.tl { display: grid; grid-template-columns: repeat(3, 1fr); gap: 3mm; }
.tl div { background: var(--card); border: 1px solid var(--line); border-radius: 4mm; padding: 3mm 4mm; }
.tl b { display: block; font-size: 14pt; letter-spacing: -.03em; font-weight: 600; color: var(--deep); }
.tl span { font-size: 8.6pt; line-height: 1.35; color: #3b3a36; }
.note2 { font-size: 8pt; color: var(--muted); margin-top: 1.6mm; }
.why { background: var(--ink); color: var(--cream); border-radius: 5mm; padding: 4mm 6mm; }
.why h2 { color: var(--orange); margin-bottom: 2mm; }
.why ul { list-style: none; display: grid; gap: 1.3mm; font-size: 8.8pt; line-height: 1.38; }
.why li { padding-left: 5mm; position: relative; }
.why li::before { content: ""; position: absolute; left: 0; top: 1.1mm; width: 2.4mm; height: 2.4mm; border-radius: 50%; background: var(--orange); }
.ok { display: flex; justify-content: space-between; align-items: center; gap: 8mm; background: var(--orange); border-radius: 5mm; padding: 4.6mm 6.5mm; box-shadow: 0 1mm 0 #c9703f; }
.ok b { display: block; font-size: 14pt; font-weight: 700; letter-spacing: -.03em; line-height: 1.2; }
.ok p { font-size: 9pt; margin-top: 1.2mm; line-height: 1.4; }
.ok .contact { text-align: right; font-size: 9.2pt; line-height: 1.65; font-weight: 600; white-space: nowrap; }
.spacer { flex: 1; }
</style>
</head>
<body>
<main class="page">
  <header>
    <div class="brand">${tile(40)}<span>Ekiz Yazılım</span></div>
    <div class="head-r">Kapsam ve takvim<span>${esc(d.date)}</span></div>
  </header>

  <section>
    <p class="eyebrow">${esc(d.title)}</p>
    <h1>${esc(d.client)}</h1>
    <p class="sub">${esc(d.sub)}</p>
  </section>

  <p class="summary">${esc(d.summary)}</p>

  <section class="card">
    <h2>Sitede olacak sayfalar</h2>
    <div class="pages">${d.pages.map((p) => `<span>${esc(p)}</span>`).join("")}${(d.pagesFooter ?? []).map((p) => `<span class="alt">${esc(p)}</span>`).join("")}</div>
    <p class="note2">${esc(d.pagesNote)}</p>
  </section>

  <section class="cols">
    <div class="card">
      <h2>Kapsama dahil</h2>
      <ul class="ck">${list(d.included)}</ul>
    </div>
    <div class="card">
      <h2>Sizden beklenen</h2>
      <ul class="ck">${list(d.needs)}</ul>
      <h2 style="margin-top:3mm">Yayından sonra konuşulur</h2>
      <ul class="ck muted">${list(d.later)}</ul>
    </div>
  </section>

  <section>
    <div class="tl">${d.timeline.map((t) => `<div><b>${esc(t.date)}</b><span>${esc(t.label)}</span></div>`).join("")}</div>
    <p class="note2">${esc(d.timelineNote)}</p>
  </section>

  <section class="why">
    <h2>Neden bu hafta başlamalıyız</h2>
    <ul>${list(d.why)}</ul>
  </section>

  <div class="spacer"></div>

  <section class="ok">
    <div><b>${esc(d.approvalTitle)}</b><p>${esc(d.approval)}</p></div>
    <div class="contact">${esc(CONTACT.phone)}<br>${esc(CONTACT.email)}<br>${esc(CONTACT.web)}</div>
  </section>
</main>
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
    console.error("Usage: node scripts/proposal/scope.mjs <proposal.json>");
    process.exit(1);
  }
  const data = JSON.parse(fs.readFileSync(file, "utf8"));
  const base = file.replace(/\.json$/i, "");
  const html = renderScope(data);
  fs.writeFileSync(`${base}.html`, html);
  const puppeteer = createRequire(import.meta.url)("puppeteer");
  const browser = await puppeteer.launch({ headless: true, executablePath: findBrowser(), args: ["--no-sandbox"] });
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: "load" });
  await page.pdf({ path: `${base}.pdf`, format: "A4", printBackground: true, margin: { top: 0, right: 0, bottom: 0, left: 0 } });
  const pages = await page.evaluate(() => Math.ceil(document.documentElement.scrollHeight / (297 * 96 / 25.4)));
  await browser.close();
  console.log(`${base}.pdf (${pages} page${pages > 1 ? "s" : ""})`);
}
