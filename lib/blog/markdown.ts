import type { Block, Post } from "./types";

const blockToMarkdown = (b: Block): string => {
  switch (b.type) {
    case "p":
      return b.text;
    case "ul":
      return b.items.map((i) => `- ${i}`).join("\n");
    case "ol":
      return b.items.map((i, n) => `${n + 1}. ${i}`).join("\n");
    case "note":
      return `> ${b.title ? `**${b.title}:** ` : ""}${b.text}`;
    case "table": {
      const head = `| ${b.head.join(" | ")} |`;
      const rule = `| ${b.head.map(() => "---").join(" | ")} |`;
      const rows = b.rows.map((r) => `| ${r.join(" | ")} |`);
      return [head, rule, ...rows].join("\n");
    }
  }
};

/** The whole post as Markdown, for /llms-full.txt. */
export function postToMarkdown(post: Post, siteUrl: string): string {
  const parts = [
    `# ${post.title}`,
    `URL: ${siteUrl}/blog/${post.slug}`,
    `Son güncelleme: ${post.updated}`,
    "",
    `**Kısa cevap:** ${post.answer}`,
    "",
    ...post.sections.flatMap((s) => [`## ${s.heading}`, "", ...s.blocks.flatMap((b) => [blockToMarkdown(b), ""])]),
    "## Sık sorulanlar",
    "",
    ...post.faq.flatMap((f) => [`### ${f.q}`, "", f.a, ""]),
  ];
  return parts.join("\n");
}
