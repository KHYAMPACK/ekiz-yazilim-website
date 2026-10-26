"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { whatsappHref } from "@/lib/site";
import { isScPath } from "@/lib/theme";

type Cta = {
  label: string;
  href: string;
  external?: boolean;
  primary?: boolean;
};

type Topic = {
  id: string;
  question: string;
  title: string;
  body: string;
  ctas: Cta[];
};

const TOPICS: Topic[] = [
  {
    id: "egitim",
    question: "Etüt merkezim / kreşim için sistem arıyorum",
    title: "Öğrenci takip sistemi",
    body: "Ödev, yoklama, deneme sınavı, aidat ve veli bildirimi tek uygulamada. Sayfada neler yaptığını görebilirsiniz.",
    ctas: [
      { label: "Eğitim kurumları", href: "/egitim", primary: true },
      { label: "Görüşme ayarla", href: "/egitim#gorusme" },
    ],
  },
  {
    id: "website",
    question: "Web sitesi yaptırmak istiyorum",
    title: "İşinize uygun bir site",
    body: "Kreş, okul, etüt merkezi veya işletmeniz için keşiften yayına özel web sitesi. Sayfada süreci ve örnek işleri görebilirsiniz.",
    ctas: [
      { label: "Web sitesi sayfası", href: "/web-sitesi", primary: true },
      { label: "Görüşme ayarla", href: "/web-sitesi#gorusme" },
    ],
  },
  {
    id: "surec",
    question: "Süreç ve fiyat nasıl işler?",
    title: "Önce netlik, sonra teklif",
    body: "15–20 dakikalık keşif → kapsam ve fiyat yazılı teklif → kurulum. Sürpriz yok; neyin dahil olduğu yazılır.",
    ctas: [
      { label: "Görüşme ayarla", href: "/randevu", primary: true },
      { label: "Nasıl çalışırız", href: "/#surec" },
    ],
  },
];

const AUTO_OPEN_MS = 4500;
const SESSION_KEY = "ekiz-assistant-auto-opened";

type View = "menu" | "answer";

function playCling() {
  try {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const Ctx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!Ctx) return;
    const ctx = new Ctx();

    void ctx.resume().then(() => {
      const now = ctx.currentTime;

      function tone(freq: number, start: number, dur: number, gain = 0.04) {
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.type = "sine";
        osc.frequency.value = freq;
        g.gain.setValueAtTime(0, start);
        g.gain.linearRampToValueAtTime(gain, start + 0.02);
        g.gain.exponentialRampToValueAtTime(0.0001, start + dur);
        osc.connect(g);
        g.connect(ctx.destination);
        osc.start(start);
        osc.stop(start + dur + 0.02);
      }

      tone(880, now, 0.18, 0.035);
      tone(1320, now + 0.09, 0.28, 0.028);

      window.setTimeout(() => {
        void ctx.close();
      }, 600);
    });
  } catch {
    /* ignore — sound is optional */
  }
}

/**
 * Site-wide floating assistant: premade questions + CTA answers + WhatsApp escape.
 */
export default function FloatingAssistant() {
  const panelId = useId();
  const themed = isScPath(usePathname());
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<View>("menu");
  const [activeId, setActiveId] = useState<string | null>(null);
  const [panelMounted, setPanelMounted] = useState(false);
  const [panelIn, setPanelIn] = useState(false);
  const closeTimer = useRef<number | null>(null);
  const autoOpened = useRef(false);

  const waOther = whatsappHref(
    "Merhaba, Ekiz Yazılım asistanından yazıyorum. Başka bir konuda konuşmak istiyorum:",
  );
  const active = TOPICS.find((t) => t.id === activeId) ?? null;

  useEffect(() => {
    if (autoOpened.current) return;
    let t = 0;
    try {
      if (sessionStorage.getItem(SESSION_KEY) === "1") return;
    } catch {
      /* private mode */
    }

    t = window.setTimeout(() => {
      if (autoOpened.current) return;
      autoOpened.current = true;
      try {
        sessionStorage.setItem(SESSION_KEY, "1");
      } catch {
        /* ignore */
      }
      setOpen(true);
      playCling();
    }, AUTO_OPEN_MS);

    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }

    if (open) {
      setPanelMounted(true);
      const id = requestAnimationFrame(() => {
        requestAnimationFrame(() => setPanelIn(true));
      });
      return () => cancelAnimationFrame(id);
    }

    setPanelIn(false);
    closeTimer.current = window.setTimeout(() => {
      setPanelMounted(false);
      setView("menu");
      setActiveId(null);
    }, 320);
  }, [open]);

  function openTopic(id: string) {
    setActiveId(id);
    setView("answer");
  }

  function backToMenu() {
    setView("menu");
    setActiveId(null);
  }

  function close() {
    setOpen(false);
  }

  function toggle() {
    if (open) {
      close();
      return;
    }
    setOpen(true);
  }

  return (
    <div className={`ekiz-assistant ekiz-assistant--docked ${themed ? "ekiz-assistant--sc" : ""} fixed right-3 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-40 flex flex-col items-end gap-2.5 sm:right-5`}>
      {panelMounted && (
        <div
          id={panelId}
          role="dialog"
          aria-label="Ekiz asistan"
          className={`ekiz-assistant__panel ${panelIn ? "is-in" : ""}`}
        >
          <div className="flex items-start justify-between gap-3 border-b border-black bg-ice/45 px-3.5 py-3">
            <div>
              <p className="text-[10px] font-medium tracking-[0.18em] uppercase text-black/45">
                Asistan
              </p>
              <p className="mt-0.5 text-sm font-medium tracking-tight text-black">
                Nasıl yardımcı olayım?
              </p>
            </div>
            <button
              type="button"
              onClick={close}
              className="border border-black bg-white px-2.5 py-1 text-xs font-medium text-black transition-colors hover:bg-black hover:text-white"
              aria-label="Kapat"
            >
              ✕
            </button>
          </div>

          <div className="max-h-[min(24rem,55vh)] overflow-y-auto">
            <div
              key={view}
              className="ekiz-assistant__view"
            >
              {view === "menu" && (
                <div className="flex flex-col">
                  <p className="border-b border-black/10 px-3.5 py-2.5 text-xs leading-relaxed text-black/55">
                    Hazır sorulardan birini seçin — cevapta sonraki adım da var.
                  </p>
                  <ul className="divide-y divide-black">
                    {TOPICS.map((topic) => (
                      <li key={topic.id}>
                        <button
                          type="button"
                          onClick={() => openTopic(topic.id)}
                          className="flex w-full items-center justify-between gap-3 px-3.5 py-3 text-left text-sm font-medium tracking-tight text-black transition-colors hover:bg-ice/35"
                        >
                          <span>{topic.question}</span>
                          <span aria-hidden className="text-black/35">
                            →
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                  {waOther && (
                    <a
                      href={waOther}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex min-h-11 items-center justify-center border-t border-black bg-black px-3 text-xs font-medium tracking-wide text-white transition-colors hover:bg-black/85"
                    >
                      Başka bir şey yazmak istiyorum → WhatsApp
                    </a>
                  )}
                </div>
              )}

              {view === "answer" && active && (
                <div className="flex flex-col">
                  <button
                    type="button"
                    onClick={backToMenu}
                    className="border-b border-black/10 px-3.5 py-2.5 text-left text-xs font-medium text-black/55 transition-colors hover:text-black"
                  >
                    ← Sorulara dön
                  </button>
                  <div className="px-3.5 py-3.5">
                    <p className="text-[10px] font-medium tracking-[0.16em] uppercase text-black/45">
                      {active.question}
                    </p>
                    <p className="mt-2 text-base font-medium tracking-tight text-black">
                      {active.title}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-black/65">
                      {active.body}
                    </p>
                    <div className="mt-4 flex flex-col gap-2">
                      {active.ctas.map((cta) =>
                        cta.external ? (
                          <a
                            key={cta.label}
                            href={cta.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`flex min-h-10 items-center justify-center border border-black px-3 text-xs font-medium tracking-wide transition-colors ${
                              cta.primary
                                ? "bg-black text-white hover:bg-white hover:text-black"
                                : "bg-white text-black hover:bg-ice/40"
                            }`}
                          >
                            {cta.label}
                          </a>
                        ) : (
                          <Link
                            key={cta.label}
                            href={cta.href}
                            onClick={close}
                            className={`flex min-h-10 items-center justify-center border border-black px-3 text-xs font-medium tracking-wide transition-colors ${
                              cta.primary
                                ? "bg-black text-white hover:bg-white hover:text-black"
                                : "bg-white text-black hover:bg-ice/40"
                            }`}
                          >
                            {cta.label}
                          </Link>
                        ),
                      )}
                    </div>
                  </div>
                  {waOther && (
                    <a
                      href={
                        whatsappHref(
                          `Merhaba, “${active.question}” konusunda yazıyorum. Biraz daha konuşmak istiyorum.`,
                        ) ?? waOther
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex min-h-11 items-center justify-center border-t border-black bg-ice/50 px-3 text-xs font-medium tracking-wide text-black transition-colors hover:bg-ice"
                    >
                      Bu konuda WhatsApp’tan yaz
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={toggle}
        className={`ekiz-assistant__fab ${open ? "is-open" : ""}`}
      >
        <span className="ekiz-assistant__fab-mark" aria-hidden>
          {open ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="1.8"
              />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M4 6h16v10H8l-4 3V6z"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinejoin="miter"
              />
              <path
                d="M8 10h8M8 13h5"
                stroke="currentColor"
                strokeWidth="1.6"
              />
            </svg>
          )}
        </span>
        <span className="ekiz-assistant__fab-label">
          {open ? "Kapat" : "Yardım"}
        </span>
        {!open && <span className="ekiz-assistant__fab-pulse" aria-hidden />}
      </button>
    </div>
  );
}
