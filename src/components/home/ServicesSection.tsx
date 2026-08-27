import React from "react";
import {
  ArrowUpRight,
  Bot,
  Boxes,
  CheckCircle2,
  Layers,
  MessageSquareCode,
  Palette,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { SectionLabel } from "@/components/common/SectionLabel";

const SERVICES = [
  {
    index: "01",
    icon: Bot,
    title: "AI & Workflow Automation",
    tag: "High ROI Automation",
    summary: "Self-healing backend pipelines that eliminate repetitive operations, manual triage, and data entry.",
    points: [
      "Multi-branch n8n & Python pipelines with automated retries",
      "Smart inbound email & lead triage with schema validation",
      "Slack / Telegram operations bots with real-time alerts",
      "Zero-silent-failure central error handler & telemetry",
    ],
    metric: "n8n · Python · APIs · Webhooks",
    span: "lg:col-span-1",
  },
  {
    index: "02",
    icon: Palette,
    title: "UI/UX Design & Prototyping",
    tag: "Design Systems",
    summary: "Modern developer aesthetics, glassmorphism interfaces, and high-converting conversion funnels.",
    points: [
      "Figma design systems, tokens, and component libraries",
      "Dark-mode first, glassmorphic UI with micro-animations",
      "Interactive click-through prototypes for user testing",
      "Responsive, mobile-optimized accessible layouts",
    ],
    metric: "Figma · Design Systems · UI/UX",
    span: "lg:col-span-1",
  },
  {
    index: "03",
    icon: Layers,
    title: "Full-Stack Web & SaaS Platforms",
    tag: "Production Ready",
    summary: "Enterprise web applications built with Next.js 15, React 19, TypeScript, and Supabase.",
    points: [
      "Next.js 15 App Router & React 19 server-side architecture",
      "Dynamic booking funnels with atomic real-time slot locks",
      "Secure staff admin portals with RBAC & JWT authentication",
      "Playwright automated E2E testing & CI/CD deployment",
    ],
    metric: "Next.js 15 · React 19 · TypeScript",
    span: "lg:col-span-1",
  },
  {
    index: "04",
    icon: MessageSquareCode,
    title: "AI Chatbots & RAG Companions",
    tag: "RAG Vector Memory",
    summary: "24/7 intelligent conversational agents (like Lumi) grounded in verified business SOPs.",
    points: [
      "24/7 RAG AI assistants powered by Gemini & LLaMA",
      "Supabase pgvector (768-dim) semantic vector similarity search",
      "Google Drive automated PDF ingestion & chunking sync",
      "Automated lead capture & urgent clinical/support escalation",
    ],
    metric: "Gemini · Supabase pgvector · RAG",
    span: "lg:col-span-1 md:col-span-1",
  },
  {
    index: "05",
    icon: Boxes,
    title: "Custom Enterprise & POS Systems",
    tag: "Mission Critical",
    summary: "Bespoke internal platforms for inventory, automated PDF report generation, and compliance.",
    points: [
      "Custom POS terminals & automated stockout warning digests",
      "Automated medical certificate & invoice PDF generation",
      "Rule-based AI decision support for handbook compliance",
      "RFID hardware sensor integration for live tracking",
    ],
    metric: "PostgreSQL · PHP · MySQL · Systems",
    span: "lg:col-span-2 md:col-span-2",
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="py-20">
      <SectionLabel index="01" label="services" hint="solutions & client offerings" />

      <div className="mt-8 flex flex-col gap-8">
        {/* Section Header */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between border-b border-border/80 pb-6">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              Solutions & Client Offerings
            </h2>
            <p className="mt-2 text-sm md:text-base text-muted-foreground leading-relaxed">
              End-to-end engineering: from luxury UI/UX design and full-stack web platforms to autonomous AI pipelines and custom enterprise operating systems.
            </p>
          </div>

          <Link
            to="/projects"
            className="inline-flex items-center gap-1.5 font-bold text-mono text-xs uppercase text-signal hover:underline shrink-0"
          >
            <span>View All Shipped Systems</span>
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Contained Responsive Grid (No Overflow / No Edge Bleed) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((srv) => {
            const Icon = srv.icon;
            return (
              <div
                key={srv.index}
                className={`group flex flex-col justify-between rounded-sm border border-border-strong bg-card p-7 sm:p-8 transition-all duration-300 hover:border-signal hover:shadow-xl ${srv.span}`}
              >
                <div>
                  {/* Card Header */}
                  <div className="flex items-center justify-between border-b border-border/80 pb-4 text-mono">
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded border border-border bg-surface-2 text-signal shadow-sm group-hover:border-signal transition">
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="text-sm font-bold text-foreground">[{srv.index}]</span>
                    </div>
                    <span className="rounded-full border border-signal/30 bg-signal/10 px-3 py-1 text-[11px] font-semibold text-signal uppercase tracking-wider">
                      {srv.tag}
                    </span>
                  </div>

                  {/* Title & Summary */}
                  <h3 className="mt-5 text-xl font-bold tracking-tight text-foreground group-hover:text-signal transition">
                    {srv.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {srv.summary}
                  </p>

                  {/* Deliverables List */}
                  <div className="mt-5 flex flex-col gap-2">
                    <span className="text-mono text-[11px] uppercase tracking-widest text-foreground font-semibold">
                      WHAT I DELIVER:
                    </span>
                    <ul className="flex flex-col gap-2 text-xs text-foreground/90 font-mono">
                      {srv.points.map((pt, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5 text-signal" />
                          <span className="leading-snug">{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="mt-6 flex items-center justify-between border-t border-border/80 pt-4 text-mono text-xs">
                  <span className="text-[11px] text-muted-foreground font-semibold uppercase">
                    {srv.metric}
                  </span>

                  <Link
                    to="/projects"
                    className="inline-flex items-center gap-1 font-bold text-signal hover:underline"
                  >
                    <span>View Projects</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
