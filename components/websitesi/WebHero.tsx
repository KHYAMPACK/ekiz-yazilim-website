"use client";

import { motion, useReducedMotion } from "motion/react";
import WebDemoPreview from "./WebDemoPreview";

const EASE = [0.22, 1, 0.36, 1] as const;

const LINE_A = ["Sitenizi"];
const LINE_B = ["Biz", "Kuruyoruz."];

type Props = {
  wa: string | null;
};

export default function WebHero({ wa }: Props) {
  const reduce = useReducedMotion();

  return (
    <section id="ust" className="sc-glow relative overflow-hidden">
      <div className="sc-container grid gap-12 py-14 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-10 lg:py-28">
        <div className="mx-auto w-full max-w-xl text-center lg:mx-0 lg:max-w-none lg:text-left">
          <motion.p
            className="sc-eyebrow mb-5"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            Web sitesi
          </motion.p>

          <h1 className="sc-h1 !text-[clamp(2.7rem,8vw,5.4rem)]">
            <span className="block overflow-hidden pb-[0.12em]">
              {LINE_A.map((word, i) => (
                <motion.span
                  key={word}
                  className="inline-block"
                  initial={reduce ? false : { y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 0.8, delay: 0.08 + i * 0.08, ease: EASE }}
                >
                  {word}
                </motion.span>
              ))}
            </span>
            <span className="-mt-1 block overflow-hidden pb-[0.14em]">
              {LINE_B.map((word, i) => (
                <motion.span
                  key={word}
                  className="sc-em mr-[0.22em] inline-block last:mr-0"
                  initial={reduce ? false : { y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{
                    duration: 0.8,
                    delay: 0.22 + i * 0.1,
                    ease: EASE,
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </span>
          </h1>

          <motion.p
            className="sc-lead mt-7 lg:max-w-md"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.48, ease: EASE }}
          >
            İşinizi anlatan, telefonda da düzgün çalışan bir site. Keşiften
            yayına kadar tasarımı, metni ve teknik işleri biz yürütürüz.
          </motion.p>

          <motion.div
            className="mt-8 flex flex-col gap-3 sm:mx-auto sm:max-w-md lg:mx-0 lg:max-w-none lg:flex-row lg:flex-wrap"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.58, ease: EASE }}
          >
            <a
              href="#gorusme"
              className="sc-btn sc-btn--primary w-full lg:w-auto"
            >
              Görüşme ayarla
            </a>
            {wa && (
              <a
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                className="sc-btn sc-btn--secondary w-full lg:w-auto"
              >
                WhatsApp
              </a>
            )}
          </motion.div>

          <motion.p
            className="mt-6 text-sm text-sc-muted"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.72 }}
          >
            Kapsam ve fiyat yazılı gelir. Alan adı ve hosting hesapları sizde kalır.
          </motion.p>
        </div>

        <WebDemoPreview />
      </div>
    </section>
  );
}
