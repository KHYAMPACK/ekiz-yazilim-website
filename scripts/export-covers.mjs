/**
 * Social cover images (Google Business 16:9, Facebook 820x312 @2x).
 * Usage: node scripts/export-covers.mjs
 */
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { launch } from "puppeteer";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const fontUrl = `data:font/ttf;base64,${(
  await readFile(path.join(root, "brand/exports/fonts/SpaceGrotesk.ttf"))
).toString("base64")}`;
const CORE =
  "M29.9 12H73.7L84.6 30.8H40.8L51.7 50L40.8 69.1H84.6L73.7 87.9H29.9L19 69.1L29.9 50L19 30.8L29.9 12Z";

/** s = scale unit (px per design unit) so one layout serves both sizes. */
function html(w, h, s, safePad) {
  return `<!doctype html><meta charset="utf-8"><style>
@font-face{font-family:SG;src:url("${fontUrl}");font-weight:300 700}
*{box-sizing:border-box;margin:0}
body{width:${w}px;height:${h}px;background:#121211;color:#f3f0e8;font-family:SG,sans-serif;position:relative;overflow:hidden}
.glow{position:absolute;inset:0;background:radial-gradient(60% 90% at 22% 50%,rgba(229,138,92,.22),transparent 70%),radial-gradient(40% 70% at 95% 10%,rgba(229,138,92,.10),transparent 70%)}
.grid{position:absolute;inset:0;background-image:linear-gradient(to right,rgba(243,240,232,.05) 1px,transparent 1px),linear-gradient(to bottom,rgba(243,240,232,.05) 1px,transparent 1px);background-size:${48 * s}px ${48 * s}px;-webkit-mask-image:linear-gradient(90deg,#000,transparent 85%)}
.wrap{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;padding:0 ${safePad}px;gap:${44 * s}px}
.tile{width:${150 * s}px;height:${150 * s}px;flex:none}
h1{font-size:${64 * s}px;font-weight:600;letter-spacing:-.03em;line-height:1}
h1 span{color:#a9a69c;font-weight:400}
.rule{width:${64 * s}px;height:${3 * s}px;background:#e58a5c;margin:${22 * s}px 0 ${20 * s}px;border-radius:2px}
p{font-size:${28 * s}px;line-height:1.35;color:#c9c5ba}
p b{color:#e58a5c;font-weight:500}
</style><div class="glow"></div><div class="grid"></div>
<div class="wrap">
<svg class="tile" viewBox="0 0 100 100"><rect width="100" height="100" rx="26" fill="#e58a5c"/><path transform="translate(50 50) scale(.58) translate(-51.8 -50)" fill="#141413" d="${CORE}"/></svg>
<div><h1>Ekiz <span>Yazılım</span></h1><div class="rule"></div>
<p>Eğitim kurumları için <b>web sitesi</b><br>ve öğrenci takip sistemi</p></div></div>`;
}

const JOBS = [
  // Google Business: 16:9, min 720x540. Centered group.
  { out: "brand/exports/png/ekiz-cover-google-1080x608.png", w: 1080, h: 608, s: 1, pad: 120 },
  // Facebook: 820x312 shown on desktop; mobile crops sides, so keep content central. Rendered @2x.
  { out: "brand/exports/png/ekiz-cover-facebook-1640x624.png", w: 1640, h: 624, s: 1.02, pad: 340 },
];

const browser = await launch({
  headless: true,
  executablePath: process.env.CHROME_PATH || "C:/Program Files/Google/Chrome/Application/chrome.exe",
  args: ["--no-sandbox"],
});
try {
  for (const j of JOBS) {
    const page = await browser.newPage();
    await page.setViewport({ width: j.w, height: j.h, deviceScaleFactor: 1 });
    await page.setContent(html(j.w, j.h, j.s, j.pad), { waitUntil: "networkidle0" });
    await page.evaluate(() => document.fonts.ready);
    const png = await page.screenshot({ type: "png" });
    await writeFile(path.join(root, j.out), png);
    console.log("OK", j.out);
  }
} finally {
  await browser.close();
}
