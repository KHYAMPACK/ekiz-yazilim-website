import { posts } from "@/lib/blog";
import { seo } from "@/lib/seo";
import { site } from "@/lib/site";

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export function GET() {
  const items = posts
    .map((p) => {
      const url = `${seo.siteUrl}/blog/${p.slug}`;
      return `<item>
  <title>${esc(p.title)}</title>
  <link>${url}</link>
  <guid isPermaLink="true">${url}</guid>
  <pubDate>${new Date(`${p.published}T12:00:00Z`).toUTCString()}</pubDate>
  <description>${esc(p.description)}</description>
</item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
<channel>
  <title>${esc(site.name)} Blog</title>
  <link>${seo.siteUrl}/blog</link>
  <description>Eğitim kurumları için web sitesi hakkında sorular ve cevaplar.</description>
  <language>tr-TR</language>
${items}
</channel>
</rss>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
