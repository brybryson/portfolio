import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  FileText,
  Github,
  Link2,
  Maximize2,
  X,
} from "lucide-react";
import { CATEGORY_META, Project } from "@/data/projects";

export function CaseStudy({ project }: { project: Project }) {
  const meta = CATEGORY_META[project.category];
  const [activeSlide, setActiveSlide] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    setActiveSlide(0);
  }, [project.slug]);

  const isArray = Array.isArray(project.image);
  const images = isArray ? (project.image as string[]) : [project.image as string];

  return (
    <>
      <article
        key={project.slug}
        className="animate-fade-in flex min-h-[640px] flex-col overflow-hidden rounded-sm border border-border-strong bg-card shadow-sm"
        style={{ borderTopColor: meta.color, borderTopWidth: 2 }}
      >
        {/* macOS Window Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-border bg-surface-2 px-4 py-2.5 text-mono text-[10px] uppercase tracking-widest text-muted-foreground overflow-hidden">
          <div className="flex items-center gap-4 min-w-0">
            <div className="flex gap-1.5 shrink-0">
              <div className="h-2.5 w-2.5 rounded-full bg-[#FF5F56]" />
              <div className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E]" />
              <div className="h-2.5 w-2.5 rounded-full bg-[#27C93F]" />
            </div>
            <div className="flex items-center gap-2 min-w-0">
              <FileText className="h-3 w-3 shrink-0" />
              <span className="uppercase tracking-widest truncate">
                CASE-STUDY/{project.slug.toUpperCase()}.MD
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0 ml-3">
            <span className="flex items-center gap-1.5" style={{ color: meta.color }}>
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: meta.color }} />
              {meta.label}
            </span>
            <span>{project.date}</span>
          </div>
        </div>

        {/* Content Body */}
        <div
          className="flex flex-1 flex-col overflow-y-auto"
          style={{ scrollbarWidth: "thin", scrollbarColor: "var(--scrollbar-thumb) transparent" }}
        >
          {/* Full-Size Uncropped Media Canvas */}
          <div className="group relative w-full border-b border-border bg-graph flex items-center justify-center min-h-[300px] md:min-h-[420px] max-h-[520px] bg-background/60 p-4">
            <img
              src={images[activeSlide]}
              alt={`${project.name} preview ${activeSlide + 1}`}
              loading="lazy"
              className="h-auto max-h-[480px] w-full max-w-full object-contain cursor-zoom-in transition-transform duration-300"
              onClick={() => setLightboxOpen(true)}
              onError={(e) => {
                const el = e.currentTarget as HTMLImageElement;
                el.style.display = "none";
              }}
            />

            {/* Lightbox Trigger Button */}
            <button
              onClick={() => setLightboxOpen(true)}
              className="absolute top-3 right-3 flex items-center gap-1 rounded-sm border border-border bg-surface/90 px-2 py-1 text-mono text-[10px] text-muted-foreground opacity-0 backdrop-blur transition hover:text-foreground group-hover:opacity-100 shadow-sm"
              title="View full size lightbox"
            >
              <Maximize2 className="h-3 w-3" />
              <span>Full Size</span>
            </button>

            {/* Slide Navigation Arrows */}
            {isArray && images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveSlide((prev) => (prev === 0 ? images.length - 1 : prev - 1));
                  }}
                  className="absolute left-3 top-1/2 -translate-y-1/2 rounded-sm border border-border bg-surface/90 p-2 text-muted-foreground opacity-0 backdrop-blur-sm transition hover:text-foreground group-hover:opacity-100 shadow-md"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-sm border border-border bg-surface/90 p-2 text-muted-foreground opacity-0 backdrop-blur-sm transition hover:text-foreground group-hover:opacity-100 shadow-md"
                  aria-label="Next slide"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>

                {/* Bottom Thumbnail Strip / Dots */}
                <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full border border-border bg-background/85 px-3 py-1 backdrop-blur shadow-sm">
                  {images.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveSlide(idx);
                      }}
                      className={`h-1.5 rounded-full transition-all ${
                        idx === activeSlide
                          ? "w-5 bg-signal"
                          : "w-1.5 bg-border-strong hover:bg-muted-foreground"
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                  <span className="ml-1 text-mono text-[9px] text-muted-foreground">
                    {activeSlide + 1}/{images.length}
                  </span>
                </div>
              </>
            )}
          </div>

          {/* Details & Specs Area */}
          <div className="flex flex-col gap-6 p-6 md:p-8">
            {/* Title & Action Links */}
            <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
              <div>
                {project.series && (
                  <span
                    className="mb-2 inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-mono text-[10px] uppercase tracking-wider"
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
                <h3 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                  {project.name}
                </h3>
                {project.role && (
                  <div className="mt-2 flex items-center gap-2 text-mono text-[11px] text-muted-foreground">
                    <span className="rounded-sm border border-border px-1.5 py-0.5 uppercase tracking-wider text-[9.5px] text-foreground bg-surface-2">
                      Role
                    </span>
                    <span className="text-foreground">{project.role}</span>
                  </div>
                )}
                <p className="mt-2 text-sm text-muted-foreground md:text-base leading-relaxed">
                  {project.summary}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 shrink-0">
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex shrink-0 items-center gap-2 rounded-sm border border-border-strong bg-foreground px-5 py-2.5 text-mono text-[11px] uppercase tracking-wider text-background shadow-sm transition hover:border-signal hover:bg-signal hover:text-white"
                  >
                    <ArrowUpRight className="h-3.5 w-3.5" />
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
                    className="inline-flex shrink-0 items-center gap-2 rounded-sm border border-border-strong bg-surface px-5 py-2.5 text-mono text-[11px] uppercase tracking-wider text-foreground shadow-sm transition hover:bg-foreground hover:text-background"
                  >
                    <Github className="h-3.5 w-3.5" /> view on github
                  </a>
                )}
              </div>
            </div>

            {/* Metrics Grid */}
            {project.metrics && project.metrics.length > 0 && (
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {project.metrics.map((m, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col rounded-sm border border-border bg-surface-2/60 px-3 py-2 text-mono"
                  >
                    <span className="text-[9px] uppercase tracking-wider text-muted-foreground">
                      {m.label}
                    </span>
                    <span className="mt-0.5 text-xs font-semibold text-foreground">
                      {m.value}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Stack Tags */}
            <div className="flex flex-wrap gap-1.5">
              {project.stack.map((s) => (
                <span
                  key={s}
                  className="rounded-sm border border-border bg-surface px-2.5 py-1 text-mono text-[10.5px] text-foreground shadow-sm"
                >
                  {s}
                </span>
              ))}
            </div>

            <div className="h-px w-full bg-border" />

            {/* Problem / Solution / Outcome */}
            <dl className="grid grid-cols-1 gap-4 text-sm md:grid-cols-3 md:gap-6">
              <FieldBlock label="problem" body={project.problem} />
              <FieldBlock label="solution" body={project.solution} />
              <FieldBlock label="outcome" body={project.outcome} />
            </dl>
          </div>
        </div>
      </article>

      {/* Full-Screen Lightbox Modal for Uncropped High-Res Viewing */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 p-4 backdrop-blur-md animate-fade-in"
          onClick={() => setLightboxOpen(false)}
        >
          <div
            className="relative max-h-[92vh] max-w-[94vw] overflow-hidden rounded-sm border border-border-strong bg-card p-2 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-border px-3 py-2 text-mono text-xs text-muted-foreground">
              <span>
                {project.name} · Image {activeSlide + 1} of {images.length}
              </span>
              <button
                onClick={() => setLightboxOpen(false)}
                className="rounded p-1 text-muted-foreground hover:bg-surface-2 hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex items-center justify-center p-2 min-h-[300px]">
              <img
                src={images[activeSlide]}
                alt={`${project.name} full view`}
                className="max-h-[80vh] max-w-[90vw] object-contain"
              />
            </div>

            {isArray && images.length > 1 && (
              <div className="flex items-center justify-between border-t border-border px-3 py-2 text-mono text-xs">
                <button
                  onClick={() =>
                    setActiveSlide((prev) => (prev === 0 ? images.length - 1 : prev - 1))
                  }
                  className="rounded border border-border bg-surface px-3 py-1 hover:border-signal"
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
                  className="rounded border border-border bg-surface px-3 py-1 hover:border-signal"
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

function FieldBlock({ label, body }: { label: string; body: string }) {
  return (
    <div className="flex flex-col gap-2 rounded-sm border border-border/80 bg-surface/40 p-4">
      <dt className="text-mono text-[10.5px] uppercase tracking-widest text-signal font-semibold">
        {label}
      </dt>
      <dd className="text-xs leading-relaxed text-muted-foreground whitespace-pre-line">
        {body}
      </dd>
    </div>
  );
}
