import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  AlertTriangle,
  ArrowUpRight,
  Bot,
  Boxes,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Cpu,
  FileText,
  Github,
  Layers,
  Lightbulb,
  Link2,
  Maximize2,
  Sparkles,
  Terminal,
  X,
} from "lucide-react";
import { Category, CATEGORY_META, Project, PROJECTS } from "@/data/projects";

export function ProjectShowcase({
  initialProjects = PROJECTS.filter((p) => p.tier !== "archive"),
}: {
  initialProjects?: Project[];
}) {
  const [selectedCategory, setSelectedCategory] = useState<"all" | Category>("all");
  const [activeSlug, setActiveSlug] = useState<string>(initialProjects[0]?.slug ?? "lumina-dental-studio");
  const [activeSlide, setActiveSlide] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"all" | "problem" | "solution" | "outcome">("all");

  const filteredProjects = initialProjects.filter((p) => {
    if (selectedCategory === "all") return true;
    return p.category === selectedCategory;
  });

  const activeProject =
    initialProjects.find((p) => p.slug === activeSlug) ?? filteredProjects[0] ?? initialProjects[0];

  const meta = CATEGORY_META[activeProject.category];
  const isArray = Array.isArray(activeProject.image);
  const images = isArray ? (activeProject.image as string[]) : [activeProject.image as string];

  const handleProjectSelect = (slug: string) => {
    setActiveSlug(slug);
    setActiveSlide(0);
    setActiveTab("all");
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Category Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/80 pb-4">
        <div className="flex flex-wrap items-center gap-2 text-mono text-xs">
          <button
            onClick={() => {
              setSelectedCategory("all");
              const first = initialProjects[0];
              if (first) handleProjectSelect(first.slug);
            }}
            className={`flex items-center gap-2 rounded-sm border px-3.5 py-2 transition shadow-sm ${
              selectedCategory === "all"
                ? "border-signal bg-signal/15 text-signal font-bold"
                : "border-border bg-surface text-muted-foreground hover:border-border-strong hover:text-foreground"
            }`}
          >
            <Boxes className="h-3.5 w-3.5" />
            <span>All Systems ({initialProjects.length})</span>
          </button>

          {(["ai", "web", "system", "iot"] as Category[]).map((cat) => {
            const cMeta = CATEGORY_META[cat];
            const Icon = cMeta.icon;
            const count = initialProjects.filter((p) => p.category === cat).length;
            const isSelected = selectedCategory === cat;

            return (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  const first = initialProjects.find((p) => p.category === cat);
                  if (first) handleProjectSelect(first.slug);
                }}
                className={`flex items-center gap-2 rounded-sm border px-3.5 py-2 transition shadow-sm ${
                  isSelected
                    ? "border-transparent bg-card text-foreground font-bold shadow-md"
                    : "border-border bg-surface text-muted-foreground hover:border-border-strong hover:text-foreground"
                }`}
                style={
                  isSelected
                    ? {
                        borderColor: cMeta.color,
                        boxShadow: `0 0 0 1px ${cMeta.color}`,
                        color: cMeta.color,
                      }
                    : undefined
                }
              >
                <Icon className="h-3.5 w-3.5" />
                <span>
                  {cMeta.label} ({count})
                </span>
              </button>
            );
          })}
        </div>

        <div className="hidden sm:flex items-center gap-2 text-mono text-xs text-muted-foreground">
          <Terminal className="h-3.5 w-3.5 text-signal" />
          <span>{filteredProjects.length} AVAILABLE NODES</span>
        </div>
      </div>

      {/* Horizontal Project Selector Ribbon */}
      <div
        className="flex gap-3 overflow-x-auto pb-2"
        style={{ scrollbarWidth: "thin", scrollbarColor: "var(--scrollbar-thumb) transparent" }}
      >
        {filteredProjects.map((p) => {
          const isActive = p.slug === activeProject.slug;
          const pMeta = CATEGORY_META[p.category];

          return (
            <button
              key={p.slug}
              onClick={() => handleProjectSelect(p.slug)}
              className={`group flex min-w-[280px] max-w-[340px] shrink-0 flex-col justify-between rounded-sm border p-3.5 text-left text-mono transition-all duration-200 shadow-sm ${
                isActive
                  ? "bg-card text-foreground shadow-md"
                  : "border-border bg-surface/80 text-muted-foreground hover:border-border-strong hover:bg-surface hover:text-foreground"
              }`}
              style={
                isActive
                  ? {
                      borderColor: pMeta.color,
                      boxShadow: `0 0 14px -6px ${pMeta.color}`,
                    }
                  : undefined
              }
            >
              <div className="flex items-center justify-between text-[10px] uppercase">
                <span className="flex items-center gap-1.5 font-semibold" style={{ color: pMeta.color }}>
                  <span className="h-2 w-2 rounded-full ring-pulse" style={{ background: pMeta.color }} />
                  {pMeta.label}
                </span>
                <span className="text-muted-foreground">{p.date}</span>
              </div>

              <h4 className="mt-2 text-xs font-bold leading-snug line-clamp-2 text-foreground group-hover:text-signal transition">
                {p.name}
              </h4>

              <div className="mt-3 flex items-center justify-between text-[9.5px] text-muted-foreground border-t border-border/60 pt-2">
                {p.series ? (
                  <span className="inline-flex items-center gap-1 text-signal font-semibold">
                    <Link2 className="h-2.5 w-2.5" />
                    Part {p.series.part}/{p.series.total}
                  </span>
                ) : (
                  <span>{p.stack[0]}</span>
                )}
                <span className="uppercase text-signal font-medium group-hover:underline">
                  Inspect System →
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Full-Width Project Canvas */}
      <article
        key={activeProject.slug}
        className="animate-fade-in flex flex-col overflow-hidden rounded-sm border border-border-strong bg-card/90 backdrop-blur shadow-xl"
        style={{ borderTopColor: meta.color, borderTopWidth: 2 }}
      >
        {/* macOS Terminal Window Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-border bg-surface-2 px-4 py-2.5 text-mono text-xs uppercase tracking-wider text-muted-foreground overflow-hidden">
          <div className="flex items-center gap-4 min-w-0">
            <div className="flex gap-1.5 shrink-0">
              <div className="h-2.5 w-2.5 rounded-full bg-[#FF5F56]" />
              <div className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E]" />
              <div className="h-2.5 w-2.5 rounded-full bg-[#27C93F]" />
            </div>
            <div className="flex items-center gap-2 min-w-0">
              <FileText className="h-3.5 w-3.5 shrink-0 text-signal" />
              <span className="font-bold text-foreground truncate">
                CASE-STUDY // {activeProject.slug.toUpperCase()}.MD
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0 ml-3">
            <span className="flex items-center gap-1.5 font-semibold" style={{ color: meta.color }}>
              <span className="h-2 w-2 rounded-full" style={{ background: meta.color }} />
              {meta.label}
            </span>
            <span className="text-muted-foreground">{activeProject.date}</span>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex flex-col">
          {/* Full-Width Uncropped Media Canvas */}
          <div className="group relative w-full border-b border-border bg-graph flex items-center justify-center min-h-[380px] md:min-h-[500px] max-h-[640px] bg-background/60 p-4 md:p-8">
            <img
              src={images[activeSlide]}
              alt={`${activeProject.name} slide ${activeSlide + 1}`}
              loading="lazy"
              className="h-auto max-h-[580px] w-full max-w-full object-contain cursor-zoom-in transition-transform duration-300"
              onClick={() => setLightboxOpen(true)}
              onError={(e) => {
                const el = e.currentTarget as HTMLImageElement;
                el.style.display = "none";
              }}
            />

            {/* Lightbox Full Size Button */}
            <button
              onClick={() => setLightboxOpen(true)}
              className="absolute top-4 right-4 flex items-center gap-1.5 rounded-sm border border-border-strong bg-background/90 px-3 py-1.5 text-mono text-xs text-foreground opacity-0 backdrop-blur transition hover:border-signal hover:text-signal group-hover:opacity-100 shadow-md font-medium"
              title="Expand to Full-Screen Lightbox"
            >
              <Maximize2 className="h-3.5 w-3.5" />
              <span>Full Size (100%)</span>
            </button>

            {/* Slide Navigation Arrows */}
            {isArray && images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveSlide((prev) => (prev === 0 ? images.length - 1 : prev - 1));
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 rounded-sm border border-border bg-surface/95 p-3 text-foreground opacity-0 backdrop-blur transition hover:border-signal hover:bg-surface-2 group-hover:opacity-100 shadow-lg"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 rounded-sm border border-border bg-surface/95 p-3 text-foreground opacity-0 backdrop-blur transition hover:border-signal hover:bg-surface-2 group-hover:opacity-100 shadow-lg"
                  aria-label="Next slide"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>

                {/* Slide Thumbnail Dots Tracker */}
                <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full border border-border bg-background/95 px-4 py-1.5 backdrop-blur shadow-lg">
                  {images.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveSlide(idx);
                      }}
                      className={`h-2.5 rounded-full transition-all ${
                        idx === activeSlide
                          ? "w-8 bg-signal"
                          : "w-2.5 bg-border-strong hover:bg-muted-foreground"
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                  <span className="ml-2 text-mono text-xs text-muted-foreground font-semibold">
                    {activeSlide + 1} / {images.length}
                  </span>
                </div>
              </>
            )}
          </div>

          {/* Deep Architectural Information & Specifications */}
          <div className="flex flex-col gap-8 p-6 md:p-10 lg:p-12">
            {/* Header: Title, Role, Summary & CTAs */}
            <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center border-b border-border/80 pb-6">
              <div className="max-w-4xl">
                {activeProject.series && (
                  <span
                    className="mb-3 inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1 text-mono text-xs uppercase tracking-wider font-semibold"
                    style={{
                      borderColor: `${meta.color}50`,
                      background: `${meta.color}15`,
                      color: meta.color,
                    }}
                  >
                    <Link2 className="h-3.5 w-3.5" />
                    {activeProject.series.name} — Part {activeProject.series.part} of {activeProject.series.total}
                  </span>
                )}

                <h2 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl lg:text-4xl leading-tight">
                  {activeProject.name}
                </h2>

                {activeProject.role && (
                  <div className="mt-3 flex items-center gap-2 text-mono text-xs text-muted-foreground">
                    <span className="rounded-sm border border-border px-2.5 py-0.5 uppercase text-[10.5px] text-foreground bg-surface-2 font-bold">
                      Role
                    </span>
                    <span className="text-foreground font-semibold text-sm">{activeProject.role}</span>
                  </div>
                )}

                <p className="mt-3.5 text-base md:text-lg leading-relaxed text-muted-foreground">
                  {activeProject.summary}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <Link
                  to="/projects/$slug"
                  params={{ slug: activeProject.slug }}
                  className="inline-flex shrink-0 items-center gap-2 rounded-sm border border-signal bg-signal/15 px-5 py-3.5 text-mono text-xs uppercase tracking-wider text-signal shadow-md transition hover:bg-signal hover:text-background font-bold"
                >
                  <span>Architecture Case Study</span>
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
                {activeProject.demoUrl && (
                  <a
                    href={activeProject.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex shrink-0 items-center gap-2 rounded-sm border border-border-strong bg-foreground px-5 py-3.5 text-mono text-xs uppercase tracking-wider text-background shadow-md transition hover:border-signal hover:bg-signal hover:text-white font-bold"
                  >
                    <ArrowUpRight className="h-4 w-4" />
                    {activeProject.demoUrl.includes("drive.google.com") ||
                    activeProject.demoUrl.includes("youtube.com")
                      ? "watch video walkthrough"
                      : "view live project"}
                  </a>
                )}
                {activeProject.githubUrl && (
                  <a
                    href={activeProject.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex shrink-0 items-center gap-2 rounded-sm border border-border-strong bg-surface px-5 py-3.5 text-mono text-xs uppercase tracking-wider text-foreground shadow-sm transition hover:bg-foreground hover:text-background font-bold"
                  >
                    <Github className="h-4 w-4" /> view on github
                  </a>
                )}
              </div>
            </div>

            {/* Metrics Telemetry Grid */}
            {activeProject.metrics && activeProject.metrics.length > 0 && (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {activeProject.metrics.map((m, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col rounded-sm border border-border bg-surface-2/80 p-4 text-mono shadow-sm"
                  >
                    <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">
                      {m.label}
                    </span>
                    <span className="mt-1 text-sm font-extrabold text-foreground sm:text-base">
                      {m.value}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Stack Tags */}
            <div className="flex flex-col gap-2.5">
              <span className="text-mono text-xs uppercase tracking-widest text-muted-foreground font-bold">
                TECHNOLOGY STACK & INTEGRATIONS:
              </span>
              <div className="flex flex-wrap gap-2">
                {activeProject.stack.map((s) => (
                  <span
                    key={s}
                    className="rounded-sm border border-border bg-surface px-3.5 py-1.5 text-mono text-xs text-foreground shadow-sm hover:border-signal/80 transition"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Structured Architectural Breakdown */}
            <div className="flex flex-col gap-4 pt-2">
              <div className="flex items-center justify-between border-b border-border/80 pb-3">
                <span className="text-mono text-xs uppercase tracking-widest text-foreground font-extrabold">
                  ARCHITECTURE & CASE STUDY BREAKDOWN
                </span>
                <div className="flex items-center gap-1 text-mono text-xs">
                  <button
                    onClick={() => setActiveTab("all")}
                    className={`px-3 py-1 rounded transition ${
                      activeTab === "all"
                        ? "bg-surface-2 text-foreground font-bold border border-border"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Full View
                  </button>
                  <button
                    onClick={() => setActiveTab("problem")}
                    className={`px-3 py-1 rounded transition ${
                      activeTab === "problem"
                        ? "bg-surface-2 text-pulse font-bold border border-pulse/40"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Problem
                  </button>
                  <button
                    onClick={() => setActiveTab("solution")}
                    className={`px-3 py-1 rounded transition ${
                      activeTab === "solution"
                        ? "bg-surface-2 text-signal font-bold border border-signal/40"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Solution
                  </button>
                  <button
                    onClick={() => setActiveTab("outcome")}
                    className={`px-3 py-1 rounded transition ${
                      activeTab === "outcome"
                        ? "bg-surface-2 text-[#27C93F] font-bold border border-[#27C93F]/40"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Outcome
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-5">
                {/* Problem Section */}
                {(activeTab === "all" || activeTab === "problem") && (
                  <div className="rounded-sm border border-border/80 bg-surface/40 p-6 md:p-7 shadow-sm">
                    <div className="flex items-center gap-2 text-mono text-xs uppercase tracking-widest text-pulse font-extrabold pb-3 border-b border-border/60">
                      <AlertTriangle className="h-4 w-4" />
                      <span>THE CHALLENGE & OPERATIONAL FRICTION</span>
                    </div>
                    <p className="mt-4 text-sm md:text-base leading-relaxed text-muted-foreground whitespace-pre-line">
                      {activeProject.problem}
                    </p>
                  </div>
                )}

                {/* Solution Section */}
                {(activeTab === "all" || activeTab === "solution") && (
                  <div className="rounded-sm border border-border/80 bg-surface/40 p-6 md:p-7 shadow-sm">
                    <div className="flex items-center gap-2 text-mono text-xs uppercase tracking-widest text-signal font-extrabold pb-3 border-b border-border/60">
                      <Lightbulb className="h-4 w-4" />
                      <span>ENGINEERED ARCHITECTURE & SYSTEM SOLUTION</span>
                    </div>
                    <div className="mt-4 text-sm md:text-base leading-relaxed text-muted-foreground whitespace-pre-line space-y-2">
                      {activeProject.solution}
                    </div>
                  </div>
                )}

                {/* Outcome Section */}
                {(activeTab === "all" || activeTab === "outcome") && (
                  <div className="rounded-sm border border-border/80 bg-surface/40 p-6 md:p-7 shadow-sm">
                    <div className="flex items-center gap-2 text-mono text-xs uppercase tracking-widest text-[#27C93F] font-extrabold pb-3 border-b border-border/60">
                      <CheckCircle2 className="h-4 w-4" />
                      <span>MEASURABLE OUTCOME & IMPACT</span>
                    </div>
                    <p className="mt-4 text-sm md:text-base leading-relaxed text-muted-foreground whitespace-pre-line">
                      {activeProject.outcome}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Full-Screen Lightbox Modal */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 p-4 backdrop-blur-md animate-fade-in"
          onClick={() => setLightboxOpen(false)}
        >
          <div
            className="relative max-h-[94vh] max-w-[96vw] overflow-hidden rounded-sm border border-border-strong bg-card p-3 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-border pb-2 text-mono text-xs text-muted-foreground">
              <span className="font-bold text-foreground">
                {activeProject.name} · Slide {activeSlide + 1} of {images.length}
              </span>
              <button
                onClick={() => setLightboxOpen(false)}
                className="rounded p-1 text-muted-foreground hover:bg-surface-2 hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex items-center justify-center p-2 min-h-[320px]">
              <img
                src={images[activeSlide]}
                alt={`${activeProject.name} full view`}
                className="max-h-[82vh] max-w-[92vw] object-contain"
              />
            </div>

            {isArray && images.length > 1 && (
              <div className="flex items-center justify-between border-t border-border pt-2 text-mono text-xs">
                <button
                  onClick={() =>
                    setActiveSlide((prev) => (prev === 0 ? images.length - 1 : prev - 1))
                  }
                  className="rounded border border-border bg-surface px-4 py-1.5 hover:border-signal"
                >
                  Previous
                </button>
                <span className="text-muted-foreground">
                  {activeSlide + 1} / {images.length}
                </span>
                <button
                  onClick={() =>
                    setActiveSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1))
                  }
                  className="rounded border border-border bg-surface px-4 py-1.5 hover:border-signal"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
