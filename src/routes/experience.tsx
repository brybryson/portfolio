import { createFileRoute } from "@tanstack/react-router";
import { Briefcase, GraduationCap } from "lucide-react";
import { ExperienceLog } from "@/components/home/ExperienceLog";
import { Education } from "@/components/home/Education";
import { SkillsSection } from "@/components/home/SkillsSection";

export const Route = createFileRoute("/experience")({
  head: () => ({
    meta: [
      { title: "Experience & Education — Bryant Melliza" },
      {
        name: "description",
        content:
          "Career timeline, software internships at OneNetworx, JLabs, NLP, and academic honors at National University Fairview.",
      },
    ],
  }),
  component: ExperiencePage,
});

function ExperiencePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-3 border-b border-border-strong pb-8">
        <div className="flex items-center gap-2 text-mono text-xs text-signal font-semibold">
          <Briefcase className="h-4 w-4" />
          <span>CAREER LOG // EXPERIENCE & CREDENTIALS</span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
          Professional Journey & Academic Excellence
        </h1>
        <p className="text-sm leading-relaxed text-muted-foreground md:text-base max-w-3xl">
          Detailed log of industry software internships, freelance full-stack client deliveries, and
          academic achievements including 100% Full Merit Blue Scholar and Summa Cum Laude honors.
        </p>
      </div>

      <ExperienceLog />
      <Education />
      <SkillsSection />
    </div>
  );
}
