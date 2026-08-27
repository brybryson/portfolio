import { useMemo, useState } from "react";
import { ChevronDown, ChevronUp, Filter, Sparkles } from "lucide-react";
import { CERTIFICATE_CATEGORIES, CERTIFICATES } from "@/data/certificates";
import { SectionLabel } from "@/components/common/SectionLabel";

export function CertificatesSection({ showFilter = true }: { showFilter?: boolean }) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  
  const INITIAL_COUNT = 6;
  const STEP_COUNT = 3;
  const [visibleCount, setVisibleCount] = useState<number>(INITIAL_COUNT);

  const filtered = useMemo(() => {
    if (selectedCategory === "All") return CERTIFICATES;
    return CERTIFICATES.filter((c) => c.category === selectedCategory);
  }, [selectedCategory]);

  const displayed = filtered.slice(0, visibleCount);
  const isAllShown = visibleCount >= filtered.length;
  const remainingCount = Math.max(0, filtered.length - visibleCount);

  const handleShowMore = () => {
    setVisibleCount((prev) => Math.min(prev + STEP_COUNT, filtered.length));
  };

  const handleShowLess = () => {
    setVisibleCount(INITIAL_COUNT);
    const el = document.getElementById("certificates");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section id="certificates" className="py-12 sm:py-16">
      <SectionLabel index="05" label="certifications & badges" hint="verified credentials" />

      {/* Category Filter Pills */}
      {showFilter && (
        <div className="mt-6 flex flex-wrap items-center gap-2 text-mono text-xs">
          <Filter className="h-3.5 w-3.5 text-muted-foreground mr-1 shrink-0" />
          {CERTIFICATE_CATEGORIES.map((cat) => {
            const count =
              cat === "All"
                ? CERTIFICATES.length
                : CERTIFICATES.filter((c) => c.category === cat).length;
            const isSelected = selectedCategory === cat;

            return (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setVisibleCount(INITIAL_COUNT);
                }}
                className={`flex items-center gap-1.5 rounded-sm border px-3 py-1.5 transition shadow-sm ${
                  isSelected
                    ? "border-signal bg-signal/15 text-signal font-semibold"
                    : "border-border bg-surface text-muted-foreground hover:border-border-strong hover:text-foreground"
                }`}
              >
                <span>{cat}</span>
                <span
                  className={`rounded-full px-1.5 py-0.2 text-[10px] font-mono ${
                    isSelected ? "bg-signal text-background font-bold" : "bg-surface-2 text-muted-foreground"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      )}

      {/* Responsive Certificates Grid */}
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {displayed.map((cert, idx) => (
          <article
            key={`${cert.title}-${idx}`}
            className="group flex flex-col justify-between overflow-hidden rounded-sm border border-border-strong bg-card p-5 transition-all duration-300 hover:border-signal/80 hover:shadow-xl animate-in fade-in duration-300"
          >
            <div className="flex flex-col gap-4">
              {/* Media Container */}
              <div className="relative overflow-hidden rounded border border-border bg-surface-2 flex items-center justify-center min-h-[170px] max-h-[210px] p-3">
                <img
                  src={cert.image}
                  alt={cert.title}
                  loading="lazy"
                  className="h-auto max-h-[180px] w-full object-contain transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    const el = e.currentTarget as HTMLImageElement;
                    el.style.display = "none";
                  }}
                />
              </div>

              {/* Title & Issuer Details */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-mono text-[10px] uppercase font-bold tracking-wider text-signal">
                    {cert.category}
                  </span>
                  <span className="text-mono text-[10.5px] text-muted-foreground">{cert.date}</span>
                </div>
                <h3 className="text-sm sm:text-base font-bold text-foreground leading-snug group-hover:text-signal transition">
                  {cert.title}
                </h3>
                <span className="text-mono text-xs text-muted-foreground font-medium">
                  {cert.issuer}
                </span>
              </div>
            </div>

            {/* Verified Footer */}
            <div className="mt-5 flex items-center justify-between border-t border-border/60 pt-3 text-mono text-[10.5px] text-muted-foreground">
              <span>CREDENTIAL ID // VERIFIED</span>
              <span className="inline-flex items-center gap-1 text-[#27C93F] font-bold">
                <span className="h-1.5 w-1.5 rounded-full bg-[#27C93F] animate-pulse" />
                <span>ACTIVE</span>
              </span>
            </div>
          </article>
        ))}
      </div>

      {/* Incremental Pagination Button */}
      {filtered.length > INITIAL_COUNT && (
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
          {isAllShown ? (
            <button
              onClick={handleShowLess}
              className="flex items-center gap-2 rounded-sm border border-border-strong bg-surface px-7 py-3 text-mono text-xs font-bold text-foreground uppercase tracking-wider transition hover:border-signal hover:bg-surface-2 hover:text-signal shadow-sm"
            >
              <ChevronUp className="h-4 w-4 text-signal" />
              <span>Show Less</span>
            </button>
          ) : (
            <button
              onClick={handleShowMore}
              className="flex items-center gap-2 rounded-sm border border-signal/60 bg-signal/15 px-7 py-3 text-mono text-xs font-bold text-signal uppercase tracking-wider transition hover:bg-signal hover:text-background shadow-md"
            >
              <ChevronDown className="h-4 w-4" />
              <span>Show More</span>
            </button>
          )}
        </div>
      )}
    </section>
  );
}
