"use client";

import { motion, useReducedMotion } from "motion/react";
import {
  SiteCheckDialog,
  SiteCheckForm,
  useSiteCheck,
} from "@/components/sitecheck/SiteCheckTool";
import WebDemoPreview from "./WebDemoPreview";

const EASE = [0.22, 1, 0.36, 1] as const;

const LINE_A = ["Siteniz", "velileri"];
const LINE_B = ["kaybettiriyor", "mu?"];

type Props = {
  wa: string | null;
};

export default function WebHero({ wa }: Props) {
  const reduce = useReducedMotion();
  const check = useSiteCheck();

  return (
    <section id="ust" className="sc-glow relative overflow-hidden">
      <div className="sc-container py-14 sm:py-20 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-10">
          <div className="mx-auto w-full max-w-xl text-center lg:mx-0 lg:max-w-none lg:text-left">
            <motion.p
              className="sc-eyebrow mb-5"
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              Ücretsiz site kontrolü
            </motion.p>

            <h1 className="sc-h1 !text-[clamp(2.4rem,7vw,4.4rem)]">
              <span className="block overflow-hidden pb-[0.12em]">
                {LINE_A.map((word, i) => (
                  <motion.span
                    key={word}
                    className="mr-[0.22em] inline-block last:mr-0"
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
                    transition={{ duration: 0.8, delay: 0.24 + i * 0.1, ease: EASE }}
                  >
                    {word}
                  </motion.span>
                ))}
              </span>
            </h1>

            <motion.p
              className="sc-lead mt-7 lg:max-w-lg"
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5, ease: EASE }}
            >
              Adresi yazın. Velinin siteye girdiğinde karşılaşabileceği sorunları bulalım; her biri
              için size ne kaybettirdiğini ve bizim ne yapacağımızı gösterelim.
            </motion.p>

            <motion.div
              className="mt-8 text-left lg:max-w-xl"
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6, ease: EASE }}
            >
              <SiteCheckForm state={check} />
            </motion.div>

            <motion.p
              className="mt-6 text-sm text-sc-muted"
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.75 }}
            >
              Siteniz yoksa ya da yenisini istiyorsanız:{" "}
              <a href="#gorusme" className="text-sc-text underline underline-offset-4">
                görüşme ayarlayın
              </a>
              {wa && (
                <>
                  {" "}
                  ya da{" "}
                  <a
                    href={wa}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sc-text underline underline-offset-4"
                  >
                    WhatsApp&apos;tan yazın
                  </a>
                </>
              )}
              . Kapsam ve fiyat yazılı gelir; alan adı ve hosting hesapları sizde kalır.
            </motion.p>
          </div>

          <WebDemoPreview />
        </div>

        <SiteCheckDialog state={check} />
      </div>
    </section>
  );
}
