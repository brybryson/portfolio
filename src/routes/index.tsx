import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/home/Hero";
import { ServicesSection } from "@/components/home/ServicesSection";
import { InteractiveSkills } from "@/components/home/InteractiveSkills";
import { FlagshipTeaser } from "@/components/home/FlagshipTeaser";
import { LiveDemo } from "@/components/home/LiveDemo";
import { ContactSection } from "@/components/home/ContactSection";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Bryant Melliza — Software Developer & AI Systems Architect" },
      {
        name: "description",
        content:
          "Portfolio of Bryant Melliza — Full-Stack Developer & AI Systems Architect specializing in autonomous n8n workflows, Next.js 15 platforms, and custom enterprise tools.",
      },
      { property: "og:title", content: "Bryant Melliza — Software Developer & AI Systems Architect" },
      {
        property: "og:description",
        content: "Autonomous AI Workflows, Next.js 15 Web Platforms & Custom Enterprise Systems.",
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
      {/* 00 Hero Identity — original precious hero */}
      <Hero onOpenPalette={handleOpenPalette} />

      {/* 01 What I Offer & Client Deliverables (4 Core Services) */}
      <ServicesSection />

      {/* 02 Interactive Animated Technical Stack */}
      <InteractiveSkills />

      {/* 03 Flagship Spotlight Teaser */}
      <FlagshipTeaser />

      {/* 04 Interactive Live Demo Agent */}
      <LiveDemo />

      {/* 05 Connect & Channels */}
      <ContactSection />
    </div>
  );
}
