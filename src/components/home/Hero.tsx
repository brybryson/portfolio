import { useEffect, useMemo, useState } from "react";
import {
  ArrowUpRight,
  Command as CmdIcon,
  Mail,
  Terminal,
} from "lucide-react";
import bryantImg from "@/assets/bryant.jpg";
import togaImg from "@/assets/toga.jpg";

export function Hero({ onOpenPalette }: { onOpenPalette: () => void }) {
  return (
    <section id="hero" className="relative pt-6 pb-24 md:pt-8 md:pb-28">
      <HeroBackdrop />
      <SectionLabel index="00" label="identity" hint="hello, world" />

      <div className="mt-8 grid grid-cols-1 items-stretch gap-10 md:grid-cols-[minmax(0,1fr)_420px] md:gap-20 lg:grid-cols-[minmax(0,1fr)_480px] lg:gap-32">
        {/* LEFT — headline */}
        <div className="relative">
          <div className="inline-flex items-center gap-2 rounded-sm border border-border-strong bg-background/70 px-2.5 py-1 text-mono text-[10.5px] uppercase tracking-widest text-signal backdrop-blur">
            <span className="relative inline-flex h-1.5 w-1.5 items-center justify-center">
              <span className="absolute h-1.5 w-1.5 rounded-full bg-signal ring-pulse" />
              <span className="relative h-1.5 w-1.5 rounded-full bg-signal" />
            </span>
            Bryant Melliza · software developer
          </div>

          <h1 className="mt-5 text-[42px] font-semibold leading-[1.02] tracking-tight md:text-6xl lg:text-7xl">
            Engineering <span className="text-signal">scalable</span>
            <span className="block text-muted-foreground">
              digital{" "}
              <span className="relative inline-block text-foreground">
                solutions
                <svg
                  aria-hidden
                  viewBox="0 0 200 10"
                  preserveAspectRatio="none"
                  className="absolute inset-x-0 -bottom-1 h-2 w-full text-signal"
                >
                  <path
                    d="M2 6 Q 50 1 100 5 T 198 4"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              .
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-[15px] leading-6 text-muted-foreground md:text-base">
            Mobile and web development with{" "}
            <span className="text-foreground">React & React Native</span> — plus powerful
            AI-assisted automation via <span className="text-foreground">n8n</span> that turns messy
            workflows into seamless systems.
          </p>

          <TerminalReadout />

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenPalette}
              className="group inline-flex items-center gap-2 rounded-sm border border-foreground bg-foreground px-4 py-2 text-mono text-xs uppercase tracking-wider text-background transition hover:bg-signal hover:border-signal hover:text-white"
            >
              <CmdIcon className="h-3.5 w-3.5" /> open command palette
            </button>
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-sm border border-border-strong bg-background/70 px-4 py-2 text-mono text-xs uppercase tracking-wider text-foreground backdrop-blur transition hover:border-signal hover:text-signal"
            >
              view projects <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
            <a
              href="mailto:bryantiversonmelliza03@gmail.com"
              className="inline-flex items-center gap-2 rounded-sm border border-transparent px-4 py-2 text-mono text-xs uppercase tracking-wider text-muted-foreground transition hover:text-foreground"
            >
              <Mail className="h-3.5 w-3.5" /> get in touch
            </a>
          </div>
        </div>

        {/* RIGHT — photo card */}
        <PhotoCard />
      </div>

      <HeroStats />
    </section>
  );
}

function HeroBackdrop() {
  // Animated node-graph decoration — desaturated so it doesn't fight the content.
  return (
    <svg
      aria-hidden
      viewBox="0 0 800 500"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-0 -z-10 h-full w-full opacity-[0.55]"
    >
      <defs>
        <path id="hp1" d="M40 90 C 200 60, 320 200, 520 160 S 760 260, 780 320" />
        <path id="hp2" d="M60 260 C 180 320, 300 240, 460 300 S 700 380, 780 360" />
        <path id="hp3" d="M20 420 C 180 440, 300 360, 500 420 S 720 460, 780 440" />
      </defs>
      {/* base strokes */}
      <use href="#hp1" stroke="var(--flow)" strokeOpacity="0.35" fill="none" strokeWidth="1" />
      <use href="#hp2" stroke="var(--signal)" strokeOpacity="0.3" fill="none" strokeWidth="1" />
      <use href="#hp3" stroke="var(--pulse-c)" strokeOpacity="0.3" fill="none" strokeWidth="1" />
      {/* flowing dashes */}
      <use href="#hp1" stroke="var(--flow)" fill="none" strokeWidth="1.25" className="flow-dash" />
      <use
        href="#hp2"
        stroke="var(--signal)"
        fill="none"
        strokeWidth="1.25"
        className="flow-dash-slow"
      />
      <use
        href="#hp3"
        stroke="var(--pulse-c)"
        fill="none"
        strokeWidth="1.25"
        className="flow-dash"
        style={{ animationDelay: "-2s" }}
      />
      {/* nodes */}
      {[
        [40, 90, "var(--flow)"],
        [520, 160, "var(--flow)"],
        [780, 320, "var(--flow)"],
        [60, 260, "var(--signal)"],
        [460, 300, "var(--signal)"],
        [780, 360, "var(--signal)"],
        [20, 420, "var(--pulse-c)"],
        [500, 420, "var(--pulse-c)"],
        [780, 440, "var(--pulse-c)"],
      ].map(([x, y, c], i) => (
        <g key={i}>
          <circle cx={x as number} cy={y as number} r="6" fill="var(--background)" />
          <circle cx={x as number} cy={y as number} r="3.5" fill={c as string} />
        </g>
      ))}
      {/* traveling packets */}
      <circle
        r="3"
        fill="var(--flow)"
        className="packet"
        style={{
          offsetPath:
            "path('M40 90 C 200 60, 320 200, 520 160 S 760 260, 780 320')" as unknown as string,
        }}
      />
      <circle
        r="3"
        fill="var(--signal)"
        className="packet"
        style={{
          offsetPath:
            "path('M60 260 C 180 320, 300 240, 460 300 S 700 380, 780 360')" as unknown as string,
        }}
      />
      <circle
        r="3"
        fill="var(--pulse-c)"
        className="packet"
        style={{
          offsetPath:
            "path('M20 420 C 180 440, 300 360, 500 420 S 720 460, 780 440')" as unknown as string,
        }}
      />
    </svg>
  );
}

function TiledImage({
  topSrc,
  bottomSrc,
  alt,
  className,
}: {
  topSrc: string;
  bottomSrc: string;
  alt: string;
  className?: string;
}) {
  const [isRevealed, setIsRevealed] = useState(false);

  return (
    <div
      onClick={() => setIsRevealed((prev) => !prev)}
      className={`relative overflow-hidden group cursor-pointer select-none ${className || ""}`}
    >
      <img
        src={bottomSrc}
        alt={alt}
        className="absolute inset-0 h-full w-full object-cover object-[center_30%]"
      />
      <img
        src={topSrc}
        alt={alt}
        className={`absolute inset-0 h-full w-full object-cover object-[40%_25%] transition-all duration-500 ease-in-out group-hover:opacity-0 group-hover:blur-sm ${
          isRevealed ? "opacity-0 blur-sm" : ""
        }`}
      />
    </div>
  );
}

function PhotoCard() {
  return (
    <div className="h-full w-full">
      <div className="relative mx-auto mt-2 w-full max-w-[420px] md:ml-auto md:mr-0 md:max-w-[480px] md:mt-6 sticky top-24">
        {/* corner brackets */}
        <span className="absolute -left-2 -top-2 h-4 w-4 border-l border-t border-signal pointer-events-none" />
        <span className="absolute -right-2 -top-2 h-4 w-4 border-r border-t border-signal pointer-events-none" />
        <span className="absolute -bottom-2 -left-2 h-4 w-4 border-b border-l border-signal pointer-events-none" />
        <span className="absolute -bottom-2 -right-2 h-4 w-4 border-b border-r border-signal pointer-events-none" />

        <div className="float-y overflow-hidden rounded-sm border border-border-strong bg-card shadow-[0_1px_0_var(--border-strong),_0_20px_40px_-24px_rgba(0,0,0,0.25)]">
          <div className="flex items-center justify-between border-b border-border bg-surface-2 px-3 py-1.5 text-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-signal pulse-dot" />
              bryant.jpg
            </span>
            <span className="text-[9.5px]">tap / hover to flip</span>
          </div>
          <div className="relative aspect-square w-full overflow-hidden bg-graph">
            <TiledImage
              topSrc={togaImg}
              bottomSrc={bryantImg}
              alt="Bryant Melliza"
              className="h-full w-full"
            />
            {/* subtle grid overlay */}
            <div className="pointer-events-none absolute inset-0 mix-blend-multiply opacity-40 bg-dotgrid" />
            {/* corner readout tag */}
            <div className="absolute bottom-2 left-2 rounded-sm border border-border-strong bg-background/85 px-2 py-1 text-mono text-[10px] uppercase tracking-widest text-foreground backdrop-blur pointer-events-none">
              <span className="text-signal">●</span> bryant iverson melliza
            </div>
          </div>
          <div className="grid grid-cols-3 divide-x divide-border border-t border-border text-mono text-[10.5px]">
            <StatCell label="role" value="software dev" />
            <StatCell label="focus" value="fs & automation" />
            <StatCell label="status" value="available" />
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCell({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col items-start gap-0.5 px-3 py-2">
      <span className="text-[9.5px] uppercase tracking-widest text-muted-foreground">{label}</span>
      <span className="text-foreground font-medium">{value}</span>
    </div>
  );
}

function HeroStats() {
  const stats = [
    { k: "Dev Experience", v: "2+ Years", c: "var(--signal)" },
    { k: "Applications Shipped", v: "20+", c: "var(--flow)" },
    { k: "Software Internships", v: "03 Roles", c: "var(--pulse-c)" },
    { k: "Certifications & Awards", v: "15 Badges", c: "var(--signal)" },
  ];
  return (
    <div className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-border-strong bg-border md:grid-cols-4 shadow-sm">
      {stats.map((s) => (
        <div key={s.k} className="flex flex-col gap-1 bg-card px-4 py-4">
          <div className="flex items-center gap-2 text-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: s.c }} />
            {s.k}
          </div>
          <div className="text-mono text-[15px] font-bold text-foreground">{s.v}</div>
        </div>
      ))}
    </div>
  );
}

function TerminalReadout() {
  const lines = useMemo(
    () => [
      "$ status --dev bryant.melliza",
      "  → 20 projects shipped · 3 internships",
      "  → stack: react · react native · typescript",
      "  → automation: n8n · ai-assisted tooling",
      "  → uptime: available for work",
    ],
    []
  );
  const [shown, setShown] = useState<string[]>([]);
  const [current, setCurrent] = useState("");

  useEffect(() => {
    let cancelled = false;
    let i = 0;
    let j = 0;
    setShown([]);
    setCurrent("");
    const tick = () => {
      if (cancelled) return;
      if (i >= lines.length) return;
      const line = lines[i];
      if (j <= line.length) {
        setCurrent(line.slice(0, j));
        j += Math.max(1, Math.floor(line.length / 24));
        setTimeout(tick, 22);
      } else {
        setShown((s) => [...s, line]);
        setCurrent("");
        i += 1;
        j = 0;
        setTimeout(tick, 180);
      }
    };
    const start = setTimeout(tick, 250);
    return () => {
      cancelled = true;
      clearTimeout(start);
    };
  }, [lines]);

  return (
    <div className="mt-8 overflow-hidden rounded-sm border border-border-strong bg-surface/80 backdrop-blur">
      <div className="flex items-center justify-between border-b border-border bg-surface-2 px-3 py-2 text-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        <div className="flex items-center gap-4">
          <div className="flex gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-[#FF5F56]" />
            <div className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E]" />
            <div className="h-2.5 w-2.5 rounded-full bg-[#27C93F]" />
          </div>
          <div className="flex items-center gap-2">
            <Terminal className="h-3 w-3" />
            <span>~/portfolio · system readout</span>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-signal pulse-dot" />
          <span>live</span>
        </div>
      </div>
      <pre className="whitespace-pre-wrap px-4 py-3 text-mono text-[12.5px] leading-6 text-foreground">
        {shown.join("\n")}
        {shown.length > 0 && "\n"}
        {current}
        <span className="caret-blink">▍</span>
      </pre>
    </div>
  );
}

function SectionLabel({ index, label, hint }: { index: string; label: string; hint?: string }) {
  return (
    <div className="flex items-center gap-2 sm:gap-3 border-t border-border pt-8">
      <span className="text-mono text-[12px] uppercase tracking-widest text-muted-foreground shrink-0">
        [{index}]
      </span>
      <span className="text-mono text-[12px] uppercase tracking-widest text-foreground shrink-0 font-medium">
        {label}
      </span>
      {hint && (
        <span className="hidden sm:inline text-mono text-[12px] uppercase tracking-widest text-muted-foreground truncate">
          — {hint}
        </span>
      )}
      <span className="ml-auto text-mono text-[12px] uppercase tracking-widest text-muted-foreground shrink-0">
        <span className="inline-block h-1.5 w-1.5 -translate-y-0.5 rounded-full bg-pulse align-middle" />{" "}
        sys.ready
      </span>
    </div>
  );
}
