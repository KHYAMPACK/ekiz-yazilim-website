"use client";

import { motion, useReducedMotion } from "motion/react";
import { INCLUDED, TYPICAL_PRICE, WORKS } from "@/lib/websitesi";

const EASE = [0.22, 1, 0.36, 1] as const;

function CheckMark() {
  return (
    <span
      className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-sc-accent/15 text-sc-accent-text"
      aria-hidden
    >
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
        <path
          d="M1.6 5.2L3.8 7.3L8.4 2.4"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </svg>
    </span>
  );
}

function ArrowOut() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      className="shrink-0 text-sc-muted transition-colors group-hover:text-sc-accent-text"
      aria-hidden
    >
      <path
        d="M3 11L11 3M11 3H5.5M11 3V8.5"
        stroke="currentColor"
        strokeWidth="1.4"
      />
    </svg>
  );
}

export default function WebPlan() {
  const reduce = useReducedMotion();

  return (
    <section
      id="plan"
      className="sc-paper border-t border-sc-border"
      aria-labelledby="plan-title"
    >
      <div className="sc-container grid gap-4 py-16 sm:py-24 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)_minmax(0,1fr)] lg:items-stretch">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="sc-root sc-card sc-card--lg flex flex-col p-6 sm:p-8"
        >
          <p className="sc-eyebrow">Tek plan</p>
          <h2 id="plan-title" className="sr-only">
            Tek Paket. Tipik Proje {TYPICAL_PRICE} Lira
          </h2>
          <p className="mt-6 flex items-start gap-2 leading-none">
            <span className="font-display text-[clamp(3.4rem,8vw,5.4rem)] tracking-tight text-sc-accent-text">
              {TYPICAL_PRICE}
            </span>
            <span className="mt-2 text-sm font-medium tracking-[0.14em] text-sc-muted uppercase">
              ₺
            </span>
          </p>
          <p className="mt-3 text-sm text-sc-text sm:text-base">
            Tipik Bir Proje İçin
          </p>
          <p className="mt-2 text-sm leading-relaxed text-sc-muted">
            Sabit paket fiyatı değil. Kapsam keşifte netleşir; yazılı teklif
            görüşmeden sonra gelir.
          </p>
          <a href="#gorusme" className="sc-btn sc-btn--primary mt-8">
            Görüşme ayarla
          </a>
          <p className="mt-8 text-xs font-medium tracking-[0.16em] text-sc-muted uppercase">
            Neler dahil
          </p>
          <ul className="mt-4 flex flex-col gap-2.5">
            {INCLUDED.map((item, i) => (
              <motion.li
                key={item}
                initial={reduce ? false : { opacity: 0, x: 10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{
                  duration: 0.4,
                  delay: 0.12 + i * 0.04,
                  ease: EASE,
                }}
                className="flex items-start gap-2.5 text-sm leading-relaxed text-sc-text"
              >
                <CheckMark />
                {item}
              </motion.li>
            ))}
          </ul>
        </motion.div>

        <div className="flex flex-col gap-4">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65, delay: 0.08, ease: EASE }}
            className="sc-card sc-card--lg flex flex-1 flex-col justify-between !bg-sc-accent/15 p-6 sm:p-7"
          >
            <p className="sc-eyebrow">Referans</p>
            <div className="mt-6">
              <p className="sc-h3 !text-2xl sm:!text-3xl">Sabit Fiyat Değil</p>
              <p className="sc-body mt-3 !text-sm !text-sc-text/75">
                {TYPICAL_PRICE} ₺ kreş, okul veya ofis gibi sade bir tanıtım
                sitesi için tipik tutar. Daha fazla sayfa veya özel iş teklifte
                yazılır.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65, delay: 0.14, ease: EASE }}
            className="sc-card sc-card--lg flex flex-1 flex-col justify-between p-6 sm:p-7"
          >
            <p className="sc-eyebrow">Yazılı teklif</p>
            <div className="mt-6">
              <p className="sc-h3 !text-2xl sm:!text-3xl">Onaysız İş Yok</p>
              <p className="sc-body mt-3 !text-sm">
                Görüşmeden sonra teklif yazılı gelir. Onayınız olmadan işe
                başlamayız. Alan adı ve hosting hesapları sizde kalır.
              </p>
            </div>
          </motion.div>
        </div>

        <motion.div
          id="isler"
          initial={reduce ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.12, ease: EASE }}
          className="sc-root sc-card sc-card--lg flex flex-col p-6 sm:p-8"
        >
          <h3 className="sc-h2 !text-4xl sm:!text-5xl">
            İşleri <span className="sc-em">Gör</span>
          </h3>
          <p className="sc-body mt-3 !text-sm">
            Yayına aldığımız siteler. Hepsi işe özel tasarlandı.
          </p>
          <ul className="mt-8 flex flex-1 flex-col">
            {WORKS.map((work, i) => (
              <li
                key={work.href}
                className={i < WORKS.length - 1 ? "border-b border-sc-border" : ""}
              >
                <a
                  href={work.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between gap-4 py-5"
                >
                  <span>
                    <span className="font-display block text-xl tracking-tight text-sc-text">
                      {work.name}
                    </span>
                    <span className="mt-1 block text-xs tracking-[0.12em] text-sc-muted uppercase">
                      {work.meta}
                    </span>
                  </span>
                  <ArrowOut />
                </a>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
