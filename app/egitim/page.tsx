import type { Metadata } from "next";
import Link from "next/link";
import EgitimMockups from "@/components/egitim/EgitimMockups";
import EgitimScheduleSection from "@/components/egitim/EgitimScheduleSection";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { seo } from "@/lib/seo";
import { site, whatsappHref } from "@/lib/site";

const path = "/egitim";
const pageUrl = `${seo.siteUrl}${path}`;
const SCHOLARES_URL = "https://scholares.site";
const title = "LGS Hazırlık Kurumları ve Etüt Merkezleri İçin Öğrenci Takip Sistemi";
const description =
  "Deneme sınavı analizi, yoklama, ödev ve veli bildirimi tek uygulamada. LGS hazırlık kurumları, etüt merkezleri ve kreşler için öğrenci takip sistemi (Scholares) ve kurumsal web sitesi. Türkiye genelinde uzaktan kurulum.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "öğrenci takip sistemi",
    "etüt merkezi yazılımı",
    "etüt merkezi öğrenci takip programı",
    "veli bilgilendirme uygulaması",
    "ödev takip sistemi",
    "kreş web sitesi",
    "özel okul web sitesi",
    "Ekiz Yazılım",
  ],
  alternates: { canonical: path },
  openGraph: {
    title,
    description,
    url: pageUrl,
    siteName: site.name,
    locale: "tr_TR",
    type: "website",
  },
  twitter: { card: "summary_large_image", title, description },
};

const PAINS = [
  {
    title: "Ödev kimde tamam, kimde değil?",
    body: "Defter, Excel ve WhatsApp grupları arasında kaybolan takip. Veli sorduğunda cevap bulmak zaman alıyor.",
  },
  {
    title: "Veli bilgiyi geç alıyor",
    body: "Yoklama, devamsızlık ve deneme sonuçları velilere elle, tek tek iletiliyor ya da hiç iletilmiyor.",
  },
  {
    title: "Aidat ve raporlar dağınık",
    body: "Ödeme takibi, sınav analizi ve veli raporları farklı dosyalarda; her ay yeniden derleniyor.",
  },
] as const;

const FEATURES = [
  {
    title: "Rol bazlı paneller",
    body: "Müdür, öğretmen, rehber öğretmen ve veli aynı uygulamada; herkes yalnızca kendi yetkisindeki veriyi görür.",
  },
  {
    title: "Yoklama ve ödev",
    body: "Günlük yoklama ve ödev takibi tek yerde; öğretmen girer, veli görür.",
  },
  {
    title: "Deneme sınavı analizi",
    body: "Sınav sonuçlarını CSV veya optik okuyucu çıktısından aktarın; konu bazlı analizi görün.",
  },
  {
    title: "Veliye anlık bildirim",
    body: "Zamanlanmış hatırlatmalar ve anlık push bildirimlerle veli bilgilendirilir.",
  },
  {
    title: "Aidat ve mesajlaşma",
    body: "Aidat takibi ve kurum içi mesajlaşma aynı sistemde.",
  },
  {
    title: "PDF ve Excel raporlar",
    body: "Veli ve yönetim raporlarını tek tıkla PDF veya Excel olarak alın. Veriler satır düzeyinde güvenlikle korunur.",
  },
] as const;

const STEPS = [
  { title: "Demo ve görüşme", body: "Kurumunuzun nasıl çalıştığını dinler, sistemi canlı gösteririz." },
  { title: "Kurulum", body: "Kurumunuz, öğretmenler ve öğrenci listesi sisteme aktarılır." },
  { title: "Eğitim", body: "Öğretmen ve velilere kısa, online bir tanıtım yaparız." },
  { title: "Kullanıma geçiş", body: "Canlıya geçtikten sonra sorularınız için yanınızdayız." },
] as const;

const PROOF = [
  { name: "Atlas Eğitim Kurumu", note: "Takip sistemini her gün kullanıyor." },
  { name: "Özel Başak Akademi", note: "Etüt merkezi — kurumsal web sitesi." },
  { name: "Lider Çocuklar Anaokulu", note: "Anaokulu — kurumsal web sitesi." },
  { name: "Şahika Öncü Minikler", note: "Kreş — kurumsal web sitesi." },
] as const;

const FAQS = [
  {
    q: "Fiyat nasıl belirleniyor?",
    a: "Önce kapsamı ve başarı ölçütlerini yazılı belirlediğimiz kısa, ücretli bir pilot yaparız. Sonrasında öğrenci kapasitenize göre yıllık lisans. Görüşmede öğrenci sayınızı öğrenir, yazılı teklif veririz. Gizli kalem yok.",
  },
  {
    q: "Kurulum için ek ücret var mı?",
    a: "İlk yıl kurulum ve eğitim lisansa dahildir. Özel geliştirme isteklerini ayrıca teklif ederiz.",
  },
  {
    q: "Başka şehirdeysek çalışabilir miyiz?",
    a: "Evet. Ankara merkezliyiz ve Türkiye genelinde uzaktan çalışıyoruz. Görüşme, kurulum ve eğitim online yapılır; Ankara’da isterseniz yüz yüze de görüşebiliriz.",
  },
  {
    q: "Veriler kime ait?",
    a: "Öğrenci ve veli verileri kurumunuza aittir. Biz yalnızca hizmeti sunmak için işleriz ve üçüncü kişilerle paylaşmayız.",
  },
  {
    q: "Web sitemizi de yapar mısınız?",
    a: "Evet. Sistemle birlikte kurumsal web sitesi de kuruyoruz; birlikte alındığında site daha uygun fiyatlıdır.",
  },
] as const;

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: title,
        description,
        isPartOf: { "@id": `${seo.siteUrl}/#website` },
        about: { "@id": `${pageUrl}#service` },
        inLanguage: "tr-TR",
      },
      {
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        name: "Öğrenci takip sistemi ve kurumsal web sitesi",
        serviceType: "Eğitim kurumları için yazılım",
        description,
        provider: {
          "@type": "Organization",
          name: site.name,
          url: seo.siteUrl,
          email: site.email,
          telephone: site.phone ? `+${site.phone}` : undefined,
        },
        areaServed: { "@type": "Country", name: "Türkiye" },
        audience: {
          "@type": "Audience",
          audienceType: "Etüt merkezleri, kreşler ve özel okullar",
        },
        url: pageUrl,
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        mainEntity: FAQS.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Ana sayfa", item: seo.siteUrl },
          { "@type": "ListItem", position: 2, name: "Eğitim kurumları", item: pageUrl },
        ],
      },
    ],
  };
}

const eyebrow =
  "mb-3 text-xs font-medium tracking-[0.2em] uppercase text-black/45";
const h2 = "text-3xl font-medium tracking-tight text-black sm:text-4xl";

export default function EgitimPage() {
  const wa = whatsappHref(
    "Merhaba, eğitim kurumları sayfanızdan yazıyorum. Öğrenci takip sistemi hakkında bilgi almak istiyorum.",
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()) }}
      />
      <SiteHeader />
      <main>
        <section className="border-b border-black bg-white">
          <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-24">
            <p className={eyebrow}>Eğitim kurumları için</p>
            <h1 className="max-w-4xl text-[clamp(2.2rem,6vw,4.2rem)] leading-[1.08] font-medium tracking-tight text-black">
              LGS hazırlık kurumları ve etüt merkezleri için öğrenci takip sistemi
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-black/70 sm:text-lg">
              Deneme sınavı analizi, yoklama, ödev ve veli bildirimi tek
              uygulamada: <strong className="font-medium text-black">Scholares</strong>.
              Kurumsal web sitenizi de aynı yerden, tek muhatapla kuruyoruz.
              Atlas Eğitim Kurumu’nda her gün kullanılıyor.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={SCHOLARES_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex border border-black bg-black px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white hover:text-black"
              >
                Scholares’i incele
              </a>
              <Link
                href="#gorusme"
                className="inline-flex border border-black px-5 py-2.5 text-sm font-medium text-black transition-colors hover:bg-ice/40"
              >
                Demo iste
              </Link>
              {wa && (
                <a
                  href={wa}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex border border-black px-5 py-2.5 text-sm font-medium text-black transition-colors hover:bg-ice/40"
                >
                  WhatsApp’tan yaz
                </a>
              )}
            </div>
          </div>
        </section>

        <section className="border-b border-black bg-ice/30" aria-labelledby="egitim-pains">
          <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
            <p className={eyebrow}>Bugün nasıl yürüyor?</p>
            <h2 id="egitim-pains" className={h2}>
              Defter, Excel ve WhatsApp grupları yetmiyor.
            </h2>
            <ul className="mt-10 grid gap-px border border-black bg-black sm:grid-cols-3">
              {PAINS.map((p) => (
                <li key={p.title} className="bg-white p-6">
                  <h3 className="text-lg font-medium tracking-tight text-black">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-black/70">{p.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="border-b border-black bg-white" aria-labelledby="egitim-features">
          <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
            <p className={eyebrow}>Sistem</p>
            <h2 id="egitim-features" className={h2}>
              Hepsi tek uygulamada.
            </h2>
            <ul className="mt-10 grid gap-px border border-black bg-black sm:grid-cols-2 lg:grid-cols-3">
              {FEATURES.map((f) => (
                <li key={f.title} className="bg-white p-6">
                  <h3 className="text-lg font-medium tracking-tight text-black">
                    {f.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-black/70">{f.body}</p>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-black/55">
              Telefona uygulama gibi eklenir (PWA); öğretmen ve veli ayrı bir
              mağaza uygulaması indirmek zorunda kalmaz.
            </p>
          </div>
        </section>

        <section className="border-b border-black bg-ice/30" aria-labelledby="egitim-screens">
          <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
            <p className={eyebrow}>Uygulamadan</p>
            <h2 id="egitim-screens" className={h2}>
              Öğretmen ne girer, veli ne görür?
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-black/65">
              Aşağıdaki ekranlar örnek verilerle hazırlanmış görünümlerdir.
            </p>
            <EgitimMockups />
          </div>
        </section>

        <section className="border-b border-black bg-white" aria-labelledby="egitim-proof">
          <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
            <p className={eyebrow}>Referanslar</p>
            <h2 id="egitim-proof" className={h2}>
              Eğitim kurumlarıyla çalışıyoruz.
            </h2>
            <ul className="mt-10 grid gap-px border border-black bg-black sm:grid-cols-2 lg:grid-cols-4">
              {PROOF.map((p) => (
                <li key={p.name} className="bg-white p-6">
                  <h3 className="text-base font-medium tracking-tight text-black">
                    {p.name}
                  </h3>
                  <p className="mt-2 text-sm text-black/65">{p.note}</p>
                </li>
              ))}
            </ul>
            <Link
              href="/isler"
              className="mt-6 inline-block text-sm font-medium text-black underline underline-offset-4"
            >
              Tüm işleri gör →
            </Link>
          </div>
        </section>

        <section className="border-b border-black bg-white" aria-labelledby="egitim-steps">
          <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
            <p className={eyebrow}>Süreç</p>
            <h2 id="egitim-steps" className={h2}>
              Nasıl başlıyoruz?
            </h2>
            <ol className="mt-10 grid gap-px border border-black bg-black sm:grid-cols-2 lg:grid-cols-4">
              {STEPS.map((s, i) => (
                <li key={s.title} className="bg-white p-6">
                  <p className="text-xs font-medium tracking-[0.2em] text-black/45">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-2 text-lg font-medium tracking-tight text-black">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-black/70">{s.body}</p>
                </li>
              ))}
            </ol>
            <p className="mt-6 max-w-2xl text-sm leading-relaxed text-black/65">
              Önce yazılı kapsamlı ve başarı ölçütlü ücretli bir pilotla
              başlıyoruz; memnun kalırsanız öğrenci kapasitenize göre yıllık
              lisansa geçilir. İlk yıl kurulum ve eğitim dahil.
            </p>
          </div>
        </section>

        <section className="border-b border-black bg-ice/30" aria-labelledby="egitim-faq">
          <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
            <p className={eyebrow}>SSS</p>
            <h2 id="egitim-faq" className={h2}>
              Sık Sorulanlar
            </h2>
            <div className="mt-10 border border-black bg-white">
              {FAQS.map((item, i) => (
                <details
                  key={item.q}
                  className={i > 0 ? "border-t border-black" : ""}
                  open={i === 0}
                >
                  <summary className="cursor-pointer list-none px-5 py-5 text-base font-medium tracking-tight text-black sm:px-6 sm:text-lg">
                    {item.q}
                  </summary>
                  <p className="px-5 pb-5 text-sm leading-relaxed text-black/70 sm:px-6 sm:text-base">
                    {item.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <EgitimScheduleSection />
      </main>
      <SiteFooter />
    </>
  );
}
