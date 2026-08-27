import { useEffect, useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowUpRight,
  Bot,
  Boxes,
  Briefcase,
  Command as CmdIcon,
  Download,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Sparkles,
  Terminal,
} from "lucide-react";
import bryantImg from "@/assets/bryant.jpg";
import togaImg from "@/assets/toga.jpg";

export function Hero({ onOpenPalette }: { onOpenPalette: () => void }) {
  return (
    <section className="relative pt-6 pb-16 md:pt-10 md:pb-24">
      <HeroBackdrop />

      <div className="relative z-10 grid grid-cols-1 items-start gap-10 lg:grid-cols-[1.3fr_1fr] lg:gap-12">
        {/* Left Column: Mission, Title, Bio & Terminal */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-wrap items-center gap-2 text-mono text-xs">
            <span className="inline-flex items-center gap-1.5 rounded-sm border border-signal/40 bg-signal/10 px-2.5 py-1 text-signal">
              <span className="h-1.5 w-1.5 rounded-full bg-signal ring-pulse" />
              FULL-STACK DEVELOPER & AI SYSTEMS ARCHITECT
            </span>
            <span className="rounded-sm border border-border bg-surface px-2.5 py-1 text-muted-foreground">
              CALOOCAN CITY, PH
            </span>
          </div>

          <div className="flex flex-col gap-3">
            <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Engineering <span className="text-signal">scalable web systems</span> & autonomous{" "}
              <span className="text-flow">AI pipelines</span>.
            </h1>
            <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
              Hi, I'm <strong className="text-foreground font-semibold">Bryant Melliza</strong>.
              I build enterprise-grade web applications, fault-tolerant RAG workflows with n8n &
              Gemini, and robust systems architecture with modern TypeScript, React 19, Next.js, and
              Supabase.
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 rounded-sm border border-signal bg-signal px-5 py-3 text-mono text-xs font-semibold uppercase tracking-wider text-background shadow-md transition hover:bg-signal/90"
            >
              <span>Explore Systems & Hub</span>
              <ArrowRight className="h-4 w-4" />
            </Link>

            <a
              href="#demo"
              className="inline-flex items-center gap-2 rounded-sm border border-border-strong bg-surface px-5 py-3 text-mono text-xs font-medium uppercase tracking-wider text-foreground shadow-sm transition hover:border-border-strong hover:bg-surface-2"
            >
              <Bot className="h-4 w-4 text-pulse" />
              <span>Try Live Resume AI</span>
            </a>

            <button
              onClick={onOpenPalette}
              className="inline-flex items-center gap-2 rounded-sm border border-border bg-surface px-4 py-3 text-mono text-xs text-muted-foreground hover:text-foreground transition"
            >
              <CmdIcon className="h-3.5 w-3.5" />
              <span>⌘K</span>
            </button>
          </div>

          {/* Live Terminal Readout */}
          <div className="mt-4">
            <TerminalReadout />
          </div>
        </div>

        {/* Right Column: Tiled Photo & Telemetry Card */}
        <div className="flex flex-col gap-6">
          <PhotoCard />
        </div>
      </div>

      {/* Hero KPI Counters */}
      <HeroStats />
    </section>
  );
}

function HeroBackdrop() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      <div className="absolute -top-24 left-1/4 h-96 w-96 rounded-full bg-signal/5 blur-3xl" />
      <div className="absolute top-1/3 right-10 h-80 w-80 rounded-full bg-flow/5 blur-3xl" />
    </div>
  );
}

function PhotoCard() {
  const [isRevealed, setIsRevealed] = useState(false);

  return (
    <div className="relative overflow-hidden rounded-sm border border-border-strong bg-surface p-1 shadow-md">
      <div className="flex items-center justify-between border-b border-border bg-surface-2 px-3 py-1.5 text-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-signal" />
          <span>IDENTITY // DEVELOPER PROFILE</span>
        </div>
        <span>NATIONAL UNIVERSITY</span>
      </div>

      <div
        className="group relative cursor-pointer overflow-hidden bg-graph min-h-[340px]"
        onClick={() => setIsRevealed(!isRevealed)}
        title="Click to toggle Graduation / Professional shot"
      >
        <img
          src={isRevealed ? togaImg : bryantImg}
          alt="Bryant Melliza"
          className="h-[360px] w-full object-cover object-top transition duration-500 group-hover:scale-105"
        />

        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between rounded-sm border border-border-strong bg-background/90 px-3 py-2 text-mono text-xs backdrop-blur">
          <div className="flex flex-col">
            <span className="font-semibold text-foreground">Bryant Iverson Melliza</span>
            <span className="text-[10px] text-muted-foreground">
              {isRevealed ? "Summa Cum Laude Graduate" : "Full-Stack & AI Systems Architect"}
            </span>
          </div>
          <span className="rounded border border-border bg-surface px-1.5 py-0.5 text-[9px] text-signal uppercase">
            {isRevealed ? "Toga View" : "Dev View"}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-3 divide-x divide-border border-t border-border text-mono text-[10.5px]">
        <StatCell label="role" value="software dev" />
        <StatCell label="focus" value="fs & automation" />
        <StatCell label="status" value="available" />
      </div>
    </div>
  );
}

function StatCell({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col items-start gap-0.5 px-3 py-2">
      <span className="text-[9px] uppercase tracking-widest text-muted-foreground">{label}</span>
      <span className="text-foreground font-medium">{value}</span>
    </div>
  );
}

function HeroStats() {
  const stats = [
    { k: "Dev Experience", v: "2+ Years", c: "var(--signal)" },
    { k: "Production Systems", v: "20+ Shipped", c: "var(--flow)" },
    { k: "Software Internships", v: "03 Roles", c: "var(--pulse-c)" },
    { k: "Certifications & Honors", v: "15+ Badges", c: "#27C93F" },
  ];
  return (
    <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-border-strong bg-border md:grid-cols-4 shadow-sm">
      {stats.map((s) => (
        <div key={s.k} className="flex flex-col gap-1 bg-card px-4 py-3.5">
          <div className="flex items-center gap-2 text-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: s.c }} />
            {s.k}
          </div>
          <div className="text-mono text-base font-bold text-foreground">{s.v}</div>
        </div>
      ))}
    </div>
  );
}

function TerminalReadout() {
  const lines = useMemo(
    () => [
      "$ status --dev bryant.melliza",
      "  → 20 projects shipped · 3 internships · Summa Cum Laude",
      "  → core: react 19 · next.js 15 · typescript · supabase",
      "  → automation: n8n · gemini 1.5/3.1 · pgvector · slack block kit",
      "  → uptime: actively positioning for full-stack & ai roles",
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
    <div className="overflow-hidden rounded-sm border border-border-strong bg-surface/90 text-mono text-xs shadow-sm">
      <div className="flex items-center justify-between border-b border-border bg-surface-2 px-3 py-1.5 text-[10px] text-muted-foreground">
        <div className="flex items-center gap-2">
          <Terminal className="h-3 w-3 text-signal" />
          <span>BASH TELEMETRY</span>
        </div>
        <span>SESSION: ACTIVE</span>
      </div>
      <div className="p-3 text-[11px] leading-relaxed text-muted-foreground">
        {shown.map((line, idx) => (
          <div key={idx} className={line.startsWith("$") ? "text-signal font-semibold" : ""}>
            {line}
          </div>
        ))}
        {current && (
          <div>
            <span className={current.startsWith("$") ? "text-signal font-semibold" : ""}>
              {current}
            </span>
            <span className="inline-block h-3 w-1.5 bg-signal animate-pulse ml-0.5" />
          </div>
        )}
      </div>
    </div>
  );
}
