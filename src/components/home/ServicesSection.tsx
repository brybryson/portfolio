import { useState, useRef } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Bot,
  Boxes,
  Cpu,
  Layers,
  MessageSquareCode,
  Palette,
  Sparkles,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { SectionLabel } from "@/components/common/SectionLabel";

const SERVICES = [
  {
    index: "01",
    icon: Bot,
    title: "AI & Workflow Automation",
    summary: "Self-healing backend pipelines that eliminate repetitive operations and manual data entry.",
    points: [
      "Multi-branch n8n & Python pipelines",
      "Inbound email triage & lead routing",
      "Automated Slack & Telegram ops alerts",
      "Zero-silent-failure error telemetry",
    ],
    metric: "n8n · Python · APIs",
  },
  {
    index: "02",
    icon: Palette,
    title: "UI/UX Design & Prototyping",
    summary: "Modern, luxury developer interfaces and high-converting booking funnels.",
    points: [
      "Figma design systems & components",
      "Glassmorphism & dark-mode aesthetics",
      "Interactive click-through prototypes",
      "Responsive mobile-first user journeys",
    ],
    metric: "Figma · Design Systems",
  },
  {
    index: "03",
    icon: Layers,
    title: "Full-Stack Web & SaaS Platforms",
    summary: "Production web applications engineered with Next.js 15, React 19, and Supabase.",
    points: [
      "Next.js 15 App Router & React 19",
      "Dynamic booking funnels & atomic locks",
      "Staff admin portals with RBAC/JWT",
      "Playwright automated E2E testing",
    ],
    metric: "Next.js · React · TypeScript",
  },
  {
    index: "04",
    icon: MessageSquareCode,
    title: "AI Chatbots & RAG Companions",
    summary: "24/7 intelligent conversational agents (like Lumi) grounded in verified business SOPs.",
    points: [
      "24/7 RAG AI assistants (Gemini / LLaMA)",
      "Supabase pgvector semantic search",
      "Google Drive PDF knowledge ingestion",
      "Automated lead capture & escalation",
    ],
    metric: "Gemini · pgvector · RAG",
  },
  {
    index: "05",
    icon: Boxes,
    title: "Custom Enterprise & POS Systems",
    summary: "Bespoke internal business tools for inventory, automated PDF reports, and compliance.",
    points: [
      "Inventory tracking & stockout digests",
      "Automated invoice & medical cert PDFs",
      "Rule-based decision support logic",
      "RFID hardware sensor integration",
    ],
    metric: "PHP · MySQL · PostgreSQL",
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
      const offset = direction === "left" ? -360 : 360;
      scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  return (
    <section id="services" className="py-16">
      <SectionLabel index="01" label="services" hint="what i can build for you" />

      <div className="mt-6 flex flex-col gap-6">
        {/* Header & Slide Controls */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Solutions & Client Offerings
            </h2>
            <p className="mt-1 text-xs md:text-sm text-muted-foreground">
              End-to-end development: from UI/UX design and full-stack web apps to AI chatbots and enterprise automation.
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
              aria-label="Previous service"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className={`rounded-sm border border-border bg-surface p-2 text-foreground transition ${
                !canScrollRight ? "opacity-30 cursor-not-allowed" : "hover:border-signal hover:text-signal"
              }`}
              aria-label="Next service"
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
          {SERVICES.map((srv) => {
            const Icon = srv.icon;
            return (
              <div
                key={srv.index}
                className="group flex min-w-[290px] sm:min-w-[340px] max-w-[370px] shrink-0 snap-start flex-col justify-between rounded-sm border border-border-strong bg-card p-5 md:p-6 transition-all duration-300 hover:border-signal hover:shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-border/80 pb-3 text-mono">
                    <div className="flex items-center gap-2">
                      <span className="flex h-7 w-7 items-center justify-center rounded border border-border bg-surface-2 text-signal">
                        <Icon className="h-4 w-4" />
                      </span>
                      <span className="text-xs font-semibold text-foreground">[{srv.index}]</span>
                    </div>
                    <span className="text-[10px] uppercase text-signal font-mono">
                      {srv.metric}
                    </span>
                  </div>

                  <h3 className="mt-3.5 text-base sm:text-lg font-bold tracking-tight text-foreground group-hover:text-signal transition">
                    {srv.title}
                  </h3>
                  <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
                    {srv.summary}
                  </p>

                  <ul className="mt-4 flex flex-col gap-1.5 text-[11.5px] text-foreground/90 font-mono">
                    {srv.points.map((pt, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="h-1 w-1 rounded-full bg-signal" />
                        <span className="truncate">{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-5 border-t border-border/80 pt-3 text-mono text-xs">
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
