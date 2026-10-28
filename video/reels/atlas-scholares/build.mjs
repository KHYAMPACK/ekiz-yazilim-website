/**
 * Carousel slide 1 for Atlas x Scholares (1080x1350, 10 s, silent-safe sound design).
 *   node video/reels/atlas-scholares/build.mjs            -> video/out/atlas-scholares/01-intro.mp4
 *   node video/reels/atlas-scholares/build.mjs --preview  -> also writes a contact sheet of key frames
 *
 * To use the real Atlas logo drop a PNG/SVG at video/assets/atlas-logo.png (transparent background).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { duration, encode, ffmpeg, renderFrames, videoDir } from "../../lib/core.mjs";

const here = path.dirname(fileURLToPath(import.meta.url));
const out = path.join(videoDir, "out", "atlas-scholares");
fs.mkdirSync(out, { recursive: true });
const VARIANTS = {
  lgs: "LGS HAZIRLIK KURSU",
  etut: "ETÜT MERKEZLERİ",
};
const variant = (process.argv.find((a) => a.startsWith("--audience=")) ?? "--audience=lgs").split("=")[1];
if (!VARIANTS[variant]) throw new Error("--audience must be one of: " + Object.keys(VARIANTS).join(", "));
const SECONDS = 10;
const FPS = 30;

// ---------- scene html with the Atlas logo (if any) ----------
const logoFile = ["atlas-logo.png", "atlas-logo.jpg", "atlas-logo.webp"]
  .map((f) => path.join(videoDir, "assets", f))
  .find((f) => fs.existsSync(f));
const mime = logoFile?.endsWith(".jpg") ? "image/jpeg" : logoFile?.endsWith(".webp") ? "image/webp" : "image/png";
const pixel = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
const src = fs
  .readFileSync(path.join(here, "01-intro.html"), "utf8")
  .replace("__HAS_ATLAS__", String(Boolean(logoFile)))
  .replace("__AUDIENCE__", VARIANTS[variant])
  .replace("__ATLAS_SRC__", () => (logoFile ? `data:${mime};base64,${fs.readFileSync(logoFile).toString("base64")}` : pixel));
const built = path.join(out, `scene-src-${variant}.html`);
fs.writeFileSync(built, src);
console.log(logoFile ? `Atlas logo: ${logoFile}` : "Atlas logo: placeholder (add video/assets/atlas-logo.png)");

// ---------- sound design ----------
// Every cue: when (s), what, how loud. Kept soft: it is a carousel clip, most people watch muted.
const cues = [
  // hook lines
  { at: 0.12, noise: "white", d: 0.22, hp: 2500, lp: 9000, vol: 0.25 },
  { at: 0.52, noise: "white", d: 0.22, hp: 2500, lp: 9000, vol: 0.25 },
  { at: 0.92, noise: "white", d: 0.22, hp: 2500, lp: 9000, vol: 0.25 },
  // riser into the iris, then boom
  { at: 1.75, noise: "pink", d: 0.7, hp: 400, rise: true, vol: 0.5 },
  { at: 2.3, sine: 52, d: 0.9, vol: 1.6 },
  { at: 2.3, noise: "white", d: 0.16, lp: 2500, vol: 0.5 },
  // logos fly in
  { at: 2.85, noise: "pink", d: 0.6, hp: 900, lp: 6000, vol: 0.35 },
  // logos meet: chime + sub
  { at: 3.58, sine: 784, d: 0.9, vol: 0.5 },
  { at: 3.66, sine: 1175, d: 0.9, vol: 0.38 },
  { at: 3.58, sine: 65, d: 0.6, vol: 1.1 },
  // morph swoosh
  { at: 4.3, noise: "pink", d: 0.85, hp: 500, lp: 7000, vol: 0.4 },
  { at: 5.05, sine: 330, d: 0.25, vol: 0.25 },
  // satellite cards
  { at: 5.0, noise: "white", d: 0.3, hp: 1800, lp: 8000, vol: 0.22 },
  { at: 5.8, noise: "white", d: 0.3, hp: 1800, lp: 8000, vol: 0.22 },
  // notification pings
  ...[5.78, 6.88, 7.78].flatMap((t) => [
    { at: t, sine: 1319, d: 0.5, vol: 0.55 },
    { at: t + 0.11, sine: 1760, d: 0.6, vol: 0.45 },
  ]),
  // attendance ticks
  ...[0, 1, 2, 3, 4].map((i) => ({ at: 7.4 + i * 0.13, sine: 1500 + i * 120, d: 0.08, vol: 0.28 })),
  // CTA pop
  { at: 8.85, sine: 660, d: 0.2, vol: 0.4 },
  { at: 8.85, noise: "white", d: 0.08, hp: 3000, vol: 0.2 },
];

function buildAudio(variant) {
  const inputs = [];
  const chains = [];
  cues.forEach((c, i) => {
    const d = c.d;
    if (c.sine) inputs.push("-f", "lavfi", "-i", `sine=f=${c.sine}:d=${d}:r=44100`);
    else inputs.push("-f", "lavfi", "-i", `anoisesrc=d=${d}:c=${c.noise}:r=44100:a=0.8`);
    const f = [];
    if (c.hp) f.push(`highpass=f=${c.hp}`);
    if (c.lp) f.push(`lowpass=f=${c.lp}`);
    if (c.rise) f.push(`afade=t=in:st=0:d=${(d * 0.92).toFixed(2)}`, `afade=t=out:st=${(d * 0.92).toFixed(2)}:d=${(d * 0.08).toFixed(2)}`);
    else f.push(`afade=t=in:st=0:d=0.005`, `afade=t=out:st=${(d * 0.12).toFixed(3)}:d=${(d * 0.88).toFixed(3)}`);
    f.push(`volume=${c.vol}`, `adelay=${Math.round(c.at * 1000)}|${Math.round(c.at * 1000)}`);
    chains.push(`[${i}]${f.join(",")}[a${i}]`);
  });
  const mixIn = cues.map((_, i) => `[a${i}]`).join("");
  const file = path.join(out, `intro-audio-${variant}.wav`);
  ffmpeg([
    ...inputs,
    "-filter_complex",
    `${chains.join(";")};${mixIn}amix=inputs=${cues.length}:normalize=0,alimiter=limit=0.9,apad=whole_dur=${SECONDS},atrim=0:${SECONDS},afade=t=out:st=${SECONDS - 0.4}:d=0.4[out]`,
    "-map", "[out]", file,
  ]);
  return file;
}

await renderFrames({
  html: built,
  timing: {},
  seconds: SECONDS,
  fps: FPS,
  width: 1080,
  height: 1350,
  outDir: path.join(out, `intro-frames-${variant}`),
});
const audio = buildAudio(variant);
const mp4 = path.join(out, `01-intro-${variant}.mp4`);
encode({ framesDir: path.join(out, `intro-frames-${variant}`), audio, out: mp4, fps: FPS });
console.log("wrote", mp4, duration(mp4).toFixed(2) + "s");

// contact sheet of key moments so the animation can be reviewed without playing it
if (process.argv.includes("--preview")) {
  const picks = [0.7, 1.6, 2.4, 3.3, 3.9, 4.7, 5.6, 6.6, 7.6, 9.4];
  const list = picks.map((s) => path.join(out, `intro-frames-${variant}`, `f_${String(Math.round(s * FPS)).padStart(4, "0")}.png`));
  const sheet = path.join(out, `intro-contact-${variant}.png`);
  ffmpeg([
    ...list.flatMap((f) => ["-i", f]),
    "-filter_complex",
    `${list.map((_, i) => `[${i}]scale=432:-1[s${i}]`).join(";")};${list.map((_, i) => `[s${i}]`).join("")}xstack=inputs=${list.length}:layout=${list.map((_, i) => `${(i % 5) * 432}_${Math.floor(i / 5) * 540}`).join("|")}`,
    "-frames:v", "1", sheet,
  ]);
  console.log("contact sheet", sheet);
}
