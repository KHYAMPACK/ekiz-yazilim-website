"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "sending" | "ok" | "error";

const KURUM_TURLERI = ["Etüt merkezi", "Kreş / anaokulu", "Özel okul", "Diğer"] as const;

export default function EgitimScheduleSection() {
  const [ad, setAd] = useState("");
  const [kurum, setKurum] = useState<string>(KURUM_TURLERI[0]);
  const [ogrenci, setOgrenci] = useState("");
  const [telefon, setTelefon] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function submit(e: FormEvent) {
    e.preventDefault();
    setError("");
    if (!ad.trim()) {
      setError("Lütfen adınızı yazın.");
      return;
    }
    setStatus("sending");

    const mesaj = [
      "Eğitim kurumları — demo / görüşme talebi.",
      `Ad: ${ad.trim()}.`,
      `Kurum türü: ${kurum}.`,
      ogrenci.trim() ? `Yaklaşık öğrenci sayısı: ${ogrenci.trim()}.` : "",
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
          answers: { kaynak: "egitim-gorusme" },
        }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) {
        setStatus("error");
        setError(data.error ?? "Gönderilemedi. Lütfen tekrar deneyin.");
        return;
      }
      setStatus("ok");
    } catch {
      setStatus("error");
      setError("Bağlantı hatası. Lütfen tekrar deneyin.");
    }
  }

  const field =
    "min-h-12 border border-black bg-white px-4 text-base text-black placeholder:text-black/35 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ice";

  return (
    <section
      id="gorusme"
      className="border-b border-black bg-white"
      aria-labelledby="egitim-gorusme-title"
    >
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-14">
        <div>
          <p className="mb-3 text-xs font-medium tracking-[0.2em] uppercase text-black/45">
            Başlayalım
          </p>
          <h2
            id="egitim-gorusme-title"
            className="text-3xl font-medium tracking-tight text-black sm:text-4xl"
          >
            Demoyu Birlikte İnceleyelim.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-black/65">
            Formu doldurun; sizi arayıp kurumunuzun ihtiyacını 15–20 dakikada
            netleştirelim, sistemi canlı gösterelim. Ardından öğrenci
            sayınıza göre yazılı teklif gelir.
          </p>
        </div>

        <div className="border border-black bg-white p-5 sm:p-6">
          {status === "ok" ? (
            <div role="status" className="py-6">
              <p className="text-xs font-medium tracking-[0.2em] uppercase text-black/45">
                Talebiniz alındı
              </p>
              <p className="mt-3 text-xl font-medium tracking-tight text-black">
                En Kısa Sürede Sizi Arayacağız.
              </p>
              <p className="mt-2 text-sm text-black/60">
                Numaranızı aldık. Uygun bir zamanda dönüş yaparız.
              </p>
            </div>
          ) : (
            <form onSubmit={submit} className="flex flex-col gap-3">
              <p className="mb-1 text-xs font-medium tracking-[0.16em] uppercase text-black/45">
                Demo / görüşme talebi
              </p>
              <label className="sr-only" htmlFor="egitim-ad">
                Ad Soyad
              </label>
              <input
                id="egitim-ad"
                name="ad"
                autoComplete="name"
                value={ad}
                onChange={(e) => setAd(e.target.value)}
                placeholder="Ad Soyad"
                className={field}
              />
              <label className="sr-only" htmlFor="egitim-kurum">
                Kurum türü
              </label>
              <select
                id="egitim-kurum"
                name="kurum"
                value={kurum}
                onChange={(e) => setKurum(e.target.value)}
                className={field}
              >
                {KURUM_TURLERI.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
              <label className="sr-only" htmlFor="egitim-ogrenci">
                Yaklaşık öğrenci sayısı
              </label>
              <input
                id="egitim-ogrenci"
                name="ogrenci"
                inputMode="numeric"
                value={ogrenci}
                onChange={(e) => setOgrenci(e.target.value)}
                placeholder="Yaklaşık öğrenci sayısı (isteğe bağlı)"
                className={field}
              />
              <label className="sr-only" htmlFor="egitim-tel">
                Telefon
              </label>
              <input
                id="egitim-tel"
                name="telefon"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                value={telefon}
                onChange={(e) => setTelefon(e.target.value)}
                placeholder="Telefon (05XX …)"
                required
                className={field}
              />
              {error && (
                <p className="text-sm text-black" role="alert">
                  {error}
                </p>
              )}
              <button
                type="submit"
                disabled={status === "sending" || !telefon.trim()}
                className="mt-2 inline-flex min-h-11 items-center justify-center border border-black bg-black px-5 text-sm font-medium text-white transition-colors hover:bg-white hover:text-black disabled:cursor-not-allowed disabled:opacity-50"
              >
                {status === "sending" ? "…" : "Demo iste →"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
