"use client";

import { useState } from "react";
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
    <section aria-live="polite" className="mt-10">
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

export default function SiteCheckTool() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<CheckResult | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch("/api/site-kontrol", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      const data = (await res.json()) as { result?: CheckResult; error?: string };
      if (!res.ok || !data.result) {
        setError(data.error ?? "Kontrol tamamlanamadı. Lütfen tekrar deneyin.");
      } else {
        setResult(data.result);
      }
    } catch {
      setError("Bağlantı kurulamadı. İnternetinizi kontrol edip tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
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

      {loading && (
        <p className="mt-6 text-sc-muted" role="status">
          Alan adı, güvenlik sertifikası, hız ve Google ayarları kontrol ediliyor…
        </p>
      )}
      {error && (
        <p className="mt-6 rounded-xl border border-sc-border bg-sc-surface p-4 text-sc-text" role="alert">
          {error}
        </p>
      )}
      {result && <Result result={result} />}
    </div>
  );
}
