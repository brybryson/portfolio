import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Boxes, Sparkles } from "lucide-react";
import { PROJECTS } from "@/data/projects";
import { ProjectShowcase } from "@/components/projects/ProjectShowcase";
import { ArchiveTable } from "@/components/projects/ArchiveTable";

export const Route = createFileRoute("/projects/")({
  head: () => ({
    meta: [
      { title: "Systems & Projects Hub — Bryant Melliza" },
      {
        name: "description",
        content:
          "Complete engineering systems directory, autonomous n8n workflows, full-stack web applications, and IoT disaster risk systems by Bryant Melliza.",
      },
    ],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  return (
    <div className="mx-auto max-w-[1440px] px-6 py-8 md:px-10">
      {/* Header */}
      <div className="flex flex-col gap-3 border-b border-border-strong pb-8">
        <div className="flex items-center gap-2 text-mono text-xs text-signal font-semibold">
          <Boxes className="h-4 w-4" />
          <span>TECHNICAL DIRECTORY // SYSTEMS HUB</span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
          Engineered Systems, AI Pipelines & Applications
        </h1>
        <p className="text-sm leading-relaxed text-muted-foreground md:text-base max-w-3xl">
          Interactive architecture explorer covering 20 shipped projects across autonomous n8n
          workflows, Next.js 15 enterprise platforms, Supabase pgvector RAG memory, and IoT sensory
          telemetry.
        </p>
      </div>

      {/* Main Full-Width Project Showcase System */}
      <div className="mt-8">
        <ProjectShowcase />
      </div>

      {/* Specialized Lumina Dental Studio Feature Box */}
      <section className="mt-20 rounded-sm border border-signal/40 bg-surface/60 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between border-b border-border/80 pb-6">
          <div>
            <div className="flex items-center gap-2 text-mono text-xs text-signal font-semibold uppercase tracking-wider">
              <Sparkles className="h-4 w-4" />
              <span>SPECIALIZED FLAGSHIP SPOTLIGHT</span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl mt-1">
              Lumina Dental Studio — Ecosystem Overview
            </h2>
            <p className="text-xs text-muted-foreground mt-1">
              Dual-architecture deployment: Next.js 15 Web Platform + 8-Workflow n8n Clinical AI Engine
            </p>
          </div>

          <div className="flex flex-wrap gap-2 shrink-0">
            <Link
              to="/projects/$slug"
              params={{ slug: "lumina-dental-studio" }}
              className="rounded-sm border border-border-strong bg-card px-4 py-2 text-mono text-xs text-foreground hover:border-signal transition"
            >
              1. Web Platform Breakdown →
            </Link>
            <Link
              to="/projects/$slug"
              params={{ slug: "lumina-clinical-orchestration-rag" }}
              className="rounded-sm bg-signal px-4 py-2 text-mono text-xs font-semibold text-background hover:bg-signal/90 transition"
            >
              2. Clinical RAG Automation →
            </Link>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 text-xs">
          <div className="flex flex-col gap-2 rounded border border-border bg-card/60 p-4">
            <h4 className="font-bold text-foreground">Next.js 15 Patient & Staff Suite</h4>
            <p className="text-muted-foreground leading-relaxed">
              4-step real-time patient booking funnel with atomic slot locking, role-based staff administrative portal, ImageDecoder canvas streaming, and 100% Playwright test pass rate.
            </p>
          </div>
          <div className="flex flex-col gap-2 rounded border border-border bg-card/60 p-4">
            <h4 className="font-bold text-foreground">8-Workflow n8n Autonomous RAG Engine</h4>
            <p className="text-muted-foreground leading-relaxed">
              Google Gemini 1.5 Flash + Supabase pgvector RAG companion, automated Google Calendar sync, timed post-op recovery sequences, 6-month recall cron, and Slack Block Kit urgent triage.
            </p>
          </div>
        </div>
      </section>

      {/* Historical Archive Table */}
      <div className="mt-20">
        <ArchiveTable projects={PROJECTS.filter((p) => p.tier === "archive")} />
      </div>
    </div>
  );
}
