import type { Metadata } from "next";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import WebFaq from "@/components/websitesi/WebFaq";
import WebHero from "@/components/websitesi/WebHero";
import WebPains from "@/components/websitesi/WebPains";
import WebPillars from "@/components/websitesi/WebPillars";
import WebPlan from "@/components/websitesi/WebPlan";
import WebProcess from "@/components/websitesi/WebProcess";
import WebProgress from "@/components/websitesi/WebProgress";
import WebScheduleSection from "@/components/websitesi/WebScheduleSection";
import WebTaskMarquee from "@/components/websitesi/WebTaskMarquee";
import WebTrust from "@/components/websitesi/WebTrust";
import WebWhy from "@/components/websitesi/WebWhy";
import { seo } from "@/lib/seo";
import { site, whatsappHref } from "@/lib/site";
import { FAQS, WEB_PATH, WEB_WA } from "@/lib/websitesi";

const pageUrl = `${seo.siteUrl}${WEB_PATH}`;

export const metadata: Metadata = {
  title: "Web Sitesi | Okul, Kreş ve İşletmeler İçin Kurumsal Site",
  description:
    "Kreş, okul, etüt merkezi ve işletmeler için özel web sitesi. Hazır şablon değil — keşiften yayına tek muhatap, yazılı teklif.",
  keywords: [
    "kurumsal web sitesi",
    "kreş web sitesi",
    "etüt merkezi web sitesi",
    "özel okul web sitesi",
    "web sitesi yaptırmak",
    "Ekiz Yazılım",
  ],
  alternates: { canonical: WEB_PATH },
  openGraph: {
    title: "Web Sitesi | Okul, Kreş ve İşletmeler İçin Kurumsal Site",
    description:
      "İşletmenize özel web sitesi. Keşiften yayına kadar süreci biz yürütürüz.",
    url: pageUrl,
    siteName: site.name,
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Web Sitesi | Okul, Kreş ve İşletmeler İçin Kurumsal Site",
    description:
      "İşletmenize özel web sitesi. Keşiften yayına kadar süreci biz yürütürüz.",
  },
};

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: "Web Sitesi | Okul, Kreş ve İşletmeler İçin Kurumsal Site",
        description:
          "Kreş, okul, etüt merkezi ve işletmeler için özel web sitesi kurulumu.",
        isPartOf: { "@id": `${seo.siteUrl}/#website` },
        about: { "@id": `${pageUrl}#service` },
        inLanguage: "tr-TR",
      },
      {
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        name: "Web sitesi — keşiften yayına",
        serviceType: "Kurumsal web sitesi kurulumu",
        description:
          "Eğitim kurumları ve işletmeler için özel tasarım web sitesi: keşif, yazılı teklif, kurulum ve yayın.",
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
          audienceType: "Eğitim kurumları ve işletmeler",
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
            name: "Web sitesi",
            item: pageUrl,
          },
        ],
      },
    ],
  };
}

export default function WebSitesiPage() {
  const wa = whatsappHref(WEB_WA);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()) }}
      />
      <WebProgress />
      <SiteHeader />
      <main>
        <WebHero wa={wa} />
        <WebTaskMarquee />
        <WebPains />
        <WebProcess />
        <WebPillars />
        <WebPlan />
        <WebWhy />
        <WebTrust />
        <WebFaq />
        <WebScheduleSection />
      </main>
      <SiteFooter />
    </>
  );
}
