"use client";

import Link from "next/link";
import ShopFlowDemo from "@/components/ShopFlowDemo";

const points = [
  "Ürün, beden ve stok tek yerde — mesajlarda dağılmaz",
  "Müşteri sepete ekler, ödemeyi tamamlar",
  "Siparişleri panelden takip edersiniz",
] as const;

export default function EcommerceSection() {
  return (
    <section
      id="e-ticaret"
      className="border-b border-black bg-white"
      aria-labelledby="eticaret-home-title"
    >
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-14">
        <div>
          <p className="mb-3 text-xs font-medium tracking-[0.2em] uppercase text-black/45">
            E-ticaret
          </p>
          <h2
            id="eticaret-home-title"
            className="text-3xl font-medium tracking-tight text-black sm:text-4xl"
          >
            Butik ve giyim için online mağaza
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-black/70">
            Instagram ve WhatsApp’tan gelen siparişleri bir online mağazaya
            taşıyoruz. Ürünleriniz vitrinde durur; müşteri satın alır; siz
            siparişi yönetirsiniz.
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
              href="/e-ticaret"
              className="inline-flex border border-black bg-black px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white hover:text-black"
            >
              E-ticaret sayfasına git
            </Link>
            <Link
              href="/#iletisim"
              className="inline-flex border border-black px-5 py-2.5 text-sm font-medium text-black transition-colors hover:bg-white"
            >
              Konuşalım
            </Link>
          </div>
        </div>

        <div className="w-full max-w-[22rem] justify-self-center lg:justify-self-end">
          <ShopFlowDemo />
        </div>
      </div>
    </section>
  );
}
