import { Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { CATEGORY_META, Project } from "@/data/projects";

export function PinnedBento({ projects }: { projects: Project[] }) {
  const pinned = projects.filter((p) => p.tier === "pinned").slice(0, 4);

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      {pinned.map((project, idx) => {
        const meta = CATEGORY_META[project.category];
        const isArray = Array.isArray(project.image);
        const heroImg = isArray ? (project.image as string[])[0] : (project.image as string);

        return (
          <div
            key={project.slug}
            className={`group relative flex flex-col justify-between overflow-hidden rounded-sm border border-border-strong bg-card p-5 sm:p-6 transition-all duration-300 hover:border-signal/80 hover:shadow-lg ${
              idx === 0 ? "lg:col-span-2" : ""
            }`}
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between border-b border-border/80 pb-3 text-mono text-xs">
              <div className="flex items-center gap-2">
                <span
                  className="flex h-2 w-2 rounded-full ring-pulse"
                  style={{ background: meta.color }}
                />
                <span className="uppercase text-[10px] tracking-wider" style={{ color: meta.color }}>
                  {meta.label}
                </span>
              </div>
              <span className="text-[10px] uppercase text-muted-foreground">
                {project.date}
              </span>
            </div>

            {/* Main Content Area */}
            <div
              className={`mt-4 grid gap-6 ${
                idx === 0 ? "md:grid-cols-[1.2fr_1fr] md:items-center" : "grid-cols-1"
              }`}
            >
              {/* Text Information */}
              <div className="flex flex-col gap-3">
                <h3 className="text-xl font-bold tracking-tight text-foreground transition-colors group-hover:text-signal">
                  {project.name}
                </h3>
                {project.role && (
                  <div className="flex items-center gap-2 text-mono text-[11px] text-muted-foreground">
                    <span className="rounded border border-border px-1.5 py-0.5 uppercase text-[9px] text-foreground bg-surface-2">
                      Role
                    </span>
                    <span>{project.role}</span>
                  </div>
                )}
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {project.summary}
                </p>

                {/* Metrics Grid */}
                {project.metrics && (
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    {project.metrics.slice(0, 4).map((m, i) => (
                      <div
                        key={i}
                        className="flex flex-col rounded border border-border bg-surface-2/70 p-2 text-mono"
                      >
                        <span className="text-[9px] uppercase tracking-wider text-muted-foreground">
                          {m.label}
                        </span>
                        <span className="text-xs font-semibold text-foreground">
                          {m.value}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Stack Chips */}
                <div className="mt-1 flex flex-wrap gap-1.5">
                  {project.stack.slice(0, 5).map((s) => (
                    <span
                      key={s}
                      className="rounded border border-border bg-surface px-2 py-0.5 text-mono text-[10px] text-muted-foreground"
                    >
                      {s}
                    </span>
                  ))}
                  {project.stack.length > 5 && (
                    <span className="rounded border border-border bg-surface px-1.5 py-0.5 text-mono text-[10px] text-muted-foreground">
                      +{project.stack.length - 5}
                    </span>
                  )}
                </div>
              </div>

              {/* Media Preview Box */}
              <div className="relative overflow-hidden rounded border border-border bg-graph min-h-[200px] max-h-[280px] flex items-center justify-center bg-background/50">
                <img
                  src={heroImg}
                  alt={project.name}
                  loading="lazy"
                  className="h-full w-full object-contain p-2 transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    const el = e.currentTarget as HTMLImageElement;
                    el.style.display = "none";
                  }}
                />
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="mt-6 flex items-center justify-between border-t border-border/80 pt-4 text-mono text-xs">
              <Link
                to="/projects/$slug"
                params={{ slug: project.slug }}
                className="inline-flex items-center gap-1.5 font-medium text-foreground hover:text-signal transition"
              >
                <span>Explore Architecture & Breakdown</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>

              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground transition"
                >
                  <span>Demo</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
