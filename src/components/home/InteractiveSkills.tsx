import { useEffect, useState } from "react";
import { CheckCircle2, Terminal } from "lucide-react";
import { SectionLabel } from "@/components/common/SectionLabel";
import { SKILLS } from "@/data/skills";

export function InteractiveSkills() {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [typedText, setTypedText] = useState("");

  const currentCategory = SKILLS[activeCategoryIndex] ?? SKILLS[0];

  // Typing effect on category switch
  useEffect(() => {
    let i = 0;
    const command = `$ stack --query "${currentCategory.group.toLowerCase()}" --status verified`;
    setTypedText("");
    const interval = setInterval(() => {
      if (i < command.length) {
        setTypedText(command.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 18);
    return () => clearInterval(interval);
  }, [activeCategoryIndex, currentCategory.group]);

  return (
    <section id="skills" className="py-20">
      <SectionLabel index="02" label="technical toolkit" hint="verified tools & ecosystems" />

      <div className="mt-8 flex flex-col gap-6">
        <div className="flex flex-col gap-2 max-w-3xl">
          <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Modern Technical Stack & Autonomous Tooling
          </h2>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
            Battle-tested technologies and AI orchestration frameworks deployed across 20+ live applications and enterprise workflows.
          </p>
        </div>

        {/* Live Terminal Command Bar */}
        <div className="overflow-hidden rounded-sm border border-border-strong bg-surface/80 backdrop-blur shadow-md">
          <div className="flex items-center justify-between border-b border-border bg-surface-2 px-4 py-2.5 text-mono text-xs uppercase tracking-wider text-muted-foreground">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="h-2.5 w-2.5 rounded-full bg-[#FF5F56]" />
                <div className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E]" />
                <div className="h-2.5 w-2.5 rounded-full bg-[#27C93F]" />
              </div>
              <div className="flex items-center gap-2">
                <Terminal className="h-3.5 w-3.5 text-signal" />
                <span className="font-semibold text-foreground">~/toolkit/inspector.sh</span>
              </div>
            </div>
            <span className="text-[#27C93F] font-bold">● SYSTEM READY</span>
          </div>

          <div className="p-4 text-mono text-xs md:text-sm text-foreground flex flex-col gap-1 bg-background/50">
            <div className="flex items-center gap-2">
              <span className="text-signal font-bold">bryant@portfolio:</span>
              <span className="text-foreground">{typedText}</span>
              <span className="caret-blink">▍</span>
            </div>
            <div className="text-[11px] text-muted-foreground mt-1">
              → Loaded {currentCategory.items.length} verified technologies in [
              <span className="text-signal">{currentCategory.group}</span>]. Latency: 0ms. Production Ready.
            </div>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-2 text-mono text-xs">
          {SKILLS.map((cat, idx) => {
            const isSelected = idx === activeCategoryIndex;
            return (
              <button
                key={cat.group}
                onClick={() => setActiveCategoryIndex(idx)}
                className={`flex items-center gap-2 rounded-sm border px-4 py-2 transition shadow-sm ${
                  isSelected
                    ? "border-signal bg-signal/15 text-signal font-bold shadow-md"
                    : "border-border bg-surface text-muted-foreground hover:border-border-strong hover:text-foreground"
                }`}
              >
                <span>[{idx + 1}]</span>
                <span>{cat.group}</span>
              </button>
            );
          })}
        </div>

        {/* Animated Skill Cards Grid */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {currentCategory.items.map((skillName) => {
            const isHovered = hoveredSkill === skillName;
            return (
              <div
                key={skillName}
                onMouseEnter={() => setHoveredSkill(skillName)}
                onMouseLeave={() => setHoveredSkill(null)}
                className={`group flex flex-col justify-between rounded-sm border p-3.5 transition-all duration-200 shadow-sm ${
                  isHovered
                    ? "border-signal bg-card text-foreground shadow-lg scale-105"
                    : "border-border-strong bg-card/70 text-foreground hover:border-border hover:bg-card"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-7 w-7 items-center justify-center rounded border border-border bg-surface-2 text-signal font-bold text-xs">
                    {skillName.slice(0, 2).toUpperCase()}
                  </span>
                  <span className="h-1.5 w-1.5 rounded-full bg-signal ring-pulse" />
                </div>

                <div className="mt-3">
                  <h4 className="font-bold text-xs sm:text-sm text-foreground group-hover:text-signal transition truncate">
                    {skillName}
                  </h4>
                </div>

                <div className="mt-2 border-t border-border/60 pt-2 text-mono text-[9px] text-muted-foreground flex items-center justify-between">
                  <span>PRODUCTION</span>
                  <CheckCircle2 className="h-3 w-3 text-[#27C93F]" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
