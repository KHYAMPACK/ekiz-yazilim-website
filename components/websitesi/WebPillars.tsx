"use client";

import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
} from "motion/react";
import { useEffect, useRef, useState } from "react";
import { PILLARS } from "@/lib/websitesi";

const EASE = [0.22, 1, 0.36, 1] as const;
const PILLAR_COUNT = PILLARS.length;
const PHOTO_MS = 450;

function pillarFromProgress(v: number) {
  const clamped = Math.min(0.999, Math.max(0, v));
  return Math.min(PILLAR_COUNT - 1, Math.floor(clamped * PILLAR_COUNT));
}

function PhotoFrame({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <div
      className={`overflow-hidden rounded-2xl border border-sc-border bg-sc-surface shadow-[0_20px_60px_-20px_rgba(229,138,92,0.3)] ${className ?? ""}`}
    >
      <Image
        src={src}
        alt={alt}
        width={1400}
        height={900}
        className="h-full w-full object-cover"
        sizes="(max-width: 1024px) 90vw, 420px"
      />
    </div>
  );
}

export default function WebPillars() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [photo, setPhoto] = useState(0);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const line = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 28,
    restDelta: 0.001,
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const next = pillarFromProgress(v);
    setActive((prev) => (prev === next ? prev : next));
  });

  useEffect(() => {
    setPhoto(0);
    if (reduce) return;
    const id = window.setInterval(() => {
      setPhoto((prev) => {
        const total = PILLARS[active]?.images.length ?? 1;
        return (prev + 1) % total;
      });
    }, PHOTO_MS);
    return () => window.clearInterval(id);
  }, [active, reduce]);

  const current = PILLARS[active] ?? PILLARS[0];
  const shot = current.images[photo] ?? current.images[0];

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
            {PILLARS.map((item) => (
              <li key={item.word}>
                <p className="font-display text-4xl tracking-tight text-sc-text uppercase">
                  {item.word}
                </p>
                <div className="mt-4">
                  <PhotoFrame
                    src={item.images[0]}
                    alt={item.imageAlt}
                    className="aspect-[16/10]"
                  />
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

              <div className="relative overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={current.word}
                    initial={{ y: "40%", opacity: 0 }}
                    animate={{ y: "0%", opacity: 1 }}
                    exit={{ y: "-28%", opacity: 0 }}
                    transition={{ duration: 0.5, ease: EASE }}
                  >
                    <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-sc-border bg-sc-surface shadow-[0_20px_60px_-20px_rgba(229,138,92,0.3)]">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={shot}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.12 }}
                          className="absolute inset-0"
                        >
                          <Image
                            src={shot}
                            alt={current.imageAlt}
                            width={1400}
                            height={900}
                            className="h-full w-full object-cover"
                            sizes="(max-width: 1024px) 90vw, 480px"
                          />
                        </motion.div>
                      </AnimatePresence>
                    </div>
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
