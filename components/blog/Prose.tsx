import Link from "next/link";
import type { ReactNode } from "react";
import type { Block } from "@/lib/blog/types";

const INLINE = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g;

/** Renders **bold** and [label](href) inside a string. Anything else is plain text. */
export function Inline({ text }: { text: string }) {
  const parts = text.split(INLINE).filter(Boolean);
  return (
    <>
      {parts.map((part, i): ReactNode => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong key={i} className="font-semibold text-sc-text">
              {part.slice(2, -2)}
            </strong>
          );
        }
        const link = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(part);
        if (link) {
          const [, label, href] = link;
          const cls = "text-sc-accent-text underline underline-offset-4 hover:no-underline";
          return href.startsWith("/") ? (
            <Link key={i} href={href} className={cls}>
              {label}
            </Link>
          ) : (
            <a key={i} href={href} className={cls} target="_blank" rel="noopener noreferrer">
              {label}
            </a>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}

export function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <div className="space-y-5">
      {blocks.map((b, i) => {
        switch (b.type) {
          case "p":
            return (
              <p key={i} className="text-[1.0625rem] leading-[1.75] text-sc-muted">
                <Inline text={b.text} />
              </p>
            );
          case "ul":
            return (
              <ul key={i} className="space-y-2.5">
                {b.items.map((item, j) => (
                  <li key={j} className="flex gap-3 text-[1.0625rem] leading-[1.7] text-sc-muted">
                    <span
                      aria-hidden
                      className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full bg-sc-accent"
                    />
                    <span>
                      <Inline text={item} />
                    </span>
                  </li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol key={i} className="space-y-3">
                {b.items.map((item, j) => (
                  <li key={j} className="flex gap-3 text-[1.0625rem] leading-[1.7] text-sc-muted">
                    <span
                      aria-hidden
                      className="mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-md bg-sc-accent text-xs font-bold text-sc-on-accent"
                    >
                      {j + 1}
                    </span>
                    <span>
                      <Inline text={item} />
                    </span>
                  </li>
                ))}
              </ol>
            );
          case "table":
            return (
              <div key={i} className="overflow-x-auto rounded-2xl border border-sc-border">
                <table className="w-full min-w-[28rem] border-collapse text-left text-[0.9375rem]">
                  <thead className="bg-sc-surface-2 text-sc-text">
                    <tr>
                      {b.head.map((h) => (
                        <th key={h} scope="col" className="px-4 py-3 font-semibold">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {b.rows.map((row, r) => (
                      <tr key={r} className="border-t border-sc-border align-top">
                        {row.map((cell, c) => (
                          <td
                            key={c}
                            className={`px-4 py-3 ${c === 0 ? "font-medium text-sc-text" : "text-sc-muted"}`}
                          >
                            <Inline text={cell} />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          case "note":
            return (
              <aside
                key={i}
                className="rounded-2xl border border-sc-border border-l-4 border-l-sc-accent bg-sc-surface p-5"
              >
                {b.title && <p className="sc-eyebrow mb-2">{b.title}</p>}
                <p className="text-[1rem] leading-relaxed text-sc-text">
                  <Inline text={b.text} />
                </p>
              </aside>
            );
        }
      })}
    </div>
  );
}
