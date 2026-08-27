import React from "react";
import {
  Award,
  BookOpen,
  CheckCircle2,
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

  const collegeAwards = [
    { title: "Summa Cum Laude", desc: "Highest Latin Academic Honor", icon: Crown, highlight: true },
    { title: "100% Full Merit Blue Scholar", desc: "Full Tuition Merit Scholarship (All Terms)", icon: Medal, highlight: true },
    { title: "Academic Excellence Award", desc: "Top Ranked IT Department Academic Award (2025–2026)", icon: Trophy, highlight: true },
    { title: "Consistent First Honor Dean's Lister", desc: "Maintained top GPA standing across all academic years", icon: Star, highlight: false },
    { title: "Former Chief Creative Officer", desc: "Google Developer Student Clubs (GDSC) NU Fairview", icon: Sparkles, highlight: false },
    { title: "Champion – UI/UX Design Competition", desc: "Awarded 1st Place for Interface Architecture", icon: Award, highlight: false },
    { title: "Champion – Networking Competition", desc: "Top Performance in Network Topology & Routing", icon: Award, highlight: false },
    { title: "Sole Awardee – Best Web Game Design", desc: "XOXO Interactive Web Game Architecture", icon: Trophy, highlight: false },
  ];

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border/80 pb-4">
        <div className="flex items-center gap-2 text-mono text-xs text-signal font-semibold uppercase tracking-wider">
          <GraduationCap className="h-4 w-4" />
          <span>ACADEMIC DOSSIER // DEGREES &amp; HONORS</span>
        </div>
        <span className="text-mono text-[11px] text-muted-foreground">
          National University Fairview · Summa Cum Laude
        </span>
      </div>

      {/* College Prestige Banner (National University Fairview) */}
      <div className="overflow-hidden rounded-sm border-2 border-signal/60 bg-card shadow-2xl backdrop-blur">
        {/* macOS Titlebar */}
        <div className="flex items-center justify-between border-b border-border bg-surface-2 px-5 py-2.5 text-mono text-xs uppercase tracking-wider text-muted-foreground">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <div className="h-2.5 w-2.5 rounded-full bg-[#FF5F56]" />
              <div className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E]" />
              <div className="h-2.5 w-2.5 rounded-full bg-[#27C93F]" />
            </div>
            <span className="font-bold text-foreground">NU_FAIRVIEW_CREDENTIALS.LOG</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="rounded bg-signal/15 border border-signal/40 px-2 py-0.5 text-[10.5px] font-bold text-signal">
              SUMMA CUM LAUDE
            </span>
          </div>
        </div>

        {/* Institution Info Banner */}
        <div className="border-b border-border/80 bg-surface/50 p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="flex items-start sm:items-center gap-4">
              <img
                src={college.logo}
                alt={college.school}
                className="h-16 w-16 shrink-0 rounded border border-border bg-surface object-contain p-2 shadow-md"
                onError={(e) => {
                  const el = e.currentTarget as HTMLImageElement;
                  el.style.display = "none";
                }}
              />
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span className="rounded bg-flow/15 px-2 py-0.5 text-mono text-[10.5px] font-bold text-flow uppercase">
                    Higher Education
                  </span>
                  <span className="text-mono text-xs text-muted-foreground">{college.period}</span>
                </div>
                <h3 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                  {college.school}
                </h3>
                <p className="text-sm font-semibold text-signal">
                  {college.degree}
                </p>
                <p className="text-xs text-muted-foreground font-mono">
                  {college.specialization}
                </p>
              </div>
            </div>

            {/* Merit Scholar Highlight Badge */}
            <div className="flex sm:flex-col items-center sm:items-end justify-between border-t sm:border-t-0 border-border/60 pt-3 sm:pt-0 gap-1 text-mono shrink-0">
              <span className="text-[10.5px] uppercase text-muted-foreground font-semibold">Scholarship Status</span>
              <div className="rounded border border-signal bg-signal/10 px-3 py-1.5 text-xs font-bold text-signal shadow-sm">
                100% Full Merit Blue Scholar
              </div>
            </div>
          </div>
        </div>

        {/* College Honors & Leadership Awards Grid */}
        <div className="p-6 sm:p-8">
          <span className="text-mono text-xs uppercase tracking-widest text-foreground font-bold block mb-4">
            VERIFIED HONORS, COMPETITIONS &amp; LEADERSHIP:
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {collegeAwards.map((award, idx) => {
              const Icon = award.icon;
              return (
                <div
                  key={idx}
                  className={`flex flex-col justify-between rounded-sm border p-4 transition-all duration-200 ${
                    award.highlight
                      ? "border-signal/50 bg-surface-2 shadow-sm hover:border-signal"
                      : "border-border bg-card/60 hover:border-border-strong"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded ${
                        award.highlight ? "bg-signal/20 text-signal" : "bg-surface text-muted-foreground"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                    </span>
                    <div>
                      <h4 className="text-xs sm:text-[13px] font-bold text-foreground leading-snug">
                        {award.title}
                      </h4>
                      <p className="mt-1 text-[11px] text-muted-foreground leading-relaxed font-mono">
                        {award.desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Senior High School Card (Caloocan National Science & Technology High School) */}
      <div className="overflow-hidden rounded-sm border border-border-strong bg-card p-6 sm:p-7 shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/80 pb-4">
          <div className="flex items-center gap-3.5">
            <img
              src={highSchool.logo}
              alt={highSchool.school}
              className="h-12 w-12 shrink-0 rounded border border-border bg-surface object-contain p-1.5"
              onError={(e) => {
                const el = e.currentTarget as HTMLImageElement;
                el.style.display = "none";
              }}
            />
            <div>
              <div className="flex items-center gap-2 text-mono text-xs text-muted-foreground">
                <span>Senior High School</span>
                <span>·</span>
                <span>{highSchool.period}</span>
              </div>
              <h4 className="text-lg font-bold text-foreground">
                {highSchool.school}
              </h4>
              <p className="text-xs text-signal font-mono font-medium">
                {highSchool.degree} — {highSchool.specialization}
              </p>
            </div>
          </div>

          <span className="rounded-full border border-border bg-surface px-3 py-1 text-mono text-xs font-semibold text-foreground self-start sm:self-auto">
            With High Honors
          </span>
        </div>

        {/* High School Honors */}
        <div className="mt-4 flex flex-wrap gap-2 text-mono text-xs">
          {highSchool.honors.map((h, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-1.5 rounded border border-border bg-surface-2 px-3 py-1 text-foreground"
            >
              <Medal className="h-3.5 w-3.5 text-signal" />
              <span>{h}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
