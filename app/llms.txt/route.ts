import { posts } from "@/lib/blog";
import { seo } from "@/lib/seo";
import { site } from "@/lib/site";

/**
 * A plain-text summary of the site for AI assistants and crawlers that look for /llms.txt.
 * It is a convention, not a standard, and no major search engine has said it ranks pages by it.
 * It costs nothing and gives language models a clean, accurate description to quote.
 */
export function GET() {
  const lines = [
    `# ${site.name}`,
    "",
    `> ${site.name}, Ankara merkezli bir yazılım ve web ajansı. Etüt merkezleri, kurslar, kreşler ve özel okullar için web sitesi ve öğrenci takip sistemi (Scholares) yapar. Türkiye genelinde uzaktan çalışır; Ankara'da yüz yüze görüşebilir.`,
    "",
    "## Ne yapıyoruz",
    "- Eğitim kurumları için özel tasarım web sitesi. Kurumsal Site 20.000 TL, Büyüme Paketi 38.000 TL, Tam Paket 60.000 TL (KDV dahil). Aylık bakım paketi 2.500 TL (ilk ay ücretsiz).",
    "- Site Taşıma Paketi: mevcut sitenin aynısı (aynı sayfalar ve görünüm) Ekiz altyapısında, ayda 999 TL (KDV dahil, kurulum ücreti yok, hosting, SSL ve yedek dahil). Sitedeki içerik ve tasarımın kullanım hakkı müşteride olmalıdır.",
    "- Öğrenci takip sistemi: yoklama, ödev, deneme sınavı, aidat ve velilere bildirim.",
    "- Alan adı müşterinin adına kaydedilir; hesaplar ve mülkiyet müşteride kalır.",
    "",
    "## Ücretsiz araçlar ve araştırma",
    `- [Ücretsiz site kontrolü](${seo.siteUrl}/site-kontrol): Bir sitenin güvenlik, hız, Google ve iletişim sorunlarını ölçer.`,
    `- [Ankara kurs ve etüt merkezi web siteleri, 2026 incelemesi](${seo.siteUrl}/arastirma/ankara-kurs-siteleri-2026): 211 siteye sayılarla bakış, yöntemi açık.`,
    "",
    "## Blog",
    `Tam metinler tek dosyada: ${seo.siteUrl}/llms-full.txt`,
    "",
    ...posts.map((p) => `- [${p.title}](${seo.siteUrl}/blog/${p.slug}): ${p.description}`),
    "",
    "## İletişim",
    `- Web: ${seo.siteUrl}`,
    `- E-posta: ${site.email}`,
    `- Telefon / WhatsApp: +${site.phone}`,
    `- Randevu: ${seo.siteUrl}/randevu (10 dakikalık ücretsiz görüşme)`,
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
