"use client";

import { useEffect, useRef, useState } from "react";
import { whatsappHref } from "@/lib/site";
import type { CheckResult, Item, Level } from "@/lib/sitecheck/present";

const LEVEL_LABEL: Record<Level, string> = {
  critical: "Acil",
  high: "Önemli",
  medium: "Orta",
};

const LEVEL_BORDER: Record<Level, string> = {
  critical: "border-l-[#e5604a]",
  high: "border-l-sc-accent",
  medium: "border-l-sc-border",
};

const LEVEL_CHIP: Record<Level, string> = {
  critical: "bg-[#e5604a] text-[#141413]",
  high: "bg-sc-accent text-sc-on-accent",
  medium: "border border-sc-border text-sc-muted",
};

/**
 * The server answers once, after about half a minute, so the bar is an estimate of the wait:
 * it climbs quickly, slows down towards 92% and jumps to 100% when the answer arrives.
 * The step labels are the real checks the server runs, in the order it runs them.
 */
const STEPS: { from: number; label: string }[] = [
  { from: 0, label: "Alan adı kaydı ve bağlantısı kontrol ediliyor" },
  { from: 16, label: "Güvenlik sertifikası okunuyor" },
  { from: 36, label: "Sayfa hızı ve telefon uyumu ölçülüyor" },
  { from: 58, label: "Google ayarları kontrol ediliyor: başlık, açıklama, site haritası" },
  { from: 78, label: "İletişim butonları ve güncellik bakılıyor" },
  { from: 92, label: "Sonuçlar hazırlanıyor" },
];

function stepLabel(progress: number) {
  let label = STEPS[0].label;
  for (const s of STEPS) if (progress >= s.from) label = s.label;
  return label;
}

/** State and submit handler shared by every place the checker appears (own page, /web-sitesi hero). */
export function useSiteCheck() {
  const [url, setUrl] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<CheckResult | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  // Climb towards 92% while we wait.
  useEffect(() => {
    if (!loading) return;
    const started = Date.now();
    const id = window.setInterval(() => {
      const t = (Date.now() - started) / 1000;
      setProgress(Math.min(92, 92 * (1 - Math.exp(-t / 11))));
    }, 250);
    return () => window.clearInterval(id);
  }, [loading]);

  function close() {
    abortRef.current?.abort();
    setOpen(false);
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (loading || !url.trim()) return;
    const ctrl = new AbortController();
    abortRef.current = ctrl;
    setOpen(true);
    setLoading(true);
    setProgress(0);
    setError(null);
    setResult(null);
    try {
      const res = await fetch("/api/site-kontrol", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
        signal: ctrl.signal,
      });
      // The firewall answers a blocked visitor with its own 403/429 page, not our JSON.
      if (res.status === 403 || res.status === 429) {
        setError("Kısa sürede çok fazla kontrol yaptınız. Birkaç dakika sonra tekrar deneyin.");
        return;
      }
      const data = (await res.json()) as { result?: CheckResult; error?: unknown };
      if (!res.ok || !data.result) {
        setError(
          typeof data.error === "string"
            ? data.error
            : "Kontrol tamamlanamadı. Lütfen tekrar deneyin.",
        );
      } else {
        // Let the bar reach the end before the findings replace it.
        setProgress(100);
        await new Promise((r) => setTimeout(r, 450));
        if (!ctrl.signal.aborted) setResult(data.result);
      }
    } catch {
      if (!ctrl.signal.aborted) {
        setError("Bağlantı kurulamadı. İnternetinizi kontrol edip tekrar deneyin.");
      }
    } finally {
      setLoading(false);
    }
  }

  return { url, setUrl, open, loading, progress, error, result, submit, close };
}

export type SiteCheckState = ReturnType<typeof useSiteCheck>;

function Finding({ item, index }: { item: Item; index: number }) {
  return (
    <article className={`sc-card border-l-4 p-5 sm:p-6 ${LEVEL_BORDER[item.level]}`}>
      <div className="flex items-start gap-3">
        <span
          aria-hidden
          className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-sc-accent text-sm font-bold text-sc-on-accent"
        >
          {index + 1}
        </span>
        <h3 className="flex-1 text-lg font-semibold leading-snug tracking-tight text-sc-text">
          {item.problem}
        </h3>
        <span
          className={`shrink-0 rounded-full px-3 py-1 text-[0.6875rem] font-bold uppercase tracking-wider ${LEVEL_CHIP[item.level]}`}
        >
          {LEVEL_LABEL[item.level]}
        </span>
      </div>

      <dl className="mt-4 space-y-3 text-[0.9375rem] leading-relaxed">
        <div>
          <dt className="sc-eyebrow mb-1">Sonucu</dt>
          <dd className="text-sc-text">{item.cost}</dd>
        </div>
        <div>
          <dt className="sc-eyebrow mb-1">Ölçtüğümüz</dt>
          <dd className="text-sc-muted">{item.proof}</dd>
        </div>
        <div>
          <dt className="sc-eyebrow mb-1">Biz ne yaparız</dt>
          <dd className="text-sc-text">{item.fix}</dd>
        </div>
      </dl>
    </article>
  );
}

function Result({ result }: { result: CheckResult }) {
  const wa = whatsappHref(
    `Merhaba, ${result.host} adresini site kontrol aracınızda denedim (${result.headline}) Sonuçları 10 dakikada konuşmak istiyorum.`,
  );
  const date = new Date(result.checkedAt).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <section aria-live="polite">
      <div className="sc-card p-6 sm:p-8">
        <p className="sc-eyebrow mb-2">{result.host}</p>
        <h2 className="text-2xl font-semibold leading-tight tracking-tight text-sc-text sm:text-3xl">
          {result.headline}
        </h2>
        {result.unreachable ? (
          <p className="mt-3 text-sc-muted">
            Bu geçici bir bağlantı sorunu olabilir; sitenizin kapalı olduğunu söylemiyoruz. Adresi
            kontrol edip tekrar deneyin ya da birlikte bakalım.
          </p>
        ) : result.items.length === 0 ? (
          <p className="mt-3 text-sc-muted">
            Güvenlik, hız, Google ayarları ve iletişim butonlarında büyük bir eksik bulmadık. Yine
            de içerik ve tasarım ölçülemez; isterseniz birlikte bakalım.
          </p>
        ) : (
          <p className="mt-3 text-sc-muted">
            Her bulgu: sorunun ne olduğu, veliye ve size ne kaybettirdiği, ne ölçtüğümüz ve bizim ne
            yaptığımız.
          </p>
        )}
      </div>

      {result.items.length > 0 && (
        <div className="mt-4 space-y-4">
          {result.items.map((item, i) => (
            <Finding key={item.problem} item={item} index={i} />
          ))}
        </div>
      )}

      <div className="mt-6 flex flex-col items-start justify-between gap-5 rounded-2xl bg-sc-accent p-6 text-sc-on-accent sm:flex-row sm:items-center sm:p-8">
        <div>
          <p className="text-xl font-semibold tracking-tight sm:text-2xl">
            Bunları sizin için çözelim.
          </p>
          <p className="mt-1 text-[0.9375rem] opacity-80">
            10 dakikalık bir görüşmede hangi sorunun size kaç veliye mal olduğunu birlikte
            hesaplayalım.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          {wa && (
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              className="sc-btn bg-[#141413] text-[#f3f0e8] hover:bg-black"
            >
              WhatsApp&apos;tan yazın
            </a>
          )}
          <a href="/randevu" className="sc-btn border border-[#141413] text-[#141413]">
            Randevu alın
          </a>
        </div>
      </div>

      <p className="mt-4 text-xs leading-relaxed text-sc-muted">
        Yalnızca sitenizin herkese açık sayfaları {date} tarihinde ölçüldü; sitenize giriş
        yapılmadı, hiçbir şey kaydedilmedi. Sonuç anlık bir ölçümdür; sunucu ya da ağ geçici
        olarak farklı davranabilir.
      </p>
    </section>
  );
}

/** The address field and button. */
export function SiteCheckForm({ state }: { state: SiteCheckState }) {
  const { url, setUrl, loading, submit } = state;
  return (
    <>
      <form onSubmit={submit} className="flex flex-col gap-3 sm:flex-row" noValidate>
        <label htmlFor="site-url" className="sr-only">
          Web sitesi adresi
        </label>
        <input
          id="site-url"
          name="url"
          type="text"
          inputMode="url"
          autoComplete="off"
          autoCapitalize="none"
          spellCheck={false}
          placeholder="kurumadi.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="sc-input flex-1"
          aria-describedby="site-url-help"
          disabled={loading}
        />
        <button type="submit" className="sc-btn sc-btn--primary" disabled={loading || !url.trim()}>
          {loading ? "Kontrol ediliyor…" : "Siteyi kontrol et"}
        </button>
      </form>
      <p id="site-url-help" className="mt-2 text-sm text-sc-muted">
        Adresi yazmanız yeterli. Kontrol yaklaşık yarım dakika sürer.
      </p>
    </>
  );
}

/**
 * A modal window that takes over while the check runs and then shows the findings, so the visitor's
 * attention stays on it. Built on the native <dialog>: it traps focus, closes with Esc and dims the page.
 */
export function SiteCheckDialog({ state }: { state: SiteCheckState }) {
  const { open, loading, progress, error, result, url, close } = state;
  const ref = useRef<HTMLDialogElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  // The page behind the window should not scroll.
  useEffect(() => {
    if (!open) return;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = prev;
    };
  }, [open]);

  // Start the findings from the top.
  useEffect(() => {
    if (result) bodyRef.current?.scrollTo({ top: 0 });
  }, [result]);

  const pct = Math.round(progress);
  const host = result?.host ?? url.trim();

  return (
    <dialog
      ref={ref}
      onClose={close}
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
      aria-labelledby="site-check-title"
      className="m-auto w-[min(94vw,46rem)] max-w-none overflow-hidden rounded-3xl border border-sc-border bg-sc-bg p-0 text-sc-text shadow-2xl backdrop:bg-black/75 backdrop:backdrop-blur-sm"
    >
      <div className="flex max-h-[88vh] flex-col">
        <div className="flex items-center justify-between gap-4 border-b border-sc-border px-5 py-4 sm:px-7">
          <div className="min-w-0">
            <p className="sc-eyebrow">Site kontrolü</p>
            <p id="site-check-title" className="truncate text-base font-semibold text-sc-text">
              {host}
            </p>
          </div>
          <button
            type="button"
            onClick={close}
            className="sc-btn sc-btn--ghost !min-h-0 shrink-0 !px-4 !py-2 text-sm"
          >
            Kapat
          </button>
        </div>

        <div ref={bodyRef} className="overflow-y-auto px-5 py-6 sm:px-7 sm:py-8">
          {loading && (
            <div className="py-6 sm:py-10">
              <p className="text-2xl font-semibold tracking-tight sm:text-3xl">
                Siteniz kontrol ediliyor
              </p>
              <p className="mt-2 text-sc-muted" role="status" aria-live="polite">
                {stepLabel(progress)}
              </p>

              <div
                role="progressbar"
                aria-label="Kontrol ilerlemesi"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={pct}
                className="mt-8 h-3 w-full overflow-hidden rounded-full bg-sc-surface-2"
              >
                <div
                  className="h-full rounded-full bg-sc-accent transition-[width] duration-300 ease-out motion-reduce:transition-none"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="mt-3 flex items-center justify-between text-sm text-sc-muted">
                <span>Yaklaşık yarım dakika sürer.</span>
                <span className="tabular-nums">%{pct}</span>
              </div>
              <p className="mt-6 text-xs text-sc-muted">
                Çubuk tahmini süreyi gösterir. Yalnızca sitenizin herkese açık sayfaları okunur.
              </p>
            </div>
          )}

          {!loading && error && (
            <div className="py-6 sm:py-10" role="alert">
              <p className="text-2xl font-semibold tracking-tight">Kontrol tamamlanamadı</p>
              <p className="mt-3 text-sc-muted">{error}</p>
              <button type="button" onClick={close} className="sc-btn sc-btn--primary mt-6">
                Adresi düzelt
              </button>
            </div>
          )}

          {!loading && result && <Result result={result} />}
        </div>
      </div>
    </dialog>
  );
}

/** Form and window together, for the stand-alone /site-kontrol page. */
export default function SiteCheckTool() {
  const state = useSiteCheck();
  return (
    <div>
      <SiteCheckForm state={state} />
      <SiteCheckDialog state={state} />
    </div>
  );
}
