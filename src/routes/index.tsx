import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Hero } from "@/components/home/Hero";
import { DirectoryExplorer } from "@/components/projects/DirectoryExplorer";
import { CaseStudy } from "@/components/projects/CaseStudy";
import { LiveDemo } from "@/components/home/LiveDemo";
import { ExperienceLog } from "@/components/home/ExperienceLog";
import { Education } from "@/components/home/Education";
import { CertificatesSection } from "@/components/home/CertificatesSection";
import { SkillsSection } from "@/components/home/SkillsSection";
import { ContactSection } from "@/components/home/ContactSection";
import { SectionLabel } from "@/components/common/SectionLabel";
import { PROJECTS } from "@/data/projects";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Bryant Melliza — Software Developer" },
      {
        name: "description",
        content:
          "Portfolio of Bryant Melliza — full-stack developer (React, Next.js, Prisma) engineering scalable digital solutions from Caloocan City, PH.",
      },
      { property: "og:title", content: "Bryant Melliza — Software Developer" },
      {
        property: "og:description",
        content: "Engineering scalable digital solutions. React · Next.js · Prisma.",
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const [activeSlug, setActiveSlug] = useState<string>(PROJECTS[0].slug);
  const activeProject = PROJECTS.find((p) => p.slug === activeSlug) ?? PROJECTS[0];

  const handleOpenPalette = () => {
    window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", metaKey: true }));
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      {/* Hero Section — precious original restored */}
      <Hero onOpenPalette={handleOpenPalette} />

      {/* Projects Pipeline Canvas — Expansive & Wider */}
      <section id="projects" className="py-20">
        <SectionLabel index="01" label="projects" hint="ai automation · web · systems" />
        <div className="mt-8 grid grid-cols-1 items-start gap-6 lg:grid-cols-[300px_1fr] lg:gap-8">
          <DirectoryExplorer
            projects={PROJECTS.filter((p) => p.tier !== "archive")}
            active={activeSlug}
            setActive={setActiveSlug}
          />
          <div className="sticky top-20">
            <CaseStudy project={activeProject} />
          </div>
        </div>
      </section>

      {/* Live Demo Agent */}
      <LiveDemo />

      {/* Career Experience & Credentials */}
      <ExperienceLog />
      <Education />

      {/* Certificates & Badges (Initial 6 + Show More) */}
      <CertificatesSection showFilter={true} />

      {/* Technical Toolkit */}
      <SkillsSection />

      {/* Contact Section */}
      <ContactSection />
    </div>
  );
}
