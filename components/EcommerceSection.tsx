"use client";

import Link from "next/link";
import ShopFlowDemo from "@/components/ShopFlowDemo";

const points = [
  "Ürün, beden ve stok tek yerde — mesajlarda dağılmaz",
  "Müşteri sepete ekler, ödemeyi tamamlar",
  "Siparişleri panelden takip edersiniz",
] as const;

/** Light "paper" band: the one cream section on the homepage. */
export default function EcommerceSection() {
  return (
    <section
      id="e-ticaret"
      className="sc-paper"
      aria-labelledby="eticaret-home-title"
    >
      <div className="sc-container sc-section grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-16">
        <div className="lg:order-2">
          <p className="sc-eyebrow mb-4">E-ticaret</p>
          <h2 id="eticaret-home-title" className="sc-h2">
            Butik ve giyim için{" "}
            <span className="sc-em">online mağaza</span>
          </h2>
          <p className="sc-lead mt-5 max-w-xl">
            Instagram ve WhatsApp’tan gelen siparişleri bir online mağazaya
            taşıyoruz. Ürünleriniz vitrinde durur; müşteri satın alır; siz
            siparişi yönetirsiniz.
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
            <Link href="/e-ticaret" className="sc-btn sc-btn--primary">
              E-ticaret sayfasına git
            </Link>
            <Link href="/#iletisim" className="sc-btn sc-btn--ghost">
              Konuşalım
            </Link>
          </div>
        </div>

        <div className="w-full max-w-[22rem] justify-self-center lg:order-1 lg:justify-self-start">
          <div className="rounded-3xl bg-[#f0eee6] p-4 sm:p-5 [&_.shop-demo]:rounded-2xl">
            <ShopFlowDemo />
          </div>
        </div>
      </div>
    </section>
  );
}
