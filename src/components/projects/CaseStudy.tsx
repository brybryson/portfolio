import { useEffect, useState } from "react";
import {
  AlertTriangle,
  ArrowUpRight,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  FileText,
  Github,
  Layers,
  Lightbulb,
  Link2,
  Maximize2,
  Target,
  X,
} from "lucide-react";
import { CATEGORY_META, Project } from "@/data/projects";

export function CaseStudy({ project }: { project: Project }) {
  const meta = CATEGORY_META[project.category];
  const [activeSlide, setActiveSlide] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"all" | "problem" | "solution" | "outcome">("all");

  useEffect(() => {
    setActiveSlide(0);
  }, [project.slug]);

  const isArray = Array.isArray(project.image);
  const images = isArray ? (project.image as string[]) : [project.image as string];

  return (
    <>
      <article
        key={project.slug}
        className="animate-fade-in flex flex-col overflow-hidden rounded-sm border border-border-strong bg-card/90 backdrop-blur shadow-md"
        style={{ borderTopColor: meta.color, borderTopWidth: 2 }}
      >
        {/* macOS Style Window Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-border bg-surface-2 px-4 py-2.5 text-mono text-xs uppercase tracking-wider text-muted-foreground overflow-hidden">
          <div className="flex items-center gap-4 min-w-0">
            <div className="flex gap-1.5 shrink-0">
              <div className="h-2.5 w-2.5 rounded-full bg-[#FF5F56]" />
              <div className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E]" />
              <div className="h-2.5 w-2.5 rounded-full bg-[#27C93F]" />
            </div>
            <div className="flex items-center gap-2 min-w-0">
              <FileText className="h-3.5 w-3.5 shrink-0 text-signal" />
              <span className="font-medium text-foreground truncate">
                CASE-STUDY/{project.slug.toUpperCase()}.MD
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0 ml-3">
            <span className="flex items-center gap-1.5" style={{ color: meta.color }}>
              <span className="h-2 w-2 rounded-full" style={{ background: meta.color }} />
              {meta.label}
            </span>
            <span className="text-muted-foreground">{project.date}</span>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex flex-col">
          {/* Full-Size Uncropped Image Gallery */}
          <div className="group relative w-full border-b border-border bg-graph flex items-center justify-center min-h-[340px] md:min-h-[460px] max-h-[580px] bg-background/60 p-4 md:p-6">
            <img
              src={images[activeSlide]}
              alt={`${project.name} preview slide ${activeSlide + 1}`}
              loading="lazy"
              className="h-auto max-h-[520px] w-full max-w-full object-contain cursor-zoom-in transition-transform duration-300"
              onClick={() => setLightboxOpen(true)}
              onError={(e) => {
                const el = e.currentTarget as HTMLImageElement;
                el.style.display = "none";
              }}
            />

            {/* Lightbox Trigger */}
            <button
              onClick={() => setLightboxOpen(true)}
              className="absolute top-4 right-4 flex items-center gap-1.5 rounded-sm border border-border-strong bg-background/90 px-2.5 py-1 text-mono text-[11px] text-foreground opacity-0 backdrop-blur transition hover:border-signal hover:text-signal group-hover:opacity-100 shadow-md"
              title="Expand to Full-Screen Lightbox"
            >
              <Maximize2 className="h-3.5 w-3.5" />
              <span>Full Size</span>
            </button>

            {/* Slide Arrows */}
            {isArray && images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveSlide((prev) => (prev === 0 ? images.length - 1 : prev - 1));
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 rounded-sm border border-border bg-surface/90 p-2.5 text-foreground opacity-0 backdrop-blur transition hover:border-signal hover:bg-surface-2 group-hover:opacity-100 shadow-md"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 rounded-sm border border-border bg-surface/90 p-2.5 text-foreground opacity-0 backdrop-blur transition hover:border-signal hover:bg-surface-2 group-hover:opacity-100 shadow-md"
                  aria-label="Next slide"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>

                {/* Bottom Slide Tracker */}
                <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full border border-border bg-background/90 px-3 py-1 backdrop-blur shadow-md">
                  {images.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveSlide(idx);
                      }}
                      className={`h-2 rounded-full transition-all ${
                        idx === activeSlide
                          ? "w-6 bg-signal"
                          : "w-2 bg-border-strong hover:bg-muted-foreground"
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                  <span className="ml-1 text-mono text-[10px] text-muted-foreground font-medium">
                    {activeSlide + 1} of {images.length}
                  </span>
                </div>
              </>
            )}
          </div>

          {/* Deep Breakdown & Details */}
          <div className="flex flex-col gap-8 p-6 md:p-10">
            {/* Header: Title, Role, Summary & CTAs */}
            <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center border-b border-border/80 pb-6">
              <div className="max-w-3xl">
                {project.series && (
                  <span
                    className="mb-2.5 inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-mono text-[10.5px] uppercase tracking-wider"
                    style={{
                      borderColor: `${meta.color}40`,
                      background: `${meta.color}10`,
                      color: meta.color,
                    }}
                  >
                    <Link2 className="h-3 w-3" />
                    {project.series.name} — Part {project.series.part} of {project.series.total}
                  </span>
                )}
                <h3 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl lg:text-4xl leading-tight">
                  {project.name}
                </h3>

                {project.role && (
                  <div className="mt-2.5 flex items-center gap-2 text-mono text-xs text-muted-foreground">
                    <span className="rounded-sm border border-border px-2 py-0.5 uppercase text-[10px] text-foreground bg-surface-2 font-semibold">
                      Role
                    </span>
                    <span className="text-foreground font-medium">{project.role}</span>
                  </div>
                )}

                <p className="mt-3 text-base leading-relaxed text-muted-foreground md:text-lg">
                  {project.summary}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 shrink-0">
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex shrink-0 items-center gap-2 rounded-sm border border-border-strong bg-foreground px-5 py-3 text-mono text-xs uppercase tracking-wider text-background shadow-md transition hover:border-signal hover:bg-signal hover:text-white font-medium"
                  >
                    <ArrowUpRight className="h-4 w-4" />
                    {project.demoUrl.includes("drive.google.com") ||
                    project.demoUrl.includes("youtube.com")
                      ? "watch video walkthrough"
                      : "view live project"}
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex shrink-0 items-center gap-2 rounded-sm border border-border-strong bg-surface px-5 py-3 text-mono text-xs uppercase tracking-wider text-foreground shadow-sm transition hover:bg-foreground hover:text-background font-medium"
                  >
                    <Github className="h-4 w-4" /> view on github
                  </a>
                )}
              </div>
            </div>

            {/* Metrics Telemetry Row */}
            {project.metrics && project.metrics.length > 0 && (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {project.metrics.map((m, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col rounded-sm border border-border bg-surface-2/70 p-3.5 text-mono shadow-sm"
                  >
                    <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">
                      {m.label}
                    </span>
                    <span className="mt-1 text-sm font-bold text-foreground sm:text-base">
                      {m.value}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Tech Stack Chips */}
            <div className="flex flex-col gap-2">
              <span className="text-mono text-[11px] uppercase tracking-widest text-muted-foreground font-semibold">
                TECHNOLOGY STACK & INTEGRATIONS:
              </span>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((s) => (
                  <span
                    key={s}
                    className="rounded-sm border border-border bg-surface px-3 py-1.5 text-mono text-xs text-foreground shadow-sm hover:border-signal/60 transition"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Revamped High-Readability Problem → Solution → Outcome Breakdown */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between border-b border-border/80 pb-2">
                <span className="text-mono text-xs uppercase tracking-widest text-foreground font-bold">
                  ARCHITECTURE & CASE STUDY BREAKDOWN
                </span>
                <div className="flex items-center gap-1 text-mono text-[11px]">
                  <button
                    onClick={() => setActiveTab("all")}
                    className={`px-2 py-1 rounded transition ${
                      activeTab === "all"
                        ? "bg-surface-2 text-foreground font-semibold"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Full View
                  </button>
                  <button
                    onClick={() => setActiveTab("problem")}
                    className={`px-2 py-1 rounded transition ${
                      activeTab === "problem"
                        ? "bg-surface-2 text-pulse font-semibold"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Problem
                  </button>
                  <button
                    onClick={() => setActiveTab("solution")}
                    className={`px-2 py-1 rounded transition ${
                      activeTab === "solution"
                        ? "bg-surface-2 text-signal font-semibold"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Solution
                  </button>
                  <button
                    onClick={() => setActiveTab("outcome")}
                    className={`px-2 py-1 rounded transition ${
                      activeTab === "outcome"
                        ? "bg-surface-2 text-[#27C93F] font-semibold"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Outcome
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                {/* Problem Section */}
                {(activeTab === "all" || activeTab === "problem") && (
                  <div className="rounded-sm border border-border/80 bg-surface/40 p-5 md:p-6 shadow-sm">
                    <div className="flex items-center gap-2 text-mono text-xs uppercase tracking-widest text-pulse font-bold pb-3 border-b border-border/60">
                      <AlertTriangle className="h-4 w-4" />
                      <span>THE CHALLENGE & OPERATIONAL FRICTION</span>
                    </div>
                    <p className="mt-3.5 text-sm md:text-[15px] leading-relaxed text-muted-foreground whitespace-pre-line">
                      {project.problem}
                    </p>
                  </div>
                )}

                {/* Solution Section */}
                {(activeTab === "all" || activeTab === "solution") && (
                  <div className="rounded-sm border border-border/80 bg-surface/40 p-5 md:p-6 shadow-sm">
                    <div className="flex items-center gap-2 text-mono text-xs uppercase tracking-widest text-signal font-bold pb-3 border-b border-border/60">
                      <Lightbulb className="h-4 w-4" />
                      <span>ENGINEERED ARCHITECTURE & SYSTEM SOLUTION</span>
                    </div>
                    <div className="mt-3.5 text-sm md:text-[15px] leading-relaxed text-muted-foreground whitespace-pre-line space-y-2">
                      {project.solution}
                    </div>
                  </div>
                )}

                {/* Outcome Section */}
                {(activeTab === "all" || activeTab === "outcome") && (
                  <div className="rounded-sm border border-border/80 bg-surface/40 p-5 md:p-6 shadow-sm">
                    <div className="flex items-center gap-2 text-mono text-xs uppercase tracking-widest text-[#27C93F] font-bold pb-3 border-b border-border/60">
                      <CheckCircle2 className="h-4 w-4" />
                      <span>MEASURABLE OUTCOME & IMPACT</span>
                    </div>
                    <p className="mt-3.5 text-sm md:text-[15px] leading-relaxed text-muted-foreground whitespace-pre-line">
                      {project.outcome}
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
              <span className="font-semibold text-foreground">
                {project.name} · Slide {activeSlide + 1} of {images.length}
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
                alt={`${project.name} full view`}
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
    </>
  );
}
