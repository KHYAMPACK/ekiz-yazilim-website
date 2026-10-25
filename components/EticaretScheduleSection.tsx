"use client";

import { useState, type FormEvent } from "react";

type Step = 0 | 1 | 2;
type Status = "idle" | "sending" | "ok" | "error";

/**
 * “Sorunuz mu var?” — schedule-a-call style block (ikas-inspired, Ekiz sharp).
 */
export default function EticaretScheduleSection() {
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
      "E-ticaret — görüşme talebi.",
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
          answers: { kaynak: "e-ticaret-gorusme" },
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
      className="border-b border-black bg-ice/30"
      aria-labelledby="gorusme-title"
    >
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-14 sm:px-6 sm:py-16 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-14">
        <div className="text-center lg:text-left">
          <h2
            id="gorusme-title"
            className="text-2xl font-medium tracking-tight text-black sm:text-3xl"
          >
            Sorunuz mu var? Konuşalım
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-black/65 sm:text-base">
            Formu doldurun; sizi arayıp mağaza ihtiyacınızı kısa bir görüşmeyle
            netleştirelim.
          </p>
          <p className="mt-5 inline-flex w-full max-w-md items-center justify-center gap-2.5 border border-black/15 bg-white/70 px-3.5 py-2.5 text-left text-sm leading-snug text-black/70 sm:mx-auto lg:mx-0 lg:justify-start">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
              className="shrink-0 text-black/45"
            >
              <circle
                cx="12"
                cy="12"
                r="9"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="M12 7v5l3.5 2"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="square"
              />
            </svg>
            <span>Yazın — ekibimiz yardımcı olmaya hazır.</span>
          </p>
        </div>

        <div className="border border-black bg-white p-5 sm:p-6">
          {status === "ok" ? (
            <div role="status" className="py-6 text-center lg:text-left">
              <p className="text-xs font-medium tracking-[0.2em] uppercase text-black/45">
                Talebiniz alındı
              </p>
              <p className="mt-3 text-xl font-medium tracking-tight text-black">
                En kısa sürede sizi arayacağız.
              </p>
              <p className="mt-2 text-sm text-black/60">
                Numaranızı aldık. Uygun bir zamanda dönüş yaparız.
              </p>
            </div>
          ) : step === 0 ? (
            <form onSubmit={nextFromNames} className="flex flex-col gap-3">
              <p className="mb-1 text-xs font-medium tracking-[0.16em] uppercase text-black/45">
                Görüşme ayarla
              </p>
              <label className="sr-only" htmlFor="eticaret-ad">
                Ad
              </label>
              <input
                id="eticaret-ad"
                name="ad"
                autoComplete="given-name"
                value={ad}
                onChange={(e) => setAd(e.target.value)}
                placeholder="Ad"
                className="min-h-12 border border-black bg-white px-4 text-base text-black placeholder:text-black/35 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ice"
              />
              <label className="sr-only" htmlFor="eticaret-soyad">
                Soyad
              </label>
              <input
                id="eticaret-soyad"
                name="soyad"
                autoComplete="family-name"
                value={soyad}
                onChange={(e) => setSoyad(e.target.value)}
                placeholder="Soyad"
                className="min-h-12 border border-black bg-white px-4 text-base text-black placeholder:text-black/35 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ice"
              />
              {error && (
                <p className="text-sm text-black" role="alert">
                  {error}
                </p>
              )}
              <div className="mt-2 flex items-center justify-between gap-3">
                <div className="flex gap-1.5" aria-hidden>
                  <span className="size-2 bg-black" />
                  <span className="size-2 border border-black" />
                </div>
                <button
                  type="submit"
                  className="inline-flex min-h-11 items-center border border-black bg-black px-5 text-sm font-medium text-white transition-colors hover:bg-white hover:text-black"
                >
                  Devam →
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={submitCall} className="flex flex-col gap-3">
              <p className="mb-1 text-xs font-medium tracking-[0.16em] uppercase text-black/45">
                Nasıl ulaşalım?
              </p>
              <label className="sr-only" htmlFor="eticaret-tel">
                Telefon
              </label>
              <input
                id="eticaret-tel"
                name="telefon"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                value={telefon}
                onChange={(e) => setTelefon(e.target.value)}
                placeholder="Telefon (05XX …)"
                required
                className="min-h-12 border border-black bg-white px-4 text-base text-black placeholder:text-black/35 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ice"
              />
              <label className="sr-only" htmlFor="eticaret-not">
                Not (isteğe bağlı)
              </label>
              <input
                id="eticaret-not"
                name="not"
                value={not}
                onChange={(e) => setNot(e.target.value)}
                placeholder="Kısaca ne için arayalım? (isteğe bağlı)"
                className="min-h-12 border border-black bg-white px-4 text-base text-black placeholder:text-black/35 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ice"
              />
              {error && (
                <p className="text-sm text-black" role="alert">
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
                    className="text-sm text-black/55 underline-offset-2 hover:text-black hover:underline"
                  >
                    Geri
                  </button>
                  <div className="flex gap-1.5" aria-hidden>
                    <span className="size-2 border border-black" />
                    <span className="size-2 bg-black" />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={status === "sending" || !telefon.trim()}
                  className="inline-flex min-h-11 items-center border border-black bg-black px-5 text-sm font-medium text-white transition-colors hover:bg-white hover:text-black disabled:cursor-not-allowed disabled:opacity-50"
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
