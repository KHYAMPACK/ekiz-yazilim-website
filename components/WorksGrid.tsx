"use client";

import { useState } from "react";
import { WORK_FILTERS, works, type WorkTag } from "@/lib/works";
import WorkCard from "./WorkCard";

export default function WorksGrid() {
  const [filter, setFilter] = useState<"all" | WorkTag>("all");
  const shown =
    filter === "all" ? works : works.filter((work) => work.tags.includes(filter));

  return (
    <>
      <div
        className="mb-8 flex flex-wrap gap-2"
        role="group"
        aria-label="Projeleri filtrele"
      >
        {WORK_FILTERS.map((item) => {
          const count =
            item.id === "all"
              ? works.length
              : works.filter((work) => work.tags.includes(item.id as WorkTag)).length;
          const active = filter === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setFilter(item.id)}
              aria-pressed={active}
              className={`inline-flex min-h-10 items-center gap-2 rounded-full border px-4 text-sm font-medium transition-colors ${
                active
                  ? "border-sc-accent bg-sc-accent text-sc-on-accent"
                  : "border-sc-border text-sc-text hover:border-sc-accent"
              }`}
            >
              {item.label}
              <span className={active ? "text-sc-on-accent/65" : "text-sc-muted"}>{count}</span>
            </button>
          );
        })}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {shown.map((project) => (
          <WorkCard key={project.id} project={project} />
        ))}
      </div>
    </>
  );
}
