import type { Metadata } from "next";
import Link from "next/link";
import ScFooter from "@/components/ScFooter";
import ScHeader from "@/components/ScHeader";
import { seo } from "@/lib/seo";
import { site } from "@/lib/site";
import { GROUPS, HEADLINES, METHOD, STUDY, pct } from "@/lib/arastirma";

const path = `/arastirma/${STUDY.slug}`;
const title = "Ankara’daki Kurs ve Etüt Merkezlerinin Web Siteleri: 2026 İncelemesi";
const description = `Ankara’daki ${STUDY.uniqueSites} kurs ve etüt merkezi sitesini inceledik. Paylaşım görseli, Google açıklaması, güvenlik uyarısı ve WhatsApp bağlantısı gibi temel eksikleri sayılarla yazdık.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path },
  openGraph: {
    title,
    description,
    url: `${seo.siteUrl}${path}`,
    siteName: site.name,
    locale: "tr_TR",
    type: "article",
    publishedTime: STUDY.dateIso,
  },
};

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    datePublished: STUDY.dateIso,
    inLanguage: "tr-TR",
    mainEntityOfPage: `${seo.siteUrl}${path}`,
    author: { "@type": "Organization", name: site.name, url: seo.siteUrl },
    publisher: { "@type": "Organization", name: site.name, url: seo.siteUrl },
  };
}

export default function ArastirmaPage() {
  return (
    <div className="sc-root">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()) }}
      />
      <ScHeader />
      <main>
        <section className="sc-glow">
          <div className="sc-container sc-section">
            <p className="sc-eyebrow mb-4">Araştırma · {STUDY.dateLabel}</p>
            <h1 className="sc-h1 max-w-4xl">
              Ankara’daki kurs merkezlerinin web siteleri, <span className="sc-em">sayarak.</span>
            </h1>
            <p className="sc-lead mt-6 max-w-2xl">
              {STUDY.uniqueSites} kurs ve etüt merkezi sitesine baktık; {STUDY.reachable}’sı açıldı.
              Veli siteyi açtığında karşılaştığı temel eksikleri kuruma ya da kişiye değil, sayıya
              bağlayarak yazdık. Yöntemi en altta açıkladık.
            </p>

            <dl className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {HEADLINES.map((h) => (
                <div key={h.label} className="sc-card sc-card--lg p-6">
                  <dt className="sr-only">{h.label}</dt>
                  <dd>
                    <span className="font-display block text-[clamp(2.6rem,6vw,4rem)] leading-none tracking-tight text-sc-accent-text">
                      {h.value}
                    </span>
                    <span className="mt-2 block text-sm text-sc-muted">{h.label}</span>
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 text-sm text-sc-muted">
              Oranlar, siteleri açılan {STUDY.reachable} adres üzerinden hesaplandı.
            </p>
          </div>
        </section>

        <section className="sc-hairline">
          <div className="sc-container sc-section">
            <p className="sc-eyebrow mb-4">Site yok ya da görünmüyor</p>
            <h2 className="sc-h2 max-w-3xl">
              Listemizdeki {STUDY.listed} kurumun {STUDY.noWebsite}’ünün web sitesi adresi yok.
            </h2>
            <p className="sc-body mt-5 max-w-2xl">
              Google Haritalar kayıtlarında {STUDY.noWebsite} kurumun (%{pct(STUDY.noWebsite, STUDY.listed)})
              web sitesi adresi bulunmuyor, {STUDY.socialOnly} kurum yalnızca sosyal medya sayfası
              veriyor. Bu bir tarama sonucu değil, listedeki kayıtların sayımı; kurumun gerçekte
              sitesi olup kaydına eklememiş olması mümkün.
            </p>
          </div>
        </section>

        {GROUPS.map((g) => (
          <section key={g.title} className="sc-hairline">
            <div className="sc-container sc-section">
              <h2 className="sc-h2 max-w-3xl">{g.title}</h2>
              <p className="sc-body mt-3 max-w-2xl">{g.lead}</p>
              <ul className="mt-10 grid gap-5">
                {g.items.map((f) => (
                  <li key={f.label} className="sc-card p-5 sm:p-6">
                    <div className="flex items-baseline justify-between gap-4">
                      <p className="sc-h3 !text-lg sm:!text-xl">{f.label}</p>
                      <p className="shrink-0 text-right">
                        <span className="font-display text-2xl tracking-tight text-sc-accent-text">
                          %{pct(f.count)}
                        </span>
                        <span className="ml-2 text-sm text-sc-muted">
                          {f.count} / {STUDY.reachable}
                        </span>
                      </p>
                    </div>
                    <div
                      className="mt-3 h-1.5 overflow-hidden rounded-full bg-sc-surface-2"
                      role="img"
                      aria-label={`%${pct(f.count)}`}
                    >
                      <div
                        className="h-full rounded-full bg-sc-accent"
                        style={{ width: `${pct(f.count)}%` }}
                      />
                    </div>
                    <p className="sc-body mt-3 !text-sm">{f.note}</p>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ))}

        <section className="sc-hairline">
          <div className="sc-container sc-section">
            <p className="sc-eyebrow mb-4">Yöntem</p>
            <h2 className="sc-h2 max-w-3xl">Bu sayılar nasıl çıktı?</h2>
            <dl className="mt-10 grid gap-x-10 gap-y-8 md:grid-cols-2">
              {METHOD.map((m) => (
                <div key={m.title}>
                  <dt className="sc-h3 !text-lg">{m.title}</dt>
                  <dd className="sc-body mt-2 !text-sm">{m.body}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="sc-hairline">
          <div className="sc-container sc-section">
            <h2 className="sc-h2 max-w-3xl">
              Sizin siteniz <span className="sc-em">nasıl görünüyor?</span>
            </h2>
            <p className="sc-lead mt-5 max-w-2xl">
              Adresi yazın, aynı kontrolleri sizin siteniz için çalıştıralım. Bulduklarımızı ve ne
              yapılacağını sade yazarız.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/site-kontrol" className="sc-btn sc-btn--primary">
                Siteni ücretsiz kontrol et
              </Link>
              <Link href="/web-sitesi" className="sc-btn sc-btn--secondary">
                Web sitesi çalışmamız
              </Link>
            </div>
          </div>
        </section>
      </main>
      <ScFooter />
    </div>
  );
}
