"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ExamView } from "@/components/egitim/EgitimMockups";
import { works } from "@/lib/works";

const FRAME_W = 1440;
const FRAME_H = 900;

/** The demo school site, scaled down to fit its box; not clickable on its own. */
function DemoFrame() {
  const boxRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.3);

  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const update = () => setScale(el.clientWidth / FRAME_W);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div className="overflow-hidden rounded-xl border border-sc-border bg-sc-surface">
      <div className="flex items-center gap-1.5 border-b border-sc-border px-3 py-2">
        <span className="size-2 rounded-full bg-sc-border" />
        <span className="size-2 rounded-full bg-sc-border" />
        <span className="size-2 rounded-full bg-sc-border" />
        <span className="ml-2 truncate rounded-full bg-sc-bg px-2.5 py-0.5 text-[0.7rem] text-sc-muted">
          ornek-okul.com
        </span>
      </div>
      <div
        ref={boxRef}
        className="relative w-full overflow-hidden"
        style={{ aspectRatio: `${FRAME_W} / ${FRAME_H}` }}
      >
        <iframe
          src="/demo/okul/index.html?embed"
          title="Örnek okul sitesi önizlemesi"
          loading="lazy"
          tabIndex={-1}
          aria-hidden="true"
          className="pointer-events-none absolute top-0 left-0 origin-top-left border-0"
          style={{ width: FRAME_W, height: FRAME_H, transform: `scale(${scale})` }}
        />
      </div>
    </div>
  );
}

const cardClass =
  "group sc-card sc-card--lg relative flex flex-col p-5 transition-transform duration-300 hover:-translate-y-1 sm:p-7";
const stretched =
  "after:absolute after:inset-0 after:z-10 after:content-[''] focus-visible:outline-none";

export default function HeroPaths() {
  return (
    <section
      id="ust"
      className="relative overflow-hidden"
    >
      <div className="sc-glow pointer-events-none absolute inset-0 z-0" />
      <div className="sc-grid pointer-events-none absolute inset-0 z-0" />

      <div className="sc-container relative z-10 py-14 sm:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="sc-chip">
            <span className="size-1.5 rounded-full bg-sc-accent" aria-hidden />
            Ankara merkezli · Türkiye genelinde uzaktan
          </p>
          <h1 className="sc-h1 mt-6">
            Ne için geldiniz? <span className="sc-em">Doğru yerdesiniz.</span>
          </h1>
          <p className="sc-lead mx-auto mt-5 max-w-xl">
            İki şey yapıyoruz ve ikisinde de tek muhatap biziz. Size uyanı seçin.
          </p>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-2 lg:gap-6">
          {/* Web sitesi */}
          <article className={cardClass}>
            <p className="sc-eyebrow">Web sitesi</p>
            <h2 className="sc-h3 mt-3">
              <Link href="/web-sitesi" className={stretched}>
                Sitenizi biz kuruyoruz.
              </Link>
            </h2>
            <p className="sc-body mt-2 max-w-md !text-sm">
              Tasarımı, metni ve teknik işleri biz yürütürüz. Telefonda düzgün
              çalışan, işinizi anlatan bir site; yazılı teklifle.
            </p>
            <div className="mt-5">
              <DemoFrame />
            </div>
            <p className="mt-5 inline-flex items-center gap-2 text-[0.9375rem] font-medium text-sc-accent-text">
              Web sitesi seçenekleri
              <span
                aria-hidden
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </p>
          </article>

          {/* Eğitim kurumları */}
          <article className={cardClass}>
            <p className="sc-eyebrow">Eğitim kurumları</p>
            <h2 className="sc-h3 mt-3">
              <Link href="/egitim" className={stretched}>
                Öğrenci takip sistemi.
              </Link>
            </h2>
            <p className="sc-body mt-2 max-w-md !text-sm">
              Yoklama, deneme analizi, ödev ve veli bildirimi tek uygulamada.
              Atlas Eğitim Kurumu&rsquo;nda her gün kullanılıyor.
            </p>
            <div className="mt-5 flex-1">
              <div className="pointer-events-none origin-top">
                <ExamView />
              </div>
            </div>
            <p className="mt-5 inline-flex items-center gap-2 text-[0.9375rem] font-medium text-sc-accent-text">
              Sistemi gör
              <span
                aria-hidden
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </p>
          </article>
        </div>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 text-[0.9375rem] sm:flex-row sm:gap-8">
          <Link
            href="/isler"
            className="group inline-flex items-center gap-3 font-medium text-sc-text hover:text-sc-accent-text"
          >
            Yaptığım işleri gör
            <span className="text-sc-muted">{works.length} proje</span>
            <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
          <Link
            href="/#iletisim"
            className="text-sc-muted underline-offset-4 hover:text-sc-text hover:underline"
          >
            Hangisi olduğundan emin değil misiniz? Yazın.
          </Link>
        </div>
      </div>
    </section>
  );
}
