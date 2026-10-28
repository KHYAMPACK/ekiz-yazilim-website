"use client";

import { motion, useReducedMotion } from "motion/react";
import { CARE, PACKAGES, WORKS } from "@/lib/websitesi";

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

function Price({ value, size }: { value: string; size: "lg" | "md" }) {
  const big =
    size === "lg"
      ? "text-[clamp(3.4rem,8vw,5.4rem)]"
      : "text-[clamp(2.4rem,4vw,3.2rem)]";
  return (
    <p className="flex items-start gap-2 leading-none">
      <span className={`font-display tracking-tight text-sc-accent-text ${big}`}>
        {value}
      </span>
      <span className="mt-1.5 text-sm font-medium tracking-[0.14em] text-sc-muted uppercase">
        ₺
      </span>
    </p>
  );
}

export default function WebPlan() {
  const reduce = useReducedMotion();
  const [kurumsal, buyume, tam] = PACKAGES;

  return (
    <section
      id="plan"
      className="sc-paper border-t border-sc-border"
      aria-labelledby="plan-title"
    >
      <div className="sc-container grid gap-4 py-16 sm:py-24 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.95fr)_minmax(0,0.95fr)] lg:items-stretch">
        <h2 id="plan-title" className="sr-only">
          Paketler ve fiyatlar
        </h2>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="sc-root sc-card sc-card--lg flex flex-col p-6 sm:p-8"
        >
          <p className="sc-eyebrow">{kurumsal.name}</p>
          <div className="mt-6">
            <Price value={kurumsal.price} size="lg" />
          </div>
          <p className="mt-3 text-sm text-sc-text sm:text-base">KDV dahil</p>
          <p className="mt-2 text-sm leading-relaxed text-sc-muted">
            {kurumsal.lead} Kapsam görüşmede netleşir; yazılı teklif görüşmeden
            sonra gelir.
          </p>
          <a href="#gorusme" className="sc-btn sc-btn--primary mt-8">
            Görüşme ayarla
          </a>
          <p className="mt-8 text-xs font-medium tracking-[0.16em] text-sc-muted uppercase">
            Neler dahil
          </p>
          <ul className="mt-4 flex flex-col gap-2.5">
            {kurumsal.items.map((item, i) => (
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
          {[buyume, tam].map((pkg, i) => (
            <motion.div
              key={pkg.id}
              initial={reduce ? false : { opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.65, delay: 0.08 + i * 0.06, ease: EASE }}
              className={`sc-card sc-card--lg flex flex-1 flex-col p-6 sm:p-7 ${
                i === 0 ? "!bg-sc-accent/15" : ""
              }`}
            >
              <p className="sc-eyebrow">{pkg.name}</p>
              <div className="mt-5">
                <Price value={pkg.price} size="md" />
              </div>
              <p className="mt-2 text-xs text-sc-muted">KDV dahil</p>
              <p className="mt-4 text-sm font-medium text-sc-text">{pkg.lead}</p>
              <ul className="mt-3 flex flex-col gap-2">
                {pkg.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-sm leading-relaxed text-sc-text"
                  >
                    <CheckMark />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          id="isler"
          initial={reduce ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.12, ease: EASE }}
          className="sc-root sc-card sc-card--lg flex flex-col p-6 sm:p-8 lg:col-span-1"
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

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="sc-card sc-card--lg grid gap-8 p-6 sm:p-8 lg:col-span-3 lg:grid-cols-[1.1fr_1fr_auto] lg:items-center"
        >
          <div>
            <p className="sc-eyebrow">Yayından sonra</p>
            <p className="sc-h3 mt-4 !text-2xl sm:!text-3xl">{CARE.title}</p>
            <p className="sc-body mt-3 !text-sm">{CARE.lead}</p>
          </div>
          <ul className="flex flex-col gap-2.5">
            {CARE.items.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2.5 text-sm leading-relaxed text-sc-text"
              >
                <CheckMark />
                {item}
              </li>
            ))}
          </ul>
          <div className="lg:text-right">
            <Price value={CARE.price} size="md" />
            <p className="mt-2 text-sm text-sc-muted">aylık, KDV dahil</p>
            <span className="mt-3 inline-block rounded-full bg-sc-accent px-3 py-1 text-[0.6875rem] font-bold tracking-wider text-sc-on-accent uppercase">
              {CARE.badge}
            </span>
          </div>
        </motion.div>

        <p className="text-sm leading-relaxed text-sc-muted lg:col-span-3">
          Onayınız olmadan işe başlamayız. Alan adı ve hosting hesapları sizde
          kalır. Yeni bir bölüm ya da sistem eklemek gibi büyük değişiklikler
          ayrıca konuşulur.
        </p>
      </div>
    </section>
  );
}
