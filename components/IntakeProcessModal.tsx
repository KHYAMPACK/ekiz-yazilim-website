"use client";

import { useEffect, useRef, useState } from "react";
import { normalizePhone } from "@/lib/intake";

export type IntakeAnswers = Record<string, string>;

type TimedStep = {
  kind: "scan" | "tip" | "wrap";
  title: string;
  detail: string;
  durationMs: number;
  progressTo: number;
};

type QuestionStep = {
  kind: "question";
  id: string;
  title: string;
  detail: string;
  options: readonly string[];
  progressTo: number;
};

type PhoneStep = { kind: "phone"; progressTo: number };

type Step = TimedStep | QuestionStep | PhoneStep;

/** Comfortable reading time for Turkish tip copy. */
function tipDurationMs(detail: string) {
  const words = detail.trim().split(/\s+/).filter(Boolean).length;
  // ~2.8s per word is too slow; ~0.45s/word + buffer ≈ relaxed reading
  return Math.min(14000, Math.max(8500, Math.round(words * 420) + 2500));
}

const STEPS: readonly Step[] = [
  {
    kind: "scan",
    title: "Hazırlanıyor",
    detail: "İhtiyacınıza bakıyoruz. Kısa ipuçlarıyla devam ediyoruz.",
    durationMs: 3200,
    progressTo: 8,
  },
  {
    kind: "tip",
    title: "Biliyor muydunuz?",
    detail:
      "İyi kurulmuş bir e-ticaret sitesi, satışları ciddi oranda artırabilir — bazı işletmelerde %60’a varan büyüme görülür.",
    durationMs: tipDurationMs(
      "İyi kurulmuş bir e-ticaret sitesi, satışları ciddi oranda artırabilir — bazı işletmelerde %60’a varan büyüme görülür.",
    ),
    progressTo: 26,
  },
  {
    kind: "question",
    id: "dijital",
    title: "İşinizi dijitale taşımaya hazır mısınız?",
    detail: "Küçük bir adım bile yeter. Biz gerisini sadeleştiririz.",
    options: ["Evet", "Neredeyse"],
    progressTo: 40,
  },
  {
    kind: "tip",
    title: "Biliyor muydunuz?",
    detail:
      "Müşterilerin büyük kısmı alışverişten önce işletmeyi internette arar. Net bir web sitesi, güvenin ilk adımıdır.",
    durationMs: tipDurationMs(
      "Müşterilerin büyük kısmı alışverişten önce işletmeyi internette arar. Net bir web sitesi, güvenin ilk adımıdır.",
    ),
    progressTo: 58,
  },
  {
    kind: "question",
    id: "online",
    title: "Müşterileriniz sizi internette bulsun ister misiniz?",
    detail: "Vitrininizi açık tutmak, kapıyı gece gündüz açık bırakmaya benzer.",
    options: ["Evet", "Kesinlikle"],
    progressTo: 72,
  },
  {
    kind: "tip",
    title: "Biliyor muydunuz?",
    detail:
      "Etüt merkezleri ve kreşler için sade bir takip sistemi ve net bir web sitesi çoğu zaman karmaşık paketlerden daha hızlı sonuç verir.",
    durationMs: tipDurationMs(
      "Etüt merkezleri ve kreşler için sade bir takip sistemi ve net bir web sitesi çoğu zaman karmaşık paketlerden daha hızlı sonuç verir.",
    ),
    progressTo: 88,
  },
  {
    kind: "wrap",
    title: "Neredeyse bitti",
    detail: "İsterseniz numaranızı bırakın — sizi arayalım.",
    durationMs: 3500,
    progressTo: 100,
  },
  { kind: "phone", progressTo: 100 },
];

const LABELS: Record<string, string> = {
  dijital: "Dijitale hazır",
  online: "Online görünürlük",
};

const YES_NO_TOTAL = STEPS.filter((s) => s.kind === "question").length;
const EXIT_MS = 420;

export function formatIntakeAnswers(answers: IntakeAnswers) {
  return Object.entries(answers)
    .map(([key, value]) => `${LABELS[key] ?? key}: ${value}`)
    .join("\n");
}

function sleep(ms: number, signal: AbortSignal) {
  return new Promise<void>((resolve, reject) => {
    if (signal.aborted) {
      reject(new DOMException("Aborted", "AbortError"));
      return;
    }
    const id = window.setTimeout(() => resolve(), ms);
    const onAbort = () => {
      window.clearTimeout(id);
      reject(new DOMException("Aborted", "AbortError"));
    };
    signal.addEventListener("abort", onAbort, { once: true });
  });
}

type Props = {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  onSubmitPhone: (payload: {
    answers: IntakeAnswers;
    phone: string;
  }) => Promise<{ ok: boolean; error?: string }>;
};

export default function IntakeProcessModal({
  open,
  onClose,
  onSuccess,
  onSubmitPhone,
}: Props) {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [progressLabel, setProgressLabel] = useState(0);
  const [answers, setAnswers] = useState<IntakeAnswers>({});
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [contentKey, setContentKey] = useState(0);

  const answersRef = useRef<IntakeAnswers>({});
  const barRef = useRef<HTMLDivElement>(null);
  const progressValueRef = useRef(0);
  const questionResolverRef = useRef<((option: string) => void) | null>(null);
  const onCloseRef = useRef(onClose);
  const onSuccessRef = useRef(onSuccess);
  const onSubmitRef = useRef(onSubmitPhone);

  onCloseRef.current = onClose;
  onSuccessRef.current = onSuccess;
  onSubmitRef.current = onSubmitPhone;
  answersRef.current = answers;

  function setBarWidth(pct: number, durationMs: number, syncLabel = true) {
    const el = barRef.current;
    progressValueRef.current = pct;
    if (syncLabel) setProgressLabel(Math.round(pct));
    if (!el) return;

    if (durationMs <= 0) {
      el.style.transition = "none";
      el.style.width = `${pct}%`;
      return;
    }

    const from = parseFloat(el.style.width) || 0;
    el.style.transition = "none";
    el.style.width = `${from}%`;
    void el.offsetWidth;
    el.style.transition = `width ${durationMs}ms cubic-bezier(0.22, 1, 0.36, 1)`;
    el.style.width = `${pct}%`;
  }

  function animateProgress(
    from: number,
    to: number,
    durationMs: number,
    signal: AbortSignal,
  ) {
    return new Promise<void>((resolve, reject) => {
      if (signal.aborted) {
        reject(new DOMException("Aborted", "AbortError"));
        return;
      }

      setBarWidth(from, 0, true);

      let raf1 = 0;
      let raf2 = 0;
      let labelTimer = 0;
      let doneTimer = 0;

      const cleanup = () => {
        cancelAnimationFrame(raf1);
        cancelAnimationFrame(raf2);
        window.clearInterval(labelTimer);
        window.clearTimeout(doneTimer);
        signal.removeEventListener("abort", onAbort);
      };

      const onAbort = () => {
        cleanup();
        reject(new DOMException("Aborted", "AbortError"));
      };
      signal.addEventListener("abort", onAbort, { once: true });

      raf1 = requestAnimationFrame(() => {
        raf2 = requestAnimationFrame(() => {
          setBarWidth(to, durationMs, false);
          const labelStart = performance.now();
          labelTimer = window.setInterval(() => {
            const t = Math.min(1, (performance.now() - labelStart) / durationMs);
            const eased = 1 - (1 - t) * (1 - t);
            setProgressLabel(Math.round(from + (to - from) * eased));
          }, 100);

          doneTimer = window.setTimeout(() => {
            cleanup();
            setProgressLabel(to);
            progressValueRef.current = to;
            resolve();
          }, durationMs + 50);
        });
      });
    });
  }

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout> | undefined;
    let raf = 0;

    if (open) {
      setMounted(true);
      setStepIndex(0);
      setProgressLabel(0);
      progressValueRef.current = 0;
      setAnswers({});
      answersRef.current = {};
      setPhone("");
      setPhoneError("");
      setSubmitting(false);
      setContentKey(0);
      questionResolverRef.current = null;

      raf = requestAnimationFrame(() => {
        raf = requestAnimationFrame(() => {
          setVisible(true);
          if (barRef.current) {
            barRef.current.style.transition = "none";
            barRef.current.style.width = "0%";
          }
        });
      });
    } else {
      questionResolverRef.current = null;
      setVisible(false);
      timeout = setTimeout(() => {
        setMounted(false);
        setStepIndex(0);
        setProgressLabel(0);
        progressValueRef.current = 0;
      }, EXIT_MS);
    }

    return () => {
      cancelAnimationFrame(raf);
      if (timeout) clearTimeout(timeout);
    };
  }, [open]);

  useEffect(() => {
    if (!mounted || !visible) return;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = prev;
    };
  }, [mounted, visible]);

  // Single sequential runner — avoids stuck progress from overlapping effect cleanups.
  useEffect(() => {
    if (!open || !visible) return;

    const ac = new AbortController();
    const { signal } = ac;

    async function run() {
      let from = 0;

      for (let i = 0; i < STEPS.length; i++) {
        if (signal.aborted) return;

        const current = STEPS[i]!;
        setStepIndex(i);
        setContentKey((k) => k + 1);

        if (current.kind === "phone") {
          setBarWidth(100, 300);
          return;
        }

        if (current.kind === "question") {
          setProgressLabel(Math.round(from));
          const choice = await new Promise<string>((resolve, reject) => {
            questionResolverRef.current = resolve;
            const onAbort = () => {
              questionResolverRef.current = null;
              reject(new DOMException("Aborted", "AbortError"));
            };
            signal.addEventListener("abort", onAbort, { once: true });
          });

          if (signal.aborted) return;

          const nextAnswers = {
            ...answersRef.current,
            [current.id]: choice,
          };
          answersRef.current = nextAnswers;
          setAnswers(nextAnswers);
          setBarWidth(current.progressTo, 450);
          from = current.progressTo;
          await sleep(320, signal);
          continue;
        }

        await animateProgress(from, current.progressTo, current.durationMs, signal);
        from = current.progressTo;
      }
    }

    run().catch((err) => {
      if (err instanceof DOMException && err.name === "AbortError") return;
      console.error(err);
    });

    return () => {
      ac.abort();
      questionResolverRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, visible]);

  function requestClose() {
    if (submitting || !open) return;
    onCloseRef.current();
  }

  function pickOption(option: string) {
    const resolve = questionResolverRef.current;
    if (!resolve || !open) return;
    questionResolverRef.current = null;
    resolve(option);
  }

  async function handlePhoneSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (submitting || !open) return;

    const check = normalizePhone(phone);
    if (!check.ok) {
      setPhoneError(check.reason);
      return;
    }

    setSubmitting(true);
    setPhoneError("");
    const result = await onSubmitRef.current({
      answers: answersRef.current,
      phone,
    });
    setSubmitting(false);

    if (!result.ok) {
      setPhoneError(result.error ?? "Gönderilemedi. Tekrar deneyin.");
      return;
    }

    onSuccessRef.current();
  }

  if (!mounted) return null;

  const step = STEPS[stepIndex];
  const questionNumber =
    STEPS.slice(0, stepIndex + 1).filter((s) => s.kind === "question").length;

  return (
    <div
      className={`fixed inset-0 z-[80] flex items-center justify-center px-4 transition-opacity ease-out ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      style={{ transitionDuration: `${EXIT_MS}ms` }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="intake-process-title"
    >
      <button
        type="button"
        aria-label="Kapat"
        className="absolute inset-0 cursor-default bg-white/55 backdrop-blur-md transition-opacity"
        style={{ transitionDuration: `${EXIT_MS}ms` }}
        onClick={requestClose}
      />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#00000007_1px,transparent_1px),linear-gradient(to_bottom,#00000007_1px,transparent_1px)] bg-size-[40px_40px]" />

      <div
        className={`relative w-full max-w-lg border border-black bg-white transition-[opacity,transform] ease-out ${
          visible
            ? "translate-y-0 scale-100 opacity-100"
            : "translate-y-3 scale-[0.98] opacity-0"
        }`}
        style={{ transitionDuration: `${EXIT_MS}ms` }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative border-b border-black px-5 py-4 sm:px-7">
          <button
            type="button"
            onClick={requestClose}
            disabled={submitting}
            className="absolute top-3 right-3 flex size-9 items-center justify-center border border-black bg-white text-lg leading-none text-black transition-colors hover:bg-ice/50 disabled:opacity-50 sm:top-3.5 sm:right-3.5"
            aria-label="Kapat"
          >
            ×
          </button>
          <div className="flex items-end justify-between gap-4 pr-10">
            <p className="text-[10px] font-medium tracking-[0.22em] uppercase text-black/45">
              {step?.kind === "phone" ? "Son adım" : "Hazırlanıyor"}
            </p>
            <p className="text-xs tabular-nums text-black/45">
              %{progressLabel}
            </p>
          </div>
          <div className="mt-3 h-1.5 w-full overflow-hidden bg-black/10">
            <div
              ref={barRef}
              className="h-full bg-black"
              style={{ width: "0%" }}
            />
          </div>
        </div>

        <div
          key={contentKey}
          className="intake-step-in min-h-[16rem] px-5 py-8 sm:min-h-[18rem] sm:px-7 sm:py-10"
        >
          {step?.kind === "question" ? (
            <>
              <p className="mb-3 text-xs font-medium tracking-[0.18em] uppercase text-black/45">
                Kısa soru {questionNumber} / {YES_NO_TOTAL}
              </p>
              <h2
                id="intake-process-title"
                className="text-2xl font-medium tracking-tight text-black sm:text-3xl"
              >
                {step.title}
              </h2>
              <p className="mt-2 text-sm text-black/60">{step.detail}</p>
              <div className="mt-8 grid grid-cols-2 gap-0 border border-black">
                {step.options.map((opt, i) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => pickOption(opt)}
                    className={`min-h-12 text-sm font-medium tracking-wide text-black transition-colors hover:bg-ice/50 ${
                      i > 0 ? "border-l border-black" : ""
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </>
          ) : step?.kind === "tip" ? (
            <>
              <div className="mb-5 flex items-center gap-3">
                <span className="intake-pulse-dot inline-block size-2.5 shrink-0 bg-black" />
                <span className="text-xs font-medium tracking-[0.18em] uppercase text-black/45">
                  İpucu
                </span>
              </div>
              <h2
                id="intake-process-title"
                className="text-2xl font-medium tracking-tight text-black sm:text-3xl"
              >
                {step.title}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-black/75 sm:text-lg">
                {step.detail}
              </p>
            </>
          ) : step?.kind === "phone" ? (
            <form onSubmit={handlePhoneSubmit} className="flex flex-col gap-5">
              <div>
                <p className="mb-3 text-xs font-medium tracking-[0.18em] uppercase text-black/45">
                  İsteğe bağlı
                </p>
                <h2
                  id="intake-process-title"
                  className="text-2xl font-medium tracking-tight text-black sm:text-3xl"
                >
                  Numaranızı bırakın, sizi arayalım.
                </h2>
                <p className="mt-2 text-sm text-black/60">
                  Girdiğiniz numarayı arayarak kısa sürede dönüş yaparız.
                  İstemezseniz kapatabilirsiniz.
                </p>
              </div>
              <div className="flex w-full min-w-0 flex-col gap-0 border border-black sm:flex-row">
                <label className="sr-only" htmlFor="intake-telefon">
                  Telefon
                </label>
                <input
                  id="intake-telefon"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  disabled={submitting}
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    setPhoneError("");
                  }}
                  placeholder="05XX XXX XX XX"
                  className="min-h-12 w-full min-w-0 flex-1 border-0 bg-white px-4 text-base text-black placeholder:text-black/35 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ice disabled:opacity-60"
                />
                <button
                  type="submit"
                  disabled={submitting || !phone.trim()}
                  className="min-h-12 border-t border-black bg-black px-6 text-sm font-medium tracking-wide text-white transition-colors hover:bg-black/85 disabled:cursor-not-allowed disabled:opacity-60 sm:border-t-0 sm:border-l"
                >
                  {submitting ? "…" : "Ara beni"}
                </button>
              </div>
              {phoneError && (
                <p className="border border-black px-4 py-3 text-sm text-black">
                  {phoneError}
                </p>
              )}
            </form>
          ) : (
            <>
              <div className="mb-5 flex items-center gap-3">
                <span className="intake-pulse-dot inline-block size-2.5 shrink-0 bg-black" />
                <span className="text-xs font-medium tracking-[0.18em] uppercase text-black/45">
                  {step?.kind === "wrap" ? "Tamamlanıyor" : "İşleniyor"}
                </span>
              </div>
              <h2
                id="intake-process-title"
                className="text-2xl font-medium tracking-tight text-black sm:text-3xl"
              >
                {step?.title}
              </h2>
              <p className="mt-2 text-sm text-black/60 sm:text-base">
                {step?.detail}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
