import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowUpRight,
  Bot,
  Boxes,
  CheckCircle2,
  Cpu,
  Layers,
  MessageSquareCode,
  Sparkles,
  Terminal,
  Workflow,
  Zap,
} from "lucide-react";
import { SectionLabel } from "@/components/common/SectionLabel";
import { PROJECTS } from "@/data/projects";

export function FlagshipTeaser() {
  const luminaWeb = PROJECTS.find((p) => p.slug === "lumina-dental-studio");
  const luminaAI = PROJECTS.find((p) => p.slug === "lumina-clinical-orchestration-rag");

  return (
    <section id="flagships" className="py-20">
      <SectionLabel index="03" label="flagship showcase" hint="featured production systems" />

      <div className="mt-8 flex flex-col gap-8">
        {/* Flagship Header */}
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between border-b border-border/80 pb-6">
          <div>
            <div className="text-mono text-xs text-signal font-bold uppercase tracking-wider">
              FLAGSHIP PRODUCTION SYSTEM // DUAL-ENGINE ARCHITECTURE
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl mt-2">
              Lumina Dental Studio — Smart Healthcare Suite
            </h2>
            <p className="text-sm md:text-base text-muted-foreground mt-2 max-w-3xl leading-relaxed">
              An enterprise healthcare platform uniting a{" "}
              <strong className="text-foreground font-bold">
                Next.js 15 Patient &amp; Staff Web Suite
              </strong>{" "}
              with an{" "}
              <strong className="text-foreground font-bold">
                8-Workflow Autonomous Clinical RAG Engine
              </strong>{" "}
              and <strong className="text-foreground font-bold">Lumi</strong>, the 24/7 AI Dental
              Companion.
            </p>
          </div>

          <Link
            to="/projects"
            className="inline-flex items-center gap-2 rounded-sm bg-foreground px-6 py-3.5 text-mono text-xs font-bold uppercase tracking-wider text-background shadow-lg transition hover:bg-signal hover:text-white shrink-0"
          >
            <span>Explore All 20 Systems</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Master Flagship Showcase Canvas */}
        <div className="overflow-hidden rounded-sm border-2 border-signal/60 bg-card/95 shadow-2xl backdrop-blur">
          {/* Main Visual Arena (Next.js 15 Web Platform) */}
          <div className="border-b border-border bg-graph p-6 sm:p-8 md:p-10">
            <div className="flex flex-col lg:flex-row items-center gap-8 justify-between">
              {/* Media Preview */}
              <div className="w-full lg:w-[58%] overflow-hidden rounded border border-border bg-background/80 shadow-md">
                <div className="flex items-center justify-between border-b border-border bg-surface-2 px-4 py-2 text-mono text-[10.5px] text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <div className="h-2.5 w-2.5 rounded-full bg-[#FF5F56]" />
                      <div className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E]" />
                      <div className="h-2.5 w-2.5 rounded-full bg-[#27C93F]" />
                    </div>
                    <span>luminadentalcarestudio.vercel.app</span>
                  </div>
                  <span className="text-[#27C93F] font-bold">● LIVE IN PRODUCTION</span>
                </div>
                {luminaWeb && (
                  <img
                    src={luminaWeb.image as string}
                    alt="Lumina Dental Studio Web Platform"
                    className="w-full h-auto object-contain max-h-[380px] p-2"
                  />
                )}
              </div>

              {/* Web Platform Specs & Summary */}
              <div className="w-full lg:w-[40%] flex flex-col gap-4">
                <div className="flex items-center gap-2 text-mono text-xs text-signal font-bold uppercase">
                  <Layers className="h-4 w-4" />
                  <span>Engine 01 · Full-Stack Web Platform</span>
                </div>

                <h3 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                  Lumina Core — Patient Booking &amp; Healthcare Operations Platform
                </h3>

                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Engineered with Next.js 15 (App Router), React 19, and Supabase. Features a 4-step
                  dynamic booking funnel with real-time atomic slot locks preventing
                  double-bookings, role-based staff admin portal, and 0ms Canvas ImageDecoder
                  streaming.
                </p>

                {/* KPI Metrics */}
                <div className="grid grid-cols-2 gap-3 text-mono text-xs">
                  <div className="rounded border border-border bg-surface-2 p-3">
                    <span className="text-[10px] uppercase text-muted-foreground font-semibold">
                      Intake Time
                    </span>
                    <div className="text-sm font-bold text-foreground mt-0.5">
                      -80% via digital tokens
                    </div>
                  </div>
                  <div className="rounded border border-border bg-surface-2 p-3">
                    <span className="text-[10px] uppercase text-muted-foreground font-semibold">
                      Playwright E2E
                    </span>
                    <div className="text-sm font-bold text-foreground mt-0.5">100% Pass Rate</div>
                  </div>
                </div>

                {/* Primary Action Buttons */}
                <div className="mt-2 flex flex-wrap items-center gap-3 text-mono text-xs">
                  <Link
                    to="/projects/$slug"
                    params={{ slug: "lumina-dental-studio" }}
                    className="inline-flex items-center gap-1.5 rounded-sm bg-signal px-4 py-2 font-bold text-background hover:bg-signal/90 transition shadow-sm"
                  >
                    <span>Inspect Platform</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                  <a
                    href="https://luminadentalcarestudio.vercel.app/"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 rounded-sm border border-border-strong bg-surface px-4 py-2 font-semibold text-foreground hover:bg-surface-2 transition shadow-sm"
                  >
                    <span>View Live Website</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Lower Dual Sub-Engines (Lumi RAG Companion + 8-Workflow Automation) */}
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border bg-surface/40">
            {/* Sub-Engine A: Lumi — 24/7 AI Dental Companion */}
            <div className="flex flex-col justify-between p-6 sm:p-8">
              <div>
                <div className="flex items-center justify-between text-mono text-xs pb-3 border-b border-border/80">
                  <span className="flex items-center gap-2 font-bold text-signal uppercase">
                    <MessageSquareCode className="h-4 w-4" />
                    Engine 02 · Lumi AI Companion
                  </span>
                  <span className="rounded bg-signal/15 px-2 py-0.5 text-[10px] font-bold text-signal">
                    768-DIM RAG
                  </span>
                </div>

                <div className="mt-4">
                  <h4 className="text-xl font-bold text-foreground">
                    Lumi — Autonomous 24/7 Dental RAG Companion
                  </h4>
                  <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    Powered by Google Gemini 1.5 Flash and Supabase pgvector. Ingests clinic SOPs to
                    answer patient inquiries 24/7 with zero hallucinations and automatically alerts
                    surgical teams in Slack for critical trauma and allergies.
                  </p>
                </div>

                <ul className="mt-4 flex flex-col gap-2 text-xs text-foreground/90 font-mono">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-signal shrink-0" />
                    <span>Google Gemini 1.5 + pgvector RAG memory</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-signal shrink-0" />
                    <span>Automated Google Drive PDF knowledge ingestion</span>
                  </li>
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-border/80 text-mono text-xs">
                <Link
                  to="/projects/$slug"
                  params={{ slug: "lumina-clinical-orchestration-rag" }}
                  className="font-bold text-signal hover:underline inline-flex items-center gap-1"
                >
                  <span>Explore Lumi RAG Architecture</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

            {/* Sub-Engine B: 8-Workflow Clinical Orchestration */}
            <div className="flex flex-col justify-between p-6 sm:p-8">
              <div>
                <div className="flex items-center justify-between text-mono text-xs pb-3 border-b border-border/80">
                  <span className="flex items-center gap-2 font-bold text-pulse uppercase">
                    <Bot className="h-4 w-4" />
                    Engine 03 · Autonomous Workflows
                  </span>
                  <span className="rounded bg-pulse/15 px-2 py-0.5 text-[10px] font-bold text-pulse">
                    8 PIPELINES
                  </span>
                </div>

                <div className="mt-4">
                  <h4 className="text-xl font-bold text-foreground">
                    Clinical Orchestration & Error Telemetry
                  </h4>
                  <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    End-to-end n8n automation engine: timed post-op recovery sequences (2h/24h),
                    &lt;3s allergy escalation to Slack #clinical-urgent-alerts, 2-way Google
                    Calendar sync, and central Slack telemetry.
                  </p>
                </div>

                <ul className="mt-4 flex flex-col gap-2 text-xs text-foreground/90 font-mono">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-pulse shrink-0" />
                    <span>&lt;3s Direct Slack surgical alert cards</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-pulse shrink-0" />
                    <span>0 Silent automation failures across 8 pipelines</span>
                  </li>
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-border/80 flex items-center justify-between text-mono text-xs">
                <Link
                  to="/projects/$slug"
                  params={{ slug: "lumina-clinical-orchestration-rag" }}
                  className="font-bold text-pulse hover:underline inline-flex items-center gap-1"
                >
                  <span>Inspect Workflows</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <a
                  href="https://drive.google.com/file/d/1sEEmW5fjaorBb_zEMg2sUu4PP0W1_Jro/view?usp=sharing"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 font-bold text-signal hover:underline"
                >
                  <span>Watch 3-Min Video Walkthrough</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
