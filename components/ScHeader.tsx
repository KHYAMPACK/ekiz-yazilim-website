"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import ScLogo from "./ScLogo";

const links = [
  { href: "/#hakkimizda", label: "Hakkımızda", wideOnly: true },
  { href: "/#surec", label: "Süreç" },
  { href: "/isler", label: "İşler", route: true },
  { href: "/arastirma", label: "Araştırma", route: true, wideOnly: true },
  { href: "/#kurucu", label: "Kurucu", wideOnly: true },
  { href: "/#sss", label: "SSS" },
  { href: "/#iletisim", label: "İletişim" },
] as const;

const webLinks = [
  { href: "#surec", label: "İş akışı" },
  { href: "#odak", label: "Odak" },
  { href: "#plan", label: "Plan" },
  { href: "/isler", label: "İşler", route: true },
  { href: "#neden", label: "Neden" },
  { href: "#sss", label: "SSS" },
  { href: "#gorusme", label: "Görüşme" },
] as const;

const products = [
  { href: "/web-sitesi", label: "Web sitesi" },
] as const;

const linkClass =
  "text-[0.9375rem] text-sc-muted transition-colors hover:text-sc-text";

/** Header for the Scholares-themed pages (dark, orange accent). */
export default function ScHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const onHome = pathname === "/";
  const onWeb = pathname === "/web-sitesi";
  const onEgitim = pathname === "/egitim";
  const nav = onWeb ? webLinks : links;

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function close() {
    setOpen(false);
  }

  return (
    <header
      className={`sticky top-0 z-50 border-b backdrop-blur-md transition-colors ${
        scrolled || open
          ? "border-sc-border bg-[#121211]/90"
          : "border-transparent bg-[#121211]/70"
      }`}
    >
      <div className="sc-container flex h-16 items-center justify-between gap-4">
        <Link
          href={onHome ? "#ust" : "/"}
          className="flex min-w-0 shrink items-center overflow-hidden"
          onClick={close}
          aria-label="Ekiz Yazılım — ana sayfa"
        >
          <ScLogo size={34} />
        </Link>

        <nav
          className="ml-auto hidden items-center gap-6 lg:flex"
          aria-label="Ana menü"
        >
          <ul className="flex items-center gap-6">
            {products.map((p) => (
              <li key={p.href}>
                <Link
                  href={p.href}
                  className={`${linkClass} ${pathname === p.href ? "!text-sc-text" : ""}`}
                  aria-current={pathname === p.href ? "page" : undefined}
                >
                  {p.label}
                </Link>
              </li>
            ))}
            {nav.map((link) => {
              const wide = "wideOnly" in link && link.wideOnly;
              return (
                <li key={link.href} className={wide ? "hidden xl:block" : ""}>
                  {"route" in link && link.route ? (
                    <Link
                      href={link.href}
                      className={`${linkClass} ${pathname === link.href ? "!text-sc-text" : ""}`}
                      aria-current={pathname === link.href ? "page" : undefined}
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <a href={link.href} className={linkClass}>
                      {link.label}
                    </a>
                  )}
                </li>
              );
            })}
          </ul>
          <Link
            href="/egitim"
            onClick={close}
            className={`sc-btn !min-h-10 !px-4 !text-sm ${
              onEgitim ? "sc-btn--light" : "sc-btn--primary"
            }`}
            aria-current={onEgitim ? "page" : undefined}
          >
            Eğitim kurumları
          </Link>
        </nav>

        <button
          type="button"
          className="ml-auto flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-sc-border text-sc-text lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="flex flex-col gap-[5px]" aria-hidden="true">
            <span
              className={`block h-px w-[18px] bg-current transition-transform ${open ? "translate-y-[6px] rotate-45" : ""}`}
            />
            <span
              className={`block h-px w-[18px] bg-current transition-opacity ${open ? "opacity-0" : ""}`}
            />
            <span
              className={`block h-px w-[18px] bg-current transition-transform ${open ? "-translate-y-[6px] -rotate-45" : ""}`}
            />
          </span>
        </button>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          className="border-t border-sc-border bg-[#121211] lg:hidden"
          aria-label="Mobil menü"
        >
          <div className="sc-container pt-4 pb-5">
            <Link
              href="/egitim"
              onClick={close}
              className={`sc-btn w-full ${onEgitim ? "sc-btn--light" : "sc-btn--primary"}`}
              aria-current={onEgitim ? "page" : undefined}
            >
              Eğitim kurumları
            </Link>
            <div className="mt-2 grid gap-2">
              {products.map((p) => (
                <Link
                  key={p.href}
                  href={p.href}
                  onClick={close}
                  className="sc-btn sc-btn--secondary"
                  aria-current={pathname === p.href ? "page" : undefined}
                >
                  {p.label}
                </Link>
              ))}
            </div>
            <ul className="mt-3 divide-y divide-sc-border">
              {nav.map((link) => (
                <li key={link.href}>
                  {"route" in link && link.route ? (
                    <Link
                      href={link.href}
                      onClick={close}
                      className="flex min-h-12 items-center text-base text-sc-text"
                      aria-current={pathname === link.href ? "page" : undefined}
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      href={link.href}
                      onClick={close}
                      className="flex min-h-12 items-center text-base text-sc-text"
                    >
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </nav>
      )}
    </header>
  );
}
