import { phoneDisplay, site } from "@/lib/site";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://ekizyazilim.com";

export const seo = {
  siteUrl,
  title: `${site.name} | Eğitim kurumları için öğrenci takip sistemi ve web sitesi`,
  description:
    "Etüt merkezleri, kreşler ve özel okullar için öğrenci takip sistemi, veli bildirimi ve web sitesi. Türkiye genelinde uzaktan hizmet. Net kapsam, hızlı iletişim.",
  keywords: [
    "öğrenci takip sistemi",
    "etüt merkezi yazılımı",
    "etüt merkezi öğrenci takip programı",
    "veli bilgilendirme uygulaması",
    "kreş web sitesi",
    "özel okul web sitesi",
    "eğitim kurumu web sitesi",
    "ödev takip sistemi",
    "Ekiz Yazılım",
  ],
} as const;

const faqItems = [
  {
    q: "Fiyat nasıl belirleniyor?",
    a: "Kapsama göre. Önce ihtiyacı netleştirir, sonra sabit veya net aralıklı bir teklif yazarız. Gizli kalem yok.",
  },
  {
    q: "Öğrenci takip sistemi nedir?",
    a: "Müdür, öğretmen, rehber öğretmen ve veliyi aynı uygulamada buluşturan sistem: yoklama, ödev, deneme sınavı, aidat, mesajlaşma ve velilere anlık bildirim. Etüt merkezleri, kreşler ve özel okullar için.",
  },
  {
    q: "Ne kadar sürer?",
    a: "Basit bir tanıtım / landing sitesi genelde kısa sürede çıkar. E-ticaret ve özel yazılım işin büyüklüğüne göre planlanır; süre teklifte yazar.",
  },
  {
    q: "E-ticarete sıfırdan mı başlıyorsunuz?",
    a: "Evet. Ürün satan işletmeler için online mağaza kuruyoruz: ürün vitrini, sipariş/ödeme düzeni ve ilk yayına net bir yol.",
  },
  {
    q: "Hosting ve alan adı sizde mi?",
    a: "İsterseniz kurulumunu biz yaparız; hesaplar ve mülkiyet sizde kalır. Nasıl ilerleyeceğimizi baştan konuşuruz.",
  },
  {
    q: "Yayından sonra destek var mı?",
    a: "Evet. Küçük düzeltmeler ve sorular için yanınızdayız. Daha büyük eklemeler ayrı konuşulur.",
  },
  {
    q: "Başka şehirlerden çalışıyor musunuz?",
    a: "Evet. Ankara merkezliyiz ve Türkiye genelinde uzaktan çalışıyoruz. Görüşme, kurulum ve eğitim online yapılır; Ankara’da isterseniz yüz yüze de görüşebiliriz.",
  },
] as const;

/** Organization + LocalBusiness + FAQ JSON-LD for Google */
export function localBusinessJsonLd() {
  const telephone = site.phone ? `+${site.phone}` : undefined;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${seo.siteUrl}/#organization`,
        name: site.name,
        url: seo.siteUrl,
        email: site.email,
        telephone,
        logo: {
          "@type": "ImageObject",
          url: `${seo.siteUrl}/logo/logo_light.png`,
          width: 512,
          height: 512,
        },
        image: `${seo.siteUrl}/logo/logo_lightwtext.png`,
        areaServed: {
          "@type": "Country",
          name: "Türkiye",
        },
        sameAs: [site.linkedin, site.instagram].filter(Boolean),
      },
      {
        "@type": "ProfessionalService",
        "@id": `${seo.siteUrl}/#localbusiness`,
        name: site.name,
        description: seo.description,
        url: seo.siteUrl,
        email: site.email,
        telephone,
        image: `${seo.siteUrl}/logo/logo_lightwtext.png`,
        priceRange: "$$",
        address: {
          "@type": "PostalAddress",
          addressLocality: site.city,
          addressCountry: "TR",
        },
        areaServed: {
          "@type": "Country",
          name: "Türkiye",
        },
        parentOrganization: {
          "@id": `${seo.siteUrl}/#organization`,
        },
        knowsAbout: [
          "Öğrenci takip sistemi",
          "Eğitim kurumları için web sitesi",
          "E-ticaret",
          "Veli bilgilendirme uygulaması",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${seo.siteUrl}/#website`,
        url: seo.siteUrl,
        name: site.name,
        description: seo.description,
        publisher: { "@id": `${seo.siteUrl}/#organization` },
        inLanguage: "tr-TR",
      },
      {
        "@type": "FAQPage",
        "@id": `${seo.siteUrl}/#faq`,
        mainEntity: faqItems.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.a,
          },
        })),
      },
    ],
  };
}

export function contactPhoneLabel() {
  return phoneDisplay();
}
