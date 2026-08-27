import { Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Bot, Boxes, Layers, Sparkles } from "lucide-react";
import { SectionLabel } from "@/components/common/SectionLabel";
import { PROJECTS } from "@/data/projects";

export function FlagshipTeaser() {
  const luminaWeb = PROJECTS.find((p) => p.slug === "lumina-dental-studio");
  const luminaAI = PROJECTS.find((p) => p.slug === "lumina-clinical-orchestration-rag");

  return (
    <section id="flagships" className="py-20">
      <SectionLabel index="03" label="flagship showcase" hint="featured production systems" />

      <div className="mt-8 flex flex-col gap-6">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="flex items-center gap-2 text-mono text-xs text-signal font-semibold uppercase tracking-wider">
              <Sparkles className="h-4 w-4" />
              <span>DUAL-ENGINE PRODUCTION SHOWCASE</span>
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl mt-1">
              Lumina Dental Studio — Smart Healthcare Suite
            </h2>
            <p className="text-sm md:text-base text-muted-foreground mt-1 max-w-2xl leading-relaxed">
              Full-stack Next.js 15 Patient Booking & Staff Portal seamlessly paired with an 8-Workflow autonomous n8n Clinical Orchestration & RAG Engine.
            </p>
          </div>

          <Link
            to="/projects"
            className="inline-flex items-center gap-2 rounded-sm bg-foreground px-5 py-3 text-mono text-xs font-bold uppercase tracking-wider text-background shadow-md transition hover:bg-signal hover:text-white shrink-0"
          >
            <span>Explore All 20 Systems</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* 2 Flagship Cards */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Card 1: Web Platform */}
          {luminaWeb && (
            <div className="group flex flex-col justify-between overflow-hidden rounded-sm border border-border-strong bg-card/90 p-6 md:p-8 backdrop-blur transition-all duration-300 hover:border-signal hover:shadow-xl">
              <div>
                <div className="flex items-center justify-between border-b border-border/80 pb-3 text-mono text-xs">
                  <span className="flex items-center gap-1.5 text-signal font-bold uppercase">
                    <Layers className="h-4 w-4" />
                    Web Platform & Staff Portal
                  </span>
                  <span className="text-muted-foreground">2026.08</span>
                </div>

                <div className="mt-4 aspect-video w-full overflow-hidden rounded border border-border bg-graph flex items-center justify-center bg-background/50">
                  <img
                    src={luminaWeb.image as string}
                    alt={luminaWeb.name}
                    className="h-full w-full object-contain p-2 transition duration-500 group-hover:scale-105"
                  />
                </div>

                <h3 className="mt-5 text-xl font-bold tracking-tight text-foreground group-hover:text-signal transition">
                  {luminaWeb.name}
                </h3>
                <p className="mt-2 text-xs md:text-sm text-muted-foreground leading-relaxed">
                  {luminaWeb.summary}
                </p>

                {/* Metrics */}
                <div className="mt-4 grid grid-cols-2 gap-2 text-mono text-xs">
                  <div className="rounded border border-border bg-surface-2 p-2.5">
                    <span className="text-[9.5px] uppercase text-muted-foreground">Intake Time</span>
                    <div className="font-bold text-foreground">-80% via digital tokens</div>
                  </div>
                  <div className="rounded border border-border bg-surface-2 p-2.5">
                    <span className="text-[9.5px] uppercase text-muted-foreground">Playwright E2E</span>
                    <div className="font-bold text-foreground">100% Coverage</div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-border/80 pt-4 text-mono text-xs">
                <Link
                  to="/projects/$slug"
                  params={{ slug: luminaWeb.slug }}
                  className="font-bold text-signal hover:underline"
                >
                  Architecture & Breakdown →
                </Link>
                {luminaWeb.demoUrl && (
                  <a
                    href={luminaWeb.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground"
                  >
                    <span>Live Demo</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                )}
              </div>
            </div>
          )}

          {/* Card 2: AI Clinical Automation */}
          {luminaAI && (
            <div className="group flex flex-col justify-between overflow-hidden rounded-sm border border-border-strong bg-card/90 p-6 md:p-8 backdrop-blur transition-all duration-300 hover:border-pulse hover:shadow-xl">
              <div>
                <div className="flex items-center justify-between border-b border-border/80 pb-3 text-mono text-xs">
                  <span className="flex items-center gap-1.5 text-pulse font-bold uppercase">
                    <Bot className="h-4 w-4" />
                    8-Workflow Clinical RAG Engine
                  </span>
                  <span className="text-muted-foreground">2026.08</span>
                </div>

                <div className="mt-4 aspect-video w-full overflow-hidden rounded border border-border bg-graph flex items-center justify-center bg-background/50">
                  <img
                    src={(luminaAI.image as string[])[0]}
                    alt={luminaAI.name}
                    className="h-full w-full object-contain p-2 transition duration-500 group-hover:scale-105"
                  />
                </div>

                <h3 className="mt-5 text-xl font-bold tracking-tight text-foreground group-hover:text-pulse transition">
                  {luminaAI.name}
                </h3>
                <p className="mt-2 text-xs md:text-sm text-muted-foreground leading-relaxed">
                  {luminaAI.summary}
                </p>

                {/* Metrics */}
                <div className="mt-4 grid grid-cols-2 gap-2 text-mono text-xs">
                  <div className="rounded border border-border bg-surface-2 p-2.5">
                    <span className="text-[9.5px] uppercase text-muted-foreground">Allergy Triage</span>
                    <div className="font-bold text-foreground">&lt;3s Direct Slack Alert</div>
                  </div>
                  <div className="rounded border border-border bg-surface-2 p-2.5">
                    <span className="text-[9.5px] uppercase text-muted-foreground">Pipelines</span>
                    <div className="font-bold text-foreground">8 n8n Workflows</div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-border/80 pt-4 text-mono text-xs">
                <Link
                  to="/projects/$slug"
                  params={{ slug: luminaAI.slug }}
                  className="font-bold text-pulse hover:underline"
                >
                  Architecture & Breakdown →
                </Link>
                <span className="text-mono text-[10.5px] text-muted-foreground">
                  Supabase pgvector RAG
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
