import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowUpRight,
  Bot,
  Boxes,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Cpu,
  Download,
  ExternalLink,
  FileText,
  Layers,
  Lightbulb,
  Maximize2,
  Search,
  SlidersHorizontal,
  Sparkles,
  Terminal,
  X,
} from "lucide-react";
import { Category, CATEGORY_META, Project, PROJECTS } from "@/data/projects";

export function EngineeringTable() {
  const [selectedCategory, setSelectedCategory] = useState<"all" | Category>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [activeTab, setActiveTab] = useState<"all" | "problem" | "solution" | "outcome">("all");
  const [lightboxOpen, setLightboxOpen] = useState(false);

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

  const handleOpenDrawer = (project: Project) => {
    setActiveProject(project);
    setActiveSlide(0);
    setActiveTab("all");
  };

  const images = activeProject
    ? Array.isArray(activeProject.image)
      ? (activeProject.image as string[])
      : [activeProject.image as string]
    : [];

  return (
    <div className="flex flex-col gap-6">
      {/* Control Bar & Filter Ticker */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between border-b border-border/80 pb-6">
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
                className={`flex items-center gap-2 rounded-sm border px-3 py-1.5 transition shadow-sm ${
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

        {/* Live Search & Telemetry */}
        <div className="flex items-center gap-3">
          <div className="relative w-full sm:w-72">
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
          <span className="hidden xl:inline text-mono text-[11px] text-muted-foreground">
            {filteredProjects.length} / {PROJECTS.length} nodes
          </span>
        </div>
      </div>

      {/* High-Density Minimalist Engineering Table */}
      <div className="overflow-hidden rounded-sm border border-border-strong bg-card shadow-lg">
        {/* Table macOS Header Bar */}
        <div className="flex items-center justify-between border-b border-border bg-surface-2 px-4 py-2 text-mono text-xs uppercase tracking-wider text-muted-foreground">
          <div className="flex items-center gap-2.5">
            <div className="flex gap-1.5">
              <div className="h-2.5 w-2.5 rounded-full bg-[#FF5F56]" />
              <div className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E]" />
              <div className="h-2.5 w-2.5 rounded-full bg-[#27C93F]" />
            </div>
            <span className="font-bold text-foreground">SYSTEM_REGISTRY.LOG</span>
          </div>
          <span className="text-[10.5px] text-signal font-semibold">
            CLICK ROW TO INSPECT ARCHITECTURE
          </span>
        </div>

        {/* Responsive Table Body */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-mono text-xs">
            <thead>
              <tr className="border-b border-border bg-surface text-[10.5px] uppercase tracking-wider text-muted-foreground">
                <th className="py-3 px-4 w-16">Status</th>
                <th className="py-3 px-4 min-w-[280px]">System Name &amp; Description</th>
                <th className="py-3 px-4 hidden md:table-cell min-w-[140px]">Category</th>
                <th className="py-3 px-4 hidden lg:table-cell min-w-[220px]">Tech Stack</th>
                <th className="py-3 px-4 hidden sm:table-cell min-w-[140px]">Key Outcome</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {filteredProjects.map((p, idx) => {
                const meta = CATEGORY_META[p.category];
                const isFlagship = p.tier === "pinned";

                return (
                  <tr
                    key={p.slug}
                    onClick={() => handleOpenDrawer(p)}
                    className="group cursor-pointer transition-colors duration-150 hover:bg-surface-2/90"
                  >
                    {/* Status Pill */}
                    <td className="py-3.5 px-4 align-top">
                      <span
                        className={`inline-block h-2.5 w-2.5 rounded-full ${
                          isFlagship
                            ? "bg-signal animate-pulse shadow-[0_0_8px_rgba(0,229,255,0.6)]"
                            : "bg-muted-foreground/50"
                        }`}
                        title={isFlagship ? "Flagship System" : "Production System"}
                      />
                    </td>

                    {/* System Name & Summary */}
                    <td className="py-3.5 px-4 align-top">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-bold text-foreground group-hover:text-signal transition text-sm">
                            {p.name}
                          </span>
                          {isFlagship && (
                            <span className="rounded bg-signal/15 border border-signal/40 px-1.5 py-0.2 text-[9px] font-bold text-signal uppercase">
                              Flagship
                            </span>
                          )}
                        </div>
                        <p className="text-muted-foreground text-[11.5px] leading-relaxed line-clamp-2 max-w-xl">
                          {p.summary}
                        </p>
                        <span className="text-[10px] text-muted-foreground/80 md:hidden mt-0.5">
                          {meta?.label} · {p.date}
                        </span>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-3.5 px-4 align-top hidden md:table-cell">
                      <span
                        className="inline-flex items-center gap-1 rounded-sm px-2 py-0.5 text-[10.5px] font-semibold uppercase"
                        style={{
                          backgroundColor: `color-mix(in oklch, ${meta?.color || "var(--signal)"} 15%, transparent)`,
                          color: meta?.color || "var(--signal)",
                          border: `1px solid color-mix(in oklch, ${meta?.color || "var(--signal)"} 30%, transparent)`,
                        }}
                      >
                        {meta?.label || p.category}
                      </span>
                    </td>

                    {/* Tech Stack */}
                    <td className="py-3.5 px-4 align-top hidden lg:table-cell">
                      <div className="flex flex-wrap gap-1 max-w-xs">
                        {p.stack.slice(0, 3).map((tech, i) => (
                          <span
                            key={i}
                            className="rounded border border-border/80 bg-surface px-1.5 py-0.5 text-[10px] text-muted-foreground"
                          >
                            {tech}
                          </span>
                        ))}
                        {p.stack.length > 3 && (
                          <span className="rounded border border-border/60 bg-surface px-1.5 py-0.5 text-[10px] text-muted-foreground">
                            +{p.stack.length - 3}
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Metric / Outcome */}
                    <td className="py-3.5 px-4 align-top hidden sm:table-cell">
                      {p.metrics && p.metrics.length > 0 ? (
                        <div className="flex flex-col">
                          <span className="font-bold text-signal text-[11px]">
                            {p.metrics[0].value}
                          </span>
                          <span className="text-[10px] text-muted-foreground">
                            {p.metrics[0].label}
                          </span>
                        </div>
                      ) : (
                        <span className="text-muted-foreground text-[10.5px]">—</span>
                      )}
                    </td>

                    {/* Action Button */}
                    <td className="py-3.5 px-4 align-top text-right shrink-0">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenDrawer(p);
                        }}
                        className="inline-flex items-center gap-1 rounded-sm border border-border bg-surface px-3 py-1.5 text-[11px] font-semibold text-foreground hover:border-signal hover:text-signal hover:bg-surface-2 transition shadow-sm"
                      >
                        <span>Inspect</span>
                        <ArrowRight className="h-3 w-3" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Slide-Over Inspection Drawer Modal */}
      {activeProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-background/80 backdrop-blur-sm animate-in fade-in duration-200">
          {/* Backdrop Click to Close */}
          <div className="absolute inset-0" onClick={() => setActiveProject(null)} />

          {/* Drawer Body */}
          <aside className="relative z-10 flex h-full w-full max-w-2xl flex-col border-l border-border-strong bg-card shadow-2xl overflow-y-auto animate-in slide-in-from-right duration-300">
            {/* Drawer Header */}
            <div className="sticky top-0 z-20 flex items-center justify-between border-b border-border bg-surface-2 px-5 py-3 text-mono text-xs">
              <div className="flex items-center gap-3 min-w-0">
                <div className="flex gap-1.5 shrink-0">
                  <div className="h-2.5 w-2.5 rounded-full bg-[#FF5F56]" />
                  <div className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E]" />
                  <div className="h-2.5 w-2.5 rounded-full bg-[#27C93F]" />
                </div>
                <span className="font-bold text-foreground truncate">
                  INSPECTOR // {activeProject.slug.toUpperCase()}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Link
                  to="/projects/$slug"
                  params={{ slug: activeProject.slug }}
                  className="rounded px-2.5 py-1 text-signal hover:underline font-bold text-[11px]"
                >
                  Full Page ↗
                </Link>
                <button
                  onClick={() => setActiveProject(null)}
                  className="rounded p-1 text-muted-foreground hover:bg-surface hover:text-foreground transition"
                  title="Close Inspector"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Drawer Content */}
            <div className="p-6 flex flex-col gap-6">
              {/* Media Carousel */}
              <div className="relative aspect-video w-full overflow-hidden rounded border border-border bg-surface-2 flex items-center justify-center">
                {images.length > 0 && images[activeSlide] ? (
                  <img
                    src={images[activeSlide]}
                    alt={`${activeProject.name} slide ${activeSlide + 1}`}
                    className="h-full w-full object-contain p-2"
                  />
                ) : (
                  <div className="text-mono text-xs text-muted-foreground">
                    No Preview Available
                  </div>
                )}

                {/* Slides Navigation */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={() =>
                        setActiveSlide((prev) => (prev === 0 ? images.length - 1 : prev - 1))
                      }
                      className="absolute left-2 top-1/2 -translate-y-1/2 rounded bg-background/80 p-1.5 text-foreground hover:bg-surface transition shadow"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() =>
                        setActiveSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1))
                      }
                      className="absolute right-2 top-1/2 -translate-y-1/2 rounded bg-background/80 p-1.5 text-foreground hover:bg-surface transition shadow"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                    <div className="absolute bottom-2 right-2 rounded bg-background/90 px-2 py-0.5 text-mono text-[10px] text-muted-foreground font-bold">
                      {activeSlide + 1} / {images.length}
                    </div>
                  </>
                )}
              </div>

              {/* Title & Metadata */}
              <div>
                <div className="flex items-center gap-2 text-mono text-xs text-muted-foreground pb-1">
                  <span>{activeProject.role || "Architect"}</span>
                  <span>·</span>
                  <span>{activeProject.date}</span>
                </div>
                <h3 className="text-2xl font-bold tracking-tight text-foreground">
                  {activeProject.name}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {activeProject.summary}
                </p>
              </div>

              {/* Metric Scorecards */}
              {activeProject.metrics && activeProject.metrics.length > 0 && (
                <div className="grid grid-cols-2 gap-3 text-mono text-xs">
                  {activeProject.metrics.map((m, idx) => (
                    <div key={idx} className="rounded border border-border bg-surface-2 p-3">
                      <span className="text-[10px] uppercase text-muted-foreground font-semibold">
                        {m.label}
                      </span>
                      <div className="text-sm font-bold text-signal mt-0.5">{m.value}</div>
                    </div>
                  ))}
                </div>
              )}

              {/* Problem, Solution, Outcome Breakdown Tabs */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-1 border-b border-border text-mono text-xs pb-1">
                  {(["all", "problem", "solution", "outcome"] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-3 py-1 rounded-t capitalize transition ${
                        activeTab === tab
                          ? "bg-surface-2 text-signal font-bold border-b-2 border-signal"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                <div className="space-y-4 text-xs leading-relaxed text-mono">
                  {(activeTab === "all" || activeTab === "problem") && (
                    <div className="rounded border border-border bg-card p-4">
                      <span className="text-signal font-bold uppercase text-[11px] block mb-1">
                        🚨 Problem Statement
                      </span>
                      <p className="text-muted-foreground">{activeProject.problem}</p>
                    </div>
                  )}

                  {(activeTab === "all" || activeTab === "solution") && (
                    <div className="rounded border border-border bg-card p-4">
                      <span className="text-signal font-bold uppercase text-[11px] block mb-1">
                        💡 Engineering Solution
                      </span>
                      <p className="text-muted-foreground whitespace-pre-line">
                        {activeProject.solution}
                      </p>
                    </div>
                  )}

                  {(activeTab === "all" || activeTab === "outcome") && (
                    <div className="rounded border border-border bg-card p-4">
                      <span className="text-signal font-bold uppercase text-[11px] block mb-1">
                        🏆 Quantified Outcome
                      </span>
                      <p className="text-muted-foreground">{activeProject.outcome}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Tech Stack Matrix */}
              <div className="flex flex-col gap-2">
                <span className="text-mono text-xs uppercase tracking-widest text-foreground font-semibold">
                  Technologies Deployed:
                </span>
                <div className="flex flex-wrap gap-1.5 text-mono text-xs">
                  {activeProject.stack.map((tech, i) => (
                    <span
                      key={i}
                      className="rounded border border-border bg-surface px-2 py-1 text-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Action Footer */}
              <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-border pt-4 text-mono text-xs">
                <Link
                  to="/projects/$slug"
                  params={{ slug: activeProject.slug }}
                  className="inline-flex items-center gap-1.5 rounded-sm bg-signal px-4 py-2 font-bold text-background hover:bg-signal/90 transition shadow-sm"
                >
                  <span>Open Dedicated Case Study</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>

                {activeProject.demoUrl && (
                  <a
                    href={activeProject.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 rounded-sm border border-border-strong bg-surface px-4 py-2 font-semibold text-foreground hover:bg-surface-2 transition shadow-sm"
                  >
                    <span>Live Demo / Video</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                )}
              </div>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
