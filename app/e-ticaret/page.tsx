import type { Metadata } from "next";
import EticaretBenefitDemo from "@/components/EticaretBenefitDemo";
import EticaretEaseDemo from "@/components/EticaretEaseDemo";
import EticaretHeroMosaic from "@/components/EticaretHeroMosaic";
import EticaretScheduleSection from "@/components/EticaretScheduleSection";
import ShopFlowDemo from "@/components/ShopFlowDemo";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { seo } from "@/lib/seo";
import { site, whatsappHref } from "@/lib/site";

const path = "/e-ticaret";
const pageUrl = `${seo.siteUrl}${path}`;

export const metadata: Metadata = {
  title: "E-Ticaret | Butik ve Giyim Online Mağaza",
  description:
    "Butik ve giyim mağazaları için e-ticaret: Instagram ve WhatsApp siparişlerinden kendi online mağazanıza. Ürün vitrini, sepet, ödeme ve sipariş takibi.",
  keywords: [
    "butik e-ticaret",
    "giyim e-ticaret sitesi",
    "online mağaza kurulumu",
    "e-ticaret başlangıç",
    "butik online mağaza",
  ],
  alternates: { canonical: path },
  openGraph: {
    title: "E-Ticaret | Butik ve Giyim Online Mağaza",
    description:
      "Butik ve giyim için online mağaza: vitrin, sepet, ödeme ve sipariş takibi.",
    url: pageUrl,
    siteName: site.name,
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "E-Ticaret | Butik ve Giyim Online Mağaza",
    description:
      "Denizli’de e-ticaret — butik ve giyim için kendi online mağazanız.",
  },
};

const PAINS = [
  {
    title: "Siparişler mesajlarda dağılır",
    body: "Beden, renk, adres ve ödeme bilgisi sohbetlerde kaybolur. Mağazada her sipariş tek yerde toplanır.",
  },
  {
    title: "Müşteri nasıl alacağını bilemez",
    body: "Ürünü görür, “nasıl sipariş veririm?” diye sorar. Mağazada sepet ve ödeme hazırdır; alışveriş tamamlanır.",
  },
  {
    title: "Stok ve beden karışır",
    body: "Hangi beden kaldı, ne satıldı — takip zorlaşır. Ürün ve seçenekler mağazada net görünür.",
  },
  {
    title: "Telefonlardan alışveriş zor olur",
    body: "Çoğu müşteri telefondan bakar. Mağazayı mobilde rahat kullanılacak şekilde kuruyoruz.",
  },
] as const;

const SCOPE = [
  {
    title: "Ürün vitrini",
    body: "Kategoriler, beden ve renk seçenekleri, net ürün sayfaları.",
  },
  {
    title: "Sepet ve sipariş",
    body: "Müşteri ürünü ekler, siparişi tamamlar; siz panelden görürsünüz.",
  },
  {
    title: "Ödeme",
    body: "Yayına uygun ödeme düzeni. Neyin dahil olduğu teklifte yazılır.",
  },
  {
    title: "İletişim",
    body: "Mağaza yanında WhatsApp ile soru ve destek kolay kalır.",
  },
] as const;

const STEPS = [
  {
    n: "01",
    title: "Keşif",
    body: "Ürün sayısı, bedenler, kargo ve ödeme ihtiyacını konuşuruz. Genelde 15–20 dakika yeter.",
  },
  {
    n: "02",
    title: "Teklif",
    body: "Kapsam, süre ve fiyat net yazılır.",
  },
  {
    n: "03",
    title: "Kurulum ve yayın",
    body: "Mağaza hazırlanır, test edilir, yayına alınır. Sonrasında destek için yanınızdayız.",
  },
] as const;

const FAQS = [
  {
    q: "E-ticarete hiç başlamadım, olur mu?",
    a: "Olur. Ürün vitrini, sipariş ve ödeme ile ilk online mağazanızı kuruyoruz. Özellikle butik ve giyim satan işletmeler için bu sayfayı yazdık.",
  },
  {
    q: "Sadece giyim / butik mi?",
    a: "Bu sayfa onlara odaklı. Ürün satmayan bir tanıtım sitesi istiyorsanız web sitesi sayfasına bakın.",
  },
  {
    q: "Ne kazanırım?",
    a: "Müşteri ürünü görüp satın alabilir; siparişler tek yerde toplanır; beden ve stok daha net takip edilir. Günlük satış işi mesajlara daha az dağılır.",
  },
  {
    q: "Süre ve fiyat?",
    a: "İşe göre değişir. Konuştuktan sonra teklifte yazarız. Başlangıç mağazası genelde kısa sürede çıkar.",
  },
] as const;

const BENEFITS = [
  {
    title: "Satış yolu netleşir",
    body: "Müşteri ürünü seçer, sepete ekler, öder — siz de siparişi alırsınız.",
  },
  {
    title: "İş yükü azalır",
    body: "Her siparişi mesaj mesaj anlatmak yerine süreç mağazada akar.",
  },
  {
    title: "Markanızın adresi olur",
    body: "Kendi domain’inizde vitrin: ürünler ve siparişler sizin yerinizde.",
  },
] as const;

const waMessage =
  "Merhaba, e-ticaret sayfanızdan yazıyorum. Butik / giyim için online mağazaya birlikte başlamak istiyorum.";

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: "E-Ticaret | Butik ve Giyim Online Mağaza",
        description:
          "Butik ve giyim mağazaları için e-ticaret ve online mağaza kurulumu.",
        isPartOf: { "@id": `${seo.siteUrl}/#website` },
        about: { "@id": `${pageUrl}#service` },
        inLanguage: "tr-TR",
      },
      {
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        name: "E-ticaret — butik ve giyim online mağaza",
        serviceType: "E-ticaret web sitesi kurulumu",
        description:
          "Butik ve giyim satan işletmeler için online mağaza: ürün vitrini, sepet, ödeme ve sipariş takibi.",
        provider: {
          "@type": "Organization",
          name: site.name,
          url: seo.siteUrl,
          email: site.email,
          telephone: site.phone ? `+${site.phone}` : undefined,
        },
        areaServed: {
          "@type": "Country",
          name: "Türkiye",
        },
        audience: {
          "@type": "Audience",
          audienceType: "Butik ve giyim perakendecileri",
        },
        url: pageUrl,
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        mainEntity: FAQS.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.a,
          },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Ana sayfa",
            item: seo.siteUrl,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "E-ticaret",
            item: pageUrl,
          },
        ],
      },
    ],
  };
}

export default function EticaretPage() {
  const wa = whatsappHref(waMessage);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()) }}
      />
      <SiteHeader />
      <main>
        <section className="border-b border-black bg-white">
          <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-12">
            <div className="mx-auto w-full max-w-xl text-center lg:mx-0 lg:max-w-none lg:text-left">
              <p className="mb-3 text-xs font-medium tracking-[0.2em] uppercase text-black/45">
                E-ticaret
              </p>
              <h1 className="text-3xl font-medium tracking-tight text-black sm:text-5xl">
                Butik ve giyim için online mağaza
              </h1>
              <p className="mt-5 text-base leading-relaxed text-black/70 sm:text-lg lg:max-w-lg">
                {site.name} olarak Instagram ve WhatsApp siparişlerini online
                mağazaya taşıyoruz. Ürünleriniz vitrinde durur, müşteri satın
                alır, siz siparişi yönetirsiniz.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:mx-auto sm:max-w-md lg:mx-0 lg:max-w-none lg:flex-row lg:flex-wrap">
                {wa && (
                  <a
                    href={wa}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-12 w-full items-center justify-center border border-black bg-black px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white hover:text-black lg:w-auto"
                  >
                    Birlikte başlayalım
                  </a>
                )}
                <a
                  href="#gorusme"
                  className="inline-flex min-h-12 w-full items-center justify-center border border-black bg-white px-5 py-2.5 text-sm font-medium text-black transition-colors hover:bg-ice/40 lg:w-auto"
                >
                  Görüşme ayarla
                </a>
              </div>
            </div>
            <EticaretHeroMosaic />
          </div>
        </section>

        <EticaretScheduleSection />

        <section className="border-b border-black bg-white" aria-labelledby="kimler-title">
          <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
            <p className="mb-3 text-xs font-medium tracking-[0.2em] uppercase text-black/45">
              Ne kolaylaşır
            </p>
            <h2
              id="kimler-title"
              className="max-w-2xl text-2xl font-medium tracking-tight text-black sm:text-3xl"
            >
              Günlük satış işinde ne değişir?
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-black/65 sm:text-base">
              Butik, mağaza veya atölyeden giyim / aksesuar satıyorsanız online
              mağaza şu noktaları netleştirir.
            </p>

            <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,22rem)_1fr] lg:items-center lg:gap-10">
              <EticaretEaseDemo />
              <ul className="grid gap-0 border border-black bg-white sm:grid-cols-2">
                {PAINS.map((item, i) => (
                  <li
                    key={item.title}
                    className={[
                      "px-5 py-6 sm:px-6",
                      i % 2 === 1 ? "sm:border-l border-black" : "",
                      i >= 2 ? "border-t border-black" : "",
                      i === 1 ? "border-t border-black sm:border-t-0" : "",
                    ].join(" ")}
                  >
                    <h3 className="text-base font-medium tracking-tight text-black">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-black/65">
                      {item.body}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section
          id="kapsam"
          className="border-b border-black bg-ice/30"
          aria-labelledby="kapsam-title"
        >
          <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
            <p className="mb-3 text-xs font-medium tracking-[0.2em] uppercase text-black/45">
              Ne kuruyoruz
            </p>
            <h2
              id="kapsam-title"
              className="max-w-2xl text-2xl font-medium tracking-tight text-black sm:text-3xl"
            >
              Online mağazada neler olur?
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-black/65 sm:text-base">
              İlk mağazanızda şu parçalar yer alır. İhtiyaç büyüdükçe üzerine
              ekleme konuşulur.
            </p>

            <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_minmax(0,22rem)] lg:items-center lg:gap-10">
              <ul className="grid gap-0 border border-black bg-white sm:grid-cols-2">
                {SCOPE.map((item, i) => (
                  <li
                    key={item.title}
                    className={[
                      "px-5 py-6 sm:px-5",
                      i % 2 === 1 ? "sm:border-l border-black" : "",
                      i >= 2 ? "border-t border-black" : "",
                      i === 1 ? "border-t border-black sm:border-t-0" : "",
                    ].join(" ")}
                  >
                    <h3 className="text-base font-medium tracking-tight text-black">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-black/65">
                      {item.body}
                    </p>
                  </li>
                ))}
              </ul>
              <div className="lg:justify-self-end w-full max-w-[22rem]">
                <ShopFlowDemo />
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-black bg-white" aria-labelledby="fayda-title">
          <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
            <p className="mb-3 text-xs font-medium tracking-[0.2em] uppercase text-black/45">
              Fayda
            </p>
            <h2
              id="fayda-title"
              className="text-2xl font-medium tracking-tight text-black sm:text-3xl"
            >
              Size ne kazandırır?
            </h2>

            <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,22rem)_1fr] lg:items-center lg:gap-10">
              <EticaretBenefitDemo />
              <ul className="grid gap-0 border border-black bg-white sm:grid-cols-3">
                {BENEFITS.map((item, i) => (
                  <li
                    key={item.title}
                    className={[
                      "px-5 py-6 sm:px-6",
                      i > 0
                        ? "border-t border-black sm:border-t-0 sm:border-l"
                        : "",
                    ].join(" ")}
                  >
                    <h3 className="text-base font-medium tracking-tight text-black">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-black/65">
                      {item.body}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="border-b border-black bg-black text-white" aria-labelledby="surec-eticaret-title">
          <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
            <p className="mb-3 text-xs font-medium tracking-[0.2em] uppercase text-ice">
              Süreç
            </p>
            <h2
              id="surec-eticaret-title"
              className="text-2xl font-medium tracking-tight text-white sm:text-3xl"
            >
              Nasıl ilerleriz?
            </h2>
            <ol className="mt-10 grid gap-0 border border-white/25 sm:grid-cols-3">
              {STEPS.map((step, i) => (
                <li
                  key={step.n}
                  className={[
                    "flex flex-col gap-3 p-5 sm:p-6",
                    i < STEPS.length - 1
                      ? "border-b border-white/25 sm:border-b-0 sm:border-r"
                      : "",
                  ].join(" ")}
                >
                  <span className="text-xs font-medium tracking-[0.2em] text-ice">
                    {step.n}
                  </span>
                  <h3 className="text-xl font-medium tracking-tight text-white">
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-white/65">
                    {step.body}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="border-b border-black bg-ice/30" aria-labelledby="faq-eticaret-title">
          <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
            <p className="mb-3 text-xs font-medium tracking-[0.2em] uppercase text-black/45">
              SSS
            </p>
            <h2
              id="faq-eticaret-title"
              className="text-2xl font-medium tracking-tight text-black sm:text-3xl"
            >
              Sık sorulanlar
            </h2>
            <dl className="mt-10 divide-y divide-black border border-black bg-white">
              {FAQS.map((item) => (
                <div key={item.q} className="px-5 py-5 sm:px-6">
                  <dt className="text-base font-medium tracking-tight text-black">
                    {item.q}
                  </dt>
                  <dd className="mt-2 text-sm leading-relaxed text-black/65">
                    {item.a}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="border-b border-black bg-ice/30">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-5 px-4 py-14 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-16">
            <div className="max-w-xl">
              <h2 className="text-xl font-medium tracking-tight text-black sm:text-2xl">
                Birlikte başlayalım
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-black/65">
                Butik veya giyim satıyorsanız yazın. İhtiyacınızı dinler,
                adım adım mağazanızı kurarız — yalnız bırakmıyoruz.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              {wa && (
                <a
                  href={wa}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-12 items-center justify-center border border-black bg-black px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white hover:text-black"
                >
                  Birlikte başlayalım
                </a>
              )}
              <a
                href="#gorusme"
                className="inline-flex min-h-12 items-center justify-center border border-black bg-white px-5 py-2.5 text-sm font-medium text-black transition-colors hover:bg-ice/40"
              >
                Görüşme ayarla
              </a>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
