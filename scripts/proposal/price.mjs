/**
 * One-page price offer for the decision maker. No payment details on it.
 *
 *   node scripts/proposal/price.mjs proposals/anasehir-koleji-fiyat.json
 *
 * JSON: { client, title, date, sub, build: { title, amount, note, payments: [{ label, amount, when }] },
 *         care: { title, amount, per, badge, includes: [..], note }, notes: [..], total: { label, text },
 *         closing, closingText }
 * Writes <file>.html and <file>.pdf next to the JSON.
 */
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { CONTACT, esc, loadFont, reportCss, tile } from "../site-report/render.mjs";

const list = (items) => items.map((t) => `<li>${esc(t)}</li>`).join("");

export function renderPrice(d) {
  const font = loadFont();
  return `<!doctype html>
<html lang="tr">
<head>
<meta charset="utf-8">
<title>Fiyat Teklifi: ${esc(d.client)}</title>
<style>
${reportCss(font)}
.page { gap: 3.2mm; padding: 9mm 14mm 8mm; }
h1 { font-size: 23pt; }
.sub { font-size: 10.5pt; color: var(--muted); margin-top: 2mm; max-width: 150mm; line-height: 1.45; }
.card { background: var(--card); border: 1px solid var(--line); border-radius: 4mm; padding: 4mm 5.4mm; }
.card h2 { color: var(--deep); margin-bottom: 1.6mm; }
.big { font-size: 30pt; font-weight: 600; letter-spacing: -.04em; line-height: 1; }
.big small { font-size: 12pt; font-weight: 500; letter-spacing: 0; color: var(--muted); margin-left: 1.5mm; }
.row { display: flex; justify-content: space-between; align-items: flex-end; gap: 6mm; }
.desc { font-size: 9pt; line-height: 1.4; color: #3b3a36; margin-top: 1.8mm; max-width: 120mm; }
.pays { display: grid; grid-template-columns: 1fr 1fr; gap: 3mm; margin-top: 3.2mm; }
.pays div { background: var(--paper); border: 1px solid var(--line); border-radius: 3mm; padding: 2.8mm 4mm; }
.pays b { display: block; font-size: 15pt; letter-spacing: -.03em; font-weight: 600; }
.pays span { font-size: 8.6pt; color: var(--muted); line-height: 1.35; }
.badge { font-size: 8.4pt; font-weight: 700; letter-spacing: .04em; background: var(--orange); color: var(--ink); border-radius: 5mm; padding: 1.5mm 4mm; white-space: nowrap; }
ul.ck { list-style: none; display: grid; gap: 1.4mm; font-size: 9pt; line-height: 1.38; margin-top: 3mm; }
ul.ck li { padding-left: 5mm; position: relative; }
ul.ck li::before { content: ""; position: absolute; left: 0; top: 1.1mm; width: 2.4mm; height: 2.4mm; border-radius: 50%; background: var(--orange); }
.note2 { font-size: 8.4pt; color: var(--muted); margin-top: 2.4mm; line-height: 1.4; }
.page { break-after: page; }
.page:last-of-type { break-after: auto; }
.why { display: grid; grid-template-columns: 1fr 1fr; gap: 3.4mm; }
.why .card { padding: 4.6mm 5.4mm; border-left: 1.8mm solid var(--orange); }
.why b { display: block; font-size: 12.5pt; font-weight: 600; letter-spacing: -.025em; margin-bottom: 1.6mm; }
.why span { font-size: 9.6pt; line-height: 1.5; color: #3b3a36; }
.spacer { flex: 1; }
.ok { display: flex; justify-content: space-between; align-items: center; gap: 8mm; background: var(--orange); border-radius: 5mm; padding: 4.6mm 6.5mm; box-shadow: 0 1mm 0 #c9703f; }
.ok b { display: block; font-size: 14pt; font-weight: 700; letter-spacing: -.03em; line-height: 1.2; }
.ok p { font-size: 9pt; margin-top: 1.2mm; line-height: 1.4; }
.ok .contact { text-align: right; font-size: 9.2pt; line-height: 1.65; font-weight: 600; white-space: nowrap; }
</style>
</head>
<body>
<main class="page">
  <header>
    <div class="brand">${tile(40)}<span>Ekiz Yazılım</span></div>
    <div class="head-r">Fiyat teklifi<span>${esc(d.date)}</span></div>
  </header>

  <section>
    <p class="eyebrow">${esc(d.title)}</p>
    <h1>${esc(d.client)}</h1>
    <p class="sub">${esc(d.sub)}</p>
  </section>

  <section class="card">
    <h2>${esc(d.build.title)}</h2>
    <div class="row"><div class="big">${esc(d.build.amount)}</div></div>
    <p class="desc">${esc(d.build.note)}</p>
    <div class="pays">${d.build.payments.map((p) => `<div><b>${esc(p.amount)}</b><span>${esc(p.label)}<br>${esc(p.when)}</span></div>`).join("")}</div>
  </section>

  <section class="card">
    <h2>${esc(d.care.title)}</h2>
    <div class="row"><div class="big">${esc(d.care.amount)}<small>${esc(d.care.per)}</small></div><span class="badge">${esc(d.care.badge)}</span></div>
    <ul class="ck">${list(d.care.includes)}</ul>
    <p class="note2">${esc(d.care.note)}</p>
  </section>

  <section class="card">
    <h2>Bilmeniz gerekenler</h2>
    <ul class="ck" style="margin-top:0">${list(d.notes)}</ul>
  </section>

  <div class="spacer"></div>

  <section class="ok">
    <div><b>${esc(d.closing)}</b><p>${esc(d.closingText)} Aylık bakımın neden önemli olduğunu sonraki sayfada özetledik.</p></div>
    <div class="contact">${esc(CONTACT.phone)}<br>${esc(CONTACT.email)}<br>${esc(CONTACT.web)}</div>
  </section>
</main>

<main class="page">
  <header>
    <div class="brand">${tile(40)}<span>Ekiz Yazılım</span></div>
    <div class="head-r">Fiyat teklifi<span>${esc(d.client)}</span></div>
  </header>

  <section>
    <p class="eyebrow">Aylık bakım</p>
    <h1 style="font-size:20pt">${esc(d.whyTitle)}</h1>
    <p class="sub">${esc(d.whyIntro)}</p>
  </section>

  <section class="why">${d.why.map((w) => `<div class="card"><b>${esc(w.title)}</b><span>${esc(w.text)}</span></div>`).join("")}</section>

  <div class="spacer"></div>

  <section class="ok">
    <div><b>${esc(d.closing)}</b><p>${esc(d.closingText)}</p></div>
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
    console.error("Usage: node scripts/proposal/price.mjs <price.json>");
    process.exit(1);
  }
  const data = JSON.parse(fs.readFileSync(file, "utf8"));
  const base = file.replace(/\.json$/i, "");
  const html = renderPrice(data);
  fs.writeFileSync(`${base}.html`, html);
  const puppeteer = createRequire(import.meta.url)("puppeteer");
  const browser = await puppeteer.launch({ headless: true, executablePath: findBrowser(), args: ["--no-sandbox"] });
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: "load" });
  await page.pdf({ path: `${base}.pdf`, format: "A4", printBackground: true, margin: { top: 0, right: 0, bottom: 0, left: 0 } });
  const over = await page.evaluate(() => {
    const m = [...document.querySelectorAll(".page")].sort((a,b)=>(b.scrollHeight-b.clientHeight)-(a.scrollHeight-a.clientHeight))[0];
    return m.scrollHeight - m.clientHeight;
  });
  await browser.close();
  console.log(`${base}.pdf${over > 0 ? ` (OVERFLOW ${over}px)` : ""}`);
}
