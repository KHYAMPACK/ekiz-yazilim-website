import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import ScFooter from "@/components/ScFooter";
import ScHeader from "@/components/ScHeader";
import { phoneDisplay, phoneHref, site, whatsappHref } from "@/lib/site";

export const metadata: Metadata = {
  title: "Randevu | 10 Dakikalık Ücretsiz Görüşme",
  description:
    "Etüt merkezi, kurs, kreş ve okul siteniz için 10 dakikalık ücretsiz görüşme. WhatsApp, telefon ya da Ankara'da yüz yüze. Kapsam ve fiyat yazılı gelir.",
  alternates: { canonical: "/randevu" },
};

const steps = [
  {
    title: "Yazın ya da arayın",
    text: "WhatsApp, telefon ya da e-posta; hangisi size kolaysa.",
  },
  {
    title: "Gün ve saati söyleyin",
    text: "Size uygun bir zamanı birlikte netleştiririz.",
  },
  {
    title: "10 dakika konuşalım",
    text: "İhtiyacınızı dinler, size uygun yolu söyleriz. Ardından kapsam ve fiyat yazılı gelir.",
  },
];

const bring = [
  "Site adresiniz (varsa)",
  "Kurumunuzun türü: etüt merkezi, kurs, kreş, okul",
  "En çok zorlandığınız şey: veli kaydı, site, takip",
];

export default function RandevuPage() {
  if (site.bookingUrl) {
    redirect(site.bookingUrl);
  }

  const call = phoneHref();
  const wa = whatsappHref(
    "Merhaba, Ekiz Yazılım ile 10 dakikalık bir görüşme yapmak istiyorum.",
  );
  const visit = whatsappHref(
    "Merhaba, Ankara'da yüz yüze görüşme yapmak istiyorum.",
  );

  return (
    <div className="sc-root">
      <ScHeader />
      <main>
        <section className="sc-glow">
          <div className="sc-container sc-section">
            <p className="sc-eyebrow mb-4">Randevu</p>
            <h1 className="sc-h1 max-w-3xl">
              10 dakikalık <span className="sc-em">görüşme</span>
            </h1>
            <p className="sc-lead mt-6 max-w-2xl">
              Ne istediğinizi netleştirelim, size uygun yolu söyleyelim. Görüşme ücretsiz;
              ardından kapsam ve fiyat yazılı gelir. Alan adı ve hosting hesapları sizde kalır.
            </p>

            <div className="mt-10 grid max-w-3xl gap-3 sm:grid-cols-2">
              {wa && (
                <a
                  href={wa}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sc-btn sc-btn--primary !justify-between !px-6 !py-5 text-base sm:col-span-2"
                >
                  <span>WhatsApp ile randevu alın</span>
                  <span aria-hidden>→</span>
                </a>
              )}
              {call && (
                <a href={call} className="sc-card block p-5 transition-colors hover:border-sc-accent">
                  <span className="sc-eyebrow mb-1 block">Hemen arayın</span>
                  <span className="text-lg font-semibold tracking-tight text-sc-text">
                    {phoneDisplay()}
                  </span>
                </a>
              )}
              <a
                href={`mailto:${site.email}`}
                className="sc-card block p-5 transition-colors hover:border-sc-accent"
              >
                <span className="sc-eyebrow mb-1 block">E-posta</span>
                <span className="break-all text-lg font-semibold tracking-tight text-sc-text">
                  {site.email}
                </span>
              </a>
              {visit && (
                <a
                  href={visit}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sc-card block p-5 transition-colors hover:border-sc-accent sm:col-span-2"
                >
                  <span className="sc-eyebrow mb-1 block">Ankara&apos;da yüz yüze</span>
                  <span className="text-[0.9375rem] text-sc-text">
                    Ankara merkezliyiz; isterseniz kurumunuza gelir ya da bir yerde buluşuruz.
                    Yazın, gün ve saati birlikte ayarlayalım.
                  </span>
                </a>
              )}
            </div>
          </div>
        </section>

        <section className="border-t border-sc-border" aria-labelledby="rd-nasil-title">
          <div className="sc-container sc-section">
            <h2 id="rd-nasil-title" className="sc-h2">
              Nasıl <span className="sc-em">ilerler</span>
            </h2>
            <ol className="mt-8 grid max-w-4xl gap-4 sm:grid-cols-3">
              {steps.map((step, i) => (
                <li key={step.title} className="sc-card p-5">
                  <span
                    aria-hidden
                    className="mb-3 grid h-8 w-8 place-items-center rounded-lg bg-sc-accent text-sm font-bold text-sc-on-accent"
                  >
                    {i + 1}
                  </span>
                  <h3 className="text-lg font-semibold tracking-tight text-sc-text">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-sc-muted">
                    {step.text}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="border-t border-sc-border" aria-labelledby="rd-hazirlik-title">
          <div className="sc-container sc-section">
            <div className="grid max-w-4xl gap-8 sm:grid-cols-2">
              <div>
                <h2 id="rd-hazirlik-title" className="sc-h2">
                  Hazırlık <span className="sc-em">gerekmiyor</span>
                </h2>
                <p className="mt-4 text-sc-muted">
                  İsterseniz şunları söyleyin; görüşmeyi daha kısa ve net yapar.
                </p>
                <ul className="mt-5 space-y-2 text-[0.9375rem] text-sc-text">
                  {bring.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sc-accent" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="sc-card p-6 sm:p-7">
                <p className="sc-eyebrow mb-2">Önce bakmak isterseniz</p>
                <h3 className="text-xl font-semibold tracking-tight text-sc-text">
                  Siteniz velileri kaybettiriyor mu?
                </h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-sc-muted">
                  Adresi yazın; velinin karşılaşabileceği sorunları ve çözümlerini ücretsiz
                  gösterelim. Sonucu görüşmede birlikte konuşabiliriz.
                </p>
                <Link href="/web-sitesi" className="sc-btn sc-btn--secondary mt-5">
                  Siteyi kontrol et
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <ScFooter />
    </div>
  );
}
