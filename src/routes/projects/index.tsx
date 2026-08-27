import { createFileRoute } from "@tanstack/react-router";
import { Boxes } from "lucide-react";
import { ProjectDirectory } from "@/components/projects/ProjectDirectory";
import { ArchiveTable } from "@/components/projects/ArchiveTable";
import { PROJECTS } from "@/data/projects";

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
    <div className="mx-auto max-w-[1536px] px-6 py-10 sm:px-10 lg:px-14">
      {/* Header */}
      <div className="flex flex-col gap-3 border-b border-border-strong pb-8">
        <div className="flex items-center gap-2 text-mono text-xs text-signal font-semibold">
          <Boxes className="h-4 w-4" />
          <span>TECHNICAL DIRECTORY // SYSTEMS HUB</span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
          Engineered Systems, AI Pipelines &amp; Applications
        </h1>
        <p className="text-sm leading-relaxed text-muted-foreground md:text-base max-w-3xl">
          Explore all 20 production systems across autonomous n8n workflows, Next.js 15 enterprise platforms, Supabase pgvector RAG memory, and IoT sensory telemetry. Click on any system to inspect its full architectural breakdown and case study.
        </p>
      </div>

      {/* Main Unified Project Directory */}
      <div className="mt-8">
        <ProjectDirectory />
      </div>

      {/* Historical Archive Table */}
      <div className="mt-20 border-t border-border-strong pt-12">
        <ArchiveTable projects={PROJECTS.filter((p) => p.tier === "archive")} />
      </div>
    </div>
  );
}
