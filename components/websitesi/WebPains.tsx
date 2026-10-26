"use client";

import { motion, useReducedMotion } from "motion/react";
import { PAINS } from "@/lib/websitesi";
import WebReveal from "./WebReveal";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function WebPains() {
  const reduce = useReducedMotion();

  return (
    <section className="sc-section" aria-labelledby="pains-title">
      <div className="sc-container">
        <WebReveal>
          <p className="sc-eyebrow mb-4">Sık duyduklarımız</p>
          <h2 id="pains-title" className="sc-h2 max-w-2xl">
            Web sitesi yaptırmak <span className="sc-em">bu kadar yorucu</span>{" "}
            olmamalı.
          </h2>
          <p className="sc-lead mt-5 max-w-xl">
            Bunları sık duyuyoruz. Hepsinin çözümü var — önce ihtiyacı netleştirmek yeterli.
          </p>
        </WebReveal>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PAINS.map((item, i) => (
            <motion.li
              key={item.quote}
              className="sc-card flex min-h-[12rem] flex-col justify-between p-6 sm:p-7"
              initial={reduce ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: i * 0.06, ease: EASE }}
            >
              <p className="font-display text-xl leading-snug tracking-tight text-sc-text sm:text-2xl">
                “{item.quote}”
              </p>
              <p className="mt-6 text-xs font-medium tracking-[0.16em] text-sc-accent-text uppercase">
                {item.note}
              </p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
