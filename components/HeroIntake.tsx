"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, type CSSProperties, type MouseEvent } from "react";
import IntakeProcessModal, {
  type IntakeAnswers,
} from "@/components/IntakeProcessModal";
import Logo from "./Logo";
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
      className="hero-intake relative flex min-h-[calc(100svh-3.5rem)] flex-col justify-center overflow-hidden border-b border-black"
      onMouseMove={handleHeroMouseMove}
      onMouseLeave={handleHeroMouseLeave}
    >
      <div className="pointer-events-none absolute inset-0 z-0 hero-intake__wash" />
      <div className="pointer-events-none absolute inset-0 z-0 hero-intake__grid" />
      <div
        className="pointer-events-none absolute inset-0 z-[1] hero-intake__grid-bold"
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
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-1 bg-ice" />

      <IntakeProcessModal
        open={phase === "process"}
        onClose={handleProcessClose}
        onSubmitPhone={handleSubmitPhone}
        onSuccess={handleProcessSuccess}
      />

      <div className="relative z-10 mx-auto w-full min-w-0 max-w-3xl px-4 py-12 sm:px-6 sm:py-20">
        <div className="ekiz-reveal ekiz-reveal--in mb-6 flex justify-center sm:mb-8">
          <span className="sm:hidden">
            <Logo
              variant="full"
              tone="onLight"
              size={64}
              layout="stacked"
              assembleOnClick
            />
          </span>
          <span className="hidden sm:inline">
            <Logo
              variant="full"
              tone="onLight"
              size={96}
              layout="stacked"
              assembleOnClick
            />
          </span>
        </div>

        <h1 className="mb-8 text-center text-base font-medium tracking-tight text-black/70 sm:mb-12 sm:text-lg">
          Eğitim Kurumları İçin Öğrenci Takip Sistemi Ve Web Sitesi
        </h1>

        {phase === "success" ? (
          <div
            className="ekiz-reveal ekiz-reveal--in border border-black bg-white px-6 py-10 text-center"
            role="status"
          >
            <p className="text-xs font-medium tracking-[0.2em] uppercase text-black/45">
              Talebiniz Alındı
            </p>
            <p className="mt-3 text-xl font-medium tracking-tight text-black sm:text-2xl">
              En Kısa Sürede Sizi Arayacağız.
            </p>
            <p className="mt-3 text-sm text-black/60">
              Numaranızı aldık. Kısa süre içinde dönüş yapacağız.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleProblemSubmit}
            className="flex w-full min-w-0 flex-col gap-4"
          >
            <label
              htmlFor="problem"
              className="text-center text-sm font-medium tracking-wide text-black/70"
            >
               Talebiniz bir cümlede anlatabilirsiniz
            </label>
            <div className="flex w-full min-w-0 flex-col gap-0 border border-black sm:flex-row">
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
                placeholder="Örn. Müşterilerimin online sipariş verebileceği bir site lazım"
                className="min-h-12 w-full min-w-0 flex-1 border-0 bg-white px-4 text-base text-black placeholder:text-black/35 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ice disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={problemLocked || !problem.trim()}
                className="min-h-12 border-t border-black bg-black px-6 text-sm font-medium tracking-wide text-white transition-colors duration-300 hover:bg-black/85 disabled:cursor-not-allowed disabled:opacity-60 sm:border-t-0 sm:border-l"
              >
                {phase === "checking" ? "…" : "Gönder"}
              </button>
            </div>

            {feedback && (
              <p
                className={`border px-4 py-3 text-center text-sm transition-opacity duration-300 ${
                  phase === "rejected" || phase === "capped" || phase === "error"
                    ? "border-black text-black"
                    : "border-ice bg-ice/40 text-black"
                }`}
                role="status"
              >
                {feedback}
              </p>
            )}

          </form>
        )}

        {phase !== "success" && phase !== "process" && (
          <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <span className="text-xs font-medium tracking-widest uppercase text-black/45">
              Hazır Çözümler
            </span>
            <div className="flex flex-wrap justify-center gap-2">
              {solutions.map((s) => {
                if ("href" in s) {
                  return (
                    <button
                      key={s.id}
                      type="button"
                      disabled={problemLocked}
                      onClick={() => router.push(s.href)}
                      className="border border-black bg-white px-4 py-2 text-sm font-medium text-black transition-colors duration-300 hover:bg-ice/50 disabled:opacity-50"
                    >
                      {s.label}
                    </button>
                  );
                }
                const isActive = selected === s.id;
                const isFeatured = "featured" in s && s.featured;
                return (
                  <button
                    key={s.id}
                    type="button"
                    disabled={problemLocked}
                    onClick={() => applySolution(s.id, s.prompt)}
                    className={`border px-4 py-2 text-sm font-medium transition-colors duration-300 disabled:opacity-50 ${
                      isActive || isFeatured
                        ? "border-black bg-ice text-black hover:bg-black hover:text-white"
                        : "border-black bg-white text-black hover:bg-ice/50"
                    }`}
                  >
                    {s.label}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <div className="mt-10 flex justify-center">
          <Link
            href="/isler"
            className="group inline-flex min-h-12 items-center gap-3 border border-black bg-white px-5 text-sm font-medium tracking-wide text-black transition-colors duration-300 hover:bg-black hover:text-white"
          >
            Yaptığım işleri gör
            <span className="text-black/45 transition-colors duration-300 group-hover:text-white/60">
              {works.length} proje
            </span>
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
