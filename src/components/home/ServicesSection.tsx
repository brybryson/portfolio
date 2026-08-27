import { useState, useRef } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Bot, Boxes, CheckCircle2, Cpu, Layers, Sparkles } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { SectionLabel } from "@/components/common/SectionLabel";

const CAPABILITIES = [
  {
    index: "01",
    icon: Bot,
    title: "Autonomous AI & Workflow Automation",
    summary: "Self-healing n8n & Python pipelines that eliminate manual operations, data entry, and triage.",
    points: [
      "Multi-branch n8n orchestration engines",
      "Semantic RAG vector memory (pgvector)",
      "Smart email & lead triage with JSON schemas",
      "Slack / Telegram operations & escalation bots",
    ],
    metric: "<3s Real-Time Triage",
  },
  {
    index: "02",
    icon: Layers,
    title: "Full-Stack Web & SaaS Applications",
    summary: "High-performance Next.js 15 & React 19 digital platforms with atomic data validation.",
    points: [
      "Next.js 15 App Router & React 19 architecture",
      "Atomic booking funnels & slot locks",
      "Enterprise staff portals with RBAC/JWT",
      "Frame-accurate Canvas animation engines",
    ],
    metric: "100% Playwright Pass",
  },
  {
    index: "03",
    icon: Boxes,
    title: "Custom Enterprise & POS Systems",
    summary: "Bespoke internal management platforms designed for high-volume inventory and workflows.",
    points: [
      "Custom inventory & stockout warning digests",
      "Automated invoice & document PDF generation",
      "Rule-based decision support logic",
      "Relational database & audit logging",
    ],
    metric: "80% Time Saved",
  },
  {
    index: "04",
    icon: Cpu,
    title: "Knowledge Ingestion & IoT Systems",
    summary: "Transform documentation into 24/7 AI assistants and real-time sensory hardware networks.",
    points: [
      "Google Drive PDF chunking & vector sync",
      "24/7 SOP-grounded RAG AI companion",
      "IoT sensor nodes (environmental & anti-theft)",
      "Real-time event sync via WebSockets",
    ],
    metric: "24/7 Autonomous Sync",
  },
];

export function ServicesSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const offset = direction === "left" ? -380 : 380;
      scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  return (
    <section id="services" className="py-16">
      <SectionLabel index="01" label="what i deliver" hint="solutions & capabilities" />

      <div className="mt-6 flex flex-col gap-6">
        {/* Header & Controls */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Engineered Solutions & Deliverables
            </h2>
            <p className="mt-1 text-xs md:text-sm text-muted-foreground">
              Production-ready architectures built for automation, scale, and operational efficiency.
            </p>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className={`rounded-sm border border-border bg-surface p-2 text-foreground transition ${
                !canScrollLeft ? "opacity-30 cursor-not-allowed" : "hover:border-signal hover:text-signal"
              }`}
              aria-label="Previous capability"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className={`rounded-sm border border-border bg-surface p-2 text-foreground transition ${
                !canScrollRight ? "opacity-30 cursor-not-allowed" : "hover:border-signal hover:text-signal"
              }`}
              aria-label="Next capability"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Smooth Horizontal Slide Container */}
        <div
          ref={scrollRef}
          onScroll={checkScroll}
          className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory"
          style={{ scrollbarWidth: "thin", scrollbarColor: "var(--scrollbar-thumb) transparent" }}
        >
          {CAPABILITIES.map((cap) => {
            const Icon = cap.icon;
            return (
              <div
                key={cap.index}
                className="group flex min-w-[300px] sm:min-w-[360px] max-w-[400px] shrink-0 snap-start flex-col justify-between rounded-sm border border-border-strong bg-card p-6 transition-all duration-300 hover:border-signal hover:shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-border/80 pb-3 text-mono">
                    <div className="flex items-center gap-2">
                      <span className="flex h-7 w-7 items-center justify-center rounded border border-border bg-surface-2 text-signal">
                        <Icon className="h-4 w-4" />
                      </span>
                      <span className="text-xs font-semibold text-foreground">[{cap.index}]</span>
                    </div>
                    <span className="text-[10px] uppercase text-signal font-mono">
                      {cap.metric}
                    </span>
                  </div>

                  <h3 className="mt-4 text-lg font-bold tracking-tight text-foreground group-hover:text-signal transition">
                    {cap.title}
                  </h3>
                  <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
                    {cap.summary}
                  </p>

                  <ul className="mt-4 flex flex-col gap-1.5 text-[11.5px] text-foreground/90 font-mono">
                    {cap.points.map((pt, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="h-1 w-1 rounded-full bg-signal" />
                        <span className="truncate">{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 border-t border-border/80 pt-3 text-mono text-xs">
                  <Link
                    to="/projects"
                    className="inline-flex items-center gap-1 font-semibold text-foreground hover:text-signal transition"
                  >
                    <span>View Proven Systems</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
