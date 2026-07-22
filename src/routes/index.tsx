import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import bryantImg from "@/assets/bryant.jpg";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  ArrowUpRight,
  Award,
  Bot,
  Boxes,
  Briefcase,
  Command as CmdIcon,
  Download,
  Github,
  GraduationCap,
  Layers,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Send,
  Terminal,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Bryant Melliza — Software Developer" },
      {
        name: "description",
        content:
          "Full-stack developer specialising in React, Next.js, and Prisma. Engineering scalable digital solutions from Metro Manila.",
      },
      { property: "og:title", content: "Bryant Melliza — Software Developer" },
      {
        property: "og:description",
        content: "Engineering scalable digital solutions. React · Next.js · Prisma.",
      },
    ],
  }),
  component: Portfolio,
});

/* ============================================================
   DATA
   ============================================================ */

type Category = "web" | "system" | "ai";

const CATEGORY_META: Record<
  Category,
  { label: string; color: string; icon: React.ComponentType<{ className?: string }> }
> = {
  web: { label: "Web Applications", color: "var(--signal)", icon: Layers },
  system: { label: "Systems", color: "var(--flow)", icon: Boxes },
  ai: { label: "AI & Automation", color: "var(--pulse-c)", icon: Bot },
};

type Project = {
  slug: string;
  name: string;
  date: string;
  category: Category;
  summary: string;
  problem: string;
  solution: string;
  outcome: string;
  stack: string[];
  image: string;
};

const PROJECTS: Project[] = [
  {
    slug: "solace-point",
    name: "Solace Point",
    date: "2026.06",
    category: "web",
    summary: "Full-stack digital insurance platform for OneNetworx Marketing.",
    problem:
      "Offline sales workflows and low digital conversion for a non-life insurance provider.",
    solution:
      "Architected a premium, high-conversion web platform from scratch with React, Tailwind and Vite.",
    outcome: "Shipped the company's core digital sales channel driving client acquisition.",
    stack: ["React", "Tailwind CSS", "Vite"],
    image: "/images/projects/solace-point.jpg",
  },
  {
    slug: "personal-portfolio",
    name: "Personal Portfolio",
    date: "2026.06",
    category: "web",
    summary: "Modern digital showcase with a system-styled interface.",
    problem: "Needed a distinctive engineering-first presence for hiring managers.",
    solution: "Built a componentised, accessible React site with a documentation-grade layout.",
    outcome: "Serves as the primary channel for recruiter and client inbound.",
    stack: ["React", "Tailwind CSS"],
    image: "/images/projects/personal-portfolio.jpg",
  },
  {
    slug: "confession-wall",
    name: "Confession Wall",
    date: "2024.05",
    category: "web",
    summary: "Anonymous community wall built for GDSC.",
    problem: "Student community lacked a safe anonymous expression channel.",
    solution: "JavaScript + Firebase realtime wall with moderation-friendly schema.",
    outcome: "Launched and adopted by the university GDSC chapter.",
    stack: ["JavaScript", "Firebase"],
    image: "/images/projects/confession-wall.jpg",
  },
  {
    slug: "xoxo-tictactoe",
    name: "XOXO TicTacToe",
    date: "2024.03",
    category: "web",
    summary: "Multiplayer & AI TicTacToe with leaderboard.",
    problem: "Classroom needed a competitive, scored take on a classic game.",
    solution: "PHP/MySQL multiplayer with AI opponent and persistent scoreboard.",
    outcome: "Awarded Best Web Game Design; used as a class case study.",
    stack: ["PHP", "MySQL"],
    image: "/images/projects/xoxo-tictactoe.jpg",
  },
  {
    slug: "property-custodian",
    name: "Property Custodian",
    date: "2026.02",
    category: "system",
    summary: "Resource management with predictive algorithms.",
    problem: "Institutional asset tracking was manual, error-prone, and reactive.",
    solution: "Built a Power Platform + PHP system with predictive utilisation insights.",
    outcome: "Automated custody workflows and forecasting for internal operations.",
    stack: ["Power Platform", "PHP"],
    image: "/images/projects/property-custodian.jpg",
  },
  {
    slug: "prefect-system",
    name: "Prefect System",
    date: "2026.02",
    category: "system",
    summary: "Rule-based decision support for student infractions.",
    problem: "Discipline records were inconsistent and hard to escalate fairly.",
    solution: "Rule-based engine over PHP/MySQL to standardise sanction logic.",
    outcome: "Deterministic, auditable disciplinary decisions.",
    stack: ["Rule-Based AI", "PHP", "MySQL"],
    image: "/images/projects/prefect-system.jpg",
  },
  {
    slug: "petsense",
    name: "PetSense",
    date: "2025.10",
    category: "system",
    summary: "RFID pet grooming management with automated tracking.",
    problem: "Grooming shops manually tracked pets, appointments, and status.",
    solution: "Web app tied to RFID readers for automated check-in and status flow.",
    outcome: "Reduced manual logging and improved throughput at the front desk.",
    stack: ["RFID", "IoT", "Web"],
    image: "/images/projects/petsense.jpg",
  },
  {
    slug: "vetflow",
    name: "VetFlow",
    date: "2025.02",
    category: "system",
    summary: "POS and inventory system for animal clinics.",
    problem: "Small clinics juggled sales, stock, and patient records on paper.",
    solution: "PHP + MySQL POS with integrated inventory and clinic workflows.",
    outcome: "Consolidated clinic operations behind a single system.",
    stack: ["PHP", "MySQL"],
    image: "/images/projects/vetflow.jpg",
  },
  {
    slug: "safety-heroes",
    name: "Safety Heroes",
    date: "2025.10",
    category: "ai",
    summary: "AI-driven disaster preparedness platform for children.",
    problem: "Young learners lacked engaging, localised disaster-response training.",
    solution: "Hackathon prototype pairing AI learning paths with playful UI.",
    outcome: "Delivered a functioning prototype within the hackathon window.",
    stack: ["AI Learning", "UI Design"],
    image: "/images/projects/safety-heroes.jpg",
  },
  {
    slug: "alertpoint",
    name: "AlertPoint",
    date: "2025.10",
    category: "ai",
    summary: "DRRM system with automated hardware monitoring.",
    problem: "Barangay DRRM lacked live sensing tied to a central dashboard.",
    solution: "Full-stack app ingesting IoT hardware telemetry into an operator UI.",
    outcome: "Live monitoring surface for early risk response.",
    stack: ["Full-Stack", "IoT"],
    image: "/images/projects/alertpoint.jpg",
  },
  {
    slug: "salbag",
    name: "SALBAG",
    date: "2024.06",
    category: "ai",
    summary: "Smart anti-theft device with face detection & GPS.",
    problem: "Bag theft in transit had no personal-scale deterrent.",
    solution: "Raspberry Pi wearable with vision-based owner recognition and GPS.",
    outcome: "Working prototype demonstrating owner-lock behaviour and tracking.",
    stack: ["Raspberry Pi", "AI/ML", "GPS"],
    image: "/images/projects/salbag.jpg",
  },
  {
    slug: "distancing-belt",
    name: "Distancing Belt",
    date: "2022",
    category: "ai",
    summary: "Wearable with PIR/ultrasonic sensors for safe distancing.",
    problem: "Pandemic-era distancing was hard to self-monitor in public.",
    solution: "Arduino belt combining PIR and ultrasonic feedback with alerts.",
    outcome: "Functional wearable prototype for close-proximity warnings.",
    stack: ["Arduino", "Sensors"],
    image: "/images/projects/distancing-belt.jpg",
  },
];

type Experience = {
  hash: string;
  type: "feat" | "chore";
  role: string;
  company: string;
  logo: string;
  period: string;
  body: string;
};

const EXPERIENCE: Experience[] = [
  {
    hash: "a1f9c02",
    type: "feat",
    role: "Intern Developer",
    company: "OneNetworx Marketing",
    logo: "/images/logos/onenetworx.png",
    period: "May 2026 → Jun 2026",
    body: "Architected Solace Point, the company's core non-life insurance digital sales platform, from scratch. Engineered the full-stack web and database ecosystem, transforming offline workflows into a premium, high-conversion UI/UX.",
  },
  {
    hash: "7d3ba81",
    type: "feat",
    role: "Intern Developer",
    company: "JLabs Innovatech Inc.",
    logo: "/images/logos/jlabs.png",
    period: "Mar 2026 → Apr 2026",
    body: "Contributed to high-quality web and mobile solutions. Collaborated with designers and PMs, implemented UI/UX, and participated in the full SDLC under Agile methodologies.",
  },
  {
    hash: "4c1e2f6",
    type: "feat",
    role: "Software Developer",
    company: "NLP Business Development Services",
    logo: "/images/logos/nlp-bds.png",
    period: "Nov 2025 → Feb 2026",
    body: "Engineered responsive web applications using React 19, Next.js, and Prisma (PostgreSQL). Led rapid redesign of internal modules, optimised data schemas, and integrated AI-assisted tooling to accelerate delivery.",
  },
];

const EDUCATION = [
  {
    school: "National University — Fairview",
    logo: "/images/logos/national-university.png",
    degree: "BS Information Technology",
    detail: "Specialization in Mobile & Internet Technologies",
    period: "2022 — 2026 (In Progress)",
    honors: ["Blue Scholar — 100% Full Merit Scholarship", "Consistent First Honor"],
  },
  {
    school: "Caloocan National Science & Technology High School",
    logo: "/images/logos/cnsths.png",
    degree: "STEM Strand",
    detail: "Senior High School",
    period: "Graduated 2022",
    honors: ["High Honors"],
  },
];

const AWARDS = [
  { title: "100% Full Merit Scholarship — Blue Scholar", year: "2022 — Present" },
  { title: "Exemplary Performance — Internal Pursuit", year: "Jul 2025" },
  { title: "Champion — UI/UX Design Competition", year: "Dec 2024" },
  { title: "Champion — Networking Competition", year: "Dec 2024" },
  { title: "Sole Awardee — Best Web Game Design", year: "Mar 2024" },
];

const SKILLS: { group: string; items: string[] }[] = [
  { group: "Frontend", items: ["React", "Next.js", "Tailwind CSS", "Vite", "TypeScript"] },
  {
    group: "Backend / Database",
    items: ["Node.js", "Prisma", "PostgreSQL", "PHP", "MySQL", "Firebase"],
  },
  {
    group: "AI / Automation",
    items: ["AI-Assisted Tooling", "Rule-Based Systems", "Power Platform"],
  },
  { group: "IoT / Hardware", items: ["Raspberry Pi", "Arduino", "RFID", "Sensor Integration"] },
  { group: "Tools", items: ["Git", "Agile / Scrum", "Figma", "REST APIs"] },
];

const SECTIONS = [
  { id: "hero", label: "home", hint: "Top of page" },
  { id: "projects", label: "projects", hint: "Pipeline graph" },
  { id: "demo", label: "demo", hint: "Live agent" },
  { id: "experience", label: "experience", hint: "Commit log" },
  { id: "education", label: "education", hint: "Schools & honors" },
  { id: "awards", label: "awards", hint: "Recognition" },
  { id: "skills", label: "skills", hint: "Stack" },
  { id: "contact", label: "contact", hint: "Get in touch" },
];

/* ============================================================
   ROOT
   ============================================================ */

function Portfolio() {
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [activeProject, setActiveProject] = useState<string | null>(PROJECTS[0].slug);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const typing =
        target &&
        (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable);
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || (e.key === "/" && !typing)) {
        e.preventDefault();
        setPaletteOpen((o) => !o);
      }
      if (e.key === "Escape") setPaletteOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const goto = (id: string) => {
    setPaletteOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-paper text-foreground">
      <TopStrip onOpenPalette={() => setPaletteOpen(true)} />
      <main className="mx-auto max-w-[1440px] px-6 md:px-10">
        <Hero onOpenPalette={() => setPaletteOpen(true)} />
        <Projects active={activeProject} setActive={setActiveProject} />
        <LiveDemo />
        <ExperienceLog />
        <Education />
        <Awards />
        <Skills />
        <Contact />
      </main>
      <Footer />
      <PaletteDialog open={paletteOpen} onOpenChange={setPaletteOpen} goto={goto} />
    </div>
  );
}

/* ============================================================
   TOP CONTACT STRIP
   ============================================================ */

function TopStrip({ onOpenPalette }: { onOpenPalette: () => void }) {
  return (
    <div className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-6 py-2.5 text-mono text-[11px] uppercase tracking-wider text-muted-foreground md:px-10">
        <div className="flex items-center gap-2">
          <span className="relative inline-flex h-1.5 w-1.5 items-center justify-center">
            <span className="absolute h-1.5 w-1.5 rounded-full bg-pulse ring-pulse" />
            <span className="relative h-1.5 w-1.5 rounded-full bg-pulse" />
          </span>
          <span className="text-foreground">bryant.melliza</span>
          <span className="hidden sm:inline">/</span>
          <span className="hidden sm:inline">available for work</span>
        </div>
        <div className="hidden items-center gap-4 md:flex">
          <a href="mailto:bryantiversonmelliza03@gmail.com" className="hover:text-foreground">
            email
          </a>
          <a href="tel:+639398170375" className="hover:text-foreground">
            +63 939 817 0375
          </a>
          <span>Metro Manila, PH</span>
          <a
            href="https://github.com/"
            target="_blank"
            rel="noreferrer"
            className="hover:text-foreground"
          >
            github
          </a>
          <a
            href="https://linkedin.com/"
            target="_blank"
            rel="noreferrer"
            className="hover:text-foreground"
          >
            linkedin
          </a>
        </div>
        <button
          onClick={onOpenPalette}
          className="flex items-center gap-2 rounded-sm border border-border-strong bg-surface px-2 py-1 text-mono text-[11px] text-foreground hover:border-signal hover:text-signal"
          aria-label="Open command palette"
        >
          <CmdIcon className="h-3 w-3" />
          <span className="hidden sm:inline">press</span>
          <kbd className="rounded-sm border border-border-strong bg-background px-1">/</kbd>
          <span className="hidden sm:inline">or</span>
          <kbd className="hidden rounded-sm border border-border-strong bg-background px-1 sm:inline">
            ⌘K
          </kbd>
        </button>
      </div>
    </div>
  );
}

/* ============================================================
   HERO — big photo + animated node backdrop
   ============================================================ */

function Hero({ onOpenPalette }: { onOpenPalette: () => void }) {
  return (
    <section id="hero" className="relative overflow-hidden pt-12 pb-24 md:pt-16 md:pb-28">
      <HeroBackdrop />
      <SectionLabel index="00" label="identity" hint="hello, world" />

      <div className="mt-8 grid grid-cols-1 items-stretch gap-10 md:grid-cols-[minmax(0,1fr)_420px] md:gap-20 lg:grid-cols-[minmax(0,1fr)_480px] lg:gap-32">
        {/* LEFT — headline */}
        <div className="relative">
          <div className="inline-flex items-center gap-2 rounded-sm border border-border-strong bg-background/70 px-2.5 py-1 text-mono text-[10.5px] uppercase tracking-widest text-signal backdrop-blur">
            <span className="relative inline-flex h-1.5 w-1.5 items-center justify-center">
              <span className="absolute h-1.5 w-1.5 rounded-full bg-signal ring-pulse" />
              <span className="relative h-1.5 w-1.5 rounded-full bg-signal" />
            </span>
            Bryant Melliza · software developer
          </div>

          <h1 className="mt-5 text-[42px] font-semibold leading-[1.02] tracking-tight md:text-6xl lg:text-7xl">
            Engineering <span className="text-signal">scalable</span>
            <span className="block text-muted-foreground">
              digital{" "}
              <span className="relative inline-block text-foreground">
                solutions
                <svg
                  aria-hidden
                  viewBox="0 0 200 10"
                  preserveAspectRatio="none"
                  className="absolute inset-x-0 -bottom-1 h-2 w-full text-signal"
                >
                  <path
                    d="M2 6 Q 50 1 100 5 T 198 4"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              .
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-[15px] leading-6 text-muted-foreground md:text-base">
            Full-stack development with{" "}
            <span className="text-foreground">React, Next.js, and Prisma</span> — plus AI-assisted
            automation that turns messy workflows into working systems.
          </p>

          <TerminalReadout />

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenPalette}
              className="group inline-flex items-center gap-2 rounded-sm border border-foreground bg-foreground px-4 py-2 text-mono text-xs uppercase tracking-wider text-background hover:bg-signal hover:border-signal"
            >
              <CmdIcon className="h-3.5 w-3.5" /> open command palette
            </button>
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-sm border border-border-strong bg-background/70 px-4 py-2 text-mono text-xs uppercase tracking-wider text-foreground backdrop-blur hover:border-signal hover:text-signal"
            >
              view projects <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
            <a
              href="mailto:bryantiversonmelliza03@gmail.com"
              className="inline-flex items-center gap-2 rounded-sm border border-transparent px-4 py-2 text-mono text-xs uppercase tracking-wider text-muted-foreground hover:text-foreground"
            >
              <Mail className="h-3.5 w-3.5" /> get in touch
            </a>
          </div>
        </div>

        {/* RIGHT — photo card */}
        <PhotoCard />
      </div>

      <HeroStats />
    </section>
  );
}

function HeroBackdrop() {
  // Animated node-graph decoration — desaturated so it doesn't fight the content.
  return (
    <svg
      aria-hidden
      viewBox="0 0 800 500"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-0 -z-10 h-full w-full opacity-[0.55]"
    >
      <defs>
        <path id="hp1" d="M40 90 C 200 60, 320 200, 520 160 S 760 260, 780 320" />
        <path id="hp2" d="M60 260 C 180 320, 300 240, 460 300 S 700 380, 780 360" />
        <path id="hp3" d="M20 420 C 180 440, 300 360, 500 420 S 720 460, 780 440" />
      </defs>
      {/* base strokes */}
      <use href="#hp1" stroke="var(--flow)" strokeOpacity="0.35" fill="none" strokeWidth="1" />
      <use href="#hp2" stroke="var(--signal)" strokeOpacity="0.3" fill="none" strokeWidth="1" />
      <use href="#hp3" stroke="var(--pulse-c)" strokeOpacity="0.3" fill="none" strokeWidth="1" />
      {/* flowing dashes */}
      <use href="#hp1" stroke="var(--flow)" fill="none" strokeWidth="1.25" className="flow-dash" />
      <use
        href="#hp2"
        stroke="var(--signal)"
        fill="none"
        strokeWidth="1.25"
        className="flow-dash-slow"
      />
      <use
        href="#hp3"
        stroke="var(--pulse-c)"
        fill="none"
        strokeWidth="1.25"
        className="flow-dash"
        style={{ animationDelay: "-2s" }}
      />
      {/* nodes */}
      {[
        [40, 90, "var(--flow)"],
        [520, 160, "var(--flow)"],
        [780, 320, "var(--flow)"],
        [60, 260, "var(--signal)"],
        [460, 300, "var(--signal)"],
        [780, 360, "var(--signal)"],
        [20, 420, "var(--pulse-c)"],
        [500, 420, "var(--pulse-c)"],
        [780, 440, "var(--pulse-c)"],
      ].map(([x, y, c], i) => (
        <g key={i}>
          <circle cx={x as number} cy={y as number} r="6" fill="var(--background)" />
          <circle cx={x as number} cy={y as number} r="3.5" fill={c as string} />
        </g>
      ))}
      {/* traveling packets */}
      <circle
        r="3"
        fill="var(--flow)"
        className="packet"
        style={{
          offsetPath:
            "path('M40 90 C 200 60, 320 200, 520 160 S 760 260, 780 320')" as unknown as string,
        }}
      />
      <circle
        r="3"
        fill="var(--signal)"
        className="packet"
        style={
          {
            offsetPath: "path('M60 260 C 180 320, 300 240, 460 300 S 700 380, 780 360')",
            animationDelay: "-1.5s",
          } as React.CSSProperties
        }
      />
      <circle
        r="3"
        fill="var(--pulse-c)"
        className="packet"
        style={
          {
            offsetPath: "path('M20 420 C 180 440, 300 360, 500 420 S 720 460, 780 440')",
            animationDelay: "-3s",
          } as React.CSSProperties
        }
      />
    </svg>
  );
}

function PhotoCard() {
  return (
    <div className="h-full w-full">
      <div className="relative mx-auto w-full max-w-[420px] md:ml-auto md:mr-0 md:max-w-[480px] sticky top-24">
        {/* corner brackets */}
        <span className="absolute -left-2 -top-2 h-4 w-4 border-l border-t border-signal" />
        <span className="absolute -right-2 -top-2 h-4 w-4 border-r border-t border-signal" />
        <span className="absolute -bottom-2 -left-2 h-4 w-4 border-b border-l border-signal" />
        <span className="absolute -bottom-2 -right-2 h-4 w-4 border-b border-r border-signal" />

        <div className="float-y overflow-hidden rounded-sm border border-border-strong bg-card shadow-[0_1px_0_var(--border-strong),_0_20px_40px_-24px_rgba(0,0,0,0.25)]">
        <div className="flex items-center justify-between border-b border-border bg-surface-2 px-3 py-1.5 text-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-signal pulse-dot" />
            bryant.jpg
          </span>
          <span>320×320</span>
        </div>
        <div className="relative aspect-square w-full overflow-hidden bg-graph">
          <img
            src={bryantImg}
            alt="Bryant Melliza"
            className="h-full w-full object-cover"
          />
          {/* subtle grid overlay */}
          <div className="pointer-events-none absolute inset-0 mix-blend-multiply opacity-40 bg-dotgrid" />
          {/* corner readout tag */}
          <div className="absolute bottom-2 left-2 rounded-sm border border-border-strong bg-background/85 px-2 py-1 text-mono text-[10px] uppercase tracking-widest text-foreground backdrop-blur">
            <span className="text-signal">●</span> bryant · 21 · ph
          </div>
        </div>
        <div className="grid grid-cols-3 divide-x divide-border border-t border-border text-mono text-[10.5px]">
          <StatCell label="role" value="dev" />
          <StatCell label="focus" value="fullstack" />
          <StatCell label="tz" value="utc+8" />
        </div>
      </div>
    </div>
    </div>
  );
}

function StatCell({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col items-start gap-0.5 px-3 py-2">
      <span className="text-[9.5px] uppercase tracking-widest text-muted-foreground">{label}</span>
      <span className="text-foreground">{value}</span>
    </div>
  );
}

function HeroStats() {
  const stats = [
    { k: "projects shipped", v: "12", c: "var(--signal)" },
    { k: "roles / internships", v: "03", c: "var(--flow)" },
    { k: "primary stack", v: "react · next · prisma", c: "var(--pulse-c)" },
    { k: "scholarship", v: "100% blue scholar", c: "var(--signal)" },
  ];
  return (
    <div className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-border-strong bg-border md:grid-cols-4">
      {stats.map((s) => (
        <div key={s.k} className="flex flex-col gap-1 bg-card px-4 py-4">
          <div className="flex items-center gap-2 text-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: s.c }} />
            {s.k}
          </div>
          <div className="text-mono text-[15px] text-foreground">{s.v}</div>
        </div>
      ))}
    </div>
  );
}

function TerminalReadout() {
  const lines = useMemo(
    () => [
      "$ status --dev bryant.melliza",
      "  → 12 projects shipped · 3 internships",
      "  → stack: react · next.js · prisma · postgres",
      "  → automation: ai-assisted tooling online",
      "  → uptime: available for work",
    ],
    [],
  );
  const [shown, setShown] = useState<string[]>([]);
  const [current, setCurrent] = useState("");

  useEffect(() => {
    let cancelled = false;
    let i = 0;
    let j = 0;
    setShown([]);
    setCurrent("");
    const tick = () => {
      if (cancelled) return;
      if (i >= lines.length) return;
      const line = lines[i];
      if (j <= line.length) {
        setCurrent(line.slice(0, j));
        j += Math.max(1, Math.floor(line.length / 24));
        setTimeout(tick, 22);
      } else {
        setShown((s) => [...s, line]);
        setCurrent("");
        i += 1;
        j = 0;
        setTimeout(tick, 180);
      }
    };
    const start = setTimeout(tick, 250);
    return () => {
      cancelled = true;
      clearTimeout(start);
    };
  }, [lines]);

  return (
    <div className="mt-8 overflow-hidden rounded-sm border border-border-strong bg-surface/80 backdrop-blur">
      <div className="flex items-center justify-between border-b border-border bg-surface-2 px-3 py-1.5 text-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        <div className="flex items-center gap-2">
          <Terminal className="h-3 w-3" />
          <span>~/portfolio · system readout</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-signal pulse-dot" />
          <span>live</span>
        </div>
      </div>
      <pre className="whitespace-pre-wrap px-4 py-3 text-mono text-[12.5px] leading-6 text-foreground">
        {shown.join("\n")}
        {shown.length > 0 && "\n"}
        {current}
        <span className="caret-blink">▍</span>
      </pre>
    </div>
  );
}

/* ============================================================
   SECTION LABEL
   ============================================================ */

function SectionLabel({ index, label, hint }: { index: string; label: string; hint?: string }) {
  return (
    <div className="flex items-center gap-3 border-t border-border pt-6">
      <span className="text-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        [{index}]
      </span>
      <span className="text-mono text-[10px] uppercase tracking-widest text-foreground">
        {label}
      </span>
      {hint && (
        <span className="text-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          — {hint}
        </span>
      )}
      <span className="ml-auto text-mono text-[10px] text-muted-foreground">
        <span className="inline-block h-1 w-1 -translate-y-0.5 rounded-full bg-pulse align-middle" />{" "}
        ok
      </span>
    </div>
  );
}

/* ============================================================
   PROJECTS — flowing pipeline canvas
   ============================================================ */

function Projects({
  active,
  setActive,
}: {
  active: string | null;
  setActive: (s: string) => void;
}) {
  const current = PROJECTS.find((p) => p.slug === active) ?? PROJECTS[0];

  return (
    <section id="projects" className="py-20">
      <SectionLabel index="01" label="projects" hint="web · systems · ai automation" />
      <div className="mt-8">
        <PipelineCanvas active={active} setActive={setActive} />
        <div className="mt-6">
          <CaseStudy project={current} />
        </div>
      </div>
    </section>
  );
}

function PipelineCanvas({
  active,
  setActive,
}: {
  active: string | null;
  setActive: (s: string) => void;
}) {
  const cats: Category[] = ["web", "system", "ai"];
  return (
    <div className="relative overflow-hidden rounded-sm border border-border-strong bg-surface/70 bg-graph">
      <div className="flex items-center justify-between border-b border-border bg-surface-2 px-4 py-2 text-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        <span>pipeline.canvas · {PROJECTS.length} nodes</span>
        <span className="flex items-center gap-3">
          {cats.map((c) => (
            <span key={c} className="flex items-center gap-1.5">
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: CATEGORY_META[c].color }}
              />
              {CATEGORY_META[c].label.toLowerCase()}
            </span>
          ))}
        </span>
      </div>

      <div className="relative grid grid-cols-1 gap-6 p-5 md:grid-cols-3 md:gap-8">
        {/* Flowing connectors overlay (desktop only) */}
        <FlowConnectors />

        {cats.map((c) => (
          <PipelineColumn
            key={c}
            category={c}
            nodes={PROJECTS.filter((p) => p.category === c)}
            active={active}
            setActive={setActive}
          />
        ))}
      </div>
    </div>
  );
}

function FlowConnectors() {
  // Decorative animated flows connecting the three category clusters.
  return (
    <svg
      aria-hidden
      viewBox="0 0 900 400"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-0 hidden h-full w-full md:block"
    >
      <defs>
        <path id="cf1" d="M 150 60 C 280 60, 320 200, 450 200" />
        <path id="cf2" d="M 450 200 C 580 200, 620 340, 750 340" />
        <path id="cf3" d="M 150 340 C 300 340, 350 220, 450 200" />
        <path id="cf4" d="M 450 200 C 600 180, 660 80, 750 60" />
      </defs>
      {[
        ["cf1", "var(--signal)"],
        ["cf2", "var(--flow)"],
        ["cf3", "var(--pulse-c)"],
        ["cf4", "var(--signal)"],
      ].map(([id, color], i) => (
        <g key={id}>
          <use href={`#${id}`} stroke={color} strokeOpacity="0.35" fill="none" strokeWidth="1" />
          <use
            href={`#${id}`}
            stroke={color}
            fill="none"
            strokeWidth="1.5"
            className="flow-dash"
            style={{ animationDelay: `${-i * 0.9}s` }}
          />
          <circle
            r="3"
            fill={color}
            className="packet"
            style={
              {
                offsetPath: `path('${
                  i === 0
                    ? "M 150 60 C 280 60, 320 200, 450 200"
                    : i === 1
                      ? "M 450 200 C 580 200, 620 340, 750 340"
                      : i === 2
                        ? "M 150 340 C 300 340, 350 220, 450 200"
                        : "M 450 200 C 600 180, 660 80, 750 60"
                }')`,
                animationDelay: `${-i * 1.1}s`,
              } as React.CSSProperties
            }
          />
        </g>
      ))}
    </svg>
  );
}

function PipelineColumn({
  category,
  nodes,
  active,
  setActive,
}: {
  category: Category;
  nodes: Project[];
  active: string | null;
  setActive: (s: string) => void;
}) {
  const meta = CATEGORY_META[category];
  const Icon = meta.icon;
  return (
    <div className="relative">
      <div
        className="mb-3 flex items-center gap-2 text-mono text-[10.5px] uppercase tracking-widest"
        style={{ color: meta.color }}
      >
        <Icon className="h-3.5 w-3.5" />
        <span>{meta.label}</span>
        <span className="text-muted-foreground">· {nodes.length}</span>
      </div>
      <div className="flex flex-col gap-2">
        {nodes.map((p) => {
          const isActive = p.slug === active;
          return (
            <button
              key={p.slug}
              onClick={() => setActive(p.slug)}
              className={`group relative flex w-full items-center gap-3 rounded-sm border px-2.5 py-2 text-left text-mono text-[11.5px] transition ${
                isActive
                  ? "border-transparent bg-card text-foreground"
                  : "border-border bg-background/70 text-muted-foreground hover:border-border-strong hover:text-foreground"
              }`}
              style={
                isActive
                  ? {
                      borderColor: meta.color,
                      boxShadow: `inset 0 0 0 1px ${meta.color}, 0 8px 20px -14px ${meta.color}`,
                    }
                  : undefined
              }
            >
              {/* node dot */}
              <span className="relative inline-flex h-2.5 w-2.5 shrink-0 items-center justify-center">
                {isActive && (
                  <span
                    className="absolute inline-flex h-2.5 w-2.5 rounded-full ring-pulse"
                    style={{ background: meta.color }}
                  />
                )}
                <span
                  className="relative h-2 w-2 rounded-full"
                  style={{ background: isActive ? meta.color : "var(--border-strong)" }}
                />
              </span>
              <span className="truncate">{p.name}</span>
              <span className="ml-auto text-[10px] uppercase tracking-widest text-muted-foreground">
                {p.date}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function CaseStudy({ project }: { project: Project }) {
  const meta = CATEGORY_META[project.category];
  return (
    <article
      key={project.slug}
      className="animate-fade-in overflow-hidden rounded-sm border border-border-strong bg-card"
      style={{ borderTopColor: meta.color, borderTopWidth: 2 }}
    >
      <div className="flex items-center justify-between border-b border-border px-4 py-2 text-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        <span>case-study/{project.slug}.md</span>
        <span className="flex items-center gap-3">
          <span className="flex items-center gap-1.5" style={{ color: meta.color }}>
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: meta.color }} />
            {meta.label}
          </span>
          <span>{project.date}</span>
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-[1.1fr_1fr]">
        <div className="aspect-[16/10] w-full overflow-hidden border-b border-border bg-graph md:border-b-0 md:border-r">
          <img
            src={project.image}
            alt={project.name}
            className="h-full w-full object-cover"
            onError={(e) => {
              const el = e.currentTarget as HTMLImageElement;
              el.style.display = "none";
            }}
          />
        </div>
        <div className="p-5">
          <h3 className="text-2xl font-semibold tracking-tight">{project.name}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{project.summary}</p>

          <dl className="mt-5 grid grid-cols-1 gap-4 text-sm">
            <FieldBlock label="problem" body={project.problem} />
            <FieldBlock label="solution" body={project.solution} />
            <FieldBlock label="outcome" body={project.outcome} />
          </dl>

          <div className="mt-5 flex flex-wrap gap-1.5">
            {project.stack.map((s) => (
              <span
                key={s}
                className="rounded-sm border border-border bg-surface px-2 py-0.5 text-mono text-[10.5px] text-foreground"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

function FieldBlock({ label, body }: { label: string; body: string }) {
  return (
    <div>
      <dt className="text-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        {label}
      </dt>
      <dd className="mt-1 text-[13.5px] leading-6 text-foreground">{body}</dd>
    </div>
  );
}

/* ============================================================
   LIVE DEMO — resume Q&A
   ============================================================ */

type QA = { q: string; a: string };
const QA_BANK: QA[] = [
  {
    q: "stack",
    a: "Primary: React, Next.js, TypeScript, Tailwind, Prisma + PostgreSQL. Secondary: PHP/MySQL, Power Platform, IoT (Arduino, Raspberry Pi).",
  },
  {
    q: "experience",
    a: "3 roles across 2025–2026: OneNetworx Marketing, JLabs Innovatech, and NLP Business Development Services — shipping React/Next.js/Prisma systems.",
  },
  {
    q: "projects",
    a: "12 shipped projects across web, systems, and AI automation. Most recent: Solace Point — a full-stack insurance platform for OneNetworx Marketing.",
  },
  {
    q: "education",
    a: "BS Information Technology at National University Fairview. 100% Full Merit Blue Scholar, consistent First Honor. Graduating 2026.",
  },
  {
    q: "location",
    a: "Metro Manila, Philippines. Open to remote and hybrid roles across APAC and beyond.",
  },
  {
    q: "roles",
    a: "Actively positioning for Web Developer, Frontend Developer, and AI Automation roles.",
  },
  { q: "contact", a: "Email bryantiversonmelliza03@gmail.com or call +63 939 817 0375." },
];

const SUGGESTED = ["stack", "experience", "projects", "education", "roles"];

function LiveDemo() {
  const [messages, setMessages] = useState<{ from: "user" | "agent"; text: string }[]>([
    {
      from: "agent",
      text: "resume-agent online. ask about stack, experience, projects, education, roles, contact.",
    },
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages]);

  const answer = (raw: string) => {
    const q = raw.trim();
    if (!q) return;
    setMessages((m) => [...m, { from: "user", text: q }]);
    const key = q.toLowerCase();
    const hit = QA_BANK.find((x) => key.includes(x.q));
    const reply =
      hit?.a ?? "no exact match. try: stack, experience, projects, education, roles, contact.";
    setTimeout(() => setMessages((m) => [...m, { from: "agent", text: reply }]), 260);
    setInput("");
  };

  return (
    <section id="demo" className="py-20">
      <SectionLabel index="02" label="live demo" hint="resume q&a agent" />
      <div className="mt-8 overflow-hidden rounded-sm border border-border-strong bg-card">
        <div className="flex items-center justify-between border-b border-border bg-surface-2 px-4 py-2 text-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-pulse pulse-dot" />
            <span>agent.resume · running</span>
          </div>
          <span>rules-based · latency ~260ms</span>
        </div>
        <div
          ref={scrollRef}
          className="max-h-72 space-y-3 overflow-y-auto px-4 py-4 text-mono text-[12.5px] leading-6"
        >
          {messages.map((m, i) => (
            <div key={i} className="flex gap-3">
              <span
                className={`shrink-0 uppercase tracking-widest ${m.from === "agent" ? "text-signal" : "text-muted-foreground"}`}
              >
                {m.from === "agent" ? "agent >" : "you   >"}
              </span>
              <span className="text-foreground">{m.text}</span>
            </div>
          ))}
        </div>
        <div className="border-t border-border bg-surface px-4 py-3">
          <div className="mb-2 flex flex-wrap gap-1.5">
            {SUGGESTED.map((s) => (
              <button
                key={s}
                onClick={() => answer(s)}
                className="rounded-sm border border-border bg-background px-2 py-0.5 text-mono text-[10.5px] text-muted-foreground hover:border-signal hover:text-signal"
              >
                {s}
              </button>
            ))}
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              answer(input);
            }}
            className="flex items-center gap-2"
          >
            <span className="text-mono text-[12.5px] text-signal">$</span>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="ask about my resume..."
              className="flex-1 bg-transparent text-mono text-[12.5px] text-foreground outline-none placeholder:text-muted-foreground"
            />
            <button
              type="submit"
              className="inline-flex items-center gap-1 rounded-sm border border-border-strong px-2 py-1 text-mono text-[10.5px] uppercase tracking-widest text-foreground hover:border-signal hover:text-signal"
            >
              <Send className="h-3 w-3" /> send
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   EXPERIENCE / EDUCATION / AWARDS / SKILLS / CONTACT
   ============================================================ */

function ExperienceLog() {
  return (
    <section id="experience" className="py-20">
      <SectionLabel index="03" label="experience" hint="git log --reverse-chronological" />
      <div className="mt-8 overflow-hidden rounded-sm border border-border-strong bg-card">
        <div className="border-b border-border bg-surface-2 px-4 py-2 text-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          $ git log --oneline main
        </div>
        <ul className="divide-y divide-border">
          {EXPERIENCE.map((e) => (
            <li
              key={e.hash}
              className="grid grid-cols-[auto_1fr] gap-4 px-4 py-5 md:grid-cols-[auto_auto_1fr]"
            >
              <div className="hidden h-10 w-10 shrink-0 overflow-hidden rounded-sm border border-border bg-surface md:block">
                <img
                  src={e.logo}
                  alt={`${e.company} logo`}
                  className="h-full w-full object-contain"
                  onError={(ev) => ((ev.currentTarget as HTMLImageElement).style.display = "none")}
                />
              </div>
              <div className="text-mono text-[11px] text-muted-foreground">
                <span className="text-signal">{e.hash}</span>
                <div className="mt-1 text-[10.5px] uppercase tracking-widest">{e.period}</div>
              </div>
              <div>
                <div className="text-mono text-[12.5px]">
                  <span className="text-signal">{e.type}:</span>{" "}
                  <span className="text-foreground">{e.role}</span>{" "}
                  <span className="text-muted-foreground">@ {e.company}</span>
                </div>
                <p className="mt-2 max-w-3xl text-[14px] leading-6 text-foreground">{e.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Education() {
  return (
    <section id="education" className="py-20">
      <SectionLabel index="04" label="education" />
      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
        {EDUCATION.map((e) => (
          <div key={e.school} className="rounded-sm border border-border-strong bg-card p-5">
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 shrink-0 overflow-hidden rounded-sm border border-border bg-surface">
                <img
                  src={e.logo}
                  alt={`${e.school} logo`}
                  className="h-full w-full object-contain"
                  onError={(ev) => ((ev.currentTarget as HTMLImageElement).style.display = "none")}
                />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  {e.period}
                </div>
                <h3 className="mt-1 flex items-center gap-2 text-base font-semibold">
                  <GraduationCap className="h-4 w-4 text-signal" />
                  {e.degree}
                </h3>
                <div className="text-[13px] text-muted-foreground">{e.school}</div>
                <div className="mt-1 text-[13px]">{e.detail}</div>
                <ul className="mt-3 space-y-1">
                  {e.honors.map((h) => (
                    <li
                      key={h}
                      className="flex items-center gap-2 text-mono text-[11.5px] text-foreground"
                    >
                      <span className="h-1 w-1 rounded-full bg-pulse" /> {h}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Awards() {
  return (
    <section id="awards" className="py-20">
      <SectionLabel index="05" label="awards & recognition" />
      <ul className="mt-8 divide-y divide-border rounded-sm border border-border-strong bg-card">
        {AWARDS.map((a) => (
          <li key={a.title} className="flex items-center gap-4 px-4 py-4 md:px-5">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-sm border border-border bg-surface">
              <Award className="h-4 w-4 text-signal" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[14px] text-foreground">{a.title}</div>
            </div>
            <div className="text-mono text-[11px] uppercase tracking-widest text-muted-foreground">
              {a.year}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Skills() {
  const accents = [
    "var(--signal)",
    "var(--flow)",
    "var(--pulse-c)",
    "var(--signal)",
    "var(--flow)",
  ];
  return (
    <section id="skills" className="py-20">
      <SectionLabel index="06" label="skills" hint="stack.grouped" />
      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {SKILLS.map((s, i) => (
          <div key={s.group} className="rounded-sm border border-border-strong bg-card p-5">
            <div
              className="flex items-center gap-2 text-mono text-[10px] uppercase tracking-widest"
              style={{ color: accents[i] }}
            >
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: accents[i] }} />
              {s.group}
            </div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {s.items.map((it) => (
                <span
                  key={it}
                  className="rounded-sm border border-border bg-surface px-2 py-0.5 text-mono text-[11px] text-foreground"
                >
                  {it}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="py-20">
      <SectionLabel index="07" label="contact" />
      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-[1.4fr_1fr]">
        <div className="rounded-sm border border-border-strong bg-card p-6">
          <h3 className="text-2xl font-semibold tracking-tight">Let's build something.</h3>
          <p className="mt-2 max-w-lg text-sm text-muted-foreground">
            Open to Web Developer, Frontend, and AI Automation roles — full-time, contract, or
            freelance.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-2">
            <a
              href="mailto:bryantiversonmelliza03@gmail.com"
              className="inline-flex items-center gap-2 rounded-sm border border-foreground bg-foreground px-4 py-2 text-mono text-xs uppercase tracking-wider text-background hover:bg-signal hover:border-signal"
            >
              <Mail className="h-3.5 w-3.5" /> email me
            </a>
            <a
              href="/resume.pdf"
              className="inline-flex items-center gap-2 rounded-sm border border-border-strong px-4 py-2 text-mono text-xs uppercase tracking-wider text-foreground hover:border-signal hover:text-signal"
            >
              <Download className="h-3.5 w-3.5" /> download resume
            </a>
          </div>
        </div>
        <ul className="grid grid-cols-1 gap-2 text-mono text-[12.5px]">
          <ContactRow icon={<Mail className="h-3.5 w-3.5" />} label="email">
            bryantiversonmelliza03@gmail.com
          </ContactRow>
          <ContactRow icon={<Phone className="h-3.5 w-3.5" />} label="phone">
            +63 939 817 0375
          </ContactRow>
          <ContactRow icon={<MapPin className="h-3.5 w-3.5" />} label="location">
            Metro Manila, PH
          </ContactRow>
          <ContactRow icon={<Github className="h-3.5 w-3.5" />} label="github">
            github.com/bryantmelliza
          </ContactRow>
          <ContactRow icon={<Linkedin className="h-3.5 w-3.5" />} label="linkedin">
            linkedin.com/in/bryantmelliza
          </ContactRow>
        </ul>
      </div>
    </section>
  );
}

function ContactRow({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <li className="flex items-center gap-3 rounded-sm border border-border bg-card px-3 py-2">
      <span className="text-signal">{icon}</span>
      <span className="w-16 shrink-0 text-[10px] uppercase tracking-widest text-muted-foreground">
        {label}
      </span>
      <span className="truncate text-foreground">{children}</span>
    </li>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-3 px-6 py-6 text-mono text-[11px] uppercase tracking-widest text-muted-foreground md:flex-row md:items-center md:px-10">
        <div>© {new Date().getFullYear()} bryant melliza · built in react + tailwind</div>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-pulse pulse-dot" /> system operational
          </span>
          <a href="#hero" className="hover:text-foreground">
            back to top
          </a>
        </div>
      </div>
    </footer>
  );
}

/* ============================================================
   COMMAND PALETTE
   ============================================================ */

function PaletteDialog({
  open,
  onOpenChange,
  goto,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  goto: (id: string) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="overflow-hidden p-0 sm:max-w-lg">
        <Command className="rounded-sm">
          <CommandInput placeholder="jump to a section — projects, experience, contact..." />
          <CommandList>
            <CommandEmpty>no matches.</CommandEmpty>
            <CommandGroup heading="sections">
              {SECTIONS.map((s) => (
                <CommandItem
                  key={s.id}
                  value={`${s.label} ${s.hint ?? ""}`}
                  onSelect={() => goto(s.id)}
                >
                  <Briefcase className="mr-2 h-3.5 w-3.5 text-signal" />
                  <span className="text-mono text-[12.5px]">{s.label}</span>
                  <span className="ml-auto text-mono text-[10.5px] uppercase tracking-widest text-muted-foreground">
                    {s.hint}
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandGroup heading="quick actions">
              <CommandItem
                value="email contact mail"
                onSelect={() => {
                  onOpenChange(false);
                  window.location.href = "mailto:bryantiversonmelliza03@gmail.com";
                }}
              >
                <Mail className="mr-2 h-3.5 w-3.5 text-signal" />
                <span className="text-mono text-[12.5px]">email bryant</span>
              </CommandItem>
              <CommandItem
                value="resume download pdf"
                onSelect={() => {
                  onOpenChange(false);
                  window.open("/resume.pdf", "_blank");
                }}
              >
                <Download className="mr-2 h-3.5 w-3.5 text-signal" />
                <span className="text-mono text-[12.5px]">download resume</span>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
}
