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
      className="border-b border-black bg-ice/30"
      aria-labelledby="websitesi-home-title"
    >
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-14">
        <div>
          <p className="mb-3 text-xs font-medium tracking-[0.2em] uppercase text-black/45">
            Web sitesi
          </p>
          <h2
            id="websitesi-home-title"
            className="text-3xl font-medium tracking-tight text-black sm:text-4xl"
          >
            Okul, Kreş Ve Etüt Merkezleri İçin Özel Web Sitesi
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-black/70">
            Kreş, okul, etüt merkezi veya işletmeniz için işinizi anlatan bir
            site. Keşiften yayına kadar tasarımı ve kurulumu biz yürütürüz.
          </p>
          <ul className="mt-6 space-y-2.5">
            {points.map((line) => (
              <li
                key={line}
                className="flex gap-2.5 text-sm leading-relaxed text-black/70"
              >
                <span className="mt-2 h-1 w-1 shrink-0 bg-black" aria-hidden />
                {line}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/web-sitesi"
              className="inline-flex border border-black bg-black px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white hover:text-black"
            >
              Web sitesi sayfasına git
            </Link>
            <Link
              href="/web-sitesi#gorusme"
              className="inline-flex border border-black px-5 py-2.5 text-sm font-medium text-black transition-colors hover:bg-ice/40"
            >
              Görüşme ayarla
            </Link>
          </div>
        </div>

        <Link
          href="/web-sitesi"
          className="group relative w-full overflow-hidden border border-black bg-ice/20 lg:justify-self-end"
        >
          <Image
            src="/works/sahika-desktop.png"
            alt="Yayındaki bir Ekiz Yazılım sitesi"
            width={1280}
            height={720}
            className="aspect-[16/10] h-auto w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            sizes="(max-width: 1024px) 100vw, 420px"
          />
          <span className="absolute right-0 bottom-0 border-t border-l border-black bg-white px-3 py-1.5 text-xs font-medium tracking-wide text-black">
            Yayında →
          </span>
        </Link>
      </div>
    </section>
  );
}
