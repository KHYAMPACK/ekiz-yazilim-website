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

// ---------- section 3: the fear ----------
async function fear() {
  const v = await speak("fear");
  const voiceStart = 0.5;                        // the payment panel is in
  const seconds = +(voiceStart + v.seconds + 0.55).toFixed(2);
  const words = v.words.map((w) => ({ ...w, start: +(w.start + voiceStart).toFixed(3), end: +(w.end + voiceStart).toFixed(3) }));
  console.log(`voice ${v.seconds.toFixed(2)}s (${v.cached ? "cached" : "new"}), section ${seconds}s, ${words.length} words`);

  await renderFrames({
    html: path.join(here, "03-fear.html"),
    timing: { voiceStart, duration: seconds, words },
    seconds,
    fps: FPS,
    outDir: path.join(out, "fear-frames"),
  });

  // Sound: a heartbeat in sync with the red glow (same beat times as 03-fear.html: lub-dub every 0.85 s from
  // "korktu"), plus a low rumble that swells in with the glow. Then the voice on top.
  const d = String(seconds);
  const ms = (s) => Math.round(s * 1000);
  const korktu = words.find((w) => /^korktu/i.test(w.text)) ?? { start: voiceStart + 0.4 };
  const beats = [];
  for (let t0 = korktu.start; t0 < seconds; t0 += 0.85) {
    beats.push({ at: t0 + 0.06, vol: 1.0 });            // lub (lands as the swell peaks)
    if (t0 + 0.34 < seconds) beats.push({ at: t0 + 0.34, vol: 0.7 }); // dub
  }
  const sfx = path.join(out, "fear-sfx.wav");
  const n = beats.length;
  ffmpeg([
    "-f", "lavfi", "-i", "sine=f=50:d=0.32:r=44100",                    // 0 heartbeat low thump
    "-f", "lavfi", "-i", "sine=f=92:d=0.16:r=44100",                    // 1 thump body (audible on phones)
    "-f", "lavfi", "-i", `anoisesrc=d=${d}:c=brown:r=44100:a=0.9`,       // 2 rumble
    "-filter_complex",
    "[0]afade=t=in:d=0.012,afade=t=out:st=0.03:d=0.29,volume=3.2[lo];" +
    "[1]afade=t=in:d=0.008,afade=t=out:st=0.02:d=0.14,volume=1.3[hi];" +
    `[lo][hi]amix=inputs=2:normalize=0,asplit=${n}${beats.map((_, i) => `[s${i}]`).join("")};` +
    beats.map((b, i) => `[s${i}]volume=${b.vol},adelay=${ms(b.at)}|${ms(b.at)}[b${i}];`).join("") +
    `[2]lowpass=f=110,volume='if(lt(t,${korktu.start - 0.1}),0,min(1,(t-${korktu.start - 0.1})/0.5))*0.9':eval=frame[rum];` +
    `${beats.map((_, i) => `[b${i}]`).join("")}[rum]amix=inputs=${n + 1}:normalize=0,apad=whole_dur=${d},atrim=0:${d}[out]`,
    "-map", "[out]", sfx,
  ]);

  const vd = ms(voiceStart);
  const mix = path.join(out, "fear-audio.wav");
  ffmpeg([
    "-i", sfx, "-i", v.file,
    "-filter_complex",
    `[0]volume=0.9[s];[1]volume=1.35,adelay=${vd}|${vd}[v];[s][v]amix=inputs=2:normalize=0,alimiter=limit=0.95,atrim=0:${d}[out]`,
    "-map", "[out]", mix,
  ]);

  encode({ framesDir: path.join(out, "fear-frames"), audio: mix, out: path.join(out, "03-fear.mp4"), fps: FPS });
  console.log("wrote", path.join(out, "03-fear.mp4"), "length", duration(path.join(out, "03-fear.mp4")).toFixed(2) + "s");
}

// ---------- section 4: the check ----------
async function check() {
  // Section 3's timing (same formulas as fear()), so its heartbeat and red glow can fade out across the cut.
  const f = await speak("fear");
  const fearVoiceStart = 0.5;
  const prevDuration = +(fearVoiceStart + f.seconds + 0.55).toFixed(2);
  const korktuWord = f.words.find((w) => /^korktu/i.test(w.text));
  const korktu = korktuWord ? korktuWord.start + fearVoiceStart : fearVoiceStart + 0.4;

  const v = await speak("check");
  const voiceStart = 0.55;                       // the lookup card is in
  const seconds = +(voiceStart + v.seconds + 0.6).toFixed(2);
  const words = v.words.map((w) => ({ ...w, start: +(w.start + voiceStart).toFixed(3), end: +(w.end + voiceStart).toFixed(3) }));
  console.log(`voice ${v.seconds.toFixed(2)}s (${v.cached ? "cached" : "new"}), section ${seconds}s, ${words.length} words`);

  await renderFrames({
    html: path.join(here, "04-check.html"),
    timing: { voiceStart, duration: seconds, words, heart: { korktu, until: prevDuration + 1.0, prevDuration } },
    seconds,
    fps: FPS,
    outDir: path.join(out, "check-frames"),
  });

  // Sound: the heartbeat and rumble from section 3 carry on for a moment and fade out (no hard cut), then voice only.
  const d = String(seconds);
  const ms = (s) => Math.round(s * 1000);
  const FADE = 0.6;
  const beats = [];
  for (let t0 = korktu; t0 < prevDuration + FADE; t0 += 0.85) {
    for (const [off, vol] of [[0.06, 1.0], [0.34, 0.7]]) {
      const at = t0 + off - prevDuration;              // on this section's clock
      if (at >= 0 && at < FADE) beats.push({ at, vol: vol * (1 - at / FADE) });
    }
  }
  const sfx = path.join(out, "check-sfx.wav");
  const parts = [
    "-f", "lavfi", "-i", "sine=f=50:d=0.32:r=44100",
    "-f", "lavfi", "-i", "sine=f=92:d=0.16:r=44100",
    "-f", "lavfi", "-i", `anoisesrc=d=${d}:c=brown:r=44100:a=0.9`,
  ];
  let fc = `[2]lowpass=f=110,volume='0.9*max(0,1-t/${FADE})':eval=frame[rum];`;
  let inputs = "[rum]";
  if (beats.length) {
    fc += "[0]afade=t=in:d=0.012,afade=t=out:st=0.03:d=0.29,volume=3.2[lo];" +
      "[1]afade=t=in:d=0.008,afade=t=out:st=0.02:d=0.14,volume=1.3[hi];" +
      `[lo][hi]amix=inputs=2:normalize=0,asplit=${beats.length}${beats.map((_, i) => `[s${i}]`).join("")};` +
      beats.map((b, i) => `[s${i}]volume=${b.vol.toFixed(3)},adelay=${ms(b.at)}|${ms(b.at)}[b${i}];`).join("");
    inputs += beats.map((_, i) => `[b${i}]`).join("");
  }
  fc += `${inputs}amix=inputs=${beats.length + 1}:normalize=0,apad=whole_dur=${d},atrim=0:${d}[out]`;
  ffmpeg([...parts, "-filter_complex", fc, "-map", "[out]", sfx]);

  const vd = ms(voiceStart);
  const mix = path.join(out, "check-audio.wav");
  ffmpeg([
    "-i", sfx, "-i", v.file,
    "-filter_complex",
    `[0]volume=0.9[s];[1]volume=1.35,adelay=${vd}|${vd}[v];[s][v]amix=inputs=2:normalize=0,alimiter=limit=0.95,atrim=0:${d}[out]`,
    "-map", "[out]", mix,
  ]);

  encode({ framesDir: path.join(out, "check-frames"), audio: mix, out: path.join(out, "04-check.mp4"), fps: FPS });
  console.log("wrote", path.join(out, "04-check.mp4"), "length", duration(path.join(out, "04-check.mp4")).toFixed(2) + "s");
}

// ---------- section 5: the turn ----------
async function turn() {
  const v = await speak("turn");
  const voiceStart = 0.35;                       // as the headline starts moving back
  const seconds = +(voiceStart + v.seconds + 0.75).toFixed(2);   // hold the answer a moment
  const words = v.words.map((w) => ({ ...w, start: +(w.start + voiceStart).toFixed(3), end: +(w.end + voiceStart).toFixed(3) }));
  console.log(`voice ${v.seconds.toFixed(2)}s (${v.cached ? "cached" : "new"}), section ${seconds}s, ${words.length} words`);

  await renderFrames({
    html: path.join(here, "05-turn.html"),
    timing: { voiceStart, duration: seconds, words },
    seconds,
    fps: FPS,
    outDir: path.join(out, "turn-frames"),
  });

  // Sound: voice only.
  const d = String(seconds);
  const vd = Math.round(voiceStart * 1000);
  const mix = path.join(out, "turn-audio.wav");
  ffmpeg([
    "-i", v.file,
    "-filter_complex",
    `[0]volume=1.35,adelay=${vd}|${vd},alimiter=limit=0.95,apad=whole_dur=${d},atrim=0:${d}[out]`,
    "-map", "[out]", mix,
  ]);

  encode({ framesDir: path.join(out, "turn-frames"), audio: mix, out: path.join(out, "05-turn.mp4"), fps: FPS });
  console.log("wrote", path.join(out, "05-turn.mp4"), "length", duration(path.join(out, "05-turn.mp4")).toFixed(2) + "s");
}

// ---------- section 6: the fix ----------
async function fix() {
  const v = await speak("fix");
  const voiceStart = 0.4;                        // the previous scene has cleared
  const seconds = +(voiceStart + v.seconds + 0.7).toFixed(2);
  const words = v.words.map((w) => ({ ...w, start: +(w.start + voiceStart).toFixed(3), end: +(w.end + voiceStart).toFixed(3) }));
  console.log(`voice ${v.seconds.toFixed(2)}s (${v.cached ? "cached" : "new"}), section ${seconds}s, ${words.length} words`);

  await renderFrames({
    html: path.join(here, "06-fix.html"),
    timing: { voiceStart, duration: seconds, words },
    seconds,
    fps: FPS,
    outDir: path.join(out, "fix-frames"),
  });

  // Sound: voice only.
  const d = String(seconds);
  const vd = Math.round(voiceStart * 1000);
  const mix = path.join(out, "fix-audio.wav");
  ffmpeg([
    "-i", v.file,
    "-filter_complex",
    `[0]volume=1.35,adelay=${vd}|${vd},alimiter=limit=0.95,apad=whole_dur=${d},atrim=0:${d}[out]`,
    "-map", "[out]", mix,
  ]);

  encode({ framesDir: path.join(out, "fix-frames"), audio: mix, out: path.join(out, "06-fix.mp4"), fps: FPS });
  console.log("wrote", path.join(out, "06-fix.mp4"), "length", duration(path.join(out, "06-fix.mp4")).toFixed(2) + "s");
}

// ---------- section 7: the close ----------
async function close() {
  const v = await speak("close");
  const voiceStart = 0.4;                        // the check list has cleared
  const seconds = +(voiceStart + v.seconds + 1.6).toFixed(2);   // hold the end card
  const words = v.words.map((w) => ({ ...w, start: +(w.start + voiceStart).toFixed(3), end: +(w.end + voiceStart).toFixed(3) }));
  console.log(`voice ${v.seconds.toFixed(2)}s (${v.cached ? "cached" : "new"}), section ${seconds}s, ${words.length} words`);

  await renderFrames({
    html: path.join(here, "07-close.html"),
    timing: { voiceStart, duration: seconds, words },
    seconds,
    fps: FPS,
    outDir: path.join(out, "close-frames"),
  });

  // Sound: voice only.
  const d = String(seconds);
  const vd = Math.round(voiceStart * 1000);
  const mix = path.join(out, "close-audio.wav");
  ffmpeg([
    "-i", v.file,
    "-filter_complex",
    `[0]volume=1.35,adelay=${vd}|${vd},alimiter=limit=0.95,apad=whole_dur=${d},atrim=0:${d}[out]`,
    "-map", "[out]", mix,
  ]);

  encode({ framesDir: path.join(out, "close-frames"), audio: mix, out: path.join(out, "07-close.mp4"), fps: FPS });
  console.log("wrote", path.join(out, "07-close.mp4"), "length", duration(path.join(out, "07-close.mp4")).toFixed(2) + "s");
}

const sections = { hook, threat, fear, check, turn, fix, close };
const ORDER = [
  ["hook", "01-hook.mp4"], ["threat", "02-threat.mp4"], ["fear", "03-fear.mp4"], ["check", "04-check.mp4"],
  ["turn", "05-turn.mp4"], ["fix", "06-fix.mp4"], ["close", "07-close.mp4"],
];

// Join the built sections into the final reel.
function join() {
  const list = path.join(out, "join-all.txt");
  fs.writeFileSync(list, ORDER.map(([, f]) => `file '${path.join(out, f).split(path.sep).join("/")}'`).join("\n"));
  const final = path.join(out, "siteniz-kapanacak.mp4");
  ffmpeg([
    "-f", "concat", "-safe", "0", "-i", list,
    "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "17", "-preset", "medium",
    "-c:a", "aac", "-b:a", "160k", "-movflags", "+faststart",
    final,
  ]);
  console.log("final reel", final, "length", duration(final).toFixed(2) + "s");
}

const name = process.argv[2] ?? "hook";
if (name === "all") {
  for (const [s] of ORDER) await sections[s]();
  join();
} else if (name === "join") {
  join();
} else if (sections[name]) {
  await sections[name]();
} else {
  console.error(`unknown section "${name}". Available: ${Object.keys(sections).join(", ")}, all, join`);
  process.exit(1);
}
