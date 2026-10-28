import Link from "next/link";
import { GROUPS, HEADLINES, STUDY } from "@/lib/arastirma";
import WebReveal from "./WebReveal";

/** Why a site matters, backed by our own scan of Ankara course-centre websites. */
export default function WebResearch() {
  const topFindings = GROUPS.flatMap((g) => g.items).filter((f) =>
    ["Sertifika geçersiz", "http ile açılan adres https’e yönlenmiyor", "Site haritası yok"].includes(f.label),
  );

  return (
    <section
      id="arastirma"
      className="border-t border-sc-border bg-sc-bg"
      aria-labelledby="web-arastirma-title"
    >
      <div className="sc-container grid gap-12 py-16 sm:py-24 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center lg:gap-16">
        <WebReveal>
          <p className="sc-eyebrow mb-4">Araştırma · {STUDY.dateLabel}</p>
          <h2 id="web-arastirma-title" className="sc-h2">
            Ankara’daki {STUDY.uniqueSites} kurs sitesine baktık.{" "}
            <span className="sc-em">Çoğunda temel eksikler var.</span>
          </h2>
          <p className="sc-lead mt-5 max-w-xl">
            Velinin siteyi açtığında gördüğü şeyleri sayarak yazdık: paylaşım görseli,
            Google açıklaması, WhatsApp bağlantısı, güvenlik uyarısı. Kimseyi ismiyle anmadan,
            yöntemiyle birlikte.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={`/arastirma/${STUDY.slug}`} className="sc-btn sc-btn--primary">
              Araştırmayı oku
            </Link>
            <Link href="/site-kontrol" className="sc-btn sc-btn--ghost">
              Kendi sitenizi kontrol edin
            </Link>
          </div>
        </WebReveal>

        <WebReveal delay={0.08}>
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
          <ul className="mt-5 space-y-2 text-sm text-sc-muted">
            {topFindings.map((f) => (
              <li key={f.label} className="flex gap-3">
                <span className="mt-[0.5rem] size-1.5 shrink-0 rounded-full bg-sc-accent" aria-hidden />
                <span>
                  <span className="text-sc-text">{f.label}:</span> {f.count} / {STUDY.reachable} site
                </span>
              </li>
            ))}
          </ul>
        </WebReveal>
      </div>
    </section>
  );
}
