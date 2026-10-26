import type { Metadata } from "next";
import ScFooter from "@/components/ScFooter";
import ScHeader from "@/components/ScHeader";
import WorksGrid from "@/components/WorksGrid";
import { STACK_GROUPS, works } from "@/lib/works";

export const metadata: Metadata = {
  title: "İşler",
  description:
    "Ekiz Yazılım’ın tüm işleri: e-ticaret altyapısı, okul yönetim uygulaması, kurumsal web siteleri ve oyun. Kullanılan teknolojilerle birlikte.",
  alternates: { canonical: "/isler" },
};

const stats = [
  { value: works.length, label: "Proje" },
  { value: works.filter((w) => w.status === "live").length, label: "Yayında" },
  { value: works.filter((w) => w.kind === "app").length, label: "Uygulama ve oyun" },
];

export default function IslerPage() {
  return (
    <div className="sc-root">
      <ScHeader />
      <main>
        <section className="sc-glow">
          <div className="sc-container sc-section">
            <p className="sc-eyebrow mb-4">İşler</p>
            <h1 className="sc-h1 max-w-3xl">
              Yaptığım <span className="sc-em">her şey</span>
            </h1>
            <p className="sc-lead mt-6 max-w-2xl">
              Kurumsal sitelerden e-ticaret altyapısına, okul yönetim
              uygulamasından oyuna kadar tüm işler. Satıştan tasarıma, kodlamadan
              yayına kadar her birini uçtan uca ben yürütüyorum.
            </p>
            <dl className="mt-12 grid max-w-2xl grid-cols-3 gap-3 sm:gap-4">
              {stats.map((stat) => (
                <div key={stat.label} className="sc-card px-4 py-5 sm:px-6 sm:py-6">
                  <dd className="font-display text-4xl tracking-tight text-sc-text sm:text-5xl">
                    {stat.value}
                  </dd>
                  <dt className="mt-1 text-xs text-sc-muted sm:text-sm">{stat.label}</dt>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section
          className="border-t border-sc-border"
          aria-labelledby="isler-stack-title"
        >
          <div className="sc-container sc-section">
            <h2 id="isler-stack-title" className="sc-h2">
              Kullandığım <span className="sc-em">teknolojiler</span>
            </h2>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {STACK_GROUPS.map((group) => (
                <div key={group.title} className="sc-card p-5">
                  <h3 className="sc-eyebrow">{group.title}</h3>
                  <ul className="mt-4 space-y-2">
                    {group.items.map((item) => (
                      <li key={item} className="text-sm text-sc-text">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          className="border-t border-sc-border"
          aria-labelledby="isler-list-title"
        >
          <div className="sc-container sc-section">
            <h2 id="isler-list-title" className="sc-h2 mb-10">
              <span className="sc-em">Projeler</span>
            </h2>
            <WorksGrid />
          </div>
        </section>
      </main>
      <ScFooter />
    </div>
  );
}
