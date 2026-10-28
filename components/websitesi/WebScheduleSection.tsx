"use client";

import { useState, type FormEvent } from "react";

type Step = 0 | 1 | 2;
type Status = "idle" | "sending" | "ok" | "error";

export default function WebScheduleSection() {
  const [step, setStep] = useState<Step>(0);
  const [ad, setAd] = useState("");
  const [soyad, setSoyad] = useState("");
  const [telefon, setTelefon] = useState("");
  const [not, setNot] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  function nextFromNames(e: FormEvent) {
    e.preventDefault();
    if (!ad.trim()) {
      setError("Lütfen adınızı yazın.");
      return;
    }
    setError("");
    setStep(1);
  }

  async function submitCall(e: FormEvent) {
    e.preventDefault();
    setError("");
    setStatus("sending");

    const fullName = [ad.trim(), soyad.trim()].filter(Boolean).join(" ");
    const mesaj = [
      "Web sitesi — görüşme talebi.",
      `Ad: ${fullName}.`,
      not.trim() ? `Not: ${not.trim()}` : "",
    ]
      .filter(Boolean)
      .join(" ");

    try {
      const res = await fetch("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          step: "complete",
          mesaj,
          telefon: telefon.trim(),
          answers: { kaynak: "web-sitesi-gorusme" },
        }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) {
        setStatus("error");
        setError(data.error ?? "Gönderilemedi. Lütfen tekrar deneyin.");
        return;
      }
      setStatus("ok");
      setStep(2);
    } catch {
      setStatus("error");
      setError("Bağlantı hatası. Lütfen tekrar deneyin.");
    }
  }

  return (
    <section
      id="gorusme"
      className="sc-glow border-t border-sc-border bg-sc-surface"
      aria-labelledby="web-gorusme-title"
    >
      <div className="sc-container grid gap-10 py-16 sm:py-24 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-16">
        <div>
          <p className="sc-eyebrow mb-4">Başlayalım</p>
          <h2 id="web-gorusme-title" className="sc-h2">
            Hazırsanız, <span className="sc-em">keşif görüşmesiyle</span>{" "}
            başlayalım.
          </h2>
          <p className="sc-lead mt-5">
            Formu doldurun; sizi arayıp ihtiyacı 10 dakikada netleştirelim.
            Ardından yazılı teklif gelir.
          </p>
        </div>

        <div className="sc-card sc-card--lg bg-sc-bg p-6 sm:p-8">
          {status === "ok" ? (
            <div role="status" className="py-6">
              <p className="sc-eyebrow">Talebiniz alındı</p>
              <p className="sc-h3 mt-3">En Kısa Sürede Sizi Arayacağız.</p>
              <p className="sc-body mt-2 !text-sm">
                Numaranızı aldık. Uygun bir zamanda dönüş yaparız.
              </p>
            </div>
          ) : step === 0 ? (
            <form onSubmit={nextFromNames} className="flex flex-col gap-3">
              <p className="mb-1 text-xs font-medium tracking-[0.16em] text-sc-muted uppercase">
                Görüşme ayarla
              </p>
              <label className="sr-only" htmlFor="web-ad">
                Ad
              </label>
              <input
                id="web-ad"
                name="ad"
                autoComplete="given-name"
                value={ad}
                onChange={(e) => setAd(e.target.value)}
                placeholder="Ad"
                className="sc-input"
              />
              <label className="sr-only" htmlFor="web-soyad">
                Soyad
              </label>
              <input
                id="web-soyad"
                name="soyad"
                autoComplete="family-name"
                value={soyad}
                onChange={(e) => setSoyad(e.target.value)}
                placeholder="Soyad"
                className="sc-input"
              />
              {error && (
                <p className="text-sm text-sc-accent-text" role="alert">
                  {error}
                </p>
              )}
              <div className="mt-2 flex items-center justify-between gap-3">
                <div className="flex gap-1.5" aria-hidden>
                  <span className="size-2 rounded-full bg-sc-accent" />
                  <span className="size-2 rounded-full border border-sc-border" />
                </div>
                <button type="submit" className="sc-btn sc-btn--primary">
                  Devam →
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={submitCall} className="flex flex-col gap-3">
              <p className="mb-1 text-xs font-medium tracking-[0.16em] text-sc-muted uppercase">
                Nasıl ulaşalım?
              </p>
              <label className="sr-only" htmlFor="web-tel">
                Telefon
              </label>
              <input
                id="web-tel"
                name="telefon"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                value={telefon}
                onChange={(e) => setTelefon(e.target.value)}
                placeholder="Telefon (05XX …)"
                required
                className="sc-input"
              />
              <label className="sr-only" htmlFor="web-not">
                Not (isteğe bağlı)
              </label>
              <input
                id="web-not"
                name="not"
                value={not}
                onChange={(e) => setNot(e.target.value)}
                placeholder="Kısaca ne için arayalım? (isteğe bağlı)"
                className="sc-input"
              />
              {error && (
                <p className="text-sm text-sc-accent-text" role="alert">
                  {error}
                </p>
              )}
              <div className="mt-2 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setStep(0);
                      setError("");
                      setStatus("idle");
                    }}
                    className="text-sm text-sc-muted underline-offset-2 hover:text-sc-text hover:underline"
                  >
                    Geri
                  </button>
                  <div className="flex gap-1.5" aria-hidden>
                    <span className="size-2 rounded-full border border-sc-border" />
                    <span className="size-2 rounded-full bg-sc-accent" />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={status === "sending" || !telefon.trim()}
                  className="sc-btn sc-btn--primary"
                >
                  {status === "sending" ? "…" : "Görüşme ayarla →"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
