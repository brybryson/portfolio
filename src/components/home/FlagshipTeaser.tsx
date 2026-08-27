import { Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Bot, Boxes, CheckCircle2, Layers, MessageSquareCode, Workflow } from "lucide-react";
import { SectionLabel } from "@/components/common/SectionLabel";
import { PROJECTS } from "@/data/projects";

export function FlagshipTeaser() {
  const luminaWeb = PROJECTS.find((p) => p.slug === "lumina-dental-studio");
  const luminaAI = PROJECTS.find((p) => p.slug === "lumina-clinical-orchestration-rag");

  return (
    <section id="flagships" className="py-20">
      <SectionLabel index="03" label="flagship showcase" hint="featured production systems" />

      <div className="mt-8 flex flex-col gap-6">
        {/* Section Header (Stars icon removed) */}
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between border-b border-border/80 pb-6">
          <div>
            <div className="text-mono text-xs text-signal font-semibold uppercase tracking-wider">
              DUAL-ENGINE PRODUCTION SHOWCASE
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl mt-1.5">
              Lumina Dental Studio — Smart Healthcare Suite
            </h2>
            <p className="text-sm md:text-base text-muted-foreground mt-1 max-w-2xl leading-relaxed">
              Full-stack Next.js 15 Patient Booking Platform seamlessly integrated with an 8-Workflow autonomous n8n Clinical Orchestration Engine and **Lumi**, the 24/7 RAG Dental Companion.
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

        {/* 3 Pillars Grid: Web Platform, Lumi Companion, Autonomous Workflows */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Pillar 1: Web & Booking Portal */}
          <div className="group flex flex-col justify-between overflow-hidden rounded-sm border border-border-strong bg-card/90 p-6 backdrop-blur transition-all duration-300 hover:border-signal hover:shadow-xl">
            <div>
              <div className="flex items-center justify-between border-b border-border/80 pb-3 text-mono text-xs">
                <span className="flex items-center gap-1.5 text-signal font-bold uppercase">
                  <Layers className="h-4 w-4" />
                  Web & Staff Portal
                </span>
                <span className="text-muted-foreground text-[10px]">NEXT.JS 15</span>
              </div>

              {luminaWeb && (
                <div className="mt-4 aspect-video w-full overflow-hidden rounded border border-border bg-graph flex items-center justify-center bg-background/50">
                  <img
                    src={luminaWeb.image as string}
                    alt={luminaWeb.name}
                    className="h-full w-full object-contain p-2 transition duration-500 group-hover:scale-105"
                  />
                </div>
              )}

              <h3 className="mt-4 text-lg font-bold tracking-tight text-foreground group-hover:text-signal transition">
                4-Step Dynamic Booking & Staff Portal
              </h3>
              <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
                Atomic slot validation preventing double-bookings, RBAC/JWT staff administration dashboard, and 0ms Canvas ImageDecoder streams.
              </p>

              <ul className="mt-3.5 flex flex-col gap-1.5 text-[11px] text-foreground/90 font-mono">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3 w-3 text-signal" />
                  <span>-80% In-clinic intake paperwork</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3 w-3 text-signal" />
                  <span>100% Playwright E2E test coverage</span>
                </li>
              </ul>
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-border/80 pt-3 text-mono text-xs">
              <Link
                to="/projects/$slug"
                params={{ slug: "lumina-dental-studio" }}
                className="font-bold text-signal hover:underline"
              >
                Inspect Platform →
              </Link>
              <a
                href="https://luminadentalcarestudio.vercel.app/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 font-semibold text-muted-foreground hover:text-foreground"
              >
                <span>Live Demo</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          {/* Pillar 2: Lumi — 24/7 AI Dental Companion */}
          <div className="group flex flex-col justify-between overflow-hidden rounded-sm border border-signal/60 bg-card/90 p-6 backdrop-blur transition-all duration-300 hover:border-signal hover:shadow-xl">
            <div>
              <div className="flex items-center justify-between border-b border-border/80 pb-3 text-mono text-xs">
                <span className="flex items-center gap-1.5 text-signal font-bold uppercase">
                  <MessageSquareCode className="h-4 w-4" />
                  Lumi · AI Dental Companion
                </span>
                <span className="rounded bg-signal/15 px-1.5 py-0.5 text-[9.5px] font-bold text-signal uppercase">
                  RAG Powered
                </span>
              </div>

              {luminaAI && Array.isArray(luminaAI.image) && (
                <div className="mt-4 aspect-video w-full overflow-hidden rounded border border-border bg-graph flex items-center justify-center bg-background/50">
                  <img
                    src={luminaAI.image[6] || luminaAI.image[0]}
                    alt="Lumi AI Dental Companion"
                    className="h-full w-full object-contain p-2 transition duration-500 group-hover:scale-105"
                  />
                </div>
              )}

              <h3 className="mt-4 text-lg font-bold tracking-tight text-foreground group-hover:text-signal transition">
                Lumi — 24/7 Clinical Knowledge RAG
              </h3>
              <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
                Autonomous AI companion grounded in clinic SOPs using Supabase pgvector (768-dim). Triage inquiries and alerts doctors in Slack for critical trauma.
              </p>

              <ul className="mt-3.5 flex flex-col gap-1.5 text-[11px] text-foreground/90 font-mono">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3 w-3 text-signal" />
                  <span>Google Gemini 1.5 + pgvector RAG</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3 w-3 text-signal" />
                  <span>Zero-hallucination verified answers</span>
                </li>
              </ul>
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-border/80 pt-3 text-mono text-xs">
              <Link
                to="/projects/$slug"
                params={{ slug: "lumina-clinical-orchestration-rag" }}
                className="font-bold text-signal hover:underline"
              >
                Lumi Architecture →
              </Link>
              <span className="text-[10px] text-muted-foreground font-mono">
                24/7 Vector RAG
              </span>
            </div>
          </div>

          {/* Pillar 3: 8-Workflow Clinical Orchestration */}
          <div className="group flex flex-col justify-between overflow-hidden rounded-sm border border-border-strong bg-card/90 p-6 backdrop-blur transition-all duration-300 hover:border-pulse hover:shadow-xl">
            <div>
              <div className="flex items-center justify-between border-b border-border/80 pb-3 text-mono text-xs">
                <span className="flex items-center gap-1.5 text-pulse font-bold uppercase">
                  <Bot className="h-4 w-4" />
                  Autonomous Orchestration
                </span>
                <span className="text-muted-foreground text-[10px]">8 WORKFLOWS</span>
              </div>

              {luminaAI && Array.isArray(luminaAI.image) && (
                <div className="mt-4 aspect-video w-full overflow-hidden rounded border border-border bg-graph flex items-center justify-center bg-background/50">
                  <img
                    src={luminaAI.image[0]}
                    alt="n8n Clinical Engine"
                    className="h-full w-full object-contain p-2 transition duration-500 group-hover:scale-105"
                  />
                </div>
              )}

              <h3 className="mt-4 text-lg font-bold tracking-tight text-foreground group-hover:text-pulse transition">
                Autonomous Patient Care & SOP Sync
              </h3>
              <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
                Timed post-op recovery sequences (2h/24h), &lt;3s high-risk allergy triage via Slack Block Kit, 6-month recall cron, and unified error telemetry.
              </p>

              <ul className="mt-3.5 flex flex-col gap-1.5 text-[11px] text-foreground/90 font-mono">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3 w-3 text-pulse" />
                  <span>&lt;3s Direct Slack surgical alert</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3 w-3 text-pulse" />
                  <span>0 Silent automation failures</span>
                </li>
              </ul>
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-border/80 pt-3 text-mono text-xs">
              <Link
                to="/projects/$slug"
                params={{ slug: "lumina-clinical-orchestration-rag" }}
                className="font-bold text-pulse hover:underline"
              >
                Inspect Workflows →
              </Link>
              <a
                href="https://drive.google.com/file/d/1sEEmW5fjaorBb_zEMg2sUu4PP0W1_Jro/view?usp=sharing"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 font-semibold text-muted-foreground hover:text-foreground"
              >
                <span>3-Min Video</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
