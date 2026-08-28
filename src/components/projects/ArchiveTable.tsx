import { useState } from "react";
import { ArrowUpRight, ChevronDown, ChevronUp, Github, History } from "lucide-react";
import { CATEGORY_META, Project } from "@/data/projects";

export function ArchiveTable({ projects }: { projects: Project[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const archiveProjects = projects.filter((p) => p.tier === "archive");

  if (archiveProjects.length === 0) return null;

  return (
    <div className="overflow-hidden rounded-sm border border-border-strong bg-card shadow-sm">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between border-b border-border bg-surface-2 px-4 py-3 text-mono text-xs transition hover:bg-surface"
      >
        <div className="flex items-center gap-2 text-foreground font-semibold">
          <History className="h-4 w-4 text-muted-foreground" />
          <span className="uppercase tracking-wider">
            EARLY EXPLORATIONS & LEGACY ARCHIVE ({archiveProjects.length})
          </span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground text-[11px]">
          <span>{isOpen ? "Hide Archive" : "Expand Table"}</span>
          {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </div>
      </button>

      {isOpen && (
        <div className="overflow-x-auto p-2">
          <table className="w-full text-left text-mono text-xs">
            <thead>
              <tr className="border-b border-border text-[10px] uppercase tracking-wider text-muted-foreground">
                <th className="pb-2 pl-3">Year</th>
                <th className="pb-2">Project</th>
                <th className="pb-2 hidden md:table-cell">Category</th>
                <th className="pb-2 hidden sm:table-cell">Stack</th>
                <th className="pb-2 pr-3 text-right">Link</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {archiveProjects.map((p) => {
                const meta = CATEGORY_META[p.category];
                return (
                  <tr key={p.slug} className="hover:bg-surface/50 transition">
                    <td className="py-2.5 pl-3 text-muted-foreground">{p.date.slice(0, 4)}</td>
                    <td className="py-2.5 font-medium text-foreground">
                      <div className="flex flex-col">
                        <span>{p.name}</span>
                        <span className="text-[10px] text-muted-foreground sm:hidden">
                          {p.stack.join(" · ")}
                        </span>
                      </div>
                    </td>
                    <td className="py-2.5 hidden md:table-cell">
                      <span
                        className="inline-flex items-center gap-1.5"
                        style={{ color: meta.color }}
                      >
                        <span
                          className="h-1.5 w-1.5 rounded-full"
                          style={{ background: meta.color }}
                        />
                        {meta.label}
                      </span>
                    </td>
                    <td className="py-2.5 hidden sm:table-cell text-muted-foreground text-[11px]">
                      {p.stack.slice(0, 4).join(" · ")}
                    </td>
                    <td className="py-2.5 pr-3 text-right">
                      {p.demoUrl ? (
                        <a
                          href={p.demoUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-signal hover:underline"
                        >
                          <span>demo</span>
                          <ArrowUpRight className="h-3 w-3" />
                        </a>
                      ) : p.githubUrl ? (
                        <a
                          href={p.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground"
                        >
                          <Github className="h-3 w-3" />
                          <span>repo</span>
                        </a>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
