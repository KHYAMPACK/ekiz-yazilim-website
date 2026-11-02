import type { Metadata } from "next";
import Link from "next/link";
import ScFooter from "@/components/ScFooter";
import ScHeader from "@/components/ScHeader";
import { dateTr, posts } from "@/lib/blog";
import { seo } from "@/lib/seo";
import { site } from "@/lib/site";

const title = "Blog: Etüt Merkezi, Kurs ve Kreş Web Siteleri Hakkında Sorular";
const description =
  "Kurs, etüt merkezi, kreş ve okul sahiplerinin web sitesi hakkında sorduğu soruların açık cevapları: fiyat, alan adı, güvenlik, Google ve daha fazlası.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/blog", types: { "application/rss+xml": "/blog/feed.xml" } },
  openGraph: {
    title,
    description,
    url: `${seo.siteUrl}/blog`,
    siteName: site.name,
    locale: "tr_TR",
    type: "website",
  },
};

export default function BlogIndex() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Ekiz Yazılım Blog",
    url: `${seo.siteUrl}/blog`,
    inLanguage: "tr-TR",
    publisher: { "@id": `${seo.siteUrl}/#organization` },
    blogPost: posts.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      url: `${seo.siteUrl}/blog/${p.slug}`,
      datePublished: p.published,
      dateModified: p.updated,
    })),
  };

  return (
    <div className="sc-root">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ScHeader />
      <main>
        <section className="sc-glow">
          <div className="sc-container sc-section">
            <p className="sc-eyebrow mb-4">Blog</p>
            <h1 className="sc-h1 max-w-4xl">
              Kurs sahiplerinin <span className="sc-em">sorduğu sorular.</span>
            </h1>
            <p className="sc-lead mt-6 max-w-2xl">
              Web sitesi, alan adı, güvenlik, Google ve fiyat üzerine, eğitim kurumu sahiplerinin gerçekten
              sorduğu soruların kısa ve açık cevapları. Her yazı bir sorudan başlar, cevabı en üstte verir.
            </p>
          </div>
        </section>

        <section className="sc-hairline">
          <div className="sc-container sc-section">
            <ul className="grid gap-5 md:grid-cols-2">
              {posts.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/blog/${p.slug}`}
                    className="sc-card block h-full p-6 transition-colors hover:border-sc-accent sm:p-7"
                  >
                    <span className="sc-eyebrow">
                      {dateTr(p.updated)} · {p.readingMinutes} dk okuma
                    </span>
                    <span className="mt-3 block text-xl font-semibold leading-snug tracking-tight text-sc-text sm:text-2xl">
                      {p.title}
                    </span>
                    <span className="mt-3 block text-[0.9375rem] leading-relaxed text-sc-muted">
                      {p.description}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <ScFooter />
    </div>
  );
}
