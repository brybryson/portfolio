import { ArrowUpRight, GitBranch } from "lucide-react";
import { EXPERIENCE } from "@/data/experience";
import { SectionLabel } from "@/components/common/SectionLabel";

export function ExperienceLog() {
  return (
    <section id="experience" className="py-16">
      <SectionLabel index="03" label="career experience" hint="git log --career" />

      <div className="mt-8 flex flex-col gap-4">
        {EXPERIENCE.map((e) => (
          <div
            key={e.hash}
            className="group relative flex flex-col justify-between gap-4 rounded-sm border border-border-strong bg-card p-6 text-mono transition hover:border-signal/80 sm:flex-row sm:items-start shadow-sm"
          >
            <div className="flex items-start gap-4">
              <img
                src={e.logo}
                alt={e.company}
                className="h-10 w-10 shrink-0 rounded border border-border bg-surface object-contain p-1"
                onError={(e) => {
                  const el = e.currentTarget as HTMLImageElement;
                  el.style.display = "none";
                }}
              />
              <div className="flex flex-col gap-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-bold text-foreground">{e.role}</span>
                  <span className="text-border-strong font-normal">@</span>
                  {e.companyUrl ? (
                    <a
                      href={e.companyUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-sm font-semibold text-signal hover:underline"
                    >
                      {e.company}
                      <ArrowUpRight className="h-3 w-3" />
                    </a>
                  ) : (
                    <span className="text-sm font-semibold text-signal">{e.company}</span>
                  )}
                </div>
                <p className="mt-1 text-xs font-sans leading-relaxed text-muted-foreground">
                  {e.body}
                </p>
              </div>
            </div>

            <div className="flex shrink-0 items-center justify-between border-t border-border/60 pt-3 sm:flex-col sm:items-end sm:border-t-0 sm:pt-0">
              <span className="text-xs font-medium text-foreground">{e.period}</span>
              <span className="inline-flex items-center gap-1 text-[10px] text-muted-foreground">
                <GitBranch className="h-3 w-3 text-flow" />
                <span>commit {e.hash}</span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
