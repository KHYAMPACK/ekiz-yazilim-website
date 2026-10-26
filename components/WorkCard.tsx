import { STATUS_LABEL, type Work } from "@/lib/works";
import WorkIcon from "./WorkIcons";

/** Dark browser chrome with the domain — tells "this is a website" without a screenshot. */
function BrowserBar({ project }: { project: Work }) {
  return (
    <div className="border-b border-sc-border bg-sc-bg px-5 py-6 sm:px-6">
      <div className="overflow-hidden rounded-xl border border-sc-border bg-sc-surface">
        <div className="flex items-center gap-3 border-b border-sc-border bg-sc-surface-2 px-3 py-2">
          <div className="flex gap-1.5" aria-hidden>
            <span className="size-2 rounded-full bg-sc-border" />
            <span className="size-2 rounded-full bg-sc-border" />
            <span className="size-2 rounded-full bg-sc-accent" />
          </div>
          <p className="min-w-0 flex-1 truncate rounded-md bg-sc-bg px-2 py-0.5 font-mono text-xs text-sc-muted">
            {project.domain ?? "yakında"}
          </p>
        </div>
        <div className="space-y-2 px-3 py-4" aria-hidden>
          <div className="h-2 w-2/3 rounded-full bg-sc-accent" />
          <div className="h-1.5 w-full rounded-full bg-sc-border" />
          <div className="h-1.5 w-5/6 rounded-full bg-sc-border" />
        </div>
      </div>
    </div>
  );
}

function IconStage({ project }: { project: Work }) {
  return (
    <div className="flex items-center justify-center border-b border-sc-border bg-sc-bg px-5 py-8 sm:px-6">
      {project.icon ? (
        <WorkIcon name={project.icon} className="h-20 w-20 text-sc-accent-text" />
      ) : null}
    </div>
  );
}

export default function WorkCard({ project }: { project: Work }) {
  return (
    <article className="sc-card flex h-full flex-col overflow-hidden">
      {project.kind === "site" ? (
        <BrowserBar project={project} />
      ) : (
        <IconStage project={project} />
      )}

      <div className="flex flex-1 flex-col px-5 py-6 sm:px-6 sm:py-8">
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-xs font-medium tracking-[0.16em] uppercase text-sc-muted">
            {project.meta}
          </p>
          <span
            className={`rounded-full px-2.5 py-0.5 text-[10px] font-medium tracking-[0.12em] uppercase ${
              project.status === "live"
                ? "bg-sc-accent/15 text-sc-accent-text"
                : "border border-sc-border text-sc-muted"
            }`}
          >
            {STATUS_LABEL[project.status]}
          </span>
        </div>

        <h3 className="sc-h3 mt-3 !text-[1.75rem] sm:!text-[2rem]">{project.name}</h3>
        <p className="sc-body mt-3">{project.blurb}</p>

        <ul className="mt-5 space-y-2">
          {project.highlights.map((item) => (
            <li
              key={item}
              className="flex gap-3 text-sm leading-relaxed text-sc-text/85"
            >
              <span
                className="mt-2 size-1.5 shrink-0 rounded-full bg-sc-accent"
                aria-hidden
              />
              {item}
            </li>
          ))}
        </ul>

        <ul className="mt-6 flex flex-wrap gap-1.5" aria-label="Kullanılan teknolojiler">
          {project.stack.map((tech) => (
            <li
              key={tech}
              className="rounded-full border border-sc-border px-2.5 py-0.5 text-xs text-sc-muted"
            >
              {tech}
            </li>
          ))}
        </ul>

        {project.href || project.repo ? (
          <div className="mt-auto flex flex-wrap gap-2 pt-8">
            {project.href ? (
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="sc-btn sc-btn--primary !min-h-11"
              >
                {project.kind === "site" ? "Siteyi gör" : "Uygulamayı gör"}
              </a>
            ) : null}
            {project.repo ? (
              <a
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="sc-btn sc-btn--ghost !min-h-11"
              >
                GitHub
              </a>
            ) : null}
          </div>
        ) : null}
      </div>
    </article>
  );
}
