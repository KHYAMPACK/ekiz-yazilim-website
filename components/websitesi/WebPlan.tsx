"use client";

import { motion, useReducedMotion } from "motion/react";
import { INCLUDED, TYPICAL_PRICE, WORKS } from "@/lib/websitesi";

const EASE = [0.22, 1, 0.36, 1] as const;

function CheckMark() {
  return (
    <span
      className="mt-0.5 flex size-4 shrink-0 items-center justify-center border border-white/25 text-ice"
      aria-hidden
    >
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
        <path
          d="M1.6 5.2L3.8 7.3L8.4 2.4"
          stroke="currentColor"
          strokeWidth="1.4"
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
      className="shrink-0 text-white/40 transition-colors group-hover:text-ice"
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
      className="border-b border-black bg-ice/30"
      aria-labelledby="plan-title"
    >
      <div className="mx-auto grid w-full max-w-6xl gap-4 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)_minmax(0,1fr)] lg:items-stretch">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="flex flex-col border border-black bg-black p-6 text-white sm:p-8"
        >
          <p className="text-xs font-medium tracking-[0.2em] uppercase text-ice">
            Tek plan
          </p>
          <h2 id="plan-title" className="sr-only">
            Tek Paket. Tipik Proje {TYPICAL_PRICE} Lira
          </h2>
          <p className="mt-6 flex items-start gap-2 leading-none">
            <span className="text-[clamp(3.4rem,8vw,5.4rem)] font-medium tracking-tight text-ice">
              {TYPICAL_PRICE}
            </span>
            <span className="mt-2 text-sm font-medium tracking-[0.14em] text-white/50 uppercase">
              ₺
            </span>
          </p>
          <p className="mt-3 text-sm text-white/70 sm:text-base">
            Tipik Bir Proje İçin
          </p>
          <p className="mt-2 text-sm leading-relaxed text-white/45">
            Sabit paket fiyatı değil. Kapsam keşifte netleşir; yazılı teklif
            görüşmeden sonra gelir.
          </p>
          <a
            href="#gorusme"
            className="mt-8 inline-flex min-h-12 items-center justify-center border border-ice bg-ice px-5 text-sm font-medium text-black transition-colors hover:bg-white"
          >
            Görüşme ayarla
          </a>
          <p className="mt-8 text-xs font-medium tracking-[0.2em] uppercase text-white/40">
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
                className="flex items-start gap-2.5 text-sm leading-relaxed text-white/80"
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
            className="flex flex-1 flex-col justify-between border border-black bg-ice p-6 sm:p-7"
          >
            <p className="text-xs font-medium tracking-[0.2em] uppercase text-black/50">
              Referans
            </p>
            <div className="mt-6">
              <p className="text-2xl font-medium tracking-tight text-black sm:text-3xl">
                Sabit Fiyat Değil
              </p>
              <p className="mt-3 text-sm leading-relaxed text-black/70">
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
            className="flex flex-1 flex-col justify-between border border-black bg-white p-6 sm:p-7"
          >
            <p className="text-xs font-medium tracking-[0.2em] uppercase text-black/45">
              Yazılı teklif
            </p>
            <div className="mt-6">
              <p className="text-2xl font-medium tracking-tight text-black sm:text-3xl">
                Onaysız İş Yok
              </p>
              <p className="mt-3 text-sm leading-relaxed text-black/65">
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
          className="flex flex-col border border-black bg-black p-6 text-white sm:p-8"
        >
          <h3 className="text-3xl font-medium tracking-tight text-white sm:text-5xl">
            İşleri Gör
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-white/50">
            Yayına aldığımız siteler. Hepsi işe özel tasarlandı.
          </p>
          <ul className="mt-8 flex flex-1 flex-col">
            {WORKS.map((work, i) => (
              <li
                key={work.href}
                className={i < WORKS.length - 1 ? "border-b border-white/12" : ""}
              >
                <a
                  href={work.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between gap-4 py-5"
                >
                  <span>
                    <span className="block text-lg font-medium tracking-tight text-white">
                      {work.name}
                    </span>
                    <span className="mt-1 block text-xs tracking-[0.12em] text-white/40 uppercase">
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
