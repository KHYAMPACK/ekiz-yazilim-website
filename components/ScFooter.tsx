import Link from "next/link";
import ScLogo from "./ScLogo";
import { site, whatsappHref } from "@/lib/site";

const columns = [
  {
    title: "Çözümler",
    links: [
      { href: "/egitim", label: "Eğitim kurumları" },
      { href: "/web-sitesi", label: "Web sitesi" },
    ],
  },
  {
    title: "Ekiz Yazılım",
    links: [
      { href: "/isler", label: "İşler" },
      { href: "/#sss", label: "SSS" },
      { href: "/#iletisim", label: "İletişim" },
    ],
  },
  {
    title: "Yasal",
    links: [{ href: "/kvkk", label: "KVKK" }],
  },
] as const;

/** Footer for the Scholares-themed pages. */
export default function ScFooter() {
  const year = new Date().getFullYear();
  const wa = whatsappHref();

  return (
    <footer className="border-t border-sc-border bg-sc-bg text-sc-text">
      <div className="sc-container py-14 lg:py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2fr]">
          <div className="min-w-0 max-w-sm">
            <Link href="/#ust" className="flex items-center" aria-label="Ekiz Yazılım">
              <ScLogo size={38} />
            </Link>
            <p className="sc-body mt-5 !text-[0.9375rem]">{site.description}</p>
            <dl className="mt-6 space-y-1.5 text-[0.9375rem] text-sc-muted">
              <div>
                <dt className="sr-only">E-posta</dt>
                <dd>
                  <a
                    href={`mailto:${site.email}`}
                    className="transition-colors hover:text-sc-text"
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
                className="sc-btn sc-btn--ghost mt-6 !min-h-10 !text-sm"
              >
                WhatsApp’tan yazın
              </a>
            )}
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {columns.map((col) => (
              <div key={col.title}>
                <p className="text-xs font-medium tracking-[0.16em] text-sc-text uppercase">
                  {col.title}
                </p>
                <ul className="mt-4 space-y-3">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-[0.9375rem] text-sc-muted transition-colors hover:text-sc-accent-text"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-sc-border pt-6 text-sm text-sc-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}
          </p>
          <p>Ankara merkezli · Türkiye genelinde uzaktan</p>
        </div>
      </div>
    </footer>
  );
}
