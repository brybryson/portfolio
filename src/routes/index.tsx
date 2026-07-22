import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import bryantImg from "@/assets/bryant.jpg";
import togaImg from "@/assets/toga.jpg";
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
  FileText,
  GitBranch,
  Cpu,
  ChevronLeft,
  ChevronRight,
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

type Category = "web" | "system" | "ai" | "iot";

const CATEGORY_META: Record<
  Category,
  { label: string; color: string; icon: React.ComponentType<{ className?: string }> }
> = {
  web: { label: "Web Applications", color: "var(--signal)", icon: Layers },
  system: { label: "Systems", color: "var(--flow)", icon: Boxes },
  ai: { label: "AI & Automation", color: "var(--pulse-c)", icon: Bot },
  iot: { label: "Hardware & IoT", color: "#06b6d4", icon: Cpu },
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
  image: string | string[];
  demoUrl?: string;
  githubUrl?: string;
};

const PROJECTS: Project[] = [
  {
    slug: "solace-point",
    name: "Solace Point",
    date: "2026.06",
    category: "web",
    summary:
      "Full-stack digital insurance platform for OneNetworx Marketing, streamlining customer onboarding and quotation requests.",
    problem:
      "Developing a high-impact digital platform to replace traditional, offline insurance pipelines and accelerate lead generation.",
    solution:
      "Engineered a full-stack sales portal featuring real-time automated quote generation, secure database registration, and a high-fidelity UI.",
    outcome:
      "Converted visitors into active policyholders and optimized user journeys to significantly improve customer engagement.",
    stack: ["React", "Vite", "Tailwind CSS", "PostgreSQL", "Supabase", "Node.js"],
    image: "/images/solacepoint/heropage.png",
    demoUrl: "https://solacepoint.vercel.app/SolacePoint/Home",
  },
  {
    slug: "personal-portfolio",
    name: "Personal Portfolio (v2)",
    date: "2026.06",
    category: "web",
    summary: "Modern digital showcase with a system-styled interface.",
    problem:
      "I lacked a dedicated platform to thoroughly exhibit my complex engineering projects, automations, and systems in a way that standard templates couldn't handle.",
    solution:
      "Designed a custom React application featuring a high-fidelity 'Glassmorphism' aesthetic, bento-grid layouts, and performant animations.",
    outcome:
      "Delivered a distinctive engineering-first showcase that perfectly highlights my technical capabilities and systems architecture to hiring managers.",
    stack: ["React", "TypeScript", "Tailwind CSS", "Vite", "Lucide", "TanStack Router"],
    image: "/images/portfolio/VERSION2-PORTFOLIO.png",
    demoUrl: "https://bryant-melliza.vercel.app/",
  },
  {
    slug: "confession-wall",
    name: "Confession Wall",
    date: "2024.05",
    category: "web",
    summary: "Anonymous Valentine's Day confession wall built for GDSC.",
    problem:
      "The student community needed a safe, anonymous digital outlet to share messages and foster community engagement.",
    solution:
      "Leveraged Firebase for semi-real-time data synchronization, ensuring new confessions appear instantly across all active client sessions without manual refreshes.",
    outcome:
      "Successfully deployed for the Google Developer Student Clubs, creating a highly adopted digital expression platform for the university chapter.",
    stack: ["HTML", "CSS", "Bootstrap", "JavaScript", "Firebase", "Vite"],
    image: "/images/CONFESSION WALL.png",
    demoUrl: "https://confession-wall-ctso-gdscnufv.vercel.app/",
  },
  {
    slug: "xoxo-tictactoe",
    name: "XOXO TicTacToe",
    date: "2024.03",
    category: "web",
    summary: "Multiplayer & AI TicTacToe built for Web Programming (2nd term, 2023-2024).",
    problem:
      "Developed as the final output for Web Programming (2nd Term, A.Y. 2023-2024), the challenge was to breathe new life into Tic-Tac-Toe with local multiplayer, AI challenge modes, and a global leaderboard.",
    solution:
      "Designed with a retro-neon arcade theme, utilizing CSS transitions and AJAX for fluid, state-driven gameplay without page reloads.",
    outcome:
      "Awarded Best Web Game Design; served as an exemplary class case study for the Web Programming course.",
    stack: ["PHP", "MySQL", "JavaScript", "AJAX", "CSS"],
    image: [
      "/tictactoe/1 -XOXO-landing.png",
      "/tictactoe/2.png",
      "/tictactoe/3.png",
      "/tictactoe/4.png",
      "/tictactoe/5.png",
      "/tictactoe/6.png",
    ],
    githubUrl: "https://github.com/brybryson/TicTacToeGame2",
  },
  {
    slug: "property-custodian",
    name: "Property Custodian Management System",
    date: "2026.02",
    category: "system",
    summary: "Custom asset management platform with predictive lifecycle monitoring.",
    problem:
      "Institutions struggle with manual asset tracking and equipment lifecycle management, leading to significant resource loss and inventory discrepancies.",
    solution:
      "A specialized system using predictive algorithms to track asset health, automate procurement schedules, and generate real-time inventory audits with high accuracy.",
    outcome:
      "Implemented predictive inventory forecasting and reporting workflows that improved asset visibility and significantly reduced manual audit processes.",
    stack: ["Microsoft Power Platform", "PHP", "JavaScript", "Tailwind CSS", "MySQL Database"],
    image: [
      "/images/custodian/1-login.png",
      "/images/custodian/Screenshot 2026-02-06 at 8.34.47 PM.png",
      "/images/custodian/Screenshot 2026-02-06 at 8.34.59 PM.png",
      "/images/custodian/Screenshot 2026-02-06 at 8.35.18 PM.png",
      "/images/custodian/Screenshot 2026-02-06 at 8.35.36 PM.png",
      "/images/custodian/Screenshot 2026-02-06 at 8.35.48 PM.png",
      "/images/custodian/Screenshot 2026-02-06 at 8.36.00 PM.png",
      "/images/custodian/Screenshot 2026-02-06 at 8.37.11 PM.png",
      "/images/custodian/Screenshot 2026-02-06 at 8.37.23 PM.png",
      "/images/custodian/Screenshot 2026-02-06 at 8.37.36 PM.png",
      "/images/custodian/Screenshot 2026-02-06 at 8.37.52 PM.png",
      "/images/custodian/Screenshot 2026-02-06 at 8.38.07 PM.png",
      "/images/custodian/Screenshot 2026-02-06 at 8.38.29 PM.png",
      "/images/custodian/Screenshot 2026-02-06 at 8.38.37 PM.png",
      "/images/custodian/Screenshot 2026-02-06 at 8.38.46 PM.png",
      "/images/custodian/Screenshot 2026-02-06 at 8.38.57 PM.png",
    ],
    demoUrl: "https://properties.bcps4core.com/login/index.php",
  },
  {
    slug: "prefect-system",
    name: "Prefect Disciplinary Action System",
    date: "2026.02",
    category: "system",
    summary: "Rule-based AI decision support system for school disciplinary management.",
    problem:
      "To centralize student behavior records, enabling school administrators to manage sanctions fairly and transparently while providing counselors with actionable insights for student guidance.",
    solution:
      "Engineered a disciplinary management platform featuring a rule-based decision support system that automatically categorizes infractions and recommends handbook-compliant actions.",
    outcome:
      "Designed database structures and workflow automation to streamline administrative case handling, ensuring consistency across all disciplinary cases.",
    stack: ["Business Logic Systems", "PHP", "JavaScript", "Tailwind CSS", "MySQL Database"],
    image: [
      "/images/prefect/Screenshot 2026-02-06 at 8.24.32 PM.png",
      "/images/prefect/Screenshot 2026-02-06 at 8.25.21 PM.png",
      "/images/prefect/Screenshot 2026-02-06 at 8.27.01 PM.png",
      "/images/prefect/Screenshot 2026-02-06 at 8.27.18 PM.png",
      "/images/prefect/Screenshot 2026-02-06 at 8.27.52 PM.png",
      "/images/prefect/Screenshot 2026-02-06 at 8.28.02 PM.png",
      "/images/prefect/Screenshot 2026-02-06 at 8.28.28 PM.png",
      "/images/prefect/Screenshot 2026-02-06 at 8.29.09 PM.png",
      "/images/prefect/Screenshot 2026-02-06 at 8.29.23 PM.png",
      "/images/prefect/Screenshot 2026-02-06 at 8.29.43 PM.png",
      "/images/prefect/Screenshot 2026-02-06 at 8.30.37 PM.png",
      "/images/prefect/Screenshot 2026-02-06 at 8.30.52 PM.png",
      "/images/prefect/Screenshot 2026-02-06 at 8.31.10 PM.png",
      "/images/prefect/Screenshot 2026-02-06 at 8.32.04 PM.png",
    ],
    demoUrl: "https://prefect.bcps4core.com/pages/login.html",
  },
  {
    slug: "petsense",
    name: "PetSense: RFID Grooming Management System",
    date: "2025.10",
    category: "system",
    summary: "Web-based pet grooming management system integrated with RFID technology.",
    problem:
      "To digitize the pet grooming experience at Animates through RFID integration, automating pet identification and tracking service history for improved customer loyalty and operation efficiency.",
    solution:
      "Implemented a seamless RFID checking system that instantly retrieves a pet's medical and grooming history, allowing groomers to provide personalized care based on historical data.",
    outcome:
      "Improved operational efficiency by reducing manual record management and enabling real-time service monitoring.",
    stack: ["RFID Integration", "PHP", "HTML", "Tailwind CSS", "JavaScript", "Database Management"],
    image: [
      "/animates/1 - title.png",
      "/animates/2 - next.png",
      "/animates/3 - process.png",
      "/animates/4 - next.png",
      "/animates/5 - next.png",
      "/animates/6 - next.png",
      "/animates/7 - next.png",
      "/animates/8 - next.png",
    ],
    githubUrl: "https://github.com/brybryson/AnimatesSystem",
  },
  {
    slug: "vetflow",
    name: "VetFlow",
    date: "2025.02",
    category: "system",
    summary: "Custom POS & Inventory Management System for veterinary clinics.",
    problem:
      "Providing a robust POS and Inventory system for veterinary clinics to handle high-volume patient traffic without missing critical medical records or stock updates.",
    solution:
      "Developed a centralized solution featuring automated medical certificate generation and patient history tracking that syncs directly with the inventory system.",
    outcome:
      "Digitized inventory tracking, transaction processing, and reporting workflows, completely replacing manual operations.",
    stack: ["PHP", "MySQL", "JavaScript", "HTML", "Tailwind CSS"],
    image: [
      "/vetflow/1-vetflow_1.PNG",
      "/vetflow/Add New Products.PNG",
      "/vetflow/Add New Services.PNG",
      "/vetflow/Data Management (1).PNG",
      "/vetflow/Item Preview.PNG",
      "/vetflow/Item Stockks.PNG",
      "/vetflow/Item Stocks.PNG",
      "/vetflow/Ordered Items.PNG",
      "/vetflow/POS Terminal (Services).PNG",
      "/vetflow/Print Invoice.PNG",
      "/vetflow/Reports.PNG",
      "/vetflow/Sales History.PNG",
      "/vetflow/Supplier.PNG",
      "/vetflow/User Management.PNG",
    ],
    githubUrl: "https://github.com/brybryson/VetFlow",
  },
  {
    slug: "safety-heroes",
    name: "Safety Heroes",
    date: "2025.10",
    category: "web",
    summary:
      "Disaster preparedness learning app for children, built during the Caffeine.AI Manila Hackathon.",
    problem:
      "Young learners needed an engaging, interactive way to learn emergency response and disaster preparedness.",
    solution:
      "Designed and prototyped an AI-assisted educational platform focused on child-friendly interactive scenarios, built entirely on Caffeine AI.",
    outcome:
      "Collaborated under strict time constraints to successfully deliver a functional application within a three-hour hackathon environment.",
    stack: ["Caffeine AI", "AI Prototyping", "UI/UX Design", "Prompting"],
    image: "/images/SAFETYHEROES2.png",
    demoUrl: "https://safetyheroes-rb1.caffeine.xyz/",
  },
  {
    slug: "alertpoint",
    name: "AlertPoint: Disaster Risk Reduction System",
    date: "2025.10",
    category: "system",
    summary:
      "Award-winning disaster response platform integrating IoT sensors and mobile broadcasting.",
    problem:
      "Disaster-prone communities often lack localized, real-time warning systems, relying on delayed national broadcasts that may not reflect immediate local conditions.",
    solution:
      "AlertPoint uses localized IoT sensors for floods and fires, delivering instant alerts via a centralized web dashboard and public notification system to reduce response times.",
    outcome:
      "Won Best in IoT-Cross Platform Award. Enabled real-time monitoring and rapid dissemination of alerts for disaster preparedness and community safety initiatives.",
    stack: [
      "IoT Sensors",
      "Mobile Application",
      "PHP",
      "Tailwind CSS",
      "JavaScript",
      "MySQL Database",
      "Firebase",
    ],
    image: [
      "/alertpoint/1 - alertpoint.png",
      "/alertpoint/1 - hardware.png",
      "/alertpoint/1 - hardwaree.png",
      "/alertpoint/2 - alert.png",
      "/alertpoint/3 - environmental.png",
      "/alertpoint/4 - environ.png",
      "/alertpoint/5 - environ.png",
      "/alertpoint/6 - water.png",
      "/alertpoint/7 - water.png",
      "/alertpoint/8 - water.png",
      "/alertpoint/9 - barangay.png",
      "/alertpoint/10 -barangay.png",
      "/alertpoint/11 - maps.png",
      "/alertpoint/12- maps.png",
      "/alertpoint/13 - maps.png",
      "/alertpoint/14 - logs.png",
      "/alertpoint/15 - admin logs.png",
      "/alertpoint/16 - system logs.png",
    ],
    demoUrl: "https://alert-point-demo.vercel.app/html/login.html",
  },
  {
    slug: "salbag",
    name: "SALBAG: Smart Anti-Theft IoT Device",
    date: "2024.06",
    category: "iot",
    summary: "Raspberry Pi-based anti-theft solution featuring computer vision and GPS tracking.",
    problem:
      "Bag theft in transit lacked a personal-scale deterrent, requiring an automated, hardware-integrated solution to secure personal belongings.",
    solution:
      "Engineered a Raspberry Pi (Core Engine) wearable featuring a CMOS Camera (Face ID), GPS NEO8MV2 (Live Tracking), and an automated Panic Alarm synced to the cloud.",
    outcome:
      "Managed project planning, hardware integration, software development (Python/OpenCV & Flutter), and system testing to deliver a robust prototype.",
    stack: ["Raspberry Pi", "Python", "Computer Vision", "GPS Tracking", "Flutter", "SMTP"],
    image: "/images/salbag_3d representation.png",
    githubUrl: "https://github.com/brybryson/SALBAG.project",
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
    hash: "e2c8a9f",
    type: "feat",
    role: "Freelance Full-Stack Developer",
    company: "Self-Employed",
    logo: "/images/experience/portfolio logo.png",
    period: "Jun 2024 → Present",
    body: "Architected and developed end-to-end custom web and mobile applications. Engineered scalable full-stack systems using React, Next.js, TypeScript, PostgreSQL, and REST APIs. Translated client requirements into high-performance frontends and managed the full software development lifecycle while utilizing modern AI-assisted workflows to accelerate delivery.",
  },
  {
    hash: "a1f9c02",
    type: "feat",
    role: "Intern Developer",
    company: "OneNetworx Marketing",
    logo: "/images/experience/OneNetworx Logo.jpg",
    period: "May 2026 → Jun 2026",
    body: "Engineered responsive insurance marketing platforms using React, Vite, and Tailwind CSS. Implemented complex multi-step form workflows and migrated email infrastructure to the Gmail REST API via OAuth2. Architected serverless backend workflows using Supabase (PostgreSQL) for secure, real-time data synchronization.",
  },
  {
    hash: "7d3ba81",
    type: "feat",
    role: "Intern Developer",
    company: "JLabs Innovatech Inc.",
    logo: "/images/experience/JLABS-LOGO.png",
    period: "Mar 2026 → Apr 2026",
    body: "Contributed to cross-platform mobile solutions using React Native, Expo, and TypeScript. Integrated AI functionality using the Anthropic API and implemented Zod-based validation. Resolved complex bugs related to real-time data flows and collaborated within Agile development cycles using ClickUp and Git workflows.",
  },
  {
    hash: "4c1e2f6",
    type: "feat",
    role: "Software Developer Intern",
    company: "NLP Business Development Services",
    logo: "/images/experience/NLP LOGO.png",
    period: "Nov 2025 → Feb 2026",
    body: "Developed business applications using React, Next.js, PostgreSQL, and Prisma ORM while maintaining legacy PHP/CodeIgniter systems. Led rapid UI/UX modernization of internal modules and optimized backend data schemas. Accelerated feature delivery by integrating AI-assisted tooling into the daily Bitbucket development workflow.",
  },
];

const EDUCATION = [
  {
    school: "National University — Fairview",
    logo: "/images/education/NU LOGO.png",
    degree:
      "Bachelor of Science in Information Technology Specialization in Mobile and Internet Technologies",
    detail: "College",
    period: "2022 — 2026",
    honors: [
      "Summa Cum Laude",
      "Academic Excellence Award (2025-2026)",
      "Consistent Blue Scholar (100% Full Merit Scholarship)",
      "Consistent First Honor Dean's Lister",
      "Former Chief Creative Officer, GDSC",
      "Champion – UI/UX Design Competition",
      "Champion – Networking Competition",
      "Sole Awardee – Best Web Game Design (XOXO)",
    ],
  },
  {
    school: "Caloocan National Science & Technology High School",
    logo: "/images/education/CNSTHS.png",
    degree: "Science, Technology, Engineering, and Mathematics (STEM) Strand",
    detail: "Senior High School",
    period: "Graduated 2022",
    honors: [
      "With High Honors",
      "Silver Seal of Excellence",
      "Special Citation in Journalism (Photojournalism - English Category)",
    ],
  },
];

const CERTIFICATES = [
  {
    title: "Essentials: Your First Workflows",
    issuer: "n8n Academy",
    date: "July 22, 2026",
    image: "/certificates/Essentials- Your First Workflows n8n.png",
  },
];

const SKILLS: { group: string; items: string[] }[] = [
  {
    group: "Frontend",
    items: [
      "JavaScript",
      "TypeScript",
      "HTML5",
      "CSS3",
      "React",
      "Next.js",
      "React Native",
      "Tailwind CSS",
      "Bootstrap",
      "ShadCN/UI",
      "Vite",
    ],
  },
  {
    group: "Backend",
    items: [
      "PHP",
      "SQL",
      "Laravel",
      "PostgreSQL",
      "MySQL",
      "Prisma ORM",
      "Firebase",
      "Supabase",
      "CodeIgniter",
      "Zod",
    ],
  },
  {
    group: "Automation & Integrations",
    items: [
      "Python",
      "Automation Engineering",
      "n8n / Workflow Automation",
      "LLM Integration",
      "API Integration",
      "Full-Stack Notifications",
    ],
  },
  {
    group: "Tools & Design",
    items: [
      "Git",
      "GitHub",
      "Bitbucket",
      "Docker",
      "Jira",
      "ClickUp",
      "Figma",
      "Adobe Photoshop",
      "Cursor",
      "Claude Code",
      "WordPress",
      "Elementor",
    ],
  },
  {
    group: "Other",
    items: [
      "Software Testing",
      "Debugging",
      "Responsive UI Development",
      "Agile Development",
      "Basic Linux CLI",
    ],
  },
];

const SECTIONS = [
  { id: "hero", label: "home", hint: "Top of page" },
  { id: "projects", label: "projects", hint: "Pipeline graph" },
  { id: "demo", label: "demo", hint: "Live agent" },
  { id: "experience", label: "experiences", hint: "Commit log" },
  { id: "education", label: "education", hint: "Schools & honors" },
  { id: "certificates", label: "certificates", hint: "Badges & Credentials" },
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
        <Skills />
        <Projects active={activeProject} setActive={setActiveProject} />
        <LiveDemo />
        <ExperienceLog />
        <Education />
        <Certificates />
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
          <img
            src="/images/experience/portfolio logo.png"
            alt="Logo"
            className="h-5 w-5 object-contain"
          />
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
            href="https://github.com/brybryson"
            target="_blank"
            rel="noreferrer"
            className="hover:text-foreground"
          >
            github
          </a>
          <a
            href="https://www.linkedin.com/in/bryant-iverson-melliza-6759b8292"
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
    <section id="hero" className="relative pt-6 pb-24 md:pt-8 md:pb-28">
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
            Mobile and web development with{" "}
            <span className="text-foreground">React & React Native</span> — plus powerful
            AI-assisted automation via <span className="text-foreground">n8n</span> that turns messy
            workflows into seamless systems.
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

function TiledImage({
  topSrc,
  bottomSrc,
  alt,
  className,
}: {
  topSrc: string;
  bottomSrc: string;
  alt: string;
  className?: string;
}) {
  return (
    <div className={`relative overflow-hidden group ${className || ""}`}>
      <img
        src={bottomSrc}
        alt={alt}
        className="absolute inset-0 h-full w-full object-cover object-[center_30%]"
      />
      <img
        src={topSrc}
        alt={alt}
        className="absolute inset-0 h-full w-full object-cover object-[40%_25%] transition-all duration-75 ease-in-out group-hover:opacity-0 group-hover:blur-sm"
      />
    </div>
  );
}

function PhotoCard() {
  return (
    <div className="h-full w-full">
      <div className="relative mx-auto mt-2 w-full max-w-[420px] md:ml-auto md:mr-0 md:max-w-[480px] md:mt-6 sticky top-24">
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
            <TiledImage
              topSrc={togaImg}
              bottomSrc={bryantImg}
              alt="Bryant Melliza"
              className="h-full w-full"
            />
            {/* subtle grid overlay */}
            <div className="pointer-events-none absolute inset-0 mix-blend-multiply opacity-40 bg-dotgrid" />
            {/* corner readout tag */}
            <div className="absolute bottom-2 left-2 rounded-sm border border-border-strong bg-background/85 px-2 py-1 text-mono text-[10px] uppercase tracking-widest text-foreground backdrop-blur">
              <span className="text-signal">●</span> bryant iverson melliza
            </div>
          </div>
          <div className="grid grid-cols-3 divide-x divide-border border-t border-border text-mono text-[10.5px]">
            <StatCell label="role" value="software dev" />
            <StatCell label="focus" value="fs & automation" />
            <StatCell label="status" value="available" />
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
    { k: "Dev Experience", v: "2+ Years", c: "var(--signal)" },
    { k: "Applications Shipped", v: "12+", c: "var(--flow)" },
    { k: "Software Internships", v: "03 Roles", c: "var(--pulse-c)" },
    { k: "Certifications & Awards", v: "05+ Badges", c: "var(--signal)" },
  ];
  return (
    <div className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-border-strong bg-border md:grid-cols-4">
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
      "  → stack: react · react native · typescript",
      "  → automation: n8n · ai-assisted tooling",
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
      <div className="flex items-center justify-between border-b border-border bg-surface-2 px-3 py-2 text-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        <div className="flex items-center gap-4">
          <div className="flex gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-[#FF5F56]" />
            <div className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E]" />
            <div className="h-2.5 w-2.5 rounded-full bg-[#27C93F]" />
          </div>
          <div className="flex items-center gap-2">
            <Terminal className="h-3 w-3" />
            <span>~/portfolio · system readout</span>
          </div>
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
    <div className="flex items-center gap-3 border-t border-border pt-8">
      <span className="text-mono text-[12px] uppercase tracking-widest text-muted-foreground">
        [{index}]
      </span>
      <span className="text-mono text-[12px] uppercase tracking-widest text-foreground">
        {label}
      </span>
      {hint && (
        <span className="text-mono text-[12px] uppercase tracking-widest text-muted-foreground">
          — {hint}
        </span>
      )}
      <span className="ml-auto text-mono text-[12px] uppercase tracking-widest text-muted-foreground">
        <span className="inline-block h-1.5 w-1.5 -translate-y-0.5 rounded-full bg-pulse align-middle" />{" "}
        sys.ready
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
      <SectionLabel index="02" label="projects" hint="web · systems · ai automation" />
      <div className="mt-8 grid grid-cols-1 items-start gap-6 lg:grid-cols-[280px_1fr] lg:gap-8">
        <DirectoryExplorer active={active} setActive={setActive} />
        <div className="sticky top-24">
          <CaseStudy project={current} />
        </div>
      </div>
    </section>
  );
}

function DirectoryExplorer({
  active,
  setActive,
}: {
  active: string | null;
  setActive: (s: string) => void;
}) {
  const cats: Category[] = ["web", "system", "ai", "iot"];
  return (
    <div className="relative flex h-[600px] flex-col overflow-hidden rounded-sm border border-border-strong bg-graph bg-surface/70">
      <div className="flex shrink-0 items-center justify-between border-b border-border bg-surface-2 px-4 py-2 text-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        <div className="flex items-center gap-4">
          <div className="flex gap-1.5 shrink-0">
            <div className="h-2.5 w-2.5 rounded-full bg-[#FF5F56]" />
            <div className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E]" />
            <div className="h-2.5 w-2.5 rounded-full bg-[#27C93F]" />
          </div>
          <div className="flex items-center gap-2">
            <Terminal className="h-3 w-3" />
            <span className="uppercase tracking-widest">EXPLORER</span>
          </div>
        </div>
      </div>

      <div
        className="flex-1 overflow-y-auto p-4"
        style={{ scrollbarWidth: "thin", scrollbarColor: "var(--scrollbar-thumb) transparent" }}
      >
        <div className="flex flex-col gap-8">
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
    </div>
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
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    setActiveSlide(0);
  }, [project.slug]);

  const isArray = Array.isArray(project.image);
  const images = isArray ? (project.image as string[]) : [project.image as string];

  return (
    <article
      key={project.slug}
      className="animate-fade-in flex h-[600px] flex-col overflow-hidden rounded-sm border border-border-strong bg-card"
      style={{ borderTopColor: meta.color, borderTopWidth: 2 }}
    >
      <div className="flex shrink-0 items-center justify-between border-b border-border px-4 py-2 text-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        <div className="flex items-center gap-4">
          <div className="flex gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-[#FF5F56]" />
            <div className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E]" />
            <div className="h-2.5 w-2.5 rounded-full bg-[#27C93F]" />
          </div>
          <div className="flex items-center gap-2">
            <FileText className="h-3 w-3" />
            <span className="uppercase tracking-widest">CASE-STUDY/{project.slug}.MD</span>
          </div>
        </div>
        <span className="flex items-center gap-3">
          <span className="flex items-center gap-1.5" style={{ color: meta.color }}>
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: meta.color }} />
            {meta.label}
          </span>
          <span>{project.date}</span>
        </span>
      </div>
      <div
        className="flex flex-1 flex-col overflow-y-auto"
        style={{ scrollbarWidth: "thin", scrollbarColor: "var(--scrollbar-thumb) transparent" }}
      >
        <div className="group relative w-full border-b border-border bg-graph">
          <img
            src={images[activeSlide]}
            alt={`${project.name} slide ${activeSlide + 1}`}
            className="h-auto w-full object-contain"
            style={{ display: "block" }}
            onError={(e) => {
              const el = e.currentTarget as HTMLImageElement;
              el.style.display = "none";
            }}
          />
          {isArray && images.length > 1 && (
            <>
              <button
                onClick={() =>
                  setActiveSlide((prev) => (prev === 0 ? images.length - 1 : prev - 1))
                }
                className="absolute left-4 top-1/2 -translate-y-1/2 rounded-sm border border-border bg-surface/80 p-2 text-muted-foreground opacity-0 backdrop-blur-sm transition hover:text-foreground group-hover:opacity-100"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={() =>
                  setActiveSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1))
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-sm border border-border bg-surface/80 p-2 text-muted-foreground opacity-0 backdrop-blur-sm transition hover:text-foreground group-hover:opacity-100"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
              <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1.5">
                {images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveSlide(idx)}
                    className={`h-1.5 rounded-full transition-all ${idx === activeSlide ? "w-4 bg-signal" : "w-1.5 bg-border-strong hover:bg-muted-foreground"}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
        <div className="flex flex-col gap-8 p-6 md:p-8">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div>
              <h3 className="text-2xl font-semibold tracking-tight md:text-3xl">{project.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground md:text-base">{project.summary}</p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex shrink-0 items-center gap-2 rounded-sm border border-border-strong bg-foreground px-5 py-2.5 text-mono text-[11px] uppercase tracking-wider text-background shadow-sm transition hover:border-signal hover:bg-signal hover:text-white"
                >
                  <ArrowUpRight className="h-3.5 w-3.5" /> view live project
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex shrink-0 items-center gap-2 rounded-sm border border-border-strong bg-surface px-5 py-2.5 text-mono text-[11px] uppercase tracking-wider text-foreground shadow-sm transition hover:bg-foreground hover:text-background"
                >
                  <Github className="h-3.5 w-3.5" /> view on github
                </a>
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {project.stack.map((s) => (
              <span
                key={s}
                className="rounded-sm border border-border bg-surface px-2.5 py-1 text-mono text-[10.5px] text-foreground shadow-sm"
              >
                {s}
              </span>
            ))}
          </div>

          <div className="h-px w-full bg-border" />

          <dl className="grid grid-cols-1 gap-4 text-sm md:grid-cols-3 md:gap-6">
            <FieldBlock label="problem" body={project.problem} />
            <FieldBlock label="solution" body={project.solution} />
            <FieldBlock label="outcome" body={project.outcome} />
          </dl>
        </div>
      </div>
    </article>
  );
}

function FieldBlock({ label, body }: { label: string; body: string }) {
  return (
    <div className="flex flex-col gap-2 rounded-sm border border-border/50 bg-surface/30 p-4">
      <dt className="flex items-center gap-2 text-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        <div className="h-1.5 w-1.5 rounded-full bg-border-strong" />
        {label}
      </dt>
      <dd className="text-[13px] leading-relaxed text-foreground/90">{body}</dd>
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
      <SectionLabel index="03" label="live demo" hint="resume q&a agent" />
      <div className="mt-8 overflow-hidden rounded-sm border border-border-strong bg-card">
        <div className="flex items-center justify-between border-b border-border bg-surface-2 px-4 py-2 text-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          <div className="flex items-center gap-4">
            <div className="flex gap-1.5">
              <div className="h-2.5 w-2.5 rounded-full bg-[#FF5F56]" />
              <div className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E]" />
              <div className="h-2.5 w-2.5 rounded-full bg-[#27C93F]" />
            </div>
            <div className="flex items-center gap-2">
              <Bot className="h-3 w-3" />
              <span className="uppercase tracking-widest">AGENT.RESUME · RUNNING</span>
            </div>
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
                className={`shrink-0 uppercase tracking-widest ${
                  m.from === "agent" ? "text-signal font-semibold" : "text-muted-foreground"
                }`}
              >
                {m.from === "agent" ? "agent >" : "you   >"}
              </span>
              <span
                className={
                  m.from === "agent"
                    ? "text-foreground opacity-90"
                    : "text-foreground font-semibold"
                }
              >
                {m.text}
              </span>
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
      <SectionLabel index="04" label="experiences" />
      <div className="mt-12 relative before:absolute before:inset-y-0 before:left-[19.5px] before:w-px before:bg-signal/20 md:before:left-[27.5px]">
        <div className="flex flex-col gap-10">
          {EXPERIENCE.map((e) => (
            <div key={e.hash} className="relative flex items-start gap-6 md:gap-8 group">
              {/* NEON PULSING NODE */}
              <div className="absolute left-[16px] top-[18px] md:left-[24px] z-10">
                <span className="relative inline-flex h-2.5 w-2.5 shrink-0 items-center justify-center">
                  <span className="absolute inline-flex h-2.5 w-2.5 rounded-full ring-pulse bg-signal" />
                  <span className="relative h-2 w-2 rounded-full bg-signal ring-4 ring-background" />
                </span>
              </div>

              <div className="hidden h-[54px] w-[54px] shrink-0 overflow-hidden rounded-md border border-border bg-surface md:block z-10 shadow-sm">
                <img
                  src={e.logo}
                  alt={`${e.company} logo`}
                  className="h-full w-full object-contain p-1"
                  onError={(ev) => ((ev.currentTarget as HTMLImageElement).style.display = "none")}
                />
              </div>
              <div className="flex-1 rounded-md border border-border-strong bg-card p-6 shadow-sm ml-[38px] md:ml-0">
                <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                  <div>
                    <h3 className="text-lg font-semibold tracking-tight text-foreground md:text-xl">
                      {e.role}
                    </h3>
                    <div className="text-[14px] font-medium text-signal/80 mt-1">{e.company}</div>
                  </div>
                  <div className="mt-2 inline-flex self-start items-center rounded-full border border-border bg-surface px-3 py-1 text-mono text-[10.5px] uppercase tracking-widest text-muted-foreground md:mt-0">
                    {e.period}
                  </div>
                </div>
                <p className="mt-5 text-[14.5px] leading-relaxed text-muted-foreground">{e.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Education() {
  return (
    <section id="education" className="py-20">
      <SectionLabel index="05" label="education" />
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

function Certificates() {
  const [active, setActive] = useState(CERTIFICATES[0].title);
  const activeCert = CERTIFICATES.find((c) => c.title === active) || CERTIFICATES[0];

  return (
    <section id="certificates" className="py-20">
      <SectionLabel index="06" label="certificates & badges" />
      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-[280px_minmax(0,1fr)] lg:grid-cols-[340px_minmax(0,1fr)]">
        {/* LEFT SIDEBAR: Explorer */}
        <div className="relative flex flex-col overflow-hidden rounded-sm border border-border-strong bg-graph bg-surface/70 h-[500px]">
          <div className="flex shrink-0 items-center justify-between border-b border-border bg-surface-2 px-4 py-2 text-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            <div className="flex items-center gap-4">
              <div className="flex gap-1.5 shrink-0">
                <div className="h-2.5 w-2.5 rounded-full bg-[#FF5F56]" />
                <div className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E]" />
                <div className="h-2.5 w-2.5 rounded-full bg-[#27C93F]" />
              </div>
              <div className="flex items-center gap-2">
                <Terminal className="h-3 w-3" />
                <span className="uppercase tracking-widest">BADGE_LOG</span>
              </div>
            </div>
          </div>
          <div
            className="flex-1 overflow-y-auto p-4"
            style={{ scrollbarWidth: "thin", scrollbarColor: "var(--scrollbar-thumb) transparent" }}
          >
            <div className="flex flex-col gap-2">
              {CERTIFICATES.map((c) => {
                const isActive = c.title === active;
                return (
                  <button
                    key={c.title}
                    onClick={() => setActive(c.title)}
                    className={`group relative flex w-full items-center gap-3 rounded-sm border px-2.5 py-3 text-left text-mono transition ${
                      isActive
                        ? "border-transparent bg-card text-foreground"
                        : "border-border bg-background/70 text-muted-foreground hover:border-border-strong hover:text-foreground"
                    }`}
                    style={
                      isActive
                        ? {
                            borderColor: "var(--signal)",
                            boxShadow: `inset 0 0 0 1px var(--signal), 0 8px 20px -14px var(--signal)`,
                          }
                        : undefined
                    }
                  >
                    {/* node dot */}
                    <span className="relative inline-flex h-2.5 w-2.5 shrink-0 items-center justify-center">
                      {isActive && (
                        <span className="absolute inline-flex h-2.5 w-2.5 rounded-full ring-pulse bg-signal" />
                      )}
                      <span
                        className="relative h-2 w-2 rounded-full"
                        style={{ background: isActive ? "var(--signal)" : "var(--border-strong)" }}
                      />
                    </span>
                    <div className="flex flex-col min-w-0 flex-1 gap-1">
                      <span className="truncate text-[11.5px] leading-tight text-foreground">
                        {c.title}
                      </span>
                      <span className="truncate text-[10px] uppercase tracking-widest text-signal">
                        {c.issuer}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* RIGHT PANE: Detail View */}
        <article
          key={activeCert.title}
          className="animate-fade-in flex h-[500px] flex-col overflow-hidden rounded-sm border border-border-strong border-t-2 border-t-signal bg-card"
        >
          <div className="flex shrink-0 items-center justify-between border-b border-border px-4 py-2 text-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            <div className="flex items-center gap-4">
              <div className="flex gap-1.5">
                <div className="h-2.5 w-2.5 rounded-full bg-[#FF5F56]" />
                <div className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E]" />
                <div className="h-2.5 w-2.5 rounded-full bg-[#27C93F]" />
              </div>
              <div className="flex items-center gap-2">
                <FileText className="h-3 w-3" />
                <span className="uppercase tracking-widest truncate max-w-[120px] md:max-w-[200px]">
                  CERT/{activeCert.title.replace(/\s+/g, "_")}.PNG
                </span>
              </div>
            </div>
            <span className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 text-signal">
                <span className="h-1.5 w-1.5 rounded-full bg-signal" />
                BADGE
              </span>
              <span className="hidden md:inline">{activeCert.date}</span>
            </span>
          </div>

          <div
            className="flex-1 overflow-y-auto flex flex-col"
            style={{ scrollbarWidth: "thin", scrollbarColor: "var(--border) transparent" }}
          >
            <div className="flex-1 min-h-0 border-b border-border bg-surface p-6 flex items-center justify-center">
              <img
                src={activeCert.image}
                alt={activeCert.title}
                className="h-full w-full object-contain max-h-[420px]"
                onError={(ev) => ((ev.currentTarget as HTMLImageElement).style.display = "none")}
              />
            </div>

            <div className="p-6 md:p-8 shrink-0 bg-card">
              <h3 className="text-xl font-semibold tracking-tight text-foreground md:text-2xl">
                {activeCert.title}
              </h3>
              <div className="text-[14px] font-medium text-signal mt-1.5">
                Issued by {activeCert.issuer} · {activeCert.date}
              </div>
              <div className="mt-2 inline-block md:hidden text-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                Acquired: {activeCert.date}
              </div>
            </div>
          </div>
        </article>
      </div>
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
    <section id="skills" className="pb-20 pt-2 md:pt-4">
      <SectionLabel index="01" label="skills" hint="stack.grouped" />
      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {SKILLS.map((s, i) => (
          <div key={s.group} className="rounded-sm border border-border-strong bg-card p-5">
            <div
              className="flex items-center gap-2 text-mono text-xs font-semibold uppercase tracking-widest"
              style={{ color: accents[i] }}
            >
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: accents[i] }} />
              {s.group}
            </div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {s.items.map((it) => (
                <span
                  key={it}
                  className="rounded-sm border border-border bg-surface px-2.5 py-1 text-mono text-[13px] text-foreground"
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
        <div className="overflow-hidden rounded-sm border border-border-strong bg-card">
          <div className="flex items-center gap-4 border-b border-border bg-surface-2 px-4 py-2">
            <div className="flex gap-1.5 shrink-0">
              <div className="h-2.5 w-2.5 rounded-full bg-[#FF5F56]" />
              <div className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E]" />
              <div className="h-2.5 w-2.5 rounded-full bg-[#27C93F]" />
            </div>
            <div className="flex items-center gap-2">
              <Send className="h-3 w-3 text-muted-foreground" />
              <span className="text-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                CONTACT.EXE
              </span>
            </div>
          </div>
          <div className="p-6">
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
                href="/resume/Bryant_Melliza_Resume.pdf"
                download
                className="inline-flex items-center gap-2 rounded-sm border border-border-strong px-4 py-2 text-mono text-xs uppercase tracking-wider text-foreground hover:border-signal hover:text-signal"
              >
                <Download className="h-3.5 w-3.5" /> download resume
              </a>
            </div>
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
            github.com/brybryson
          </ContactRow>
          <ContactRow icon={<Linkedin className="h-3.5 w-3.5" />} label="linkedin">
            linkedin.com/in/bryant-iverson-melliza-6759b8292
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
      <DialogContent
        withoutOverlay
        className="overflow-hidden p-0 sm:max-w-none bottom-0 top-auto left-0 right-0 translate-x-0 translate-y-0 w-full max-h-[80vh] rounded-t-lg rounded-b-none sm:rounded-t-lg sm:rounded-b-none"
      >
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
                  const a = document.createElement("a");
                  a.href = "/resume/Bryant_Melliza_Resume.pdf";
                  a.download = "Bryant_Melliza_Resume.pdf";
                  document.body.appendChild(a);
                  a.click();
                  document.body.removeChild(a);
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
