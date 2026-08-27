import { createFileRoute } from "@tanstack/react-router";
import { Award, Briefcase, GraduationCap, Sparkles, Terminal } from "lucide-react";
import { ExperienceTimeline } from "@/components/experience/ExperienceTimeline";
import { AcademicHonors } from "@/components/experience/AcademicHonors";

export const Route = createFileRoute("/experience")({
  head: () => ({
    meta: [
      { title: "Career Log & Academic Excellence — Bryant Melliza" },
      {
        name: "description",
        content:
          "Career timeline, software internships at OneNetworx, JLabs, NLP, and Summa Cum Laude academic honors at National University Fairview by Bryant Melliza.",
      },
    ],
  }),
  component: ExperiencePage,
});

function ExperiencePage() {
  return (
    <div className="mx-auto max-w-[1536px] px-6 py-10 sm:px-10 lg:px-14 flex flex-col gap-14">
      {/* Page Header */}
      <div className="flex flex-col gap-4 border-b border-border-strong pb-8">
        <div className="flex items-center gap-2 text-mono text-xs text-signal font-semibold">
          <Briefcase className="h-4 w-4" />
          <span>CAREER LOG // EXPERIENCE &amp; CREDENTIALS</span>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              Professional Journey &amp; Academic Excellence
            </h1>
            <p className="text-sm leading-relaxed text-muted-foreground md:text-base max-w-3xl mt-1.5">
              Production engineering experience across 3 developer internships, freelance full-stack client platforms, and continuous academic honors including{" "}
              <strong className="text-foreground font-bold">Summa Cum Laude</strong> and{" "}
              <strong className="text-foreground font-bold">100% Full Merit Blue Scholar</strong>.
            </p>
          </div>

          {/* Quick Stats Ticker */}
          <div className="flex flex-wrap items-center gap-2 text-mono text-xs shrink-0">
            <span className="rounded border border-signal/40 bg-signal/10 px-3 py-1.5 font-bold text-signal">
              ● Summa Cum Laude
            </span>
            <span className="rounded border border-border bg-surface px-3 py-1.5 text-foreground font-semibold">
              ● 100% Blue Scholar
            </span>
            <span className="rounded border border-border bg-surface px-3 py-1.5 text-foreground font-semibold">
              ● 4 Dev Roles
            </span>
          </div>
        </div>
      </div>

      {/* 01 Git Log Career Timeline */}
      <ExperienceTimeline />

      {/* 02 Academic Credentials Dossier */}
      <AcademicHonors />
    </div>
  );
}
