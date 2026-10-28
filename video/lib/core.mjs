/**
 * Shared helpers for the reel builder: paths, ffmpeg, ElevenLabs voice lines, frame rendering.
 * Nothing here is specific to one reel.
 */
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { execFileSync } from "node:child_process";
import { fileURLToPath, pathToFileURL } from "node:url";

export const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
export const videoDir = path.join(root, "video");
const require = createRequire(path.join(root, "package.json"));

// ---------- ffmpeg ----------
export function ffmpeg(args) {
  execFileSync("ffmpeg", ["-y", "-hide_banner", "-loglevel", "error", ...args], { stdio: "inherit" });
}

export function duration(file) {
  return Number(
    execFileSync("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", file]).toString().trim(),
  );
}

// ---------- ElevenLabs ----------
function elevenKey() {
  if (process.env.ELEVEN_LABS_API_KEY) return process.env.ELEVEN_LABS_API_KEY.trim();
  for (const f of [".env.local", ".env"]) {
    const p = path.join(root, f);
    if (!fs.existsSync(p)) continue;
    const m = fs.readFileSync(p, "utf8").match(/^\s*ELEVEN_?LABS?_API_KEY\s*=\s*(.+?)\s*$/im);
    if (m) return m[1].replace(/^["']|["']$/g, "");
  }
  throw new Error("ELEVEN_LABS_API_KEY not found in the environment or .env.local");
}

/** Character-level alignment from ElevenLabs -> [{ text, start, end }] per word, in seconds. */
function wordsFromAlignment(a) {
  const words = [];
  let cur = null;
  a.characters.forEach((ch, i) => {
    if (/\s/.test(ch)) {
      if (cur) words.push(cur);
      cur = null;
      return;
    }
    if (!cur) cur = { text: "", start: a.character_start_times_seconds[i], end: 0 };
    cur.text += ch;
    cur.end = a.character_end_times_seconds[i];
  });
  if (cur) words.push(cur);
  return words;
}

/**
 * One voice line -> mp3 plus word timings. Cached by text + voice + settings, so unchanged lines cost nothing.
 * Returns { file, seconds, words, cached }.
 */
export async function voiceLine({ text, voiceId, settings = {}, model = "eleven_multilingual_v2", cacheDir }) {
  fs.mkdirSync(cacheDir, { recursive: true });
  const body = {
    text,
    model_id: model,
    language_code: "tr",
    voice_settings: { stability: 0.5, similarity_boost: 0.8, style: 0.15, use_speaker_boost: true, speed: 1.0, ...settings },
  };
  const hash = crypto.createHash("sha1").update(JSON.stringify([voiceId, body])).digest("hex").slice(0, 10);
  const file = path.join(cacheDir, `${hash}.mp3`);
  const meta = path.join(cacheDir, `${hash}.json`);
  if (fs.existsSync(file) && fs.existsSync(meta)) {
    return { file, seconds: duration(file), words: JSON.parse(fs.readFileSync(meta, "utf8")), cached: true };
  }

  const key = elevenKey();
  const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}/with-timestamps?output_format=mp3_44100_128`, {
    method: "POST",
    headers: { "xi-api-key": key, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`ElevenLabs ${res.status}: ${(await res.text()).replace(key, "[key]").slice(0, 200)}`);
  const data = await res.json();
  fs.writeFileSync(file, Buffer.from(data.audio_base64, "base64"));
  const words = wordsFromAlignment(data.alignment ?? data.normalized_alignment);
  fs.writeFileSync(meta, JSON.stringify(words));
  return { file, seconds: duration(file), words, cached: false };
}

/**
 * A whole voiceover (one or more sentences) -> one mp3 with word timings.
 * Each sentence is generated on its own (cached), sped up with `tempo` (pitch-preserving), and joined with a
 * fixed short `gap` of silence, so pauses stay tight and caption timing stays exact.
 */
export async function voiceScript({ text, voiceId, model, speed = 1.0, tempo = 1.0, gap = 0.18, cacheDir }) {
  const parts = text.match(/[^.?!]+[.?!]+/g)?.map((x) => x.trim()) ?? [text.trim()];
  const lines = [];
  for (const p of parts) lines.push(await voiceLine({ text: p, voiceId, model, settings: { speed }, cacheDir }));

  const key = crypto
    .createHash("sha1")
    .update(JSON.stringify([lines.map((l) => path.basename(l.file)), tempo, gap]))
    .digest("hex")
    .slice(0, 10);
  const file = path.join(cacheDir, `script-${key}.mp3`);
  const meta = path.join(cacheDir, `script-${key}.json`);
  if (fs.existsSync(file) && fs.existsSync(meta)) {
    return { file, seconds: duration(file), words: JSON.parse(fs.readFileSync(meta, "utf8")), cached: lines.every((l) => l.cached) };
  }

  const sped = [];
  for (const l of lines) {
    const out = l.file.replace(/\.mp3$/, `-t${tempo}.mp3`);
    if (!fs.existsSync(out)) ffmpeg(["-i", l.file, "-filter:a", `atempo=${tempo}`, "-b:a", "128k", out]);
    sped.push(out);
  }
  const silence = path.join(cacheDir, `gap-${gap}.mp3`);
  if (!fs.existsSync(silence)) ffmpeg(["-f", "lavfi", "-i", "anullsrc=r=44100:cl=mono", "-t", String(gap), "-b:a", "128k", silence]);

  const list = [];
  const words = [];
  let offset = 0;
  sped.forEach((f, i) => {
    list.push(`file '${f.split(path.sep).join("/")}'`);
    lines[i].words.forEach((w) => words.push({ text: w.text, start: +(offset + w.start / tempo).toFixed(3), end: +(offset + w.end / tempo).toFixed(3) }));
    offset += duration(f);
    if (i < sped.length - 1) {
      list.push(`file '${silence.split(path.sep).join("/")}'`);
      offset += gap;
    }
  });
  const listFile = path.join(cacheDir, `list-${key}.txt`);
  fs.writeFileSync(listFile, list.join("\n"));
  ffmpeg(["-f", "concat", "-safe", "0", "-i", listFile, "-ar", "44100", "-b:a", "128k", file]);
  fs.writeFileSync(meta, JSON.stringify(words));
  return { file, seconds: duration(file), words, cached: false };
}

// ---------- frames ----------
const fontDataUrl = () =>
  "data:font/ttf;base64," + fs.readFileSync(path.join(root, "brand", "exports", "fonts", "SpaceGrotesk.ttf")).toString("base64");
const markInner = () =>
  fs
    .readFileSync(path.join(root, "brand", "exports", "ekiz-mark.svg"), "utf8")
    .replace(/<svg[^>]*>/, "")
    .replace(/<\/svg>\s*$/, "")
    .replace(/<!--[\s\S]*?-->/g, "");

function findChrome() {
  const pf = process.env["ProgramFiles"] ?? "C:\\Program Files";
  const pf86 = process.env["ProgramFiles(x86)"] ?? "C:\\Program Files (x86)";
  return [
    process.env.CHROME_PATH,
    path.join(pf, "Google", "Chrome", "Application", "chrome.exe"),
    path.join(pf86, "Google", "Chrome", "Application", "chrome.exe"),
    path.join(pf86, "Microsoft", "Edge", "Application", "msedge.exe"),
    "/usr/bin/google-chrome",
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  ].find((p) => p && fs.existsSync(p));
}

/**
 * Renders a scene to PNG frames. The scene HTML must define window.draw(t) (t in seconds).
 * Placeholders in the HTML: __FONT__, __MARK__, __TIMING__ (a JSON object with the section's timing).
 */
export async function renderFrames({ html, timing, seconds, fps = 30, width = 1080, height = 1920, outDir }) {
  const puppeteer = require("puppeteer");
  fs.rmSync(outDir, { recursive: true, force: true });
  fs.mkdirSync(outDir, { recursive: true });
  const built = path.join(outDir, "..", `${path.basename(outDir)}.html`);
  fs.writeFileSync(
    built,
    fs
      .readFileSync(html, "utf8")
      .replace("__FONT__", fontDataUrl())
      .replaceAll("__MARK__", markInner())
      .replace("__TIMING__", JSON.stringify(timing ?? {}))
      .replace("__CAPTIONS__", () => fs.readFileSync(path.join(videoDir, "lib", "captions.js"), "utf8")),
  );
  const browser = await puppeteer.launch({ headless: true, executablePath: findChrome(), args: ["--no-sandbox"] });
  try {
    const page = await browser.newPage();
    await page.setViewport({ width, height, deviceScaleFactor: 1 });
    await page.goto(pathToFileURL(built).href, { waitUntil: "load" });
    await page.evaluate(() => document.fonts.ready);
    const n = Math.round(fps * seconds);
    for (let i = 0; i < n; i++) {
      await page.evaluate((t) => window.draw(t), i / fps);
      await page.screenshot({ path: path.join(outDir, `f_${String(i).padStart(4, "0")}.png`) });
    }
  } finally {
    await browser.close();
  }
}

/** Frames + audio -> mp4 in Instagram's format (H.264, AAC, 9:16). */
export function encode({ framesDir, audio, out, fps = 30 }) {
  ffmpeg([
    "-framerate", String(fps), "-i", path.join(framesDir, "f_%04d.png"),
    "-i", audio,
    "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "17", "-preset", "medium",
    "-c:a", "aac", "-b:a", "160k", "-shortest", "-movflags", "+faststart",
    out,
  ]);
}
