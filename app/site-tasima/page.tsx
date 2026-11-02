import type { Metadata } from "next";
import ScFooter from "@/components/ScFooter";
import ScHeader from "@/components/ScHeader";
import { seo } from "@/lib/seo";
import { site, whatsappHref } from "@/lib/site";

const PATH = "/site-tasima";
const PRICE = "999";

const WA_TEXT =
  "Merhaba, Site Taşıma Paketi sayfanızdan yazıyorum. Mevcut sitemin aynısını sizin altyapınızda yayına almak istiyorum. Site adresim: ";

export const metadata: Metadata = {
  title: "Site Taşıma Paketi | Sitenizin aynısı, ayda 999 TL",
  description:
    "Mevcut sitenizin aynısını Ekiz Yazılım'ın kodu ve hosting'iyle yayına alıyoruz. Aylık 999 TL. Hosting, SSL ve yedekleme dahil.",
  alternates: { canonical: PATH },
  // Landing page for direct outreach, not meant to rank.
  robots: { index: false, follow: true },
  openGraph: {
    title: "Site Taşıma Paketi | Sitenizin aynısı, ayda 999 TL",
    description:
      "Sitenizin aynısı, bizim kodumuz ve hosting'imizle. Aylık 999 TL.",
    url: `${seo.siteUrl}${PATH}`,
    siteName: site.name,
    locale: "tr_TR",
    type: "website",
  },
};

const INCLUDED = [
  {
    title: "Aynı site, aynı sayfalar",
    body: "Mevcut sitenizdeki sayfalar, metinler, görseller ve menü yapısı olduğu gibi taşınır.",
  },
  {
    title: "Bizim kodumuz",
    body: "Site, eski dosyaların kopyası değil; kendi altyapımızda yeniden kurulur. Bakımı ve güvenliği bizde.",
  },
  {
    title: "Hosting, SSL ve yedek dahil",
    body: "Sunucu, güvenlik sertifikası ve düzenli yedekleme aylık ücrete dahildir. Ayrıca bir fatura gelmez.",
  },
  {
    title: "Telefonda düzgün açılır",
    body: "Taşınan site mobil uyumlu çalışır. Velinin ya da müşterinin telefonunda bozuk görünmez.",
  },
];

const NOT_INCLUDED = [
  "Tasarım değişikliği ve revizyon",
  "Yeni sayfa ya da yeni özellik",
  "İçerik yazımı ve görsel hazırlığı",
];

const STEPS = [
  {
    n: "1",
    title: "Adresinizi gönderin",
    body: "Sitenizin adresini WhatsApp'tan yazmanız yeterli. Kontrol edip yazılı olarak dönüyoruz.",
  },
  {
    n: "2",
    title: "Biz taşıyalım",
    body: "Siteyi kendi altyapımızda aynı görünümle kuruyoruz ve 3 gün içinde yayına hazır hale getiriyoruz.",
  },
  {
    n: "3",
    title: "Önizlemeyi görün",
    body: "Yayına almadan önce size özel bir bağlantıdan eski sitenizle yan yana karşılaştırırsınız.",
  },
  {
    n: "4",
    title: "Adresi yönlendirin",
    body: "Alan adınız sizde kalır. Yönlendirmeyi birlikte yaparız; site kesintisiz yeni altyapıya geçer.",
  },
];

const FAQ = [
  {
    q: "Alan adı kimde kalıyor?",
    a: "Sizde. Alan adı hesabınıza biz sahip olmayız; yalnızca yönlendirme için sizden yardım isteriz.",
  },
  {
    q: "Tasarımı birebir mi kopyalıyorsunuz?",
    a: "Sayfa yapısı, içerik ve genel görünüm mevcut sitenizle aynı kalır. Kodu sıfırdan kendi altyapımızda yazarız; eski sitenin dosyalarını kullanmayız.",
  },
  {
    q: "Eski siteyi yapan firmayla sorun çıkar mı?",
    a: "Sitedeki metin, görsel ve logoların kullanım hakkı sizde olmalı. Sipariş sırasında bunu yazılı onaylarsınız. Emin değilseniz önce eski firmayla yaptığınız anlaşmaya bakmanızı öneririz.",
  },
  {
    q: "Aylık 999 TL'ye neler dahil, ek ücret var mı?",
    a: "999 TL KDV dahildir. Kurulum ücreti yoktur. Hosting, SSL sertifikası ve yedekleme bu ücrete dahildir.",
  },
  {
    q: "Sonradan değişiklik isteyebilir miyim?",
    a: "Paket aynı siteyi yayında tutmayı kapsar. Değişiklik, yeni sayfa ya da yeni tasarım istediğinizde ayrıca yazılı teklif veririz.",
  },
];

export default function SiteTasimaPage() {
  const wa = whatsappHref(WA_TEXT);

  return (
    <div className="sc-root">
      <ScHeader />
      <main>
        <section className="sc-glow relative overflow-hidden">
          <div className="sc-container py-14 sm:py-20 lg:py-24">
            <div className="mx-auto max-w-3xl text-center">
              <p className="sc-eyebrow mb-5">Site Taşıma Paketi</p>
              <h1 className="sc-h1 !text-[clamp(2.4rem,7vw,4.4rem)]">
                Sitenizin aynısı, <span className="sc-em">ayda {PRICE} TL</span>
              </h1>
              <p className="sc-lead mx-auto mt-7 max-w-xl">
                Mevcut sitenizi bizim kodumuz ve hosting&apos;imizle yayına alıyoruz.
                Aynı sayfalar, aynı görünüm. Hosting, SSL ve yedekleme aylık ücrete dahil.
              </p>
              <p className="mt-4 text-sm text-sc-muted">
                KDV dahil · Kurulum ücreti yok · 3 gün içinde teslim
              </p>
              <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
                {wa && (
                  <a
                    href={wa}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="sc-btn sc-btn--primary"
                  >
                    Adresimi WhatsApp&apos;tan göndereyim
                  </a>
                )}
                <a href="#kapsam" className="sc-btn sc-btn--ghost">
                  Neler dahil?
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="kapsam" className="sc-section" aria-labelledby="kapsam-title">
          <div className="sc-container">
            <p className="sc-eyebrow mb-4">Kapsam</p>
            <h2 id="kapsam-title" className="sc-h2">
              Ne alıyorsunuz, <span className="sc-em">ne almıyorsunuz</span>
            </h2>
            <div className="mt-12 grid gap-4 sm:grid-cols-2">
              {INCLUDED.map((item) => (
                <div key={item.title} className="sc-card p-6">
                  <h3 className="sc-h3">{item.title}</h3>
                  <p className="sc-body mt-2">{item.body}</p>
                </div>
              ))}
            </div>
            <div className="sc-card sc-card--lg mt-4 p-6 sm:p-8">
              <h3 className="sc-h3">Pakete dahil değil</h3>
              <ul className="sc-body mt-3 list-disc space-y-1 pl-5">
                {NOT_INCLUDED.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className="sc-body mt-4">
                Bunları istediğinizde ayrıca yazılı teklif veririz. Paketin amacı, mevcut siteyi
                düşük ve sabit bir ücretle sorunsuz yayında tutmak.
              </p>
            </div>
          </div>
        </section>

        <section className="sc-section" aria-labelledby="adim-title">
          <div className="sc-container">
            <p className="sc-eyebrow mb-4">Süreç</p>
            <h2 id="adim-title" className="sc-h2">
              Dört <span className="sc-em">adımda</span> taşınır
            </h2>
            <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {STEPS.map((step) => (
                <li key={step.n} className="sc-card p-6">
                  <span className="font-display text-3xl text-sc-accent-text">{step.n}</span>
                  <h3 className="sc-h3 mt-3">{step.title}</h3>
                  <p className="sc-body mt-2">{step.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="sc-section" aria-labelledby="sss-title">
          <div className="sc-container">
            <p className="sc-eyebrow mb-4">SSS</p>
            <h2 id="sss-title" className="sc-h2">
              Sık <span className="sc-em">sorulanlar</span>
            </h2>
            <div className="sc-card sc-card--lg mt-12 overflow-hidden">
              {FAQ.map((item, i) => (
                <div key={item.q} className={i > 0 ? "border-t border-sc-border" : ""}>
                  <h3 className="font-display px-5 pt-5 text-lg tracking-tight text-sc-text sm:px-7 sm:text-xl">
                    {item.q}
                  </h3>
                  <p className="sc-body px-5 pb-6 pt-2 sm:px-7">{item.a}</p>
                </div>
              ))}
            </div>
            {wa && (
              <div className="mt-10 text-center">
                <a
                  href={wa}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sc-btn sc-btn--primary"
                >
                  Adresimi WhatsApp&apos;tan göndereyim
                </a>
              </div>
            )}
          </div>
        </section>
      </main>
      <ScFooter />
    </div>
  );
}
