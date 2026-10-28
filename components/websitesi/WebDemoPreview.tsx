"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const DEMO_PATH = "/demo/okul";
const FRAME_W = 1440;
const FRAME_H = 900;
const EASE = [0.22, 1, 0.36, 1] as const;

export default function WebDemoPreview() {
  const reduce = useReducedMotion();
  const boxRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.3);

  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const update = () => setScale(el.clientWidth / FRAME_W);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <motion.div
      className="relative mx-auto w-full max-w-xl"
      initial={reduce ? false : { opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.35, ease: EASE }}
    >
      <div className="overflow-hidden rounded-2xl border border-sc-border bg-sc-surface shadow-[0_20px_60px_-20px_rgba(229,138,92,0.35)]">
        <div className="flex items-center gap-2 border-b border-sc-border px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-sc-border" />
          <span className="h-2.5 w-2.5 rounded-full bg-sc-border" />
          <span className="h-2.5 w-2.5 rounded-full bg-sc-border" />
          <span className="ml-3 truncate rounded-full bg-sc-bg px-3 py-1 text-xs text-sc-muted">
            ornek-okul.com
          </span>
        </div>

        <div
          ref={boxRef}
          className="relative w-full overflow-hidden"
          style={{ aspectRatio: `${FRAME_W} / ${FRAME_H}` }}
        >
          <iframe
            src={`${DEMO_PATH}/index.html?embed`}
            title="Örnek okul sitesi önizlemesi"
            loading="lazy"
            tabIndex={-1}
            aria-hidden="true"
            className="pointer-events-none absolute left-0 top-0 origin-top-left border-0"
            style={{
              width: FRAME_W,
              height: FRAME_H,
              transform: `scale(${scale})`,
            }}
          />
          <a
            href={`${DEMO_PATH}/index.html`}
            target="_blank"
            rel="noopener"
            aria-label="Örnek okul sitesini aç ve gez"
            className="group absolute inset-0 flex items-end justify-center bg-gradient-to-t from-black/25 via-transparent to-transparent p-4 opacity-100 transition-opacity sm:opacity-0 sm:hover:opacity-100 sm:focus-visible:opacity-100"
          >
            <span className="sc-btn sc-btn--primary pointer-events-none">
              Siteyi gez →
            </span>
          </a>
        </div>
      </div>
      <p className="mt-4 text-center text-sm text-sc-muted">
        Örnek bir okul sitesi. Tıklayın, gezin.
      </p>
    </motion.div>
  );
}
