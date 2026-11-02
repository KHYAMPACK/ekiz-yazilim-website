import { posts } from "@/lib/blog";
import { postToMarkdown } from "@/lib/blog/markdown";
import { seo } from "@/lib/seo";
import { site } from "@/lib/site";

/** Every blog post as one Markdown document, for assistants and crawlers that read /llms-full.txt. */
export function GET() {
  const body = [
    `# ${site.name}: blog yazılarının tam metni`,
    "",
    `Kısa özet için ${seo.siteUrl}/llms.txt adresine bakın.`,
    "",
    ...posts.flatMap((p) => [postToMarkdown(p, seo.siteUrl), "---", ""]),
  ].join("\n");

  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
