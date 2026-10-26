/** One-page A4 report as a self-contained HTML string (font and logo embedded). */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { SEVERITY_LABEL } from "./score.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");

export const CONTACT = {
  phone: "+90 551 599 81 56",
  email: "ekizmert3@gmail.com",
  web: "ekizyazilim.com",
};

const esc = (s) =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

let assets;
function loadAssets() {
  if (assets) return assets;
  const font = fs
    .readFileSync(path.join(root, "brand", "exports", "fonts", "SpaceGrotesk.ttf"))
    .toString("base64");
  const logo = fs
    .readFileSync(path.join(root, "brand", "exports", "ekiz-logo-horizontal-black.svg"), "utf8")
    .replace(/<\?xml[^>]*\?>/, "");
  assets = { font, logo };
  return assets;
}

const tone = (score) => (score >= 80 ? "good" : score >= 60 ? "mid" : "bad");
const scoreText = (s) => (s === null ? "—" : s);

export function renderHtml({ name, host, date, result }) {
  const { font, logo } = loadAssets();
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
        <p class="f-fix"><b>Ne yapılmalı:</b> ${esc(f.fix)}</p>
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
@font-face { font-family: "Space Grotesk"; src: url(data:font/ttf;base64,${font}) format("truetype"); font-weight: 300 700; }
@page { size: A4; margin: 0; }
* { box-sizing: border-box; margin: 0; padding: 0; }
html, body { background: #fff; }
body { font-family: "Space Grotesk", system-ui, sans-serif; color: #000; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
.page { width: 210mm; height: 297mm; padding: 14mm 15mm 12mm; display: flex; flex-direction: column; gap: 5.5mm; overflow: hidden; }
header { display: flex; justify-content: space-between; align-items: center; padding-bottom: 4mm; border-bottom: 1.5px solid #000; }
header svg { height: 11mm; width: auto; display: block; }
.head-r { text-align: right; font-size: 8.5pt; letter-spacing: .16em; text-transform: uppercase; line-height: 1.5; }
.head-r span { display: block; color: rgba(0,0,0,.55); letter-spacing: .06em; text-transform: none; }
.hero { display: flex; justify-content: space-between; align-items: flex-end; gap: 8mm; }
.eyebrow { font-size: 7.5pt; letter-spacing: .2em; text-transform: uppercase; color: rgba(0,0,0,.5); margin-bottom: 1.5mm; }
h1 { font-size: 24pt; font-weight: 500; letter-spacing: -.02em; line-height: 1.1; }
.url { font-size: 10pt; color: rgba(0,0,0,.6); margin-top: 1.5mm; }
.score { border: 1.5px solid #000; padding: 3.5mm 5mm; text-align: center; min-width: 38mm; background: #bfd5eb; }
.score .num { font-size: 38pt; font-weight: 500; letter-spacing: -.03em; line-height: 1; }
.score .of { font-size: 11pt; color: rgba(0,0,0,.6); }
.score .lab { display: block; font-size: 8pt; letter-spacing: .18em; text-transform: uppercase; margin-top: 1mm; }
.headline { font-size: 12pt; line-height: 1.4; padding: 3.5mm 4mm; border-left: 3px solid #000; background: rgba(191,213,235,.35); }
.cats { display: grid; grid-template-columns: 1fr 1fr; gap: 2.5mm 8mm; }
.cat { display: grid; grid-template-columns: 34mm 1fr 8mm; align-items: center; gap: 3mm; font-size: 9pt; }
.bar { height: 2.6mm; background: rgba(191,213,235,.6); display: block; }
.bar i { display: block; height: 100%; background: #000; }
.bar i.mid { background: #000; opacity: .72; }
.bar i.bad { background: #000; }
.c-score { text-align: right; font-weight: 600; }
h2 { font-size: 9pt; letter-spacing: .2em; text-transform: uppercase; color: rgba(0,0,0,.55); margin-bottom: 2.5mm; font-weight: 500; }
.findings { display: flex; flex-direction: column; gap: 2.8mm; }
.finding { border: 1px solid #000; padding: 3.5mm 4.5mm; }
.finding.sev-critical { border-width: 2px; }
.f-head { display: flex; align-items: center; gap: 3mm; margin-bottom: 1.5mm; }
.f-no { width: 6mm; height: 6mm; background: #000; color: #fff; display: grid; place-items: center; font-size: 9pt; font-weight: 600; flex: none; }
.f-head h3 { font-size: 11.5pt; font-weight: 600; flex: 1; line-height: 1.25; }
.chip { font-size: 7.5pt; letter-spacing: .12em; text-transform: uppercase; padding: .6mm 2.2mm; border: 1px solid #000; flex: none; }
.chip-critical { background: #000; color: #fff; }
.chip-high { background: #bfd5eb; }
.chip-medium, .chip-low { background: #fff; }
.f-meaning { font-size: 9.5pt; line-height: 1.45; color: rgba(0,0,0,.75); }
.f-fix { font-size: 9.5pt; line-height: 1.45; margin-top: 1.5mm; }
.more { font-size: 8.5pt; color: rgba(0,0,0,.55); margin-top: 2mm; }
.ok ul { list-style: none; display: grid; grid-template-columns: 1fr 1fr; gap: 1.5mm 8mm; font-size: 9pt; }
.ok li { padding-left: 5mm; position: relative; line-height: 1.35; }
.ok li::before { content: ""; position: absolute; left: 0; top: 1.2mm; width: 2.4mm; height: 2.4mm; background: #000; }
.spacer { flex: 1; }
.cta { background: #000; color: #fff; padding: 5mm 6mm; display: flex; justify-content: space-between; align-items: center; gap: 8mm; }
.cta b { display: block; font-size: 13pt; font-weight: 500; letter-spacing: -.01em; margin-bottom: 1mm; }
.cta p { font-size: 9pt; color: rgba(255,255,255,.7); line-height: 1.4; max-width: 95mm; }
.cta .contact { text-align: right; font-size: 9.5pt; line-height: 1.6; }
.note { font-size: 7pt; color: rgba(0,0,0,.45); line-height: 1.4; margin-top: 2.5mm; }
</style>
</head>
<body>
<main class="page">
  <header>
    ${logo}
    <div class="head-r">Site sağlık raporu<span>${esc(date)}</span></div>
  </header>

  <section class="hero">
    <div>
      <p class="eyebrow">Kontrol edilen site</p>
      <h1>${esc(name)}</h1>
      <p class="url">${esc(host)}</p>
    </div>
    <div class="score">
      <span class="num">${overall}</span><span class="of">/100</span>
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
        <b>Bu konuları sizin için düzeltebiliriz.</b>
        <p>Alan adı ve barındırma sizin adınıza kalır; ne ödediğiniz her kalemiyle yazılı olur.</p>
      </div>
      <div class="contact">
        ${esc(CONTACT.phone)}<br>${esc(CONTACT.email)}<br>${esc(CONTACT.web)}
      </div>
    </div>
    <p class="note">Bu rapor, sitenizin herkese açık sayfalarının otomatik kontrolüyle ${esc(date)} tarihinde hazırlanmıştır. Yalnızca ziyaretçilerin de görebildiği bilgiler incelenir; sitenize giriş yapılmaz. Puanlar yaklaşık göstergelerdir.</p>
  </section>
</main>
</body>
</html>`;
}
