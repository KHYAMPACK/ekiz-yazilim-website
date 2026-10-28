# Reels

Vertical videos (1080x1920, 30 fps, H.264 + AAC) built from code. Each scene is an HTML page with a
`window.draw(t)` function; Chrome renders it frame by frame and ffmpeg joins frames, voice and sound effects.

```
video/
  lib/core.mjs                      shared helpers: ffmpeg, ElevenLabs voice (cached), frame renderer, encoder
  reels/<reel>/reel.json            title, voice (id, model, speed) and every voiceover line
  reels/<reel>/NN-section.html      one scene per section
  reels/<reel>/build.mjs            node build.mjs <section>  ->  video/out/<reel>/NN-section.mp4
  out/                              generated frames, voice cache and mp4s (git-ignored)
```

## Build a section

```bash
node video/reels/siteniz-kapanacak/build.mjs hook     # one section: hook, threat, fear, check, turn, fix, close
node video/reels/siteniz-kapanacak/build.mjs all      # every section, then the final reel
node video/reels/siteniz-kapanacak/build.mjs join     # only re-join the built sections
```

The final reel is `video/out/siteniz-kapanacak/siteniz-kapanacak.mp4`. Captions follow the voice word by word
(`lib/captions.js`), and `lib/probe.mjs` reports sudden jumps between frames when something looks like a twitch.

## How to change things

- **Words:** edit `reel.json` (voice lines) and the text inside the section's HTML.
- **Voice speed or voice:** `voice.speed` (0.7 to 1.2) and `voice.id` in `reel.json`. Unchanged lines are cached, so only edited lines cost ElevenLabs characters.
- **Timing, colors, motion:** constants at the top of the scene's `draw(t)` function.
- **Sound effects:** the ffmpeg filter in `build.mjs` (frequencies, volumes, delays in milliseconds).

The voice needs `ELEVEN_LABS_API_KEY` in `.env.local` (never committed). Chrome or Edge must be installed.
