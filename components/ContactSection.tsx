"use client";

import { useEffect, useState } from "react";
import { phoneDisplay, phoneHref, site, whatsappHref } from "@/lib/site";

export default function ContactSection() {
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">(
    "idle",
  );
  const [error, setError] = useState("");
  const [draft, setDraft] = useState("");
  const call = phoneHref();
  const wa = whatsappHref(
    "Merhaba, Ekiz Yazılım sitesinden yazıyorum. Kısa bir iş konuşmak istiyorum.",
  );

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem("ekiz-problem-draft");
      if (stored) {
        setDraft(stored);
        sessionStorage.removeItem("ekiz-problem-draft");
      }
    } catch {
      /* ignore */
    }
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError("");

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      ad: String(data.get("ad") ?? ""),
      email: String(data.get("email") ?? ""),
      mesaj: String(data.get("mesaj") ?? ""),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = (await res.json()) as {
        ok?: boolean;
        error?: string;
        mailto?: string;
      };

      if (!res.ok) {
        setError(json.error ?? "Bir sorun oluştu.");
        setStatus("error");
        return;
      }

      if (json.mailto) {
        window.location.href = json.mailto;
      }

      form.reset();
      setStatus("sent");
    } catch {
      setError("Bağlantı hatası. Lütfen e-posta ile yazın.");
      setStatus("error");
    }
  }

  return (
    <section
      id="iletisim"
      className="relative overflow-hidden border-t border-sc-border bg-sc-bg"
      aria-labelledby="iletisim-title"
    >
      <div className="sc-glow pointer-events-none absolute inset-0" />
      <div className="sc-container sc-section relative">
        <div className="max-w-2xl">
          <p className="sc-eyebrow mb-4">İletişim</p>
          <h2 id="iletisim-title" className="sc-h2">
            Birlikte <span className="sc-em">çalışalım</span>
          </h2>
          <p className="sc-lead mt-4">
            Arayın, yazın veya formu doldurun. {site.responseTime}.
          </p>
        </div>

        <div className="mt-12 grid w-full items-stretch gap-5 lg:grid-cols-2">
          <div className="sc-card sc-card--lg flex min-w-0 flex-col overflow-hidden">
            <dl className="flex flex-1 flex-col justify-center space-y-6 px-6 py-8 sm:px-8">
              <div>
                <dt className="sc-eyebrow">Telefon</dt>
                <dd className="mt-1.5">
                  {call ? (
                    <a
                      href={call}
                      className="sc-serif text-2xl text-sc-text transition-colors hover:text-sc-accent-text"
                    >
                      {phoneDisplay()}
                    </a>
                  ) : (
                    <span className="sc-serif text-2xl text-sc-text">
                      {phoneDisplay()}
                    </span>
                  )}
                </dd>
              </div>
              <div>
                <dt className="sc-eyebrow">E-posta</dt>
                <dd className="mt-1.5">
                  <a
                    href={`mailto:${site.email}`}
                    className="break-all text-lg text-sc-text transition-colors hover:text-sc-accent-text"
                  >
                    {site.email}
                  </a>
                </dd>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <dt className="sc-eyebrow">Konum</dt>
                  <dd className="mt-1.5 text-lg text-sc-text">{site.city}</dd>
                </div>
                <div>
                  <dt className="sc-eyebrow">Yanıt</dt>
                  <dd className="mt-1.5 text-lg text-sc-text">
                    {site.responseTime}
                  </dd>
                </div>
              </div>
            </dl>

            <div className="flex flex-col gap-3 border-t border-sc-border p-5 sm:flex-row sm:p-6">
              {call && (
                <a href={call} className="sc-btn sc-btn--primary flex-1">
                  Ara
                </a>
              )}
              {wa && (
                <a
                  href={wa}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sc-btn sc-btn--secondary flex-1"
                >
                  WhatsApp’tan yazın
                </a>
              )}
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="sc-card sc-card--lg flex h-full w-full min-w-0 flex-col gap-3 p-5 sm:p-7"
          >
            <label className="sr-only" htmlFor="ad">
              Ad
            </label>
            <input
              id="ad"
              name="ad"
              type="text"
              required
              autoComplete="name"
              placeholder="Adınız"
              className="sc-input"
            />
            <label className="sr-only" htmlFor="email">
              E-posta
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="E-posta"
              className="sc-input"
            />
            <label className="sr-only" htmlFor="mesaj">
              Mesaj
            </label>
            <textarea
              id="mesaj"
              name="mesaj"
              required
              rows={6}
              placeholder="Mesajınız"
              defaultValue={draft}
              key={draft || "empty"}
              className="sc-input min-h-[9rem] flex-1 resize-none"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="sc-btn sc-btn--primary mt-1 w-full"
            >
              {status === "loading" ? "Gönderiliyor…" : "Gönder"}
            </button>
            {status === "sent" && (
              <p
                className="rounded-xl border border-sc-accent/40 bg-sc-accent/10 px-4 py-3 text-sm text-sc-text"
                role="status"
              >
                Teşekkürler — mesajınız alındı. En kısa sürede döneceğiz.
              </p>
            )}
            {status === "error" && (
              <p
                className="rounded-xl border border-sc-border bg-sc-surface-2 px-4 py-3 text-sm text-sc-text"
                role="alert"
              >
                {error}{" "}
                <a
                  className="text-sc-accent-text underline"
                  href={`mailto:${site.email}`}
                >
                  {site.email}
                </a>
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
