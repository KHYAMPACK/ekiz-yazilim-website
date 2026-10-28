import type { Metadata } from "next";
import Link from "next/link";
import ScFooter from "@/components/ScFooter";
import ScHeader from "@/components/ScHeader";
import { HEADLINES, STUDY } from "@/lib/arastirma";

export const metadata: Metadata = {
  title: "Araştırmalar | Eğitim Kurumlarının Web Siteleri",
  description:
    "Kurs, etüt merkezi ve okul web sitelerini kendi taramamızdan çıkan sayılarla anlatıyoruz. Yöntem her araştırmanın içinde yazılı.",
  alternates: { canonical: "/arastirma" },
};

export default function ArastirmaIndexPage() {
  return (
    <div className="sc-root">
      <ScHeader />
      <main>
        <section className="sc-glow">
          <div className="sc-container sc-section">
            <p className="sc-eyebrow mb-4">Araştırma</p>
            <h1 className="sc-h1 max-w-3xl">
              Eğitim kurumlarının siteleri, <span className="sc-em">sayarak.</span>
            </h1>
            <p className="sc-lead mt-6 max-w-2xl">
              Yalnızca kendi ölçümümüzden çıkan sayıları yazıyoruz; yöntem her araştırmanın içinde.
              Kimseyi ismiyle anmıyoruz.
            </p>

            <Link
              href={`/arastirma/${STUDY.slug}`}
              className="group sc-card sc-card--lg mt-12 block p-6 transition-transform duration-300 hover:-translate-y-1 sm:p-8"
            >
              <p className="sc-eyebrow">{STUDY.dateLabel}</p>
              <h2 className="sc-h3 mt-3 max-w-2xl">
                Ankara’daki kurs ve etüt merkezlerinin web siteleri: 2026 incelemesi
              </h2>
              <p className="sc-body mt-3 max-w-2xl !text-sm">
                {STUDY.uniqueSites} siteye baktık, {STUDY.reachable}’sı açıldı. Neyin eksik olduğunu
                ve bunun veliye ne olarak yansıdığını yazdık.
              </p>
              <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
                {HEADLINES.map((h) => (
                  <li key={h.label}>
                    <span className="font-display text-2xl tracking-tight text-sc-accent-text">
                      {h.value}
                    </span>
                    <span className="ml-2 text-sm text-sc-muted">{h.label}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 inline-flex items-center gap-2 text-[0.9375rem] font-medium text-sc-accent-text">
                Araştırmayı oku
                <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </p>
            </Link>
          </div>
        </section>
      </main>
      <ScFooter />
    </div>
  );
}
