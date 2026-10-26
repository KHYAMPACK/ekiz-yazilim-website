import Link from "next/link";
import WorkCard from "./WorkCard";
import { featuredWorks } from "@/lib/works";

export default function WorksSection() {
  const projects = featuredWorks();

  return (
    <section
      id="isler"
      className="border-t border-sc-border bg-sc-surface"
      aria-labelledby="isler-title"
    >
      <div className="sc-container sc-section">
        <div className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <p className="sc-eyebrow mb-4">İşler</p>
            <h2 id="isler-title" className="sc-h2">
              <span className="sc-em">Yaptıklarımız</span>
            </h2>
            <p className="sc-lead mt-4">
              Seçilmiş yayındaki işler. Tam liste İşler sayfasında.
            </p>
          </div>
          <Link href="/isler" className="sc-btn sc-btn--ghost shrink-0">
            Tüm işler <span aria-hidden>→</span>
          </Link>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <WorkCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
