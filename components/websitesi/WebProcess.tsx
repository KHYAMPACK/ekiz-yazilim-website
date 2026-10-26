"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { useRef } from "react";
import { STEPS } from "@/lib/websitesi";

export default function WebProcess() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 55%"],
  });
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <section
      id="surec"
      className="border-t border-sc-border bg-sc-surface"
      aria-labelledby="web-surec-title"
    >
      <div className="sc-container grid gap-10 pt-16 pb-6 sm:pt-24 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="sc-eyebrow mb-4">İş akışı</p>
          <h2 id="web-surec-title" className="sc-h2">
            İş <span className="sc-em">akışımız</span>
          </h2>
          <p className="sc-lead mt-5 max-w-sm">
            Keşiften yayına, ardından sürekli destek. Siz işinizi anlatırsınız;
            gerisini biz yürütürüz.
          </p>
        </div>

        <div ref={ref} className="relative">
          <div
            className="absolute top-2 bottom-0 left-[15px] w-px bg-sc-border sm:left-[19px]"
            aria-hidden
          />
          {!reduce && (
            <motion.div
              style={{ scaleY }}
              className="absolute top-2 bottom-0 left-[15px] w-px origin-top bg-sc-accent sm:left-[19px]"
              aria-hidden
            />
          )}

          <ol className="flex flex-col gap-0">
            {STEPS.map((step, i) => (
              <motion.li
                key={step.n}
                className="relative grid grid-cols-[32px_1fr] gap-4 py-6 sm:grid-cols-[40px_1fr] sm:gap-6 sm:py-8"
                initial={reduce ? false : { opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.55,
                  delay: i * 0.05,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <span className="relative z-10 mt-0.5 flex size-8 items-center justify-center rounded-full border border-sc-accent bg-sc-surface text-[11px] font-medium tracking-wide text-sc-accent-text sm:size-10 sm:text-xs">
                  {step.n}
                </span>
                <div
                  className={
                    i < STEPS.length - 1
                      ? "border-b border-sc-border pb-6 sm:pb-8"
                      : "pb-6 sm:pb-10"
                  }
                >
                  <h3 className="sc-h3">{step.title}</h3>
                  <p className="sc-body mt-2">{step.body}</p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
