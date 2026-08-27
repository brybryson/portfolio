import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Boxes, Sparkles } from "lucide-react";
import { Hero } from "@/components/home/Hero";
import { PinnedBento } from "@/components/projects/PinnedBento";
import { LiveDemo } from "@/components/home/LiveDemo";
import { ExperienceLog } from "@/components/home/ExperienceLog";
import { Education } from "@/components/home/Education";
import { CertificatesSection } from "@/components/home/CertificatesSection";
import { SkillsSection } from "@/components/home/SkillsSection";
import { ContactSection } from "@/components/home/ContactSection";
import { SectionLabel } from "@/components/common/SectionLabel";
import { PROJECTS } from "@/data/projects";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <Hero onOpenPalette={() => {
        window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", metaKey: true }));
      }} />

      {/* Pinned Flagship Spotlight (Tier 1) */}
      <section id="flagship" className="py-16">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between mb-8">
          <div>
            <SectionLabel
              index="01"
              label="flagship systems spotlight"
              hint="autonomous pipelines · web applications · enterprise iot"
            />
          </div>
          <Link
            to="/projects"
            className="inline-flex items-center gap-1.5 text-mono text-xs font-semibold text-signal hover:underline shrink-0"
          >
            <span>View All 20 Shipped Projects</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <PinnedBento projects={PROJECTS} />

        <div className="mt-8 flex justify-center">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 rounded-sm border border-border-strong bg-surface px-6 py-3 text-mono text-xs font-semibold uppercase tracking-wider text-foreground shadow-sm transition hover:border-signal hover:bg-surface-2"
          >
            <Boxes className="h-4 w-4 text-signal" />
            <span>Open System Pipeline Explorer & Full Directory</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </section>

      {/* Live Demo Resume Agent */}
      <LiveDemo />

      {/* Experience & Education */}
      <ExperienceLog />
      <Education />

      {/* Skills & Certifications */}
      <SkillsSection />
      <CertificatesSection showFilter={false} />

      {/* Contact Section */}
      <ContactSection />
    </div>
  );
}
