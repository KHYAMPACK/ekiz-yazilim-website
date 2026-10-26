/**
 * Motion probe: finds sudden jumps in a built scene.
 *   node video/lib/probe.mjs <built-scene.html> <fromSeconds> <toSeconds> <selector> [<selector> ...]
 * Prints, per frame, how far each selector's box moved or resized since the previous frame.
 */
import { createRequire } from "node:module";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { root } from "./core.mjs";

const require = createRequire(path.join(root, "package.json"));
const puppeteer = require("puppeteer");
const [html, from, to, ...selectors] = process.argv.slice(2);
const FPS = 30;

const browser = await puppeteer.launch({
  headless: true,
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  args: ["--no-sandbox"],
});
const page = await browser.newPage();
await page.setViewport({ width: 1080, height: 1920 });
await page.goto(pathToFileURL(path.resolve(html)).href, { waitUntil: "load" });
await page.evaluate(() => document.fonts.ready);

let prev = null;
for (let i = Math.round(from * FPS); i <= Math.round(to * FPS); i++) {
  const t = i / FPS;
  const boxes = await page.evaluate(
    (t, sels) => {
      window.draw(t);
      return sels.map((s) => {
        const el = document.querySelector(s);
        if (!el) return null;
        const r = el.getBoundingClientRect();
        return [r.x, r.y, r.width, r.height, Number(getComputedStyle(el).opacity)];
      });
    },
    t,
    selectors,
  );
  if (prev) {
    const row = boxes.map((b, k) => {
      const p = prev[k];
      if (!b || !p) return "-";
      const d = Math.max(Math.abs(b[0] - p[0]), Math.abs(b[1] - p[1]), Math.abs(b[2] - p[2]), Math.abs(b[3] - p[3]));
      const o = Math.abs(b[4] - p[4]);
      return `${d.toFixed(1)}px/${o.toFixed(2)}`;
    });
    console.log(t.toFixed(2).padStart(5), row.join("  "));
  }
  prev = boxes;
}
await browser.close();
