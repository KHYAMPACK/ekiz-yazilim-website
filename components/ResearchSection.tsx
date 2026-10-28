import Link from "next/link";
import { HEADLINES, STUDY } from "@/lib/arastirma";

/** Homepage teaser for the Ankara course-centre website study. */
export default function ResearchSection() {
  return (
    <section
      id="arastirma"
      className="border-t border-sc-border bg-sc-bg"
      aria-labelledby="arastirma-home-title"
    >
      <div className="sc-container sc-section grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-16">
        <div>
          <p className="sc-eyebrow mb-4">Araştırma · {STUDY.dateLabel}</p>
          <h2 id="arastirma-home-title" className="sc-h2">
            Ankara’daki {STUDY.uniqueSites} kurs sitesine baktık.{" "}
            <span className="sc-em">Sonuçlar ortada.</span>
          </h2>
          <p className="sc-lead mt-5 max-w-xl">
            Paylaşım görseli, Google açıklaması, güvenlik uyarısı, WhatsApp bağlantısı: velinin
            gördüğü temel eksikleri kimseyi anmadan, sayarak yazdık. Yöntemiyle birlikte.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={`/arastirma/${STUDY.slug}`} className="sc-btn sc-btn--primary">
              Araştırmayı oku
            </Link>
            <Link href="/site-kontrol" className="sc-btn sc-btn--ghost">
              Kendi sitenizi kontrol edin
            </Link>
          </div>
        </div>

        <dl className="grid grid-cols-2 gap-4">
          {HEADLINES.map((h) => (
            <div key={h.label} className="sc-card p-5">
              <dd className="font-display text-[clamp(2rem,4.4vw,3rem)] leading-none tracking-tight text-sc-accent-text">
                {h.value}
              </dd>
              <dt className="mt-2 text-sm text-sc-muted">{h.label}</dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
