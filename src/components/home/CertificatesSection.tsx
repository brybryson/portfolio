import { useMemo, useState } from "react";
import { ChevronDown, ChevronUp, Filter } from "lucide-react";
import { CERTIFICATE_CATEGORIES, CERTIFICATES } from "@/data/certificates";
import { SectionLabel } from "@/components/common/SectionLabel";

export function CertificatesSection({ showFilter = true }: { showFilter?: boolean }) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [showAll, setShowAll] = useState(false);

  const filtered = useMemo(() => {
    if (selectedCategory === "All") return CERTIFICATES;
    return CERTIFICATES.filter((c) => c.category === selectedCategory);
  }, [selectedCategory]);

  const INITIAL_COUNT = 6;
  const displayed = showAll ? filtered : filtered.slice(0, INITIAL_COUNT);
  const remainingCount = filtered.length - INITIAL_COUNT;

  return (
    <section id="certificates" className="py-16">
      <SectionLabel index="05" label="certifications & badges" hint="verified credentials" />

      {showFilter && (
        <div className="mt-6 flex flex-wrap items-center gap-1.5 text-mono text-xs">
          <Filter className="h-3.5 w-3.5 text-muted-foreground mr-1" />
          {CERTIFICATE_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setShowAll(false);
              }}
              className={`rounded-sm border px-2.5 py-1 transition ${
                selectedCategory === cat
                  ? "border-signal bg-signal/15 text-signal font-semibold"
                  : "border-border bg-surface text-muted-foreground hover:border-border-strong hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {displayed.map((cert, idx) => (
          <div
            key={idx}
            className="group flex flex-col justify-between overflow-hidden rounded-sm border border-border-strong bg-card p-4 transition-all duration-300 hover:border-signal/80 shadow-sm"
          >
            <div className="flex flex-col gap-3">
              <div className="relative overflow-hidden rounded border border-border bg-graph flex items-center justify-center min-h-[160px] max-h-[190px] bg-background/50">
                <img
                  src={cert.image}
                  alt={cert.title}
                  loading="lazy"
                  className="h-full w-full object-contain p-2 transition duration-300 group-hover:scale-105"
                  onError={(e) => {
                    const el = e.currentTarget as HTMLImageElement;
                    el.style.display = "none";
                  }}
                />
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-mono text-[9.5px] uppercase tracking-wider text-signal">
                  {cert.category}
                </span>
                <h4 className="text-sm font-bold text-foreground leading-snug">{cert.title}</h4>
                <span className="text-mono text-[11px] text-muted-foreground">{cert.issuer}</span>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-border/60 pt-3 text-mono text-[10px] text-muted-foreground">
              <span>{cert.date}</span>
              <span className="text-[#27C93F] font-semibold">● VERIFIED</span>
            </div>
          </div>
        ))}
      </div>

      {filtered.length > INITIAL_COUNT && (
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="flex items-center gap-2 rounded-sm border border-border-strong bg-surface px-6 py-2.5 text-mono text-xs font-semibold text-foreground uppercase tracking-wider transition hover:border-signal hover:bg-surface-2 hover:text-signal shadow-sm"
          >
            {showAll ? (
              <>
                <ChevronUp className="h-4 w-4" />
                <span>Show Less</span>
              </>
            ) : (
              <>
                <ChevronDown className="h-4 w-4" />
                <span>Show More (+{remainingCount} Certificates)</span>
              </>
            )}
          </button>
        </div>
      )}
    </section>
  );
}
