import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Boxes, Search } from "lucide-react";
import { Category, CATEGORY_META, Project, PROJECTS } from "@/data/projects";

export function ProjectDirectory() {
  const [selectedCategory, setSelectedCategory] = useState<"all" | Category>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const categories: { id: "all" | Category; label: string }[] = [
    { id: "all", label: "All Systems" },
    { id: "ai", label: "AI & Automation" },
    { id: "web", label: "Web Applications" },
    { id: "system", label: "Enterprise Systems" },
    { id: "iot", label: "Hardware & IoT" },
  ];

  const filteredProjects = PROJECTS.filter((p) => {
    const matchesCategory = selectedCategory === "all" || p.category === selectedCategory;
    const matchesSearch =
      searchQuery.trim() === "" ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.stack.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (p.role && p.role.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex flex-col gap-8">
      {/* Search & Category Filter Bar */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b border-border/80 pb-6">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2 text-mono text-xs">
          {categories.map((cat) => {
            const count =
              cat.id === "all"
                ? PROJECTS.length
                : PROJECTS.filter((p) => p.category === cat.id).length;
            const isSelected = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 rounded-sm border px-3.5 py-2 transition shadow-sm ${
                  isSelected
                    ? "border-signal bg-signal/15 text-signal font-bold"
                    : "border-border bg-surface text-muted-foreground hover:border-signal/50 hover:text-foreground"
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`rounded-full px-1.5 py-0.2 text-[10px] font-mono ${
                    isSelected
                      ? "bg-signal text-background font-bold"
                      : "bg-surface-2 text-muted-foreground"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Instant Search Bar */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search stack, system name..."
            className="w-full rounded-sm border border-border bg-surface py-2 pl-9 pr-3 text-mono text-xs text-foreground placeholder:text-muted-foreground focus:border-signal focus:outline-none shadow-sm"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-mono text-[10px] text-muted-foreground hover:text-foreground"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-sm border border-dashed border-border py-16 text-center text-mono text-xs">
          <Boxes className="h-8 w-8 text-muted-foreground mb-3" />
          <p className="text-foreground font-semibold">No systems found matching your search</p>
          <p className="text-muted-foreground mt-1">
            Try searching for "Next.js", "n8n", "RAG", or clear filters.
          </p>
          <button
            onClick={() => {
              setSelectedCategory("all");
              setSearchQuery("");
            }}
            className="mt-4 rounded-sm border border-signal bg-signal/10 px-4 py-2 text-signal font-bold hover:bg-signal hover:text-background transition"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => {
            const meta = CATEGORY_META[project.category];
            const isArray = Array.isArray(project.image);
            const previewImg = isArray ? (project.image as string[])[0] : (project.image as string);

            return (
              <div
                key={project.slug}
                className="group flex flex-col justify-between rounded-sm border border-border-strong bg-card overflow-hidden transition-all duration-300 hover:border-signal hover:shadow-2xl"
              >
                <div>
                  {/* Media Thumbnail Box */}
                  <div className="relative aspect-video w-full overflow-hidden border-b border-border bg-surface-2">
                    {previewImg ? (
                      <img
                        src={previewImg}
                        alt={project.name}
                        className="h-full w-full object-contain p-2 transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-mono text-xs text-muted-foreground">
                        No Preview Available
                      </div>
                    )}

                    {/* Tier / Status Pill */}
                    <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                      <span
                        className="rounded-full px-2 py-0.5 text-[9.5px] font-mono font-bold uppercase tracking-wider shadow-sm"
                        style={{
                          backgroundColor: `color-mix(in oklch, ${meta?.color || "var(--signal)"} 20%, transparent)`,
                          color: meta?.color || "var(--signal)",
                          border: `1px solid color-mix(in oklch, ${meta?.color || "var(--signal)"} 40%, transparent)`,
                        }}
                      >
                        {meta?.label || project.category}
                      </span>
                    </div>

                    {project.tier === "pinned" && (
                      <div className="absolute top-2.5 right-2.5 rounded-full border border-signal/40 bg-background/90 px-2 py-0.5 text-[9px] font-mono font-bold text-signal backdrop-blur shadow-sm">
                        FLAGSHIP
                      </div>
                    )}
                  </div>

                  {/* Card Details */}
                  <div className="p-5 sm:p-6 flex flex-col gap-3">
                    {/* Date & Role */}
                    <div className="flex items-center justify-between text-mono text-[11px] text-muted-foreground">
                      <span className="truncate font-medium">{project.role || "Developer"}</span>
                      <span className="shrink-0 font-mono text-[10px]">{project.date}</span>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold tracking-tight text-foreground group-hover:text-signal transition leading-snug">
                      <Link
                        to="/projects/$slug"
                        params={{ slug: project.slug }}
                        className="hover:underline"
                      >
                        {project.name}
                      </Link>
                    </h3>

                    {/* Summary */}
                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
                      {project.summary}
                    </p>

                    {/* Metrics / Highlights */}
                    {project.metrics && project.metrics.length > 0 && (
                      <div className="mt-1 flex flex-wrap gap-1.5">
                        {project.metrics.slice(0, 2).map((m, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center gap-1 rounded border border-border bg-surface-2 px-2 py-0.5 text-mono text-[10px] text-foreground font-semibold"
                          >
                            <span className="text-signal">{m.value}</span>
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Tech Stack Chips */}
                    <div className="mt-2 flex flex-wrap gap-1">
                      {project.stack.slice(0, 4).map((tech, idx) => (
                        <span
                          key={idx}
                          className="rounded border border-border/80 bg-surface px-1.5 py-0.5 text-mono text-[10px] text-muted-foreground"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.stack.length > 4 && (
                        <span className="rounded border border-border/60 bg-surface px-1.5 py-0.5 text-mono text-[10px] text-muted-foreground">
                          +{project.stack.length - 4}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Card Action Buttons (Direct 1-Click Access) */}
                <div className="flex items-center justify-between border-t border-border/80 bg-surface/40 p-4 text-mono text-xs">
                  <Link
                    to="/projects/$slug"
                    params={{ slug: project.slug }}
                    className="inline-flex items-center gap-1 font-bold text-signal hover:underline"
                  >
                    <span>Architecture Case Study</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>

                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 font-semibold text-muted-foreground hover:text-foreground transition"
                    >
                      <span>Live Link</span>
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
