import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Bot,
  Boxes,
  Cpu,
  Filter,
  Layers,
  Sparkles,
  Zap,
} from "lucide-react";
import { Category, CATEGORY_META, PROJECTS, Project, ProjectTier } from "@/data/projects";
import { DirectoryExplorer } from "@/components/projects/DirectoryExplorer";
import { CaseStudy } from "@/components/projects/CaseStudy";
import { ArchiveTable } from "@/components/projects/ArchiveTable";
import { SectionLabel } from "@/components/common/SectionLabel";

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

type FilterType = "all" | "pinned" | Category;

function ProjectsPage() {
  const [filter, setFilter] = useState<FilterType>("all");
  const [activeSlug, setActiveSlug] = useState<string>(PROJECTS[0].slug);

  const filteredProjects = PROJECTS.filter((p) => {
    if (filter === "all") return p.tier !== "archive";
    if (filter === "pinned") return p.tier === "pinned";
    return p.category === filter;
  });

  const activeProject =
    PROJECTS.find((p) => p.slug === activeSlug) ?? filteredProjects[0] ?? PROJECTS[0];

  const filterOptions: { id: FilterType; label: string; count: number }[] = [
    {
      id: "all",
      label: "All Active Systems",
      count: PROJECTS.filter((p) => p.tier !== "archive").length,
    },
    {
      id: "pinned",
      label: "★ Flagships",
      count: PROJECTS.filter((p) => p.tier === "pinned").length,
    },
    {
      id: "ai",
      label: "AI & Automation",
      count: PROJECTS.filter((p) => p.category === "ai").length,
    },
    {
      id: "web",
      label: "Web Apps",
      count: PROJECTS.filter((p) => p.category === "web").length,
    },
    {
      id: "system",
      label: "Enterprise Systems",
      count: PROJECTS.filter((p) => p.category === "system").length,
    },
    {
      id: "iot",
      label: "Hardware & IoT",
      count: PROJECTS.filter((p) => p.category === "iot").length,
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
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

      {/* Filter Segment Bar */}
      <div className="mt-8 flex flex-wrap items-center gap-2 text-mono text-xs">
        <span className="text-muted-foreground text-[11px] mr-1 hidden sm:inline uppercase">
          FILTER BY:
        </span>
        {filterOptions.map((opt) => (
          <button
            key={opt.id}
            onClick={() => {
              setFilter(opt.id);
              const firstMatch =
                opt.id === "all"
                  ? PROJECTS.find((p) => p.tier !== "archive")
                  : opt.id === "pinned"
                  ? PROJECTS.find((p) => p.tier === "pinned")
                  : PROJECTS.find((p) => p.category === opt.id);
              if (firstMatch) setActiveSlug(firstMatch.slug);
            }}
            className={`flex items-center gap-1.5 rounded-sm border px-3 py-1.5 transition ${
              filter === opt.id
                ? "border-signal bg-signal/15 text-signal font-semibold shadow-sm"
                : "border-border bg-surface text-muted-foreground hover:border-border-strong hover:text-foreground"
            }`}
          >
            <span>{opt.label}</span>
            <span className="text-[10px] opacity-75">({opt.count})</span>
          </button>
        ))}
      </div>

      {/* Interactive Explorer & Deep-Dive Canvas */}
      <div className="mt-8 grid grid-cols-1 items-start gap-6 lg:grid-cols-[300px_1fr] lg:gap-8">
        <DirectoryExplorer
          projects={filteredProjects}
          active={activeSlug}
          setActive={setActiveSlug}
        />
        <div className="sticky top-20">
          <CaseStudy project={activeProject} />
        </div>
      </div>

      {/* Dedicated Lumina Dental Studio Feature Box */}
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
              className="inline-flex items-center gap-1.5 rounded-sm bg-foreground px-4 py-2 text-mono text-xs font-semibold text-background hover:bg-signal hover:text-white transition"
            >
              <span>Web Platform View</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <Link
              to="/projects/$slug"
              params={{ slug: "lumina-clinical-orchestration-rag" }}
              className="inline-flex items-center gap-1.5 rounded-sm border border-border bg-surface-2 px-4 py-2 text-mono text-xs font-semibold text-foreground hover:border-signal hover:text-signal transition"
            >
              <span>AI Engine View</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 text-mono text-xs">
          <div className="rounded border border-border bg-card p-4">
            <span className="text-[10px] uppercase text-signal font-semibold">01. INTAKE DISPATCH</span>
            <p className="mt-2 text-[11px] text-muted-foreground leading-relaxed">
              Automated pre-appointment digital tokens reducing front-desk paperwork by ~80%.
            </p>
          </div>
          <div className="rounded border border-border bg-card p-4">
            <span className="text-[10px] uppercase text-signal font-semibold">02. ALLERGY ESCALATION</span>
            <p className="mt-2 text-[11px] text-muted-foreground leading-relaxed">
              &lt;3s real-time Slack Block Kit alert cards routed directly to surgical theater teams.
            </p>
          </div>
          <div className="rounded border border-border bg-card p-4">
            <span className="text-[10px] uppercase text-signal font-semibold">03. 2-WAY SYNC</span>
            <p className="mt-2 text-[11px] text-muted-foreground leading-relaxed">
              ISO-8601 calendar synchronization in Asia/Manila (+08:00) with atomic schedule locks.
            </p>
          </div>
          <div className="rounded border border-border bg-card p-4">
            <span className="text-[10px] uppercase text-signal font-semibold">04. 24/7 LUMI RAG</span>
            <p className="mt-2 text-[11px] text-muted-foreground leading-relaxed">
              Supabase 768-dim vector embeddings answering clinical FAQs with &lt;500ms accuracy.
            </p>
          </div>
        </div>
      </section>

      {/* Early Explorations / Legacy Archive (Tier 3) */}
      <section className="mt-16">
        <ArchiveTable projects={PROJECTS} />
      </section>
    </div>
  );
}
