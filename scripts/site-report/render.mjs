/** One-page A4 report as a self-contained HTML string (font and logo embedded). Warm paper look, same as the site. */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { FIX_BY_ID, SEVERITY_LABEL } from "./score.mjs";
import { page2Css, page2Html } from "./page2.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");

export const CONTACT = {
  phone: "+90 551 599 81 56",
  email: "ekizmert3@gmail.com",
  web: "ekizyazilim.com",
};

export const esc = (s) =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const CORE = "M29.9 12H73.7L84.6 30.8H40.8L51.7 50L40.8 69.1H84.6L73.7 87.9H29.9L19 69.1L29.9 50L19 30.8L29.9 12Z";
export const tile = (size) =>
  `<svg width="${size}" height="${size}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect width="100" height="100" rx="26" fill="#e58a5c"/><g transform="translate(50 50) scale(0.58) translate(-51.8 -50)" fill="#141413"><path d="${CORE}"/></g></svg>`;

let fontCache;
export const loadFont = () =>
  (fontCache ??= fs.readFileSync(path.join(root, "brand", "exports", "fonts", "SpaceGrotesk.ttf")).toString("base64"));

export const reportCss = (font) => `
@font-face { font-family: "Space Grotesk"; src: url(data:font/ttf;base64,${font}) format("truetype"); font-weight: 300 700; }
@page { size: A4; margin: 0; }
:root { --paper:#faf9f5; --card:#ffffff; --ink:#141413; --muted:#6b6860; --line:#e3dfd2; --track:#ece8dc;
        --orange:#e58a5c; --deep:#b6512a; --good:#4f9d77; --bad:#c4372c; --cream:#f3f0e8; }
* { box-sizing: border-box; margin: 0; padding: 0; }
html, body { background: var(--paper); }
body { font-family: "Space Grotesk", system-ui, sans-serif; color: var(--ink); -webkit-print-color-adjust: exact; print-color-adjust: exact; }
.page { width: 210mm; height: 297mm; padding: 14mm 15mm 12mm; display: flex; flex-direction: column; gap: 5.5mm; overflow: hidden; background: var(--paper); }
header { display: flex; justify-content: space-between; align-items: center; padding-bottom: 4.5mm; border-bottom: 1px solid var(--line); }
.brand { display: flex; align-items: center; gap: 3.2mm; font-size: 14pt; font-weight: 600; letter-spacing: -.03em; line-height: 1; }
.head-r { text-align: right; font-size: 8pt; letter-spacing: .18em; text-transform: uppercase; color: var(--deep); font-weight: 600; line-height: 1.6; }
.head-r span { display: block; color: var(--muted); letter-spacing: .04em; text-transform: none; font-weight: 400; font-size: 9pt; }
.hero { display: flex; justify-content: space-between; align-items: stretch; gap: 8mm; }
.eyebrow { font-size: 7.5pt; letter-spacing: .2em; text-transform: uppercase; color: var(--deep); font-weight: 600; margin-bottom: 2mm; }
h1 { font-size: 26pt; font-weight: 600; letter-spacing: -.035em; line-height: 1.05; }
.url { font-size: 10pt; color: var(--muted); margin-top: 2mm; }
.score { background: var(--ink); color: var(--cream); border-radius: 5mm; padding: 4mm 6mm; text-align: center; min-width: 40mm; display: flex; flex-direction: column; justify-content: center; position: relative; overflow: hidden; }
.score::before { content: ""; position: absolute; right: -10mm; top: -12mm; width: 34mm; height: 34mm; border-radius: 50%; background: radial-gradient(circle, rgba(229,138,92,.35), rgba(229,138,92,0) 70%); }
.score .num { font-size: 38pt; font-weight: 600; letter-spacing: -.04em; line-height: 1; position: relative; }
.score .of { font-size: 11pt; color: #a9a69c; }
.score .lab { display: block; font-size: 8pt; letter-spacing: .2em; text-transform: uppercase; margin-top: 1.5mm; color: var(--orange); font-weight: 600; position: relative; }
.headline { font-size: 12pt; line-height: 1.4; padding: 3.6mm 5mm; background: var(--card); border: 1px solid var(--line); border-left: 1.6mm solid var(--orange); border-radius: 3.5mm; font-weight: 500; }
.cats { display: grid; grid-template-columns: 1fr 1fr; gap: 2.8mm 9mm; background: var(--card); border: 1px solid var(--line); border-radius: 4mm; padding: 4mm 5mm; }
.cat { display: grid; grid-template-columns: 33mm 1fr 8mm; align-items: center; gap: 3mm; font-size: 9pt; }
.bar { height: 2.4mm; background: var(--track); border-radius: 2mm; display: block; overflow: hidden; }
.bar i { display: block; height: 100%; border-radius: 2mm; background: var(--orange); }
.bar i.good { background: var(--good); }
.bar i.bad { background: var(--bad); }
.c-score { text-align: right; font-weight: 600; }
h2 { font-size: 8.5pt; letter-spacing: .2em; text-transform: uppercase; color: var(--muted); margin-bottom: 2.6mm; font-weight: 600; }
.findings { display: flex; flex-direction: column; gap: 3mm; }
.finding { background: var(--card); border: 1px solid var(--line); border-radius: 4mm; padding: 3.8mm 5mm; }
.finding.sev-critical { border-color: var(--bad); box-shadow: 0 0 0 .4mm rgba(196,55,44,.18); }
.f-head { display: flex; align-items: center; gap: 3mm; margin-bottom: 1.6mm; }
.f-no { width: 6.4mm; height: 6.4mm; border-radius: 2mm; background: var(--orange); color: var(--ink); display: grid; place-items: center; font-size: 9pt; font-weight: 700; flex: none; }
.f-head h3 { font-size: 11.5pt; font-weight: 600; flex: 1; line-height: 1.25; letter-spacing: -.01em; }
.chip { font-size: 7pt; letter-spacing: .12em; text-transform: uppercase; padding: .7mm 2.6mm; border-radius: 5mm; flex: none; font-weight: 600; border: 1px solid var(--line); color: var(--muted); }
.chip-critical { background: var(--bad); border-color: var(--bad); color: #fff; }
.chip-high { background: var(--orange); border-color: var(--orange); color: var(--ink); }
.f-meaning { font-size: 9.5pt; line-height: 1.45; color: #3b3a36; }
.f-fix { font-size: 9.5pt; line-height: 1.45; margin-top: 1.6mm; }
.more { font-size: 8.5pt; color: var(--muted); margin-top: 2.2mm; }
.ok ul { list-style: none; display: grid; grid-template-columns: 1fr 1fr; gap: 1.8mm 8mm; font-size: 9pt; }
.ok li { padding-left: 6mm; position: relative; line-height: 1.35; }
.ok li::before { content: ""; position: absolute; left: 0; top: .6mm; width: 3.6mm; height: 3.6mm; border-radius: 50%; background: var(--good); }
.ok li::after { content: ""; position: absolute; left: 1.15mm; top: 1.45mm; width: 1.4mm; height: .8mm; border-left: .5mm solid #fff; border-bottom: .5mm solid #fff; transform: rotate(-45deg); }
.spacer { flex: 1; }
.cta { background: var(--ink); color: var(--cream); border-radius: 5mm; padding: 5.5mm 6.5mm; display: flex; justify-content: space-between; align-items: center; gap: 8mm; }
.cta b { display: block; font-size: 13.5pt; font-weight: 600; letter-spacing: -.02em; margin-bottom: 1.2mm; }
.cta p { font-size: 9pt; color: #b9b5a9; line-height: 1.45; max-width: 95mm; }
.cta .contact { text-align: right; font-size: 9.5pt; line-height: 1.65; color: var(--orange); font-weight: 500; }
.note { font-size: 7pt; color: var(--muted); line-height: 1.4; margin-top: 2.8mm; }
`;

const tone = (score) => (score >= 80 ? "good" : score >= 60 ? "mid" : "bad");
const scoreText = (s) => (s === null ? "—" : s);

export function renderHtml({ name, host, date, result }) {
  const font = loadFont();
  const { overall, label, headline, categories, top, passed, findings } = result;
  const more = Math.max(0, findings.length - top.length);

  const findingHtml = top
    .map(
      (f, i) => `
      <article class="finding sev-${f.severity}">
        <div class="f-head">
          <span class="f-no">${i + 1}</span>
          <h3>${esc(f.title)}</h3>
          <span class="chip chip-${f.severity}">${SEVERITY_LABEL[f.severity]}</span>
        </div>
        <p class="f-meaning">${esc(f.meaning)}</p>
        <p class="f-fix"><b>Biz ne yaparız:</b> ${esc(FIX_BY_ID[f.id] ?? f.fix)}</p>
      </article>`,
    )
    .join("");

  const catHtml = categories
    .map(
      (c) => `
      <div class="cat">
        <span class="c-name">${esc(c.title)}</span>
        <span class="bar"><i class="${tone(c.score ?? 0)}" style="width:${c.score ?? 0}%"></i></span>
        <span class="c-score">${scoreText(c.score)}</span>
      </div>`,
    )
    .join("");

  const passedHtml = passed
    .slice(0, 8)
    .map((t) => `<li>${esc(t)}</li>`)
    .join("");

  return `<!doctype html>
<html lang="tr">
<head>
<meta charset="utf-8">
<title>Site Sağlık Raporu — ${esc(name)}</title>
<style>
${reportCss(font)}
${page2Css}
</style>
</head>
<body>
<main class="page">
  <header>
    <div class="brand">${tile(40)}<span>Ekiz Yazılım</span></div>
    <div class="head-r">Site sağlık raporu<span>${esc(date)}</span></div>
  </header>

  <section class="hero">
    <div>
      <p class="eyebrow">Kontrol edilen site</p>
      <h1>${esc(name)}</h1>
      <p class="url">${esc(host)}</p>
    </div>
    <div class="score">
      <div><span class="num">${overall}</span><span class="of">/100</span></div>
      <span class="lab">${esc(label)}</span>
    </div>
  </section>

  <p class="headline">${esc(headline)}</p>

  <section class="cats">${catHtml}</section>

  ${
    top.length > 0
      ? `<section>
    <h2>Önce bunlara bakın</h2>
    <div class="findings">${findingHtml}</div>
    ${more > 0 ? `<p class="more">+ ${more} küçük başlık daha; görüşmede birlikte bakabiliriz.</p>` : ""}
  </section>`
      : ""
  }

  ${
    passed.length > 0
      ? `<section class="ok">
    <h2>Sorunsuz görünenler</h2>
    <ul>${passedHtml}</ul>
  </section>`
      : ""
  }

  <div class="spacer"></div>

  <section>
    <div class="cta">
      <div>
        <b>Bu konuları sizin için çözelim.</b>
        <p>10 dakikalık bir görüşmeyle başlayalım. Alan adı ve barındırma sizin adınıza kalır; ne ödediğiniz her kalemiyle yazılı olur.</p>
      </div>
      <div class="contact">
        ${esc(CONTACT.phone)}<br>${esc(CONTACT.email)}<br>${esc(CONTACT.web)}
      </div>
    </div>
    <p class="note">Bu rapor, sitenizin herkese açık sayfalarının otomatik kontrolüyle ${esc(date)} tarihinde hazırlanmıştır. Yalnızca ziyaretçilerin de görebildiği bilgiler incelenir; sitenize giriş yapılmaz. Puanlar yaklaşık göstergelerdir.</p>
  </section>
</main>
${page2Html()}
</body>
</html>`;
}
