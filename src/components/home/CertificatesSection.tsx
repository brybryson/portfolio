import { useMemo, useState } from "react";
import { Award, ExternalLink, Filter } from "lucide-react";
import { CERTIFICATE_CATEGORIES, CERTIFICATES, CertificateCategory } from "@/data/certificates";
import { SectionLabel } from "@/components/common/SectionLabel";

export function CertificatesSection({ showFilter = true }: { showFilter?: boolean }) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const filtered = useMemo(() => {
    if (selectedCategory === "All") return CERTIFICATES;
    return CERTIFICATES.filter((c) => c.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <section id="certificates" className="py-16">
      <SectionLabel index="05" label="certifications & badges" hint="verified credentials" />

      {showFilter && (
        <div className="mt-6 flex flex-wrap items-center gap-1.5 text-mono text-xs">
          <Filter className="h-3.5 w-3.5 text-muted-foreground mr-1" />
          {CERTIFICATE_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
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
        {filtered.map((cert, idx) => (
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
    </section>
  );
}
