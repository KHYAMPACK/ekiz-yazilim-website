/**
 * Word-by-word captions that follow the voice. Injected into scenes at __CAPTIONS__.
 *
 *   const captions = makeCaptions(document.getElementById('cap'), WORDS);   // WORDS: [{text, start, end}] in scene seconds
 *   window.draw = (t) => { ...; captions(t); };
 *
 * One sentence is shown at a time; sentences crossfade. The spoken word is highlighted with a soft ramp
 * (no snapping or jumping), upcoming words are dimmed. Style the container and `.sent span` in the scene CSS.
 */
function makeCaptions(container, words) {
  const clampC = (x) => Math.min(1, Math.max(0, x));
  const segC = (t, a, b) => clampC((t - a) / (b - a));
  const outC = (x) => 1 - Math.pow(1 - x, 3);

  // A sentence ends at a word that finishes with . ? or !
  const sentences = [];
  let cur = [];
  words.forEach((w) => {
    cur.push(w);
    if (/[.?!]$/.test(w.text)) {
      sentences.push(cur);
      cur = [];
    }
  });
  if (cur.length) sentences.push(cur);

  const layers = sentences.map((s) => {
    const div = document.createElement('div');
    div.className = 'sent';
    div.innerHTML = s.map((w) => `<span>${w.text}</span>`).join(' ');
    container.appendChild(div);
    return div;
  });

  return function update(t) {
    sentences.forEach((s, i) => {
      const s0 = s[0].start;
      const next = sentences[i + 1] ? sentences[i + 1][0].start : null;
      let op = outC(segC(t, s0 - 0.12, s0 + 0.1));
      if (next !== null) op *= 1 - outC(segC(t, next - 0.1, next + 0.06));
      layers[i].style.opacity = String(op);
      layers[i].style.transform = `translateY(${(1 - outC(segC(t, s0 - 0.12, s0 + 0.15))) * 22}px)`;
      if (op <= 0) return;
      s.forEach((w, k) => {
        const el = layers[i].children[k];
        // highlight ramps in as the word starts and out shortly after it ends
        const a = outC(segC(t, w.start - 0.03, w.start + 0.05)) * (1 - outC(segC(t, w.end, w.end + 0.1)));
        const c = Math.round(255 * (1 - a));
        el.style.background = `rgba(191,213,235,${a.toFixed(3)})`;
        el.style.color = `rgb(${c},${c},${c})`;
        el.style.opacity = String(0.35 + 0.65 * outC(segC(t, w.start - 0.05, w.start + 0.05)));
      });
    });
  };
}
