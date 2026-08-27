import { SKILLS } from "@/data/skills";
import { SectionLabel } from "@/components/common/SectionLabel";
import { Cpu } from "lucide-react";

export function SkillsSection() {
  return (
    <section id="skills" className="py-16">
      <SectionLabel index="06" label="technical toolkit" hint="languages · frameworks · tools" />

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SKILLS.map((grp) => (
          <div
            key={grp.group}
            className="flex flex-col rounded-sm border border-border-strong bg-card p-5 shadow-sm"
          >
            <div className="flex items-center gap-2 border-b border-border/80 pb-3 text-mono text-xs font-semibold text-signal uppercase tracking-wider">
              <Cpu className="h-3.5 w-3.5" />
              <span>{grp.group}</span>
            </div>

            <div className="mt-4 flex flex-wrap gap-1.5">
              {grp.items.map((item) => (
                <span
                  key={item}
                  className="rounded-sm border border-border bg-surface px-2.5 py-1 text-mono text-[11px] text-foreground transition hover:border-signal/70 hover:text-signal"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
