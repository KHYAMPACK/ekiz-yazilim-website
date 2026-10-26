import Link from "next/link";
import Logo from "./Logo";
import { site, whatsappHref } from "@/lib/site";

export default function SiteFooter() {
  const year = new Date().getFullYear();
  const wa = whatsappHref();

  return (
    <footer className="bg-black text-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-12 sm:px-6 md:flex-row md:items-start md:justify-between lg:py-14">
        <div className="min-w-0 shrink md:max-w-md">
          <Link href="/#ust" className="flex items-center">
            <Logo variant="full" tone="onDark" size={28} layout="inline" />
          </Link>
          <p className="mt-4 text-sm leading-relaxed text-white/55">
            {site.description}
          </p>
          <dl className="mt-6 space-y-2 text-sm text-white/70">
            <div>
              <dt className="sr-only">E-posta</dt>
              <dd>
                <a
                  href={`mailto:${site.email}`}
                  className="transition-colors hover:text-white"
                >
                  {site.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="sr-only">Konum</dt>
              <dd>{site.city}</dd>
            </div>
          </dl>
          {wa && (
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-block text-sm text-white/70 transition-colors hover:text-white"
            >
              WhatsApp
            </a>
          )}
        </div>

        <div className="flex shrink-0 flex-col gap-3 text-sm text-white/55 md:items-end md:text-right">
          <Link
            href="/egitim"
            className="inline-flex border border-ice/40 bg-ice/15 px-3 py-1.5 text-ice transition-colors hover:bg-ice hover:text-black"
          >
            Eğitim kurumları
          </Link>
          <Link
            href="/web-sitesi"
            className="transition-colors hover:text-white"
          >
            Web sitesi
          </Link>
          <Link
            href="/e-ticaret"
            className="transition-colors hover:text-white"
          >
            E-ticaret
          </Link>
          <Link href="/ilham" className="transition-colors hover:text-white">
            İlham
          </Link>
          <Link href="/kvkk" className="transition-colors hover:text-white">
            KVKK
          </Link>
          <Link href="/isler" className="transition-colors hover:text-white">
            İşler
          </Link>
          <Link href="/#sss" className="transition-colors hover:text-white">
            SSS
          </Link>
          <Link href="/#iletisim" className="transition-colors hover:text-white">
            İletişim
          </Link>
          <p className="mt-2 md:mt-4">
            © {year} {site.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
