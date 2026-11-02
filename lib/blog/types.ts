/**
 * Blog posts are plain data so a script (or an agent) can write one without touching any markup.
 * Inline text supports **bold** and [label](https://example.com) or [label](/internal-path) only.
 */
export type Block =
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "table"; head: string[]; rows: string[][] }
  | { type: "note"; title?: string; text: string };

export type Section = {
  heading: string;
  blocks: Block[];
};

export type Post = {
  slug: string;
  /** The question an owner would type or ask. Used as the page's H1. */
  title: string;
  /** Meta description, 140 to 160 characters. */
  description: string;
  /** ISO dates. */
  published: string;
  updated: string;
  readingMinutes: number;
  /** A direct answer of 40 to 70 words, shown first and used as the summary for search and AI answers. */
  answer: string;
  sections: Section[];
  faq: { q: string; a: string }[];
  /** Slugs of related posts. */
  related: string[];
};
