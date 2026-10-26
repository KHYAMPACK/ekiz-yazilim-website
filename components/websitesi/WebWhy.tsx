"use client";

import { motion, useReducedMotion } from "motion/react";
import { COMPARE_COLS, COMPARE_ROWS } from "@/lib/websitesi";
import WebReveal from "./WebReveal";

const EASE = [0.22, 1, 0.36, 1] as const;

function CheckIcon() {
  return (
    <span
      className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-sc-accent text-sc-on-accent"
      aria-hidden
    >
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path
          d="M2 6.2L4.6 8.8L10 3.2"
          stroke="currentColor"
          strokeWidth="1.6"
        />
      </svg>
    </span>
  );
}

function DashIcon() {
  return (
    <span
      className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border border-sc-border text-sc-muted"
      aria-hidden
    >
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
        <path d="M2 5h6" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    </span>
  );
}

export default function WebWhy() {
  const reduce = useReducedMotion();

  return (
    <section
      id="neden"
      className="sc-section"
      aria-labelledby="neden-title"
    >
      <div className="sc-container">
        <WebReveal className="mx-auto max-w-2xl text-center">
          <p className="sc-eyebrow mb-4">Neden biz?</p>
          <h2 id="neden-title" className="sc-h2">
            Online olmanın <span className="sc-em">daha net</span> yolu.
          </h2>
          <p className="sc-lead mt-5">
            Hazır site, freelance veya klasik ajansla karşılaştırdığınızda süre,
            fiyat ve yayın sonrası destek çoğu zaman belirsiz kalır. Ekiz’de
            kapsam yazılıdır; yayından sonra da yanınızdayız.
          </p>
        </WebReveal>

        <div className="sc-card sc-card--lg mt-12 overflow-x-auto overflow-y-hidden">
          <table className="w-full min-w-[40rem] border-collapse text-left">
            <caption className="sr-only">
              Ekiz, ajans, freelance ve kendin yap karşılaştırması
            </caption>
            <thead>
              <tr>
                <th
                  scope="col"
                  className="w-[18%] border-b border-sc-border px-4 py-4 text-xs font-medium tracking-[0.16em] text-sc-muted uppercase"
                >
                  <span className="sr-only">Kriter</span>
                </th>
                {COMPARE_COLS.map((col) => (
                  <th
                    key={col.key}
                    scope="col"
                    className={`border-b border-l border-sc-border px-4 py-4 text-xs font-medium tracking-[0.16em] uppercase ${
                      col.ours
                        ? "bg-sc-accent text-sc-on-accent"
                        : "text-sc-muted"
                    }`}
                  >
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COMPARE_ROWS.map((row, i) => (
                <motion.tr
                  key={row.label}
                  initial={reduce ? false : { opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.07,
                    ease: EASE,
                  }}
                >
                  <th
                    scope="row"
                    className={`px-4 py-4 text-xs font-medium tracking-[0.16em] text-sc-muted uppercase ${
                      i < COMPARE_ROWS.length - 1 ? "border-b border-sc-border" : ""
                    }`}
                  >
                    {row.label}
                  </th>
                  {COMPARE_COLS.map((col) => {
                    const value = row[col.key];
                    return (
                      <td
                        key={col.key}
                        className={`border-l border-sc-border px-4 py-4 ${
                          i < COMPARE_ROWS.length - 1
                            ? "border-b border-sc-border"
                            : ""
                        } ${col.ours ? "bg-sc-accent/10" : ""}`}
                      >
                        <span className="flex items-start gap-2.5 text-sm leading-snug text-sc-text">
                          {col.ours ? <CheckIcon /> : <DashIcon />}
                          {value}
                        </span>
                      </td>
                    );
                  })}
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
