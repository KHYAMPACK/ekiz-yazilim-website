import Image from "next/image";
import Link from "next/link";

const points = [
  "Ne yaptığınızı net anlatan sayfalar",
  "Mobil uyum, form ve SEO temelleri",
  "Yazılı teklif — hesaplar sizde kalır",
] as const;

export default function WebsiteSection() {
  return (
    <section
      id="web-sitesi"
      className="border-t border-sc-border bg-sc-surface"
      aria-labelledby="websitesi-home-title"
    >
      <div className="sc-container sc-section grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-16">
        <div>
          <p className="sc-eyebrow mb-4">Web sitesi</p>
          <h2 id="websitesi-home-title" className="sc-h2">
            Okul, kreş ve etüt merkezleri için{" "}
            <span className="sc-em">özel web sitesi</span>
          </h2>
          <p className="sc-lead mt-5 max-w-xl">
            Kreş, okul, etüt merkezi veya işletmeniz için işinizi anlatan bir
            site. Keşiften yayına tasarımı ve kurulumu biz yürütürüz.
          </p>
          <ul className="mt-7 space-y-3">
            {points.map((line) => (
              <li key={line} className="flex gap-3 text-[0.9375rem] text-sc-text">
                <span
                  className="mt-[0.55rem] size-1.5 shrink-0 rounded-full bg-sc-accent"
                  aria-hidden
                />
                {line}
              </li>
            ))}
          </ul>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="/web-sitesi" className="sc-btn sc-btn--primary">
              Web sitesi sayfasına git
            </Link>
            <Link href="/web-sitesi#gorusme" className="sc-btn sc-btn--ghost">
              Görüşme ayarla
            </Link>
          </div>
        </div>

        <Link
          href="/web-sitesi"
          className="group relative block w-full overflow-hidden rounded-3xl border border-sc-border bg-sc-bg shadow-[0_30px_80px_-30px_rgba(229,138,92,0.3)]"
        >
          <Image
            src="/works/sahika-desktop.png"
            alt="Yayındaki bir Ekiz Yazılım sitesi"
            width={1280}
            height={720}
            className="aspect-[16/10] h-auto w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            sizes="(max-width: 1024px) 100vw, 560px"
          />
          <span className="absolute right-4 bottom-4 inline-flex items-center gap-2 rounded-full bg-[#121211]/85 px-3.5 py-1.5 text-xs font-medium text-sc-text backdrop-blur">
            <span className="size-1.5 rounded-full bg-sc-accent" aria-hidden />
            Yayında
          </span>
        </Link>
      </div>
    </section>
  );
}
