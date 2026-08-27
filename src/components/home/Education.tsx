import { Award, GraduationCap } from "lucide-react";
import { EDUCATION } from "@/data/experience";
import { SectionLabel } from "@/components/common/SectionLabel";

export function Education() {
  return (
    <section id="education" className="py-16">
      <SectionLabel index="04" label="academic credentials" hint="degrees & honors" />

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {EDUCATION.map((edu, idx) => (
          <div
            key={idx}
            className="flex flex-col justify-between rounded-sm border border-border-strong bg-card p-6 shadow-sm"
          >
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-4">
                <img
                  src={edu.logo}
                  alt={edu.school}
                  className="h-12 w-12 shrink-0 rounded border border-border bg-surface object-contain p-1"
                  onError={(e) => {
                    const el = e.currentTarget as HTMLImageElement;
                    el.style.display = "none";
                  }}
                />
                <div className="flex flex-col">
                  <span className="text-mono text-[10px] uppercase text-signal font-semibold">
                    {edu.detail} · {edu.period}
                  </span>
                  <h3 className="text-base font-bold text-foreground">{edu.school}</h3>
                  <p className="text-xs text-muted-foreground">{edu.degree}</p>
                </div>
              </div>

              <div className="border-t border-border/80 pt-4">
                <span className="text-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                  HONORS & RECOGNITIONS:
                </span>
                <ul className="mt-2 flex flex-col gap-1.5 text-mono text-xs">
                  {edu.honors.map((h, i) => (
                    <li key={i} className="flex items-start gap-2 text-muted-foreground">
                      <Award className="h-3.5 w-3.5 shrink-0 text-signal mt-0.5" />
                      <span className="text-foreground">{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
