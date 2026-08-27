export type Experience = {
  hash: string;
  type: "feat" | "chore";
  role: string;
  company: string;
  companyUrl?: string;
  logo: string;
  period: string;
  body: string;
};

export const EXPERIENCE: Experience[] = [
  {
    hash: "e2c8a9f",
    type: "feat",
    role: "Freelance Full-Stack Developer",
    company: "Self-Employed",
    companyUrl: "https://www.linkedin.com/in/bryant-iverson-melliza-6759b8292",
    logo: "/images/experience/portfolio logo.png",
    period: "Jun 2024 → Present",
    body: "Architected and developed end-to-end custom web and mobile applications. Engineered scalable full-stack systems using React, Next.js, TypeScript, PostgreSQL, and REST APIs. Translated client requirements into high-performance frontends and managed the full software development lifecycle while utilizing modern AI-assisted workflows to accelerate delivery.",
  },
  {
    hash: "a1f9c02",
    type: "feat",
    role: "Intern Developer",
    company: "OneNetworx Marketing",
    companyUrl: "https://www.onenetworxinsurance.com/",
    logo: "/images/experience/OneNetworx Logo.jpg",
    period: "May 2026 → Jun 2026",
    body: "Engineered responsive insurance marketing platforms using React, Vite, and Tailwind CSS. Implemented complex multi-step form workflows and migrated email infrastructure to the Gmail REST API via OAuth2. Architected serverless backend workflows using Supabase (PostgreSQL) for secure, real-time data synchronization.",
  },
  {
    hash: "7d3ba81",
    type: "feat",
    role: "Intern Developer",
    company: "JLabs Innovatech Inc.",
    companyUrl: "https://jlabs.team/",
    logo: "/images/experience/JLABS-LOGO.png",
    period: "Mar 2026 → Apr 2026",
    body: "Contributed to cross-platform mobile solutions using React Native, Expo, and TypeScript. Integrated AI functionality using the Anthropic API and implemented Zod-based validation. Resolved complex bugs related to real-time data flows and collaborated within Agile development cycles using ClickUp and Git workflows.",
  },
  {
    hash: "4c1e2f6",
    type: "feat",
    role: "Software Developer Intern",
    company: "NLP Business Development Services",
    companyUrl: "https://www.facebook.com/nlpbussdevtservices/",
    logo: "/images/experience/NLP LOGO.png",
    period: "Nov 2025 → Feb 2026",
    body: "Developed business applications using React, Next.js, PostgreSQL, and Prisma ORM while maintaining legacy PHP/CodeIgniter systems. Led rapid UI/UX modernization of internal modules and optimized backend data schemas. Accelerated feature delivery by integrating AI-assisted tooling into the daily Bitbucket development workflow.",
  },
];

export const EDUCATION = [
  {
    school: "National University — Fairview",
    logo: "/images/education/NU LOGO.png",
    degree: "Bachelor of Science in Information Technology",
    specialization: "Specialization in Mobile and Internet Technologies",
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
    degree: "STEM Strand",
    specialization: "Science, Technology, Engineering, and Mathematics",
    detail: "Senior High School",
    period: "Graduated 2022",
    honors: [
      "With High Honors",
      "Silver Seal of Excellence",
      "Special Citation in Journalism (Photojournalism - English Category)",
    ],
  },
];
