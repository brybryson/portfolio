export const CERTIFICATE_CATEGORIES = [
  "All",
  "Automation & AI",
  "Software Dev & API",
  "Project Management & Agile",
  "Testing & QA",
  "Soft Skills & Leadership",
  "Data Privacy & Governance",
] as const;

export type CertificateCategory = (typeof CERTIFICATE_CATEGORIES)[number];

export interface CertificateItem {
  title: string;
  issuer: string;
  date: string;
  category: CertificateCategory;
  image: string;
}

export const CERTIFICATES: CertificateItem[] = [
  {
    title: "Essentials: Your First Workflows",
    issuer: "n8n Academy",
    date: "July 22, 2026",
    category: "Automation & AI",
    image: "/certificates/Essentials- Your First Workflows n8n.png",
  },
  {
    title: "Integrations: APIs & Connected Workflows",
    issuer: "n8n Academy",
    date: "July 23, 2026",
    category: "Automation & AI",
    image: "/certificates/integrations - apis and connected workflows.png",
  },
  {
    title: "In Practice: AI, Testing & Best Practices",
    issuer: "n8n Academy",
    date: "July 23, 2026",
    category: "Automation & AI",
    image: "/certificates/in practice-ai, testing, best practices.png",
  },
  {
    title: "AI in Risk Management and Fraud Detection",
    issuer: "LinkedIn Learning",
    date: "August 8, 2025",
    category: "Automation & AI",
    image: "/certificates/ai in risk management and fraud detection.png",
  },
  {
    title: "Introducing Postman",
    issuer: "LinkedIn Learning",
    date: "September 13, 2025",
    category: "Software Dev & API",
    image: "/certificates/introducing postman.png",
  },
  {
    title: "Postman Essential Training",
    issuer: "LinkedIn Learning",
    date: "September 13, 2025",
    category: "Software Dev & API",
    image: "/certificates/postman essential training.png",
  },
  {
    title: "Software Design: Developing Effective Requirements",
    issuer: "LinkedIn Learning",
    date: "August 8, 2025",
    category: "Software Dev & API",
    image: "/certificates/software design-developing effective requirements.png",
  },
  {
    title: "Agile Software Development",
    issuer: "LinkedIn Learning",
    date: "September 13, 2025",
    category: "Project Management & Agile",
    image: "/certificates/agile software dev.png",
  },
  {
    title: "Getting Started with Professional Scrum",
    issuer: "LinkedIn Learning",
    date: "August 15, 2026",
    category: "Project Management & Agile",
    image: "/certificates/getting started with professional scrum.png",
  },
  {
    title: "Programming Foundations: Software Testing/QA",
    issuer: "LinkedIn Learning",
    date: "August 9, 2025",
    category: "Testing & QA",
    image: "/certificates/qa.png",
  },
  {
    title: "Understanding Manual Testing",
    issuer: "LinkedIn Learning",
    date: "August 9, 2025",
    category: "Testing & QA",
    image: "/certificates/understanding manual testing.png",
  },
  {
    title: "Google Developer Student Club Core Team Member",
    issuer: "Google Developer Student Club",
    date: "AY 2023 - 2024",
    category: "Soft Skills & Leadership",
    image: "/certificates/GDSC CERTIFICATE OFCOMPLETION.png",
  },
  {
    title: "Leadership Skills for the Future",
    issuer: "LinkedIn Learning",
    date: "August 8, 2025",
    category: "Soft Skills & Leadership",
    image: "/certificates/leadership skills for the future.png",
  },
  {
    title: "Leading with a Growth Mindset",
    issuer: "LinkedIn Learning",
    date: "August 8, 2025",
    category: "Soft Skills & Leadership",
    image: "/certificates/leading with a growth mindset.png",
  },
  {
    title: "CIC Academy Webinar Course VII x NPC Privacy",
    issuer: "Credit Information Corp. & NPC",
    date: "October 4, 2024",
    category: "Data Privacy & Governance",
    image: "/certificates/CIC Academy webinar.png",
  },
];
