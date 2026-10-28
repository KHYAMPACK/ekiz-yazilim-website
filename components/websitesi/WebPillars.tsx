"use client";

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useRef, useState } from "react";
import { PILLARS } from "@/lib/websitesi";

const EASE = [0.22, 1, 0.36, 1] as const;
const PILLAR_COUNT = PILLARS.length;
const CREAM = "#f3f0e8";
const ACCENT = "#e58a5c";

function pillarFromProgress(v: number) {
  const clamped = Math.min(0.999, Math.max(0, v));
  return Math.min(PILLAR_COUNT - 1, Math.floor(clamped * PILLAR_COUNT));
}

/* a speech bubble path; the tail sits bottom-left ("l") or bottom-right ("r") */
function bubble(x: number, y: number, w: number, h: number, side: "l" | "r") {
  const r = 12;
  const tx = side === "l" ? x + 30 : x + w - 30;
  const dir = side === "l" ? 1 : -1;
  return (
    `M${x + r} ${y} H${x + w - r} A${r} ${r} 0 0 1 ${x + w} ${y + r} V${y + h - r} A${r} ${r} 0 0 1 ${x + w - r} ${y + h} ` +
    (side === "r"
      ? `H${tx + 14} L${tx} ${y + h + 16} L${tx - 4} ${y + h} H${x + r}`
      : `H${tx + 18} L${tx} ${y + h + 16} L${tx + 4 * dir} ${y + h} H${x + r}`) +
    ` A${r} ${r} 0 0 1 ${x} ${y + h - r} V${y + r} A${r} ${r} 0 0 1 ${x + r} ${y} Z`
  );
}

type Item = { d: string; from: number; to: number; accent?: boolean; w?: number };

/* every drawing: path, the scroll range (0..1 inside its pillar) it is drawn over */
const DRAWINGS: Item[][] = [
  /* Keşif: a notepad being ticked off, and a question / answer conversation */
  [
    { d: "M52 36 H198 A12 12 0 0 1 210 48 V252 A12 12 0 0 1 198 264 H52 A12 12 0 0 1 40 252 V48 A12 12 0 0 1 52 36 Z", from: 0, to: 0.16 },
    { d: "M80 28 V46 M125 28 V46 M170 28 V46", from: 0.12, to: 0.2 },
    { d: "M60 76 H150", from: 0.16, to: 0.22, w: 3 },
    { d: "M60 104 h16 v16 h-16 Z M90 112 H186", from: 0.2, to: 0.3 },
    { d: "M62 114 l5 6 l9 -13", from: 0.28, to: 0.34, accent: true, w: 3 },
    { d: "M60 144 h16 v16 h-16 Z M90 152 H170", from: 0.3, to: 0.4 },
    { d: "M62 154 l5 6 l9 -13", from: 0.38, to: 0.44, accent: true, w: 3 },
    { d: "M60 184 h16 v16 h-16 Z M90 192 H180", from: 0.4, to: 0.5 },
    { d: "M62 194 l5 6 l9 -13", from: 0.48, to: 0.54, accent: true, w: 3 },
    { d: "M60 224 h16 v16 h-16 Z M90 232 H160", from: 0.5, to: 0.6 },
    { d: bubble(236, 40, 200, 74, "l"), from: 0.55, to: 0.72 },
    { d: "M322 70 q0 -16 16 -16 q16 0 16 13 q0 9 -11 13 q-5 2 -5 9 M338 98 v2", from: 0.7, to: 0.82, accent: true, w: 3 },
    { d: bubble(274, 156, 166, 70, "r"), from: 0.72, to: 0.88 },
    { d: "M294 180 H412 M294 200 H380", from: 0.86, to: 0.96 },
  ],
  /* Tasarım: a site being sketched out section by section */
  [
    { d: "M44 30 H436 A14 14 0 0 1 450 44 V256 A14 14 0 0 1 436 270 H44 A14 14 0 0 1 30 256 V44 A14 14 0 0 1 44 30 Z", from: 0, to: 0.16 },
    { d: "M30 62 H450", from: 0.12, to: 0.2 },
    { d: "M54 46 h0.1 M70 46 h0.1 M86 46 h0.1", from: 0.16, to: 0.22, w: 5 },
    { d: "M300 46 H330 M345 46 H375 M390 46 H420", from: 0.18, to: 0.28 },
    { d: "M56 100 H200", from: 0.26, to: 0.38, accent: true, w: 6 },
    { d: "M56 124 H168", from: 0.34, to: 0.44, accent: true, w: 6 },
    { d: "M56 154 H196 M56 170 H170", from: 0.42, to: 0.52 },
    { d: "M68 180 H110 A12 12 0 0 1 110 204 H68 A12 12 0 0 1 68 180 Z", from: 0.5, to: 0.6, accent: true },
    { d: "M246 88 H430 V198 H246 Z", from: 0.48, to: 0.6 },
    { d: "M246 88 L430 198 M430 88 L246 198", from: 0.58, to: 0.66 },
    { d: "M268 186 l36 -40 l28 28 l20 -20 l60 32", from: 0.62, to: 0.72 },
    { d: "M374 122 a12 12 0 1 0 0.1 0", from: 0.7, to: 0.76, accent: true },
    { d: "M56 220 H162 V256 H56 Z M186 220 H292 V256 H186 Z M316 220 H430 V256 H316 Z", from: 0.72, to: 0.88 },
    { d: "M396 238 l0 -26 l18 15 l-9 1 l6 11 l-6 3 l-6 -11 z", from: 0.88, to: 1, accent: true, w: 2.5 },
  ],
  /* Destek: a healthy site, plus a conversation that keeps going */
  [
    { d: "M100 50 H290 A10 10 0 0 1 300 60 V184 A10 10 0 0 1 290 194 H100 A10 10 0 0 1 90 184 V60 A10 10 0 0 1 100 50 Z", from: 0, to: 0.16 },
    { d: "M56 204 H334 L320 224 H70 Z", from: 0.12, to: 0.26 },
    { d: "M116 128 H152 L164 90 L182 160 L198 108 L208 140 H278", from: 0.24, to: 0.5, accent: true, w: 3.5 },
    { d: "M258 80 a13 13 0 1 0 0.1 0", from: 0.5, to: 0.6 },
    { d: "M252 80 l5 6 l9 -12", from: 0.58, to: 0.66, accent: true, w: 3 },
    { d: bubble(324, 40, 130, 54, "r"), from: 0.6, to: 0.74 },
    { d: "M342 62 H430 M342 78 H410", from: 0.72, to: 0.8 },
    { d: bubble(312, 130, 142, 54, "l"), from: 0.78, to: 0.9 },
    { d: "M332 152 H430 M332 168 H400", from: 0.88, to: 0.96 },
    { d: "M120 246 H300", from: 0.9, to: 1 },
  ],
];

function Stroke({ item, p }: { item: Item; p: MotionValue<number> }) {
  const len = useTransform(p, [item.from, item.to], [0, 1], { clamp: true });
  const opacity = useTransform(len, [0, 0.02], [0, 1], { clamp: true });
  return (
    <motion.path
      d={item.d}
      fill="none"
      stroke={item.accent ? ACCENT : CREAM}
      strokeWidth={item.w ?? 2}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ pathLength: len, opacity }}
    />
  );
}

function Drawing({ index, p }: { index: number; p: MotionValue<number> }) {
  return (
    <svg viewBox="0 0 480 290" className="h-full w-full" role="img" aria-label={PILLARS[index].imageAlt}>
      {DRAWINGS[index].map((item, i) => (
        <Stroke key={i} item={item} p={p} />
      ))}
    </svg>
  );
}

function DrawingFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-sc-border bg-sc-surface p-5 shadow-[0_20px_60px_-20px_rgba(229,138,92,0.3)]">
      {children}
    </div>
  );
}

function StaticDrawing({ index }: { index: number }) {
  const full = useMotionValue(1);
  return <Drawing index={index} p={full} />;
}

export default function WebPillars() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const line = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 28,
    restDelta: 0.001,
  });
  /* each pillar draws itself over the first ~85% of its third of the scroll */
  const p0 = useTransform(scrollYProgress, [0, 0.28], [0, 1], { clamp: true });
  const p1 = useTransform(scrollYProgress, [1 / 3, 1 / 3 + 0.28], [0, 1], { clamp: true });
  const p2 = useTransform(scrollYProgress, [2 / 3, 2 / 3 + 0.28], [0, 1], { clamp: true });
  const progresses = [p0, p1, p2];

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const next = pillarFromProgress(v);
    setActive((prev) => (prev === next ? prev : next));
  });

  const current = PILLARS[active] ?? PILLARS[0];

  if (reduce) {
    return (
      <section
        id="odak"
        className="border-t border-sc-border bg-sc-bg"
        aria-labelledby="odak-title"
      >
        <div className="sc-container py-16 sm:py-24">
          <p className="sc-eyebrow mb-6">Odak</p>
          <h2 id="odak-title" className="sr-only">
            Keşif, Tasarım, Destek
          </h2>
          <ul className="grid gap-10 lg:grid-cols-3">
            {PILLARS.map((item, i) => (
              <li key={item.word}>
                <p className="font-display text-4xl tracking-tight text-sc-text uppercase">
                  {item.word}
                </p>
                <div className="mt-4">
                  <DrawingFrame>
                    <StaticDrawing index={i} />
                  </DrawingFrame>
                </div>
                <p className="sc-h3 mt-5">{item.title}</p>
                <p className="sc-body mt-2">{item.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    );
  }

  return (
    <section
      id="odak"
      className="border-t border-sc-border bg-sc-bg"
      aria-labelledby="odak-title"
    >
      <div ref={ref} className="h-[600vh]">
        <div className="sticky top-16 h-[calc(100svh-4rem)] overflow-hidden">
          <div className="sc-container relative grid h-full grid-rows-[auto_1fr] gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:grid-rows-1 lg:gap-16">
            <div className="flex flex-col items-center justify-center pt-8 text-center lg:items-start lg:pt-0 lg:text-left">
              <p className="sc-eyebrow mb-6">Odak</p>
              <h2 id="odak-title" className="sr-only">
                Keşif, Tasarım, Destek
              </h2>
              <ul className="flex flex-col">
                {PILLARS.map((item, i) => {
                  const on = i === active;
                  return (
                    <li key={item.word}>
                      <motion.span
                        className="font-display block py-[0.04em] text-[clamp(2.8rem,8vw,6.4rem)] leading-[1.02] tracking-tight uppercase"
                        animate={{
                          color: on ? "#e58a5c" : "rgba(243,240,232,0.14)",
                        }}
                        transition={{ duration: 0.35, ease: EASE }}
                      >
                        {item.word}
                      </motion.span>
                    </li>
                  );
                })}
              </ul>
              <p className="mt-8 text-sm text-sc-muted">
                Her Biri Gerekli. Hepsi Birlikte.
              </p>
            </div>

            <div className="relative flex flex-col justify-center pb-8 pl-8 sm:pl-10 lg:h-full lg:pb-0">
              <div
                className="absolute inset-y-0 left-[11px] w-px bg-sc-border sm:left-[15px]"
                aria-hidden
              />
              <motion.div
                style={{ scaleY: line }}
                className="absolute inset-y-0 left-[11px] w-px origin-top bg-sc-accent sm:left-[15px]"
                aria-hidden
              />

              <div className="relative">
                <DrawingFrame>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={active}
                      className="h-full w-full"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <Drawing index={active} p={progresses[active]} />
                    </motion.div>
                  </AnimatePresence>
                </DrawingFrame>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={current.word}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35, ease: EASE }}
                  >
                    <p className="sc-h3 mt-5">{current.title}</p>
                    <p className="sc-body mt-3 max-w-md">{current.body}</p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
