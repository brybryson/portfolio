import { createFileRoute } from "@tanstack/react-router";
import { Boxes } from "lucide-react";
import { EngineeringTable } from "@/components/projects/EngineeringTable";
import { ArchiveTable } from "@/components/projects/ArchiveTable";
import { PROJECTS } from "@/data/projects";

export const Route = createFileRoute("/projects/")({
  head: () => ({
    meta: [
      { title: "Systems Registry & Architecture Hub — Bryant Melliza" },
      {
        name: "description",
        content:
          "High-density minimalist engineering registry covering 20 production systems across autonomous n8n workflows, Next.js 15 enterprise platforms, and IoT telemetry by Bryant Melliza.",
      },
    ],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  return (
    <div className="mx-auto max-w-[1536px] px-6 py-10 sm:px-10 lg:px-14">
      {/* Page Header */}
      <div className="flex flex-col gap-3 border-b border-border-strong pb-8">
        <div className="flex items-center gap-2 text-mono text-xs text-signal font-semibold">
          <Boxes className="h-4 w-4" />
          <span>TECHNICAL DIRECTORY // SYSTEMS REGISTRY</span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
          Engineered Systems &amp; Autonomous Pipelines
        </h1>
        <p className="text-sm leading-relaxed text-muted-foreground md:text-base max-w-3xl">
          Minimalist production registry indexing 20 deployed systems. Click any system row to inspect its architectural specs, problem/solution breakdown, and live preview media in the slide-over inspector.
        </p>
      </div>

      {/* Minimalist Engineering Table with Instant Slide-Over Drawer */}
      <div className="mt-8">
        <EngineeringTable />
      </div>

      {/* Historical Explorations Archive */}
      <div className="mt-16 border-t border-border-strong pt-12">
        <ArchiveTable projects={PROJECTS.filter((p) => p.tier === "archive")} />
      </div>
    </div>
  );
}
