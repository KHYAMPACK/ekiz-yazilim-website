/**
 * Build one section of the reel:  node video/reels/siteniz-kapanacak/build.mjs hook
 * Output: video/out/siteniz-kapanacak/<section>.mp4 (git-ignored)
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { duration, encode, ffmpeg, renderFrames, videoDir, voiceScript } from "../../lib/core.mjs";

const here = path.dirname(fileURLToPath(import.meta.url));
const reel = JSON.parse(fs.readFileSync(path.join(here, "reel.json"), "utf8"));
const out = path.join(videoDir, "out", "siteniz-kapanacak");
fs.mkdirSync(out, { recursive: true });
const FPS = 30;

async function speak(key) {
  return voiceScript({
    text: reel.lines[key],
    voiceId: reel.voice.id,
    model: reel.voice.model,
    speed: reel.voice.speed,
    tempo: reel.voice.tempo,
    gap: reel.voice.gap,
    cacheDir: path.join(videoDir, "out", "voice"),
  });
}

// ---------- section 1: the hook ----------
async function hook() {
  const v = await speak("hook");
  const voiceStart = 1.45;                       // after both slams have landed
  const seconds = +(voiceStart + v.seconds + 0.4).toFixed(2);
  console.log(`voice ${v.seconds.toFixed(2)}s (${v.cached ? "cached" : "new"}), section ${seconds}s`);

  await renderFrames({
    html: path.join(here, "01-hook.html"),
    timing: { voiceStart, duration: seconds },
    seconds,
    fps: FPS,
    outDir: path.join(out, "hook-frames"),
  });

  // Sound: riser into the two slams, then only the voice. No other effects after the intro.
  const ms = (s) => Math.round(s * 1000);
  const d = String(seconds);
  const sfx = path.join(out, "hook-sfx.wav");
  ffmpeg([
    "-f", "lavfi", "-i", "anoisesrc=d=0.38:c=pink:r=44100:a=0.5",   // 0 riser
    "-f", "lavfi", "-i", "sine=f=46:d=0.9:r=44100",                  // 1 boom 1
    "-f", "lavfi", "-i", "sine=f=96:d=0.5:r=44100",                  // 2 body 1
    "-f", "lavfi", "-i", "anoisesrc=d=0.14:c=white:r=44100:a=0.6",   // 3 crack 1
    "-f", "lavfi", "-i", "sine=f=38:d=1.2:r=44100",                  // 4 boom 2
    "-f", "lavfi", "-i", "sine=f=82:d=0.7:r=44100",                  // 5 body 2
    "-f", "lavfi", "-i", "anoisesrc=d=0.22:c=white:r=44100:a=0.7",   // 6 crack 2
    "-filter_complex",
    "[0]highpass=f=500,afade=t=in:d=0.34,afade=t=out:st=0.34:d=0.04,volume=0.9[ris];" +
    "[1]afade=t=out:st=0.04:d=0.85,volume=2.4,adelay=350|350[b1];" +
    "[2]afade=t=out:st=0.02:d=0.45,volume=1.1,adelay=350|350[y1];" +
    "[3]lowpass=f=1800,afade=t=out:st=0.01:d=0.13,volume=0.8,adelay=350|350[c1];" +
    "[4]afade=t=out:st=0.05:d=1.1,volume=3.0,adelay=620|620[b2];" +
    "[5]afade=t=out:st=0.02:d=0.65,volume=1.4,adelay=620|620[y2];" +
    "[6]lowpass=f=3000,afade=t=out:st=0.01:d=0.2,volume=1.0,adelay=620|620[c2];" +
    `[ris][b1][y1][c1][b2][y2][c2]amix=inputs=7:normalize=0,apad=whole_dur=${d},atrim=0:${d}[out]`,
    "-map", "[out]", sfx,
  ]);

  const mix = path.join(out, "hook-audio.wav");
  const vd = ms(voiceStart);
  ffmpeg([
    "-i", sfx, "-i", v.file,
    "-filter_complex",
    `[0]volume=0.8[s];[1]volume=1.35,adelay=${vd}|${vd}[v];[s][v]amix=inputs=2:normalize=0,alimiter=limit=0.95,atrim=0:${d}[out]`,
    "-map", "[out]", mix,
  ]);

  encode({ framesDir: path.join(out, "hook-frames"), audio: mix, out: path.join(out, "01-hook.mp4"), fps: FPS });
  console.log("wrote", path.join(out, "01-hook.mp4"), "length", duration(path.join(out, "01-hook.mp4")).toFixed(2) + "s");
}

// ---------- section 2: the threat ----------
async function threat() {
  const v = await speak("threat");
  const voiceStart = 0.7;                        // the message card has landed
  const seconds = +(voiceStart + v.seconds + 0.5).toFixed(2);
  const words = v.words.map((w) => ({ ...w, start: +(w.start + voiceStart).toFixed(3), end: +(w.end + voiceStart).toFixed(3) }));
  console.log(`voice ${v.seconds.toFixed(2)}s (${v.cached ? "cached" : "new"}), section ${seconds}s, ${words.length} words`);

  await renderFrames({
    html: path.join(here, "02-threat.html"),
    timing: { voiceStart, duration: seconds, words },
    seconds,
    fps: FPS,
    outDir: path.join(out, "threat-frames"),
  });

  // Sound: voice only. Sound effects are kept to the hook's slams.
  const ms = (s) => Math.round(s * 1000);
  const d = String(seconds);
  const mix = path.join(out, "threat-audio.wav");
  const vd = ms(voiceStart);
  ffmpeg([
    "-i", v.file,
    "-filter_complex",
    `[0]volume=1.35,adelay=${vd}|${vd},alimiter=limit=0.95,apad=whole_dur=${d},atrim=0:${d}[out]`,
    "-map", "[out]", mix,
  ]);

  encode({ framesDir: path.join(out, "threat-frames"), audio: mix, out: path.join(out, "02-threat.mp4"), fps: FPS });
  console.log("wrote", path.join(out, "02-threat.mp4"), "length", duration(path.join(out, "02-threat.mp4")).toFixed(2) + "s");
}

const sections = { hook, threat };
const name = process.argv[2] ?? "hook";
if (!sections[name]) {
  console.error(`unknown section "${name}". Available: ${Object.keys(sections).join(", ")}`);
  process.exit(1);
}
await sections[name]();
