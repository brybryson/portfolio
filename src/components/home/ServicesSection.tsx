import { ArrowUpRight, Bot, Boxes, CheckCircle2, Cpu, Database, Layers, Sparkles, Workflow, Zap } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { SectionLabel } from "@/components/common/SectionLabel";

const SERVICES = [
  {
    id: "ai-automation",
    index: "01",
    icon: Bot,
    title: "Autonomous AI & Workflow Automation",
    subtitle: "Eliminate repetitive operations & manual data entry with self-healing AI pipelines.",
    color: "var(--pulse-c)",
    deliverables: [
      "Custom n8n & Python multi-branch orchestration engines",
      "Semantic RAG vector memory (Supabase pgvector / Gemini Embeddings)",
      "Intelligent inbound email & lead triage with JSON schema validation",
      "Slack / Telegram operations bots & automated executive escalation",
      "Zero-silent-failure error telemetry & self-healing retry policies",
    ],
    highlight: "<3s Real-Time Triage · 100% Fault Tolerant",
    tag: "High ROI Automation",
  },
  {
    id: "fullstack-saas",
    index: "02",
    icon: Layers,
    title: "Full-Stack Web & SaaS Application Engineering",
    subtitle: "High-converting, scalable digital products with frame-accurate responsiveness.",
    color: "var(--signal)",
    deliverables: [
      "Modern Next.js 15 (App Router) & React 19 web platforms",
      "Atomic booking funnels & conflict-free scheduling locks",
      "Enterprise staff administrative portals with RBAC/JWT security",
      "HTML5 Canvas & ImageDecoder high-performance media streams",
      "Playwright automated E2E testing & CI/CD deployment pipelines",
    ],
    highlight: "100% E2E Coverage · 0ms ArrayBuffer Streams",
    tag: "Production Ready",
  },
  {
    id: "enterprise-systems",
    index: "03",
    icon: Boxes,
    title: "Custom Enterprise Systems & POS Platforms",
    subtitle: "Bespoke internal business tools designed for high-volume operational workflows.",
    color: "var(--flow)",
    deliverables: [
      "Custom inventory tracking & automated stockout warning digests",
      "Automated invoice & medical certificate PDF generation",
      "Rule-based decision support & hand-book compliance systems",
      "Robust PostgreSQL & MySQL relational schema design",
      "Role-based access control with comprehensive audit logging",
    ],
    highlight: "80% Time Saved · Centralized Database",
    tag: "Mission Critical",
  },
  {
    id: "rag-hardware",
    index: "04",
    icon: Cpu,
    title: "AI Knowledge Ingestion & IoT Systems",
    subtitle: "Turn messy company documents into 24/7 AI assistants & sensory IoT networks.",
    color: "#22C55E",
    deliverables: [
      "Automated Google Drive / PDF knowledge chunking & vector sync",
      "24/7 customer support RAG AI companion grounded in company SOPs",
      "IoT sensor nodes (flood, environmental, anti-theft tracking)",
      "Real-time event broadcasting via WebSockets & Firebase",
      "Privacy-first GDPR-aligned client telemetry & bot filtering",
    ],
    highlight: "Vector Search · IoT Sensor Integration",
    tag: "Specialized Engineering",
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="py-20">
      <SectionLabel index="01" label="what i deliver" hint="solutions & client offerings" />

      <div className="mt-8 flex flex-col gap-4">
        <div className="flex flex-col gap-2 max-w-3xl">
          <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Engineering High-Impact Systems That Solve Real Operational Bottlenecks
          </h2>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
            Whether you need autonomous AI pipelines to run your business in the background, a high-converting web platform, or a custom internal operating system — here is exactly what I build and deliver.
          </p>
        </div>

        {/* 4 Service Cards Grid */}
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          {SERVICES.map((srv) => {
            const Icon = srv.icon;
            return (
              <div
                key={srv.id}
                className="group relative flex flex-col justify-between overflow-hidden rounded-sm border border-border-strong bg-card/85 p-6 md:p-8 backdrop-blur transition-all duration-300 hover:border-signal/80 hover:shadow-xl"
                style={{ borderTopColor: srv.color, borderTopWidth: 2 }}
              >
                {/* Header info */}
                <div>
                  <div className="flex items-center justify-between border-b border-border/80 pb-4 text-mono">
                    <div className="flex items-center gap-2">
                      <span className="flex h-7 w-7 items-center justify-center rounded-sm bg-surface-2 border border-border text-foreground">
                        <Icon className="h-4 w-4" style={{ color: srv.color }} />
                      </span>
                      <span className="text-xs font-bold text-foreground">[{srv.index}]</span>
                    </div>
                    <span
                      className="rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
                      style={{
                        borderColor: `${srv.color}40`,
                        background: `${srv.color}15`,
                        color: srv.color,
                      }}
                    >
                      {srv.tag}
                    </span>
                  </div>

                  <h3 className="mt-4 text-xl font-bold tracking-tight text-foreground md:text-2xl group-hover:text-signal transition-colors">
                    {srv.title}
                  </h3>
                  <p className="mt-2 text-xs md:text-sm text-muted-foreground leading-relaxed">
                    {srv.subtitle}
                  </p>

                  {/* Deliverables List */}
                  <div className="mt-5 flex flex-col gap-2">
                    <span className="text-mono text-[10.5px] uppercase tracking-widest text-muted-foreground font-semibold">
                      WHAT I BUILD & DELIVER:
                    </span>
                    <ul className="flex flex-col gap-2 text-xs text-foreground/90 font-mono">
                      {srv.deliverables.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="h-3.5 w-3.5 shrink-0 mt-0.5 text-signal" />
                          <span className="leading-snug">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Bottom Highlight & CTA */}
                <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-border/80 pt-4 text-mono text-xs">
                  <div className="flex items-center gap-1.5 text-muted-foreground text-[11px]">
                    <Sparkles className="h-3.5 w-3.5 text-signal" />
                    <span className="font-semibold text-foreground">{srv.highlight}</span>
                  </div>

                  <Link
                    to="/projects"
                    className="inline-flex items-center gap-1 font-bold text-signal hover:underline"
                  >
                    <span>View Proven Systems</span>
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
