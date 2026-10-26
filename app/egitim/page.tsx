import type { Metadata } from "next";
import Link from "next/link";
import EgitimMockups from "@/components/egitim/EgitimMockups";
import EgitimScheduleSection from "@/components/egitim/EgitimScheduleSection";
import ScFooter from "@/components/ScFooter";
import ScHeader from "@/components/ScHeader";
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

const wrap = "sc-container sc-section";

export default function EgitimPage() {
  const wa = whatsappHref(
    "Merhaba, eğitim kurumları sayfanızdan yazıyorum. Öğrenci takip sistemi hakkında bilgi almak istiyorum.",
  );

  return (
    <div className="sc-root">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()) }}
      />
      <ScHeader />
      <main>
        <section className="sc-glow relative overflow-hidden">
          <div className={`${wrap} text-center`}>
            <p className="sc-eyebrow mb-5">Eğitim kurumları için</p>
            <h1 className="sc-h1 mx-auto max-w-4xl">
              LGS hazırlık kurumları ve etüt merkezleri için{" "}
              <span className="sc-em">öğrenci takip</span> sistemi
            </h1>
            <p className="sc-lead mx-auto mt-6 max-w-2xl">
              Deneme sınavı analizi, yoklama, ödev ve veli bildirimi tek
              uygulamada:{" "}
              <strong className="font-medium text-sc-text">Scholares</strong>.
              Kurumsal web sitenizi de aynı yerden, tek muhatapla kuruyoruz.
              Atlas Eğitim Kurumu’nda her gün kullanılıyor.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <a
                href={SCHOLARES_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="sc-btn sc-btn--primary"
              >
                Scholares’i incele
              </a>
              <Link href="#gorusme" className="sc-btn sc-btn--secondary">
                Demo iste
              </Link>
              {wa && (
                <a
                  href={wa}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sc-btn sc-btn--ghost"
                >
                  WhatsApp’tan yaz
                </a>
              )}
            </div>
          </div>
        </section>

        <section className="border-t border-sc-border" aria-labelledby="egitim-pains">
          <div className={wrap}>
            <p className="sc-eyebrow mb-3">Bugün nasıl yürüyor?</p>
            <h2 id="egitim-pains" className="sc-h2 max-w-3xl">
              Defter, Excel ve WhatsApp grupları <span className="sc-em">yetmiyor.</span>
            </h2>
            <ul className="mt-12 grid gap-4 sm:grid-cols-3">
              {PAINS.map((p, i) => (
                <li key={p.title} className="sc-card p-6 sm:p-7">
                  <span className="font-display text-3xl text-sc-accent-text">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="sc-h3 mt-4">{p.title}</h3>
                  <p className="sc-body mt-3 !text-[0.9375rem]">{p.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="border-t border-sc-border" aria-labelledby="egitim-features">
          <div className={wrap}>
            <p className="sc-eyebrow mb-3">Sistem</p>
            <h2 id="egitim-features" className="sc-h2">
              Hepsi <span className="sc-em">tek uygulamada.</span>
            </h2>
            <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {FEATURES.map((f) => (
                <li key={f.title} className="sc-card p-6 sm:p-7">
                  <span
                    className="block h-1.5 w-8 rounded-full bg-sc-accent"
                    aria-hidden
                  />
                  <h3 className="sc-h3 mt-5">{f.title}</h3>
                  <p className="sc-body mt-3 !text-[0.9375rem]">{f.body}</p>
                </li>
              ))}
            </ul>
            <p className="sc-body mt-8 !text-sm">
              Telefona uygulama gibi eklenir (PWA); öğretmen ve veli ayrı bir
              mağaza uygulaması indirmek zorunda kalmaz.
            </p>
          </div>
        </section>

        <section
          className="sc-glow border-t border-sc-border"
          aria-labelledby="egitim-screens"
        >
          <div className={wrap}>
            <p className="sc-eyebrow mb-3">Uygulamadan</p>
            <h2 id="egitim-screens" className="sc-h2 max-w-3xl">
              Öğretmen ne girer, <span className="sc-em">veli ne görür?</span>
            </h2>
            <p className="sc-body mt-4 max-w-2xl">
              Aşağıdaki ekranlar örnek verilerle hazırlanmış görünümlerdir.
            </p>
            <EgitimMockups />
          </div>
        </section>

        <section className="border-t border-sc-border" aria-labelledby="egitim-proof">
          <div className={wrap}>
            <p className="sc-eyebrow mb-3">Referanslar</p>
            <h2 id="egitim-proof" className="sc-h2 max-w-3xl">
              Eğitim kurumlarıyla <span className="sc-em">çalışıyoruz.</span>
            </h2>
            <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {PROOF.map((p) => (
                <li key={p.name} className="sc-card p-6">
                  <h3 className="font-display text-xl tracking-tight text-sc-text">
                    {p.name}
                  </h3>
                  <p className="sc-body mt-2 !text-[0.9375rem]">{p.note}</p>
                </li>
              ))}
            </ul>
            <Link
              href="/isler"
              className="mt-8 inline-block text-sm font-medium text-sc-accent-text underline underline-offset-4"
            >
              Tüm işleri gör →
            </Link>
          </div>
        </section>

        <section className="border-t border-sc-border" aria-labelledby="egitim-steps">
          <div className={wrap}>
            <p className="sc-eyebrow mb-3">Süreç</p>
            <h2 id="egitim-steps" className="sc-h2">
              Nasıl <span className="sc-em">başlıyoruz?</span>
            </h2>
            <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {STEPS.map((s, i) => (
                <li key={s.title} className="sc-card p-6">
                  <span className="grid size-9 place-items-center rounded-full bg-sc-accent/15 text-sm font-medium text-sc-accent-text">
                    {i + 1}
                  </span>
                  <h3 className="sc-h3 mt-5">{s.title}</h3>
                  <p className="sc-body mt-3 !text-[0.9375rem]">{s.body}</p>
                </li>
              ))}
            </ol>
            <p className="sc-body mt-8 max-w-2xl !text-sm">
              Önce yazılı kapsamlı ve başarı ölçütlü ücretli bir pilotla
              başlıyoruz; memnun kalırsanız öğrenci kapasitenize göre yıllık
              lisansa geçilir. İlk yıl kurulum ve eğitim dahil.
            </p>
          </div>
        </section>

        <section className="sc-paper" aria-labelledby="egitim-faq">
          <div className={wrap}>
            <p className="sc-eyebrow mb-3">SSS</p>
            <h2 id="egitim-faq" className="sc-h2">
              Sık <span className="sc-em">Sorulanlar</span>
            </h2>
            <div className="mt-12 overflow-hidden rounded-3xl border border-sc-border bg-sc-surface">
              {FAQS.map((item, i) => (
                <details
                  key={item.q}
                  className={`group ${i > 0 ? "border-t border-sc-border" : ""}`}
                  open={i === 0}
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-5 sm:px-7 [&::-webkit-details-marker]:hidden">
                    <span className="font-display text-lg tracking-tight text-sc-text sm:text-xl">
                      {item.q}
                    </span>
                    <span
                      className="text-xl leading-none text-sc-accent-text transition-transform group-open:rotate-45"
                      aria-hidden
                    >
                      +
                    </span>
                  </summary>
                  <p className="sc-body px-5 pb-6 sm:px-7">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <EgitimScheduleSection />
      </main>
      <ScFooter />
    </div>
  );
}
