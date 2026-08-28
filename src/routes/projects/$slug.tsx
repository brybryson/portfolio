import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Boxes, ChevronLeft, ChevronRight } from "lucide-react";
import { PROJECTS } from "@/data/projects";
import { CaseStudy } from "@/components/projects/CaseStudy";

export const Route = createFileRoute("/projects/$slug")({
  head: ({ params }) => {
    const project = PROJECTS.find((p) => p.slug === params.slug);
    return {
      meta: [
        {
          title: project ? `${project.name} — Bryant Melliza` : "Case Study — Bryant Melliza",
        },
        {
          name: "description",
          content: project?.summary ?? "Engineering case study by Bryant Melliza",
        },
      ],
    };
  },
  loader: ({ params }) => {
    const project = PROJECTS.find((p) => p.slug === params.slug);
    if (!project) {
      throw notFound();
    }
    return { project };
  },
  component: ProjectDetailPage,
});

function ProjectDetailPage() {
  const { slug } = Route.useParams();
  const currentIndex = PROJECTS.findIndex((p) => p.slug === slug);
  const project = PROJECTS[currentIndex] ?? PROJECTS[0];

  const prevProject = currentIndex > 0 ? PROJECTS[currentIndex - 1] : null;
  const nextProject = currentIndex < PROJECTS.length - 1 ? PROJECTS[currentIndex + 1] : null;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Breadcrumb & Navigation Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border-strong pb-4 text-mono text-xs">
        <div className="flex items-center gap-2">
          <Link
            to="/projects"
            className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to Systems Hub</span>
          </Link>
          <span className="text-border-strong">/</span>
          <span className="text-signal truncate max-w-[200px] sm:max-w-none">{project.slug}</span>
        </div>

        <div className="flex items-center gap-3">
          {prevProject && (
            <Link
              to="/projects/$slug"
              params={{ slug: prevProject.slug }}
              className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground transition"
              title={`Previous: ${prevProject.name}`}
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Prev</span>
            </Link>
          )}
          {nextProject && (
            <Link
              to="/projects/$slug"
              params={{ slug: nextProject.slug }}
              className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground transition"
              title={`Next: ${nextProject.name}`}
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          )}
        </div>
      </div>

      {/* Standalone Case Study View */}
      <div className="mt-6">
        <CaseStudy project={project} />
      </div>

      {/* Bottom Footer Navigation */}
      <div className="mt-8 flex flex-col gap-4 border-t border-border-strong pt-6 sm:flex-row sm:items-center sm:justify-between text-mono text-xs">
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 rounded-sm border border-border bg-surface px-4 py-2 text-muted-foreground hover:text-foreground hover:border-border-strong transition"
        >
          <Boxes className="h-4 w-4 text-signal" />
          <span>Explore All 20 Shipped Systems</span>
        </Link>

        {nextProject && (
          <Link
            to="/projects/$slug"
            params={{ slug: nextProject.slug }}
            className="inline-flex items-center gap-2 rounded-sm bg-signal px-4 py-2 font-semibold text-background transition hover:bg-signal/90"
          >
            <span>Next System: {nextProject.name.slice(0, 24)}...</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        )}
      </div>
    </div>
  );
}
