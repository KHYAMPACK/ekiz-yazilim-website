import type { Metadata } from "next";
import Link from "next/link";
import IlhamChooser from "@/components/ilham/IlhamChooser";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";

export const metadata: Metadata = {
  // Hidden: not linked from the site and kept out of search. Remove to re-publish.
  robots: { index: false, follow: false },
  title: "İlham",
  description:
    "Beş kısa soruyla sitenizin yönünü bulun — sade, cesur, editoryal veya ürün odaklı. Sonuçla WhatsApp’tan konuşun.",
  alternates: { canonical: "/ilham" },
};

const ORIENTATION = [
  {
    title: "Yanlış Cevap Yok",
    body: "Seçimler zevkinizi ve önceliğinizi gösterir; tek doğru yol yok.",
  },
  {
    title: "Her Seçim Tasarımı Etkiler",
    body: "Boşluk, tipografi, renk ve çağrı — hepsi bu tercihlerden çıkar.",
  },
  {
    title: "Sonuç Bir Başlangıç",
    body: "Şablon değil; ilk konuşmada ortak dil kurmak için yön özeti.",
  },
] as const;

export default function IlhamPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="border-b border-black bg-white">
          <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
            <p className="mb-3 text-xs font-medium tracking-[0.2em] uppercase text-black/45">
              İlham
            </p>
            <h1 className="max-w-3xl text-3xl font-medium tracking-tight text-black sm:text-5xl">
              Sitenizin Yönünü Birlikte Bulalım
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-black/70 sm:text-lg">
              Beş kısa soru. Bir dakikadan az. Sonunda size uyan yönü sade
              dilde görür, isterseniz WhatsApp’tan konuşmaya geçersiniz.
            </p>
          </div>
        </section>

        <section className="border-b border-black bg-ice/25">
          <div className="mx-auto grid w-full max-w-6xl gap-0 border-x border-black sm:grid-cols-3">
            {ORIENTATION.map((item, i) => (
              <div
                key={item.title}
                className={[
                  "bg-white px-5 py-6 sm:px-6",
                  i > 0 ? "border-t border-black sm:border-t-0 sm:border-l" : "",
                ].join(" ")}
              >
                <p className="text-xs font-medium tracking-[0.16em] uppercase text-black/45">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h2 className="mt-2 text-base font-medium tracking-tight text-black">
                  {item.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-black/60">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="border-b border-black bg-ice/15">
          <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
            <IlhamChooser />
          </div>
        </section>

        <section className="border-b border-black bg-white">
          <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 sm:py-14">
            <h2 className="text-xl font-medium tracking-tight text-black sm:text-2xl">
              Bu sonuç ne işe yarar?
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-black/70 sm:text-base">
              İlk görüşmede “beğeniyorum ama tarif edemiyorum” yerine ortak bir
              yön olur. Siz ne istediğinizi netleştirirsiniz; biz de teklifi o
              dile göre kurarız. Değişebilir — bu bir sabit şablon değil.
            </p>
            <Link
              href="/#iletisim"
              className="mt-6 inline-flex border border-black px-5 py-2.5 text-sm font-medium text-black transition-colors hover:bg-black hover:text-white"
            >
              İletişim formuna git
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
