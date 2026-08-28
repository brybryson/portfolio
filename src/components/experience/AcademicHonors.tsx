import React from "react";
import {
  Award,
  BookOpen,
  Crown,
  GraduationCap,
  Medal,
  School,
  Sparkles,
  Star,
  Trophy,
} from "lucide-react";
import { EDUCATION } from "@/data/experience";

export function AcademicHonors() {
  const college = EDUCATION[0];
  const highSchool = EDUCATION[1];

  const collegeHonors = [
    {
      title: "Summa Cum Laude",
      desc: "Highest Latin Academic Honor",
      icon: Crown,
      highlight: true,
    },
    {
      title: "100% Full Merit Blue Scholar",
      desc: "Full Tuition Merit Scholarship (All Academic Terms)",
      icon: Medal,
      highlight: true,
    },
    {
      title: "Academic Excellence Award",
      desc: "Top Ranked IT Department Award (2025–2026)",
      icon: Trophy,
      highlight: true,
    },
    {
      title: "Consistent First Honor Dean's Lister",
      desc: "Maintained top GPA standing across all 4 academic years",
      icon: Star,
      highlight: false,
    },
    {
      title: "Former Chief Creative Officer",
      desc: "Google Developer Student Clubs (GDSC) NU Fairview",
      icon: Sparkles,
      highlight: false,
    },
    {
      title: "Champion – UI/UX Design Competition",
      desc: "1st Place for Interface Design & User Journey",
      icon: Award,
      highlight: false,
    },
    {
      title: "Champion – Networking Competition",
      desc: "1st Place in Network Topology & Infrastructure",
      icon: Award,
      highlight: false,
    },
    {
      title: "Sole Awardee – Best Web Game Design",
      desc: "XOXO Interactive Web Game Architecture",
      icon: Trophy,
      highlight: false,
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Section Header */}
      <div className="flex items-center justify-between border-b border-border/80 pb-4">
        <div className="flex items-center gap-2 text-mono text-xs text-signal font-semibold uppercase tracking-wider">
          <GraduationCap className="h-4 w-4" />
          <span>ACADEMIC DOSSIER // DEGREES &amp; HONORS</span>
        </div>
        <span className="text-mono text-[11px] text-muted-foreground">
          National University Fairview · Class of 2026
        </span>
      </div>

      {/* Unified Academic Dossier Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left / Major: National University Fairview (8 cols) */}
        <article className="lg:col-span-8 flex flex-col justify-between overflow-hidden rounded-sm border border-border-strong bg-card shadow-xl transition-all duration-300 hover:border-signal/80">
          <div>
            {/* macOS Titlebar */}
            <div className="flex items-center justify-between border-b border-border bg-surface-2 px-4 py-2.5 text-mono text-xs uppercase tracking-wider text-muted-foreground">
              <div className="flex items-center gap-2.5">
                <div className="flex gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-[#FF5F56]" />
                  <div className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E]" />
                  <div className="h-2.5 w-2.5 rounded-full bg-[#27C93F]" />
                </div>
                <span className="font-bold text-foreground">HIGHER_EDUCATION // NU_FAIRVIEW</span>
              </div>
              <span className="rounded bg-signal/15 border border-signal/40 px-2 py-0.5 text-[10px] font-bold text-signal">
                SUMMA CUM LAUDE
              </span>
            </div>

            {/* University Profile Info */}
            <div className="p-6 sm:p-7 border-b border-border/80 bg-surface/40 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
              <div className="flex items-start sm:items-center gap-4">
                <img
                  src={college.logo}
                  alt={college.school}
                  className="h-14 w-14 shrink-0 rounded border border-border bg-surface object-contain p-1.5 shadow-sm"
                  onError={(e) => {
                    const el = e.currentTarget as HTMLImageElement;
                    el.style.display = "none";
                  }}
                />
                <div>
                  <div className="flex items-center gap-2 text-mono text-xs text-muted-foreground">
                    <span className="text-signal font-semibold uppercase">{college.detail}</span>
                    <span>·</span>
                    <span>{college.period}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground mt-0.5">
                    {college.school}
                  </h3>
                  <p className="text-xs sm:text-sm font-semibold text-foreground mt-0.5">
                    {college.degree}
                  </p>
                  <p className="text-xs text-muted-foreground font-mono">
                    {college.specialization}
                  </p>
                </div>
              </div>

              {/* Scholar Tag */}
              <div className="flex flex-col sm:items-end justify-center border-t sm:border-t-0 border-border/60 pt-3 sm:pt-0 shrink-0">
                <span className="text-mono text-[10px] uppercase text-muted-foreground font-semibold">
                  Scholarship
                </span>
                <span className="rounded border border-signal bg-signal/10 px-3 py-1 text-mono text-xs font-bold text-signal mt-1">
                  100% Blue Scholar
                </span>
              </div>
            </div>

            {/* Honors & Awards Grid */}
            <div className="p-6 sm:p-7">
              <span className="text-mono text-xs uppercase tracking-widest text-muted-foreground font-bold block mb-4">
                HONORS, COMPETITIONS &amp; LEADERSHIP:
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {collegeHonors.map((h, idx) => {
                  const Icon = h.icon;
                  return (
                    <div
                      key={idx}
                      className={`flex items-start gap-3 rounded-sm border p-3.5 transition ${
                        h.highlight
                          ? "border-signal/50 bg-surface-2 shadow-sm"
                          : "border-border bg-card/60"
                      }`}
                    >
                      <span
                        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded ${
                          h.highlight
                            ? "bg-signal/20 text-signal"
                            : "bg-surface text-muted-foreground"
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                      </span>
                      <div className="min-w-0">
                        <h4 className="text-xs font-bold text-foreground leading-snug">
                          {h.title}
                        </h4>
                        <p className="text-[11px] text-muted-foreground font-mono leading-relaxed mt-0.5">
                          {h.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </article>

        {/* Right: Senior High School Card (4 cols) */}
        <article className="lg:col-span-4 flex flex-col justify-between overflow-hidden rounded-sm border border-border-strong bg-card shadow-xl transition-all duration-300 hover:border-signal/80">
          <div>
            {/* macOS Titlebar */}
            <div className="flex items-center justify-between border-b border-border bg-surface-2 px-4 py-2.5 text-mono text-xs uppercase tracking-wider text-muted-foreground">
              <div className="flex items-center gap-2">
                <School className="h-3.5 w-3.5 text-flow" />
                <span className="font-bold text-foreground">SECONDARY_EDUCATION</span>
              </div>
              <span className="text-[10.5px] text-muted-foreground font-mono">
                {highSchool.period}
              </span>
            </div>

            {/* High School Info */}
            <div className="p-6 border-b border-border/80 bg-surface/40 flex items-start gap-3.5">
              <img
                src={highSchool.logo}
                alt={highSchool.school}
                className="h-12 w-12 shrink-0 rounded border border-border bg-surface object-contain p-1.5 shadow-sm"
                onError={(e) => {
                  const el = e.currentTarget as HTMLImageElement;
                  el.style.display = "none";
                }}
              />
              <div>
                <span className="text-mono text-[10.5px] uppercase text-signal font-semibold">
                  {highSchool.detail}
                </span>
                <h4 className="text-base font-bold text-foreground leading-snug mt-0.5">
                  {highSchool.school}
                </h4>
                <p className="text-xs text-muted-foreground font-mono mt-0.5">
                  {highSchool.degree} ({highSchool.specialization})
                </p>
              </div>
            </div>

            {/* High School Honors List */}
            <div className="p-6 flex flex-col gap-3">
              <span className="text-mono text-xs uppercase tracking-widest text-muted-foreground font-bold">
                HIGH SCHOOL CITATIONS:
              </span>

              <div className="flex flex-col gap-2.5 text-mono text-xs">
                {highSchool.honors.map((h, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2.5 rounded-sm border border-border bg-surface p-3 text-foreground"
                  >
                    <Medal className="h-4 w-4 shrink-0 text-signal mt-0.5" />
                    <span className="leading-snug">{h}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="p-4 border-t border-border/80 bg-surface-2/60 text-mono text-[11px] text-muted-foreground">
            Graduated STEM with High Honors Distinction
          </div>
        </article>
      </div>
    </div>
  );
}
