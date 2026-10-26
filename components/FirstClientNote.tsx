import Link from "next/link";

export default function FirstClientNote() {
  return (
    <section
      className="border-t border-sc-border bg-sc-bg"
      aria-label="İşler notu"
    >
      <div className="sc-container py-10 sm:py-12">
        <div className="sc-card flex flex-col gap-3 px-6 py-6 sm:flex-row sm:items-center sm:gap-8 sm:px-8">
          <p className="sc-eyebrow shrink-0">Not</p>
          <p className="min-w-0 max-w-3xl text-base leading-relaxed text-sc-text sm:text-lg">
            Yayındaki işlerin tam listesi{" "}
            <Link
              href="/isler"
              className="text-sc-accent-text underline underline-offset-4"
            >
              İşler
            </Link>{" "}
            sayfasında. Yeni projeler geldikçe oraya eklenir.
          </p>
        </div>
      </div>
    </section>
  );
}
