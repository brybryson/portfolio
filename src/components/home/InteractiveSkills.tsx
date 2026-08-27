import { useEffect, useState } from "react";
import { Terminal } from "lucide-react";
import { SectionLabel } from "@/components/common/SectionLabel";
import { SKILLS } from "@/data/skills";

export function InteractiveSkills() {
  const [typedText, setTypedText] = useState("");

  const accents = [
    "var(--signal)",
    "var(--flow)",
    "var(--pulse-c)",
    "var(--signal)",
    "var(--flow)",
  ];

  useEffect(() => {
    const text = "$ stack --inspect --env production --verified";
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        setTypedText(text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 20);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="skills" className="py-16">
      <SectionLabel index="02" label="technical stack" hint="core.ecosystems" />

      <div className="mt-6 flex flex-col gap-6">
        {/* Terminal Header Bar */}
        <div className="overflow-hidden rounded-sm border border-border-strong bg-surface/80 backdrop-blur shadow-sm">
          <div className="flex items-center justify-between border-b border-border bg-surface-2 px-4 py-2 text-mono text-xs uppercase tracking-wider text-muted-foreground">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="h-2.5 w-2.5 rounded-full bg-[#FF5F56]" />
                <div className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E]" />
                <div className="h-2.5 w-2.5 rounded-full bg-[#27C93F]" />
              </div>
              <div className="flex items-center gap-2">
                <Terminal className="h-3 w-3 text-signal" />
                <span>~/toolkit/stack.sh</span>
              </div>
            </div>
            <span className="text-[#27C93F] font-bold text-[11px]">● LIVE ECOSYSTEM</span>
          </div>

          <div className="p-3 text-mono text-xs text-foreground bg-background/50 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-signal font-semibold">bryant@dev:</span>
              <span>{typedText}</span>
              <span className="caret-blink">▍</span>
            </div>
            <span className="hidden sm:inline text-mono text-[10.5px] text-muted-foreground">
              40+ verified technologies
            </span>
          </div>
        </div>

        {/* Clean Grouped Matrix Layout */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {SKILLS.map((s, i) => (
            <div
              key={s.group}
              className="rounded-sm border border-border-strong bg-card p-5 transition hover:border-signal/70 hover:shadow-md"
            >
              <div
                className="flex items-center gap-2 text-mono text-xs font-bold uppercase tracking-wider"
                style={{ color: accents[i % accents.length] }}
              >
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ background: accents[i % accents.length] }}
                />
                {s.group}
              </div>

              <div className="mt-3 flex flex-wrap gap-1.5">
                {s.items.map((it) => (
                  <span
                    key={it}
                    className="rounded-sm border border-border bg-surface px-2.5 py-1 text-mono text-xs text-foreground transition-colors hover:border-signal hover:text-signal"
                  >
                    {it}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
