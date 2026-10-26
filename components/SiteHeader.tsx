"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Logo from "./Logo";

const links = [
  { href: "/#hakkimizda", label: "Hakkımızda" },
  { href: "/#surec", label: "Süreç" },
  { href: "/isler", label: "İşler", route: true },
  { href: "/ilham", label: "İlham", route: true },
  { href: "/#kurucu", label: "Kurucu" },
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

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const onHome = pathname === "/";
  const onEticaret = pathname === "/e-ticaret";
  const onWeb = pathname === "/web-sitesi";
  const onEgitim = pathname === "/egitim";

  function close() {
    setOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-black bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
        <Link
          href={onHome ? "#ust" : "/"}
          className="flex min-w-0 shrink items-center overflow-hidden"
          onClick={close}
        >
          <Logo variant="full" tone="onLight" size={24} layout="inline" />
        </Link>

        <nav className="ml-auto hidden items-center gap-5 lg:flex lg:gap-7" aria-label="Ana menü">
          <ul className="flex items-center justify-end gap-5 lg:gap-7">
            {(onWeb ? webLinks : links).map((link) => (
              <li key={link.href}>
                {"route" in link && link.route ? (
                  <Link
                    href={link.href}
                    className="text-sm font-medium tracking-wide text-black transition-colors hover:text-black/60"
                    aria-current={pathname === link.href ? "page" : undefined}
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a
                    href={link.href}
                    className="text-sm font-medium tracking-wide text-black transition-colors hover:text-black/60"
                  >
                    {link.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
          <Link
            href="/egitim"
            onClick={close}
            className={[
              "shrink-0 border px-3 py-1.5 text-sm font-medium tracking-wide transition-colors",
              onEgitim
                ? "border-black bg-black text-white"
                : "border-black bg-ice text-black hover:bg-black hover:text-white",
            ].join(" ")}
            aria-current={onEgitim ? "page" : undefined}
          >
            Eğitim kurumları
          </Link>
          <Link
            href="/web-sitesi"
            onClick={close}
            className={[
              "shrink-0 border px-3 py-1.5 text-sm font-medium tracking-wide transition-colors",
              onWeb
                ? "border-black bg-black text-white"
                : "border-black bg-ice text-black hover:bg-black hover:text-white",
            ].join(" ")}
            aria-current={onWeb ? "page" : undefined}
          >
            Web sitesi
          </Link>
          <Link
            href="/e-ticaret"
            onClick={close}
            className={[
              "shrink-0 border px-3 py-1.5 text-sm font-medium tracking-wide transition-colors",
              onEticaret
                ? "border-black bg-black text-white"
                : "border-black bg-white text-black hover:bg-black hover:text-white",
            ].join(" ")}
            aria-current={onEticaret ? "page" : undefined}
          >
            E-ticaret
          </Link>
        </nav>

        <button
          type="button"
          className="ml-auto flex h-9 w-9 shrink-0 items-center justify-center border border-black lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Menü</span>
          <span className="flex flex-col gap-1.5" aria-hidden="true">
            <span
              className={`block h-px w-4 bg-black transition-transform ${open ? "translate-y-[3.5px] rotate-45" : ""}`}
            />
            <span
              className={`block h-px w-4 bg-black transition-opacity ${open ? "opacity-0" : ""}`}
            />
            <span
              className={`block h-px w-4 bg-black transition-transform ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`}
            />
          </span>
        </button>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          className="border-t border-black bg-white lg:hidden"
          aria-label="Mobil menü"
        >
          <ul className="mx-auto w-full max-w-6xl px-4 sm:px-6">
            <li className="border-b border-black/10 py-3">
              <Link
                href="/egitim"
                onClick={close}
                className={[
                  "flex min-h-11 items-center justify-center border text-sm font-medium tracking-wide",
                  onEgitim
                    ? "border-black bg-black text-white"
                    : "border-black bg-ice text-black",
                ].join(" ")}
                aria-current={onEgitim ? "page" : undefined}
              >
                Eğitim kurumları
              </Link>
            </li>
            <li className="border-b border-black/10 py-3">
              <Link
                href="/web-sitesi"
                onClick={close}
                className={[
                  "flex min-h-11 items-center justify-center border text-sm font-medium tracking-wide",
                  onWeb
                    ? "border-black bg-black text-white"
                    : "border-black bg-ice text-black",
                ].join(" ")}
                aria-current={onWeb ? "page" : undefined}
              >
                Web sitesi
              </Link>
            </li>
            <li className="border-b border-black/10 py-3">
              <Link
                href="/e-ticaret"
                onClick={close}
                className={[
                  "flex min-h-11 items-center justify-center border text-sm font-medium tracking-wide",
                  onEticaret
                    ? "border-black bg-black text-white"
                    : "border-black bg-white text-black",
                ].join(" ")}
                aria-current={onEticaret ? "page" : undefined}
              >
                E-ticaret
              </Link>
            </li>
            {(onWeb ? webLinks : links).map((link) => (
              <li
                key={link.href}
                className="border-b border-black/10 last:border-0"
              >
                {"route" in link && link.route ? (
                  <Link
                    href={link.href}
                    onClick={close}
                    className="flex min-h-12 items-center text-sm font-medium tracking-wide text-black"
                    aria-current={pathname === link.href ? "page" : undefined}
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a
                    href={link.href}
                    onClick={close}
                    className="flex min-h-12 items-center text-sm font-medium tracking-wide text-black"
                  >
                    {link.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
