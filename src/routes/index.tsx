import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/home/Hero";
import { ProjectShowcase } from "@/components/projects/ProjectShowcase";
import { LiveDemo } from "@/components/home/LiveDemo";
import { ExperienceLog } from "@/components/home/ExperienceLog";
import { Education } from "@/components/home/Education";
import { CertificatesSection } from "@/components/home/CertificatesSection";
import { SkillsSection } from "@/components/home/SkillsSection";
import { ContactSection } from "@/components/home/ContactSection";
import { SectionLabel } from "@/components/common/SectionLabel";

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
  const handleOpenPalette = () => {
    window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", metaKey: true }));
  };

  return (
    <div className="mx-auto max-w-[1440px] px-6 md:px-10">
      {/* Hero Section */}
      <Hero onOpenPalette={handleOpenPalette} />

      {/* Skills / Toolkit Section */}
      <SkillsSection />

      {/* Projects Showcase — Full-Width Expansive Architecture */}
      <section id="projects" className="py-20">
        <SectionLabel index="01" label="projects" hint="ai automation · web · systems" />
        <div className="mt-8">
          <ProjectShowcase />
        </div>
      </section>

      {/* Live Demo Agent */}
      <LiveDemo />

      {/* Career Experience & Credentials */}
      <ExperienceLog />
      <Education />

      {/* Certificates & Badges (Initial 6 + Show More) */}
      <CertificatesSection showFilter={true} />

      {/* Contact Section */}
      <ContactSection />
    </div>
  );
}
