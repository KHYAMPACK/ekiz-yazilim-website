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

  const field = "sc-input";

  return (
    <section
      id="gorusme"
      className="sc-glow border-t border-sc-border"
      aria-labelledby="egitim-gorusme-title"
    >
      <div className="sc-container sc-section grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-16">
        <div>
          <p className="sc-eyebrow mb-3">Başlayalım</p>
          <h2 id="egitim-gorusme-title" className="sc-h2">
            Demoyu Birlikte <span className="sc-em">İnceleyelim.</span>
          </h2>
          <p className="sc-lead mt-5">
            Formu doldurun; sizi arayıp kurumunuzun ihtiyacını 15–20 dakikada
            netleştirelim, sistemi canlı gösterelim. Ardından öğrenci
            sayınıza göre yazılı teklif gelir.
          </p>
        </div>

        <div className="sc-card sc-card--lg p-6 sm:p-8">
          {status === "ok" ? (
            <div role="status" className="py-6">
              <p className="sc-eyebrow">Talebiniz alındı</p>
              <p className="sc-h3 mt-3">En Kısa Sürede Sizi Arayacağız.</p>
              <p className="sc-body mt-2 !text-sm">
                Numaranızı aldık. Uygun bir zamanda dönüş yaparız.
              </p>
            </div>
          ) : (
            <form onSubmit={submit} className="flex flex-col gap-3">
              <p className="sc-eyebrow mb-1">Demo / görüşme talebi</p>
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
                <p className="text-sm text-sc-accent-text" role="alert">
                  {error}
                </p>
              )}
              <button
                type="submit"
                disabled={status === "sending" || !telefon.trim()}
                className="sc-btn sc-btn--primary mt-2"
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
