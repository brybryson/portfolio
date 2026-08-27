import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowUpRight,
  Bot,
  Boxes,
  CheckCircle2,
  Cpu,
  FileCode,
  Layers,
  Search,
  Sparkles,
  Terminal,
  Zap,
} from "lucide-react";
import { Category, CATEGORY_META, Project, PROJECTS } from "@/data/projects";

export function EditorialBentoGrid() {
  const [selectedCategory, setSelectedCategory] = useState<"all" | Category>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const categories: { id: "all" | Category; label: string }[] = [
    { id: "all", label: "All Systems" },
    { id: "ai", label: "AI & Automation" },
    { id: "web", label: "Web Applications" },
    { id: "system", label: "Systems & POS" },
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
    <div className="flex flex-col gap-10">
      {/* Category Filter Pills & Search Bar */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between border-b border-border/80 pb-6">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2.5 text-mono text-xs">
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
                className={`flex items-center gap-2 rounded-sm border px-4 py-2 transition shadow-sm ${
                  isSelected
                    ? "border-signal bg-signal/15 text-signal font-bold"
                    : "border-border bg-surface text-muted-foreground hover:border-signal/50 hover:text-foreground"
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-mono ${
                    isSelected ? "bg-signal text-background font-bold" : "bg-surface-2 text-muted-foreground"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Live Search Bar */}
        <div className="relative w-full lg:w-80">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search stack, system name..."
            className="w-full rounded-sm border border-border bg-surface py-2.5 pl-10 pr-4 text-mono text-xs text-foreground placeholder:text-muted-foreground focus:border-signal focus:outline-none shadow-sm"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-mono text-xs text-muted-foreground hover:text-foreground"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Editorial Bento Cards Grid */}
      {filteredProjects.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-sm border border-dashed border-border py-16 text-center text-mono text-xs">
          <Boxes className="h-8 w-8 text-muted-foreground mb-3" />
          <p className="text-foreground font-semibold">No systems found matching your query</p>
          <p className="text-muted-foreground mt-1">Try searching for "Next.js", "n8n", "RAG", or reset filters.</p>
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project, index) => {
            const meta = CATEGORY_META[project.category];
            const isFlagship = project.tier === "pinned";
            const isArray = Array.isArray(project.image);
            const previewImg = isArray ? (project.image as string[])[0] : (project.image as string);

            // Bento span: top flagships take full width for high-impact editorial showcase
            const isWideBento = isFlagship && (index === 0 || index === 1);

            return (
              <article
                key={project.slug}
                className={`group flex flex-col justify-between overflow-hidden rounded-sm border border-border-strong bg-card shadow-xl transition-all duration-300 hover:border-signal hover:shadow-2xl ${
                  isWideBento ? "md:col-span-2" : "md:col-span-1"
                }`}
              >
                <div>
                  {/* macOS Titlebar Header */}
                  <div className="flex items-center justify-between border-b border-border bg-surface-2 px-4 py-2.5 text-mono text-xs uppercase tracking-wider text-muted-foreground">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="flex gap-1.5 shrink-0">
                        <div className="h-2.5 w-2.5 rounded-full bg-[#FF5F56]" />
                        <div className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E]" />
                        <div className="h-2.5 w-2.5 rounded-full bg-[#27C93F]" />
                      </div>
                      <div className="flex items-center gap-1.5 truncate">
                        <FileCode className="h-3.5 w-3.5 text-signal shrink-0" />
                        <span className="font-bold text-foreground truncate">
                          {project.slug.toUpperCase()}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0 ml-2">
                      <span
                        className="rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider shadow-sm"
                        style={{
                          backgroundColor: `color-mix(in oklch, ${meta?.color || "var(--signal)"} 15%, transparent)`,
                          color: meta?.color || "var(--signal)",
                          border: `1px solid color-mix(in oklch, ${meta?.color || "var(--signal)"} 35%, transparent)`,
                        }}
                      >
                        {meta?.label || project.category}
                      </span>
                      <span className="text-muted-foreground text-[10.5px] hidden sm:inline">
                        {project.date}
                      </span>
                    </div>
                  </div>

                  {/* Wide Uncropped Screenshot Banner */}
                  <div className="relative w-full border-b border-border bg-surface-2/80 p-4 sm:p-6 flex items-center justify-center min-h-[240px] sm:min-h-[300px] max-h-[440px] overflow-hidden">
                    {previewImg ? (
                      <img
                        src={previewImg}
                        alt={project.name}
                        className="h-auto max-h-[380px] w-full object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                      />
                    ) : (
                      <div className="text-mono text-xs text-muted-foreground">
                        Preview Visual Loading...
                      </div>
                    )}

                    {/* Flagship Badge Overlay */}
                    {isFlagship && (
                      <div className="absolute top-3 right-3 rounded-full border border-signal/50 bg-background/90 px-3 py-1 text-[10px] font-mono font-bold text-signal backdrop-blur shadow-md">
                        ● FLAGSHIP ARCHITECTURE
                      </div>
                    )}
                  </div>

                  {/* Editorial Body Content */}
                  <div className="p-6 sm:p-8 flex flex-col gap-4">
                    {/* Role & Date */}
                    <div className="flex items-center justify-between text-mono text-xs text-muted-foreground border-b border-border/60 pb-3">
                      <span className="font-semibold text-foreground">
                        {project.role || "Lead Architect & Developer"}
                      </span>
                      <span className="text-[11px]">{project.date}</span>
                    </div>

                    {/* Main Title */}
                    <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground group-hover:text-signal transition leading-snug">
                      <Link
                        to="/projects/$slug"
                        params={{ slug: project.slug }}
                        className="hover:underline"
                      >
                        {project.name}
                      </Link>
                    </h3>

                    {/* Summary */}
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {project.summary}
                    </p>

                    {/* Key Outcome / Metrics Scorecards */}
                    {project.metrics && project.metrics.length > 0 && (
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2 text-mono text-xs">
                        {project.metrics.map((m, idx) => (
                          <div
                            key={idx}
                            className="rounded border border-border bg-surface-2 p-2.5 shadow-sm"
                          >
                            <span className="text-[9.5px] uppercase text-muted-foreground font-semibold block truncate">
                              {m.label}
                            </span>
                            <div className="text-xs font-bold text-signal mt-0.5 truncate">
                              {m.value}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Tech Stack Chips */}
                    <div className="flex flex-wrap items-center gap-1.5 pt-2">
                      {project.stack.map((tech, i) => (
                        <span
                          key={i}
                          className="rounded-sm border border-border bg-surface px-2 py-0.5 text-mono text-[11px] text-foreground/90 font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Editorial Action Footer */}
                <div className="flex items-center justify-between border-t border-border/80 bg-surface/50 p-4 sm:p-5 text-mono text-xs">
                  <Link
                    to="/projects/$slug"
                    params={{ slug: project.slug }}
                    className="inline-flex items-center gap-1.5 font-bold text-signal hover:underline text-sm"
                  >
                    <span>Inspect Case Study &amp; Architecture</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>

                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-sm border border-border-strong bg-card px-3.5 py-1.5 font-semibold text-foreground hover:border-signal hover:text-signal transition shadow-sm"
                    >
                      <span>{project.slug.includes("clinical") ? "3-Min Video" : "Live Demo"}</span>
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
