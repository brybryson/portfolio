import React from "react";
import {
  ArrowUpRight,
  Briefcase,
  CheckCircle2,
  GitBranch,
  GitCommit,
  Layers,
  Sparkles,
} from "lucide-react";
import { EXPERIENCE } from "@/data/experience";

export function ExperienceTimeline() {
  const experiencesWithStack = [
    {
      ...EXPERIENCE[0],
      highlights: [
        "Architected end-to-end custom web and mobile platforms for diverse client requirements.",
        "Engineered scalable full-stack applications with React, Next.js 15, TypeScript, and Supabase/PostgreSQL.",
        "Implemented high-converting UI/UX conversion funnels and integrated modern AI tooling to accelerate delivery cycles.",
      ],
      stack: [
        "Next.js 15",
        "React 19",
        "TypeScript",
        "PostgreSQL",
        "Supabase",
        "REST APIs",
        "Tailwind CSS",
      ],
    },
    {
      ...EXPERIENCE[1],
      highlights: [
        "Engineered responsive insurance client portals using React, Vite, and Tailwind CSS.",
        "Built dynamic multi-step insurance quote funnels with client-side state validation.",
        "Migrated email delivery infrastructure to Gmail REST API via secure OAuth2 tokens.",
        "Architected real-time data sync with Supabase (PostgreSQL) and serverless database triggers.",
      ],
      stack: ["React", "Vite", "Tailwind CSS", "Gmail OAuth2 API", "Supabase (PostgreSQL)", "Git"],
    },
    {
      ...EXPERIENCE[2],
      highlights: [
        "Contributed to cross-platform mobile solutions using React Native, Expo, and TypeScript.",
        "Integrated intelligent AI assistants using the Anthropic Claude API with strict Zod schema validation.",
        "Debugged and optimized real-time state synchronization flows across mobile devices.",
        "Collaborated within fast-paced Agile sprint cycles utilizing ClickUp, Jira, and Git.",
      ],
      stack: [
        "React Native",
        "Expo",
        "TypeScript",
        "Anthropic Claude API",
        "Zod",
        "ClickUp",
        "Git",
      ],
    },
    {
      ...EXPERIENCE[3],
      highlights: [
        "Engineered business management modules with React, Next.js, PostgreSQL, and Prisma ORM.",
        "Maintained and modernized legacy PHP and CodeIgniter database workflows.",
        "Modernized legacy UI/UX interfaces to responsive, accessible dark-mode standards.",
        "Accelerated development velocity by integrating AI tooling into the Bitbucket CI/CD pipeline.",
      ],
      stack: ["React", "Next.js", "PostgreSQL", "Prisma ORM", "PHP", "CodeIgniter", "Bitbucket"],
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/80 pb-4">
        <div className="flex items-center gap-2 text-mono text-xs text-signal font-semibold uppercase tracking-wider">
          <GitBranch className="h-4 w-4" />
          <span>GIT LOG // CAREER TIMELINE</span>
        </div>
        <span className="text-mono text-[11px] text-muted-foreground">
          4 Developer Roles · Continuous Production Delivery
        </span>
      </div>

      {/* Perfectly Centered Git Log Timeline */}
      <div className="flex flex-col">
        {experiencesWithStack.map((exp, idx) => (
          <div key={exp.hash} className="group flex items-stretch gap-3 sm:gap-6">
            {/* Left Track & Centered Node */}
            <div className="flex flex-col items-center shrink-0 w-7 sm:w-10 pt-1.5">
              {/* Centered Circular Git Node */}
              <div className="flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-full border-2 border-signal bg-card shadow-[0_0_10px_rgba(0,229,255,0.35)] group-hover:scale-110 group-hover:border-signal group-hover:shadow-[0_0_14px_rgba(0,229,255,0.6)] transition-all">
                <GitCommit className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-signal" />
              </div>

              {/* Connecting Track Line */}
              {idx < experiencesWithStack.length - 1 && (
                <div className="w-0.5 grow bg-border-strong/80 my-2 transition-colors group-hover:bg-signal/40" />
              )}
            </div>

            {/* Right Experience Card */}
            <div className="flex-1 min-w-0 pb-8 sm:pb-10">
              <article className="overflow-hidden rounded-sm border border-border-strong bg-card shadow-lg transition-all duration-300 hover:border-signal hover:shadow-2xl">
                {/* Card macOS Window Bar */}
                <div className="flex items-center justify-between border-b border-border bg-surface-2 px-4 py-2.5 text-mono text-xs uppercase tracking-wider text-muted-foreground">
                  <div className="flex items-center gap-2.5 truncate">
                    <span className="font-bold text-foreground">commit {exp.hash}</span>
                    <span className="text-border-strong">·</span>
                    <span className="text-signal font-semibold truncate">{exp.period}</span>
                  </div>
                  <span className="text-[10px] rounded bg-surface border border-border px-2 py-0.5 text-muted-foreground font-mono shrink-0 ml-2">
                    HEAD~{idx}
                  </span>
                </div>

                {/* Card Body */}
                <div className="p-5 sm:p-7 flex flex-col gap-5">
                  {/* Role & Company Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-4">
                    <div className="flex items-start sm:items-center gap-3.5">
                      <img
                        src={exp.logo}
                        alt={exp.company}
                        className="h-11 w-11 shrink-0 rounded border border-border bg-surface object-contain p-1.5 shadow-sm"
                        onError={(e) => {
                          const el = e.currentTarget as HTMLImageElement;
                          el.style.display = "none";
                        }}
                      />
                      <div>
                        <h3 className="text-base sm:text-xl font-bold text-foreground tracking-tight group-hover:text-signal transition leading-snug">
                          {exp.role}
                        </h3>
                        <div className="flex items-center gap-1.5 text-mono text-xs mt-0.5">
                          <span className="text-muted-foreground">at</span>
                          {exp.companyUrl ? (
                            <a
                              href={exp.companyUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1 font-semibold text-signal hover:underline"
                            >
                              <span>{exp.company}</span>
                              <ArrowUpRight className="h-3.5 w-3.5" />
                            </a>
                          ) : (
                            <span className="font-semibold text-signal">{exp.company}</span>
                          )}
                        </div>
                      </div>
                    </div>

                    <span className="self-start sm:self-auto rounded-full border border-border bg-surface px-3 py-1 text-mono text-[11px] font-semibold text-foreground">
                      {exp.period}
                    </span>
                  </div>

                  {/* Key Achievements Bullet Checklist */}
                  <div className="flex flex-col gap-2">
                    <span className="text-mono text-xs uppercase tracking-widest text-muted-foreground font-semibold">
                      KEY DELIVERABLES &amp; IMPACT:
                    </span>
                    <ul className="flex flex-col gap-2 text-xs sm:text-[13px] text-foreground/90 font-mono">
                      {exp.highlights.map((point, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5 text-signal" />
                          <span className="leading-relaxed">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech Stack Chips */}
                  <div className="flex flex-wrap items-center gap-1.5 border-t border-border/60 pt-4">
                    <span className="text-mono text-[11px] text-muted-foreground mr-1 uppercase">
                      STACK:
                    </span>
                    {exp.stack.map((tech, i) => (
                      <span
                        key={i}
                        className="rounded border border-border bg-surface px-2 py-0.5 text-mono text-[10.5px] text-foreground font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
