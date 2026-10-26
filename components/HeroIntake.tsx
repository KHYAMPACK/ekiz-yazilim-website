"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, type CSSProperties, type MouseEvent } from "react";
import IntakeProcessModal, {
  type IntakeAnswers,
} from "@/components/IntakeProcessModal";
import { ExamView } from "@/components/egitim/EgitimMockups";
import { works } from "@/lib/works";

const MAX_ATTEMPTS = 3;
const ATTEMPTS_KEY = "ekiz-intake-attempts";
const DONE_KEY = "ekiz-intake-done";

const solutions = [
  {
    id: "website",
    label: "Web Sitesi",
    prompt: "Kurumsal veya kişisel bir web sitesi istiyorum.",
  },
  {
    id: "ecommerce",
    label: "E-Ticaret Sitesi",
    prompt: "Ürün satışı için bir e-ticaret sitesi istiyorum.",
    featured: true,
  },
  {
    id: "landing",
    label: "Tanıtım Sayfası",
    prompt: "İşletmemi tanıtan sade bir tanıtım / landing sayfası istiyorum.",
  },
  {
    id: "education",
    label: "Eğitim Kurumları",
    href: "/egitim",
  },
  {
    id: "custom",
    label: "Özel Yazılım",
    prompt: "İşime özel sade bir yazılım çözümü istiyorum.",
  },
] as const;

type Phase =
  | "idle"
  | "checking"
  | "process"
  | "rejected"
  | "success"
  | "capped"
  | "error";

function readAttempts() {
  try {
    const n = Number(sessionStorage.getItem(ATTEMPTS_KEY) ?? "0");
    return Number.isFinite(n) ? n : 0;
  } catch {
    return 0;
  }
}

function writeAttempts(n: number) {
  try {
    sessionStorage.setItem(ATTEMPTS_KEY, String(n));
  } catch {
    /* ignore */
  }
}

function readDone() {
  try {
    return sessionStorage.getItem(DONE_KEY) === "1";
  } catch {
    return false;
  }
}

function writeDone() {
  try {
    sessionStorage.setItem(DONE_KEY, "1");
  } catch {
    /* ignore */
  }
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default function HeroIntake() {
  const router = useRouter();
  const [problem, setProblem] = useState("");
  const [pendingMessage, setPendingMessage] = useState("");
  const [selected, setSelected] = useState<string | null>(null);
  const [phase, setPhase] = useState<Phase>("idle");
  const [feedback, setFeedback] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [gridCursor, setGridCursor] = useState<{
    x: number;
    y: number;
    edge: number;
  } | null>(null);
  const hoverRaf = useRef(0);
  const targetPos = useRef<{ x: number; y: number } | null>(null);
  const currentPos = useRef<{ x: number; y: number } | null>(null);
  const following = useRef(false);
  const heroSize = useRef({ w: 1, h: 1 });

  useEffect(() => {
    const used = readAttempts();
    setAttempts(used);
    if (readDone()) {
      setPhase("success");
      return;
    }
    if (used >= MAX_ATTEMPTS) {
      setPhase("capped");
      setFeedback(
        "Deneme hakkınız doldu. Aşağıdaki iletişimden yazabilir veya bizi arayabilirsiniz.",
      );
    }
  }, []);

  useEffect(() => {
    return () => {
      following.current = false;
      cancelAnimationFrame(hoverRaf.current);
    };
  }, []);

  /** 0 near page center → soft; 1 near edges → bold */
  function edgeStrength(x: number, y: number) {
    const { w, h } = heroSize.current;
    const nx = (x - w / 2) / (w / 2 || 1);
    const ny = (y - h / 2) / (h / 2 || 1);
    const d = Math.min(1, Math.hypot(nx, ny));
    // Noticeable in the middle, still clearly stronger toward the edges
    const t = Math.max(0, (d - 0.25) / 0.75);
    const curved = t * t;
    return 0.28 + curved * 0.72;
  }

  function tickFollow() {
    const target = targetPos.current;
    if (!target) {
      following.current = false;
      // Keep last spotlight frozen when pointer leaves the hero
      return;
    }

    const cur = currentPos.current ?? target;
    const ease = 0.14;
    const x = cur.x + (target.x - cur.x) * ease;
    const y = cur.y + (target.y - cur.y) * ease;
    const dx = target.x - x;
    const dy = target.y - y;
    const settled = dx * dx + dy * dy < 0.25;

    currentPos.current = settled ? { x: target.x, y: target.y } : { x, y };
    const pos = currentPos.current;
    setGridCursor({
      x: pos.x,
      y: pos.y,
      edge: edgeStrength(pos.x, pos.y),
    });

    hoverRaf.current = requestAnimationFrame(tickFollow);
  }

  function startFollow() {
    if (following.current) return;
    following.current = true;
    cancelAnimationFrame(hoverRaf.current);
    hoverRaf.current = requestAnimationFrame(tickFollow);
  }

  function handleHeroMouseMove(e: MouseEvent<HTMLElement>) {
    if (typeof window !== "undefined" && window.matchMedia("(hover: none)").matches) {
      return;
    }
    const rect = e.currentTarget.getBoundingClientRect();
    heroSize.current = { w: rect.width, h: rect.height };
    targetPos.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
    if (!currentPos.current) {
      currentPos.current = {
        x: targetPos.current.x - 18,
        y: targetPos.current.y - 12,
      };
    }
    startFollow();
  }

  function handleHeroMouseLeave() {
    following.current = false;
    cancelAnimationFrame(hoverRaf.current);
    const pos = currentPos.current ?? targetPos.current;
    targetPos.current = null;
    if (!pos) return;
    currentPos.current = pos;
    setGridCursor({
      x: pos.x,
      y: pos.y,
      edge: edgeStrength(pos.x, pos.y),
    });
  }

  function applySolution(id: string, prompt: string) {
    if (
      phase === "checking" ||
      phase === "process" ||
      phase === "success" ||
      phase === "capped"
    ) {
      return;
    }
    setSelected(id);
    setProblem(prompt);
    setFeedback("");
    if (phase === "rejected" || phase === "error") setPhase("idle");
  }

  async function handleProblemSubmit(e: React.FormEvent) {
    e.preventDefault();
    const text = problem.trim();
    if (!text) return;
    if (
      phase === "checking" ||
      phase === "process" ||
      phase === "success" ||
      phase === "capped"
    ) {
      return;
    }

    const nextAttempts = attempts + 1;
    setAttempts(nextAttempts);
    writeAttempts(nextAttempts);

    if (nextAttempts > MAX_ATTEMPTS) {
      setPhase("capped");
      setFeedback(
        "Deneme hakkınız doldu. Aşağıdaki iletişimden yazabilir veya bizi arayabilirsiniz.",
      );
      return;
    }

    setPhase("checking");
    setFeedback("");

    try {
      const res = await fetch("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mesaj: text, step: "classify" }),
      });
      const data = (await res.json()) as {
        ok?: boolean;
        isProblem?: boolean;
        reason?: string;
        error?: string;
      };

      if (!res.ok) {
        setPhase("error");
        setFeedback(
          data.error ??
            "Bir sorun oluştu. İletişim bölümünden yazabilir veya bizi arayabilirsiniz.",
        );
        maybeCap(nextAttempts);
        return;
      }

      if (data.isProblem === false) {
        await sleep(350);
        setPhase(nextAttempts >= MAX_ATTEMPTS ? "capped" : "rejected");
        setFeedback(
          nextAttempts >= MAX_ATTEMPTS
            ? "Deneme hakkınız doldu. Aşağıdaki iletişimden yazabilir veya bizi arayabilirsiniz."
            : (data.reason ??
              "Bu bir iş problemi gibi durmuyor. Lütfen ihtiyacınızı net yazın."),
        );
        return;
      }

      setPendingMessage(text);
      setPhase("process");
    } catch {
      setPhase("error");
      setFeedback(
        "Bağlantı hatası. İletişim bölümünden yazabilir veya bizi arayabilirsiniz.",
      );
      maybeCap(nextAttempts);
    }
  }

  function handleProcessClose() {
    setPhase("idle");
    setFeedback("");
  }

  function handleProcessSuccess() {
    writeDone();
    setPhase("success");
  }

  async function handleSubmitPhone(payload: {
    answers: IntakeAnswers;
    phone: string;
  }) {
    const text = pendingMessage || problem.trim();
    if (!text) {
      return { ok: false, error: "Mesaj kayboldu. Lütfen tekrar yazın." };
    }

    try {
      const res = await fetch("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mesaj: text,
          telefon: payload.phone,
          answers: payload.answers,
          step: "complete",
        }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) {
        return {
          ok: false,
          error:
            data.error ??
            "Gönderilemedi. Numaranızı kontrol edip tekrar deneyin.",
        };
      }
      return { ok: true };
    } catch {
      return { ok: false, error: "Bağlantı hatası. Lütfen tekrar deneyin." };
    }
  }

  function maybeCap(used: number) {
    if (used >= MAX_ATTEMPTS) {
      setPhase("capped");
      setFeedback(
        "Deneme hakkınız doldu. Aşağıdaki iletişimden yazabilir veya bizi arayabilirsiniz.",
      );
    }
  }

  const problemLocked =
    phase === "checking" ||
    phase === "process" ||
    phase === "success" ||
    phase === "capped";
  return (
    <section
      id="ust"
      className="relative flex min-h-[calc(100svh-4rem)] flex-col justify-center overflow-hidden"
      onMouseMove={handleHeroMouseMove}
      onMouseLeave={handleHeroMouseLeave}
    >
      <div className="sc-glow pointer-events-none absolute inset-0 z-0" />
      <div className="sc-grid pointer-events-none absolute inset-0 z-0" />
      <div
        className="sc-grid-bold pointer-events-none absolute inset-0 z-[1]"
        style={
          gridCursor
            ? ({
                "--hero-mx": `${gridCursor.x}px`,
                "--hero-my": `${gridCursor.y}px`,
                opacity: gridCursor.edge,
              } as CSSProperties)
            : { opacity: 0 }
        }
        aria-hidden
      />

      <IntakeProcessModal
        open={phase === "process"}
        onClose={handleProcessClose}
        onSubmitPhone={handleSubmitPhone}
        onSuccess={handleProcessSuccess}
      />

      <div className="sc-container relative z-10 grid min-w-0 items-center gap-12 py-14 sm:py-20 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-14">
        <div className="min-w-0">
          <p className="sc-chip ekiz-reveal ekiz-reveal--in">
            <span className="size-1.5 rounded-full bg-sc-accent" aria-hidden />
            Ankara merkezli · Türkiye genelinde uzaktan
          </p>

          <h1 className="sc-h1 mt-6">
            Eğitim kurumları için öğrenci takip sistemi ve{" "}
            <span className="sc-em">web sitesi</span>
          </h1>

          <p className="sc-lead mt-5 max-w-xl">
            Yoklama, deneme analizi, ödev ve veli bildirimi tek uygulamada.
            Kurumsal sitenizi de aynı yerden, tek muhatapla kuruyoruz.
          </p>

          {phase === "success" ? (
            <div
              className="sc-card sc-card--lg ekiz-reveal ekiz-reveal--in mt-8 px-6 py-8"
              role="status"
            >
              <p className="sc-eyebrow">Talebiniz Alındı</p>
              <p className="sc-h3 mt-3">En kısa sürede sizi arayacağız.</p>
              <p className="sc-body mt-2 !text-sm">
                Numaranızı aldık. Kısa süre içinde dönüş yapacağız.
              </p>
            </div>
          ) : (
            <div className="sc-card sc-card--lg mt-8 p-5 sm:p-6">
              <form
                onSubmit={handleProblemSubmit}
                className="flex w-full min-w-0 flex-col gap-3"
              >
                <label
                  htmlFor="problem"
                  className="text-sm font-medium text-sc-text"
                >
                  Talebinizi bir cümlede anlatabilirsiniz
                </label>
                <div className="flex w-full min-w-0 flex-col gap-3 sm:flex-row">
                  <input
                    id="problem"
                    type="text"
                    value={problem}
                    maxLength={500}
                    disabled={problemLocked}
                    onChange={(e) => {
                      setProblem(e.target.value);
                      setSelected(null);
                      if (phase === "rejected" || phase === "error") {
                        setPhase("idle");
                        setFeedback("");
                      }
                    }}
                    placeholder="Örn. Müşterilerimin sipariş verebileceği bir site lazım"
                    className="sc-input flex-1 disabled:opacity-60"
                  />
                  <button
                    type="submit"
                    disabled={problemLocked || !problem.trim()}
                    className="sc-btn sc-btn--primary"
                  >
                    {phase === "checking" ? "…" : "Gönder"}
                  </button>
                </div>

                {feedback && (
                  <p
                    className={`rounded-xl border px-4 py-3 text-sm ${
                      phase === "rejected" || phase === "capped" || phase === "error"
                        ? "border-sc-border bg-sc-surface-2 text-sc-text"
                        : "border-sc-accent/40 bg-sc-accent/10 text-sc-text"
                    }`}
                    role="status"
                  >
                    {feedback}
                  </p>
                )}
              </form>

              {phase !== "process" && (
                <div className="mt-5 border-t border-sc-border pt-5">
                  <p className="mb-3 text-xs font-medium tracking-[0.16em] text-sc-muted uppercase">
                    Hazır çözümler
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {solutions.map((s) => {
                      if ("href" in s) {
                        return (
                          <button
                            key={s.id}
                            type="button"
                            disabled={problemLocked}
                            onClick={() => router.push(s.href)}
                            className="rounded-full border border-sc-accent/50 bg-sc-accent/10 px-4 py-2 text-sm font-medium text-sc-accent-text hover:bg-sc-accent hover:text-sc-on-accent disabled:opacity-50"
                          >
                            {s.label} →
                          </button>
                        );
                      }
                      const isActive = selected === s.id;
                      return (
                        <button
                          key={s.id}
                          type="button"
                          disabled={problemLocked}
                          onClick={() => applySolution(s.id, s.prompt)}
                          className={`rounded-full border px-4 py-2 text-sm font-medium disabled:opacity-50 ${
                            isActive
                              ? "border-sc-accent bg-sc-accent text-sc-on-accent"
                              : "border-sc-border text-sc-muted hover:border-sc-accent hover:text-sc-text"
                          }`}
                        >
                          {s.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="mt-6">
            <Link
              href="/isler"
              className="group inline-flex items-center gap-3 text-[0.9375rem] font-medium text-sc-text hover:text-sc-accent-text"
            >
              Yaptığım işleri gör
              <span className="text-sc-muted">{works.length} proje</span>
              <span
                aria-hidden
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
          </div>
        </div>

        <div className="relative min-w-0">
          <div
            className="pointer-events-none absolute -inset-8 rounded-full bg-sc-accent/10 blur-3xl"
            aria-hidden
          />
          <div className="relative mx-auto w-full max-w-[34rem]">
            <ExamView />
            <p className="mt-4 text-center text-sm text-sc-muted">
              Atlas Eğitim Kurumu’nda her gün kullanılıyor ·{" "}
              <Link
                href="/egitim"
                className="text-sc-accent-text underline-offset-4 hover:underline"
              >
                Sistemi gör
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
