"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { FAQS } from "@/lib/websitesi";
import WebReveal from "./WebReveal";

export default function WebFaq() {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="sss" className="sc-section" aria-labelledby="web-faq-title">
      <div className="sc-container">
        <WebReveal>
          <p className="sc-eyebrow mb-4">SSS</p>
          <h2 id="web-faq-title" className="sc-h2">
            Sık <span className="sc-em">sorulanlar</span>
          </h2>
        </WebReveal>

        <div className="sc-card sc-card--lg mt-12 overflow-hidden">
          {FAQS.map((item, i) => {
            const isOpen = open === i;
            return (
              <div
                key={item.q}
                className={i > 0 ? "border-t border-sc-border" : ""}
              >
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left sm:px-7 sm:py-6"
                  >
                    <span className="font-display text-lg tracking-tight text-sc-text sm:text-xl">
                      {item.q}
                    </span>
                    <span
                      aria-hidden
                      className={`shrink-0 text-2xl leading-none text-sc-accent-text transition-transform duration-300 ${
                        isOpen ? "rotate-45" : ""
                      }`}
                    >
                      +
                    </span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="body"
                      initial={reduce ? false : { height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={reduce ? undefined : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="sc-body px-5 pb-6 sm:px-7">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
