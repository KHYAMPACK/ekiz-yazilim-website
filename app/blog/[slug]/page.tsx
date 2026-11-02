import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Blocks, Inline } from "@/components/blog/Prose";
import ScFooter from "@/components/ScFooter";
import ScHeader from "@/components/ScHeader";
import { dateTr, getPost, getRelated, posts } from "@/lib/blog";
import { seo } from "@/lib/seo";
import { site, whatsappHref } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  const path = `/blog/${post.slug}`;
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: path },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `${seo.siteUrl}${path}`,
      siteName: site.name,
      locale: "tr_TR",
      type: "article",
      publishedTime: post.published,
      modifiedTime: post.updated,
      authors: [site.name],
    },
    twitter: { card: "summary_large_image", title: post.title, description: post.description },
  };
}

const slugify = (s: string) =>
  s
    .toLocaleLowerCase("tr")
    .replace(/ç/g, "c")
    .replace(/ğ/g, "g")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ş/g, "s")
    .replace(/ü/g, "u")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const url = `${seo.siteUrl}/blog/${post.slug}`;
  const related = getRelated(post);
  const wa = whatsappHref(`Merhaba, "${post.title}" yazınızı okudum, konuşmak istiyorum.`);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${url}#article`,
        headline: post.title,
        description: post.description,
        datePublished: post.published,
        dateModified: post.updated,
        inLanguage: "tr-TR",
        mainEntityOfPage: url,
        author: {
          "@type": "Person",
          name: "Mert",
          jobTitle: "Kurucu",
          worksFor: { "@id": `${seo.siteUrl}/#organization` },
        },
        publisher: { "@id": `${seo.siteUrl}/#organization` },
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: post.faq.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Ana sayfa", item: seo.siteUrl },
          { "@type": "ListItem", position: 2, name: "Blog", item: `${seo.siteUrl}/blog` },
          { "@type": "ListItem", position: 3, name: post.title, item: url },
        ],
      },
    ],
  };

  return (
    <div className="sc-root">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ScHeader />
      <main>
        <article>
          <header className="sc-glow">
            <div className="sc-container pt-14 pb-10 sm:pt-20">
              <nav aria-label="Konum" className="mb-6 text-sm text-sc-muted">
                <Link href="/blog" className="hover:text-sc-text">
                  Blog
                </Link>
              </nav>
              <h1 className="sc-h1 max-w-4xl !text-[clamp(2.1rem,5.2vw,3.8rem)]">{post.title}</h1>
              <p className="mt-5 text-sm text-sc-muted">
                <time dateTime={post.updated}>Son güncelleme: {dateTr(post.updated)}</time>
                {" · "}
                {post.readingMinutes} dk okuma
                {" · "}
                Mert, Ekiz Yazılım kurucusu
              </p>

              <div className="mt-8 max-w-3xl rounded-2xl border border-sc-border border-l-4 border-l-sc-accent bg-sc-surface p-6 sm:p-7">
                <p className="sc-eyebrow mb-2">Kısa cevap</p>
                <p className="text-lg leading-relaxed text-sc-text">
                  <Inline text={post.answer} />
                </p>
              </div>
            </div>
          </header>

          <div className="sc-container pb-6">
            <div className="grid gap-12 lg:grid-cols-[minmax(0,44rem)_1fr]">
              <div className="min-w-0">
                <nav
                  aria-label="İçindekiler"
                  className="mb-12 rounded-2xl border border-sc-border bg-sc-surface p-5"
                >
                  <p className="sc-eyebrow mb-3">Bu yazıda</p>
                  <ol className="space-y-2 text-[0.9375rem]">
                    {post.sections.map((s) => (
                      <li key={s.heading}>
                        <a href={`#${slugify(s.heading)}`} className="text-sc-text hover:text-sc-accent-text">
                          {s.heading}
                        </a>
                      </li>
                    ))}
                    <li>
                      <a href="#sik-sorulanlar" className="text-sc-text hover:text-sc-accent-text">
                        Sık sorulanlar
                      </a>
                    </li>
                  </ol>
                </nav>

                <div className="space-y-14">
                  {post.sections.map((s) => (
                    <section key={s.heading} id={slugify(s.heading)} className="scroll-mt-24">
                      <h2 className="sc-h2 mb-5 !text-[clamp(1.5rem,3vw,2.1rem)]">{s.heading}</h2>
                      <Blocks blocks={s.blocks} />
                    </section>
                  ))}

                  <section id="sik-sorulanlar" className="scroll-mt-24">
                    <h2 className="sc-h2 mb-6 !text-[clamp(1.5rem,3vw,2.1rem)]">Sık sorulanlar</h2>
                    <div className="space-y-6">
                      {post.faq.map((f) => (
                        <div key={f.q}>
                          <h3 className="text-lg font-semibold tracking-tight text-sc-text">{f.q}</h3>
                          <p className="mt-2 text-[1.0625rem] leading-[1.75] text-sc-muted">
                            <Inline text={f.a} />
                          </p>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>
              </div>

              <aside className="lg:sticky lg:top-28 lg:self-start">
                <div className="sc-card p-6">
                  <p className="sc-eyebrow mb-2">Ücretsiz</p>
                  <p className="text-xl font-semibold tracking-tight text-sc-text">
                    Siteniz velileri kaybettiriyor mu?
                  </p>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-sc-muted">
                    Adresi yazın; velinin karşılaşabileceği sorunları ve çözümlerini gösterelim.
                  </p>
                  <Link href="/web-sitesi" className="sc-btn sc-btn--primary mt-5 w-full">
                    Siteyi kontrol et
                  </Link>
                  <Link href="/randevu" className="sc-btn sc-btn--secondary mt-3 w-full">
                    10 dakikalık görüşme
                  </Link>
                  {wa && (
                    <a
                      href={wa}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 block text-center text-sm text-sc-muted underline underline-offset-4 hover:text-sc-text"
                    >
                      WhatsApp&apos;tan yazın
                    </a>
                  )}
                </div>
              </aside>
            </div>
          </div>

          {related.length > 0 && (
            <section className="sc-hairline mt-16">
              <div className="sc-container sc-section">
                <h2 className="sc-h2 !text-[clamp(1.5rem,3vw,2.1rem)]">İlgili yazılar</h2>
                <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {related.map((r) => (
                    <li key={r.slug}>
                      <Link
                        href={`/blog/${r.slug}`}
                        className="sc-card block h-full p-5 transition-colors hover:border-sc-accent"
                      >
                        <span className="text-lg font-semibold leading-snug tracking-tight text-sc-text">
                          {r.title}
                        </span>
                        <span className="mt-2 block text-sm text-sc-muted">{r.readingMinutes} dk okuma</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          )}
        </article>
      </main>
      <ScFooter />
    </div>
  );
}
