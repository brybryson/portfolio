export interface KnowledgeChunk {
  id: string;
  category: "identity" | "projects" | "stack" | "experience" | "education" | "services" | "contact";
  keywords: string[];
  title: string;
  content: string;
  quickReplies?: string[];
}

export const BRYSON_KNOWLEDGE_BASE: KnowledgeChunk[] = [
  {
    id: "identity",
    category: "identity",
    keywords: ["who", "bryant", "about", "bio", "summary", "profile", "background"],
    title: "About Bryant Melliza",
    content: `Bryant Iverson Melliza is a Full-Stack Developer and AI Systems Architect based in Caloocan City, Philippines.
He specializes in building scalable web platforms with React 19, Next.js 15, and TypeScript, combined with autonomous AI workflows and RAG engines in n8n and Supabase pgvector.
He is graduating as Summa Cum Laude with a BS in Information Technology from National University Fairview (100% Full Merit Blue Scholar).`,
    quickReplies: ["What projects has Bryant built?", "What is his tech stack?", "Is he open for work?"],
  },
  {
    id: "services",
    category: "services",
    keywords: ["services", "hire", "offer", "deliver", "freelance", "contract", "rates", "can you do"],
    title: "Client Offerings & Capabilities",
    content: `Bryant offers 5 specialized development services:
1. AI & Workflow Automation: Multi-branch n8n & Python pipelines, lead routing, and Slack/Telegram ops bots.
2. UI/UX Design & Prototyping: Luxury glassmorphism design systems and interactive Figma prototypes.
3. Full-Stack Web & SaaS: Next.js 15 & React 19 platforms with atomic slot locking and RBAC staff portals.
4. AI Chatbots & RAG Companions: 24/7 SOP-grounded conversational assistants (like Lumi) using Supabase pgvector.
5. Custom Enterprise & POS Systems: High-volume inventory tracking, automated PDF certs/invoices, and RFID integration.`,
    quickReplies: ["Tell me about Lumi", "What is his hourly rate?", "How to get in touch?"],
  },
  {
    id: "lumina",
    category: "projects",
    keywords: ["lumina", "dental", "lumi", "clinic", "healthcare", "booking"],
    title: "Lumina Dental Studio Ecosystem",
    content: `Lumina Dental Studio is Bryant's flagship dual-architecture healthcare management ecosystem:
• Web Management Suite: Built with Next.js 15 (App Router), React 19, Tailwind CSS v4, and Supabase. Features a 4-step dynamic booking funnel with real-time atomic slot validation, staff admin portal with RBAC/JWT, and 0ms-latency HTML5 Canvas ImageDecoder WebP streaming.
• Autonomous Clinical RAG Engine: 8-workflow n8n pipeline featuring 24/7 RAG dental assistant (Lumi), timed post-op recovery sequences (2h/24h), <3s critical medical allergy triage to Slack, and automated Google Drive SOP ingestion.
• Demo: https://luminadentalcarestudio.vercel.app/ | Walkthrough: https://drive.google.com/file/d/1sEEmW5fjaorBb_zEMg2sUu4PP0W1_Jro/view`,
    quickReplies: ["How does Lumi work?", "Tell me about other projects", "What is his tech stack?"],
  },
  {
    id: "lumi-bot",
    category: "projects",
    keywords: ["lumi", "chatbot", "rag", "vector", "embedding", "companion"],
    title: "Lumi — 24/7 AI Dental Companion",
    content: `Lumi is an autonomous 24/7 RAG-powered clinical companion engineered by Bryant for Lumina Dental Studio:
• Vector Memory: Embeds clinic medical SOPs and post-op care guidelines into Supabase pgvector (768-dim embeddings via Google text-embedding-004).
• Intent Routing & Safety: Determines emergency severity vs routine inquiries, answering patient questions with zero hallucinations while flagging critical dental trauma directly to on-call doctors in Slack.
• Ingestion Pipeline: Automatically parses new clinical PDF guides dropped into Google Drive with human-in-the-loop Slack approval gates.`,
    quickReplies: ["Tell me about Lumina Suite", "What RAG stack does he use?", "View all projects"],
  },
  {
    id: "projects",
    category: "projects",
    keywords: ["projects", "portfolio", "systems", "shipped", "built", "solace", "vetflow", "alertpoint"],
    title: "20 Shipped Projects",
    content: `Bryant has shipped 20 projects across 3 categories:
• AI & Automation: Lumina 8-Workflow Clinical Engine, Inbound Email Triage Router, Café Operations Telegram AI Suite, ClickUp Bug Triage Assistant, and Live Traffic Telegram Notifier.
• Web Platforms: Lumina Dental Studio Web Suite, Solace Point (Insurance Portal for OneNetworx), Safety Heroes (Caffeine AI Hackathon), and Personal Portfolio v2.
• Enterprise & Systems: AlertPoint (Award-winning IoT Disaster System), VetFlow (POS & Clinic Management), Property Custodian Management, Prefect Disciplinary System, and PetSense RFID Grooming.`,
    quickReplies: ["Tell me about Solace Point", "Tell me about AlertPoint", "How to contact Bryant?"],
  },
  {
    id: "stack",
    category: "stack",
    keywords: ["stack", "tech", "skills", "technologies", "tools", "react", "next", "python", "n8n", "languages"],
    title: "Technical Stack & Ecosystem",
    content: `Bryant's core engineering toolkit:
• Frontend: React 19, Next.js 15 (App Router), TypeScript, Tailwind CSS v4, HTML5 Canvas (ImageDecoder API), Vite, Radix UI.
• Backend & Cloud: Node.js, PHP, PostgreSQL, Supabase, MySQL, Firebase, Prisma ORM, REST APIs.
• AI & Automation: n8n, Google Gemini 1.5/3.1, Groq (LLaMA 3.3 70B), Supabase pgvector, LangChain, Slack Block Kit, Telegram Bot API.
• DevOps & Testing: Playwright E2E, Git/GitHub, Docker, Linux CLI, ClickUp, Jira, Figma.`,
    quickReplies: ["What experience does he have?", "What services does he offer?", "Download Resume"],
  },
  {
    id: "experience",
    category: "experience",
    keywords: ["experience", "internship", "work", "job", "career", "history", "onenetworx", "jlabs"],
    title: "Work & Internship Experience",
    content: `Bryant has completed 3 software development internships:
1. OneNetworx Marketing (Software Developer Intern, 2026): Engineered Solace Point insurance platform with real-time automated quotation and secure customer onboarding.
2. JLabs Innovatech (Full-Stack Developer Intern, 2025): Developed internal web modules and automated workflows.
3. NLP Business Development Services (Web Developer Intern, 2025): Maintained frontend portals, UI responsiveness, and database integrations.`,
    quickReplies: ["What is his education?", "What awards has he won?", "How to get in touch?"],
  },
  {
    id: "education",
    category: "education",
    keywords: ["education", "degree", "university", "gpa", "scholar", "summa", "honors", "college", "school"],
    title: "Education & Honors",
    content: `Academic Credentials:
• Degree: Bachelor of Science in Information Technology (BSIT), National University Fairview (2022–2026).
• Honors: Graduating Summa Cum Laude, 100% Full Merit Blue Scholar, consistent First Honor Dean's Lister across all terms.
• Leadership & Awards: Best in IoT-Cross Platform Competition Winner (AlertPoint), Best Web Game Design Award (XOXO TicTacToe).`,
    quickReplies: ["View his projects", "What certificates does he have?", "Contact Bryant"],
  },
  {
    id: "contact",
    category: "contact",
    keywords: ["contact", "email", "phone", "hire", "reach", "message", "linkedin", "github", "resume"],
    title: "Contact & Availability",
    content: `Bryant is available for Full-Time, Contract, or Freelance roles:
• Email: bryantiversonmelliza03@gmail.com
• Phone: +63 939 817 0375
• Location: Caloocan City, Philippines (UTC+08:00) — open to global remote work
• LinkedIn: https://www.linkedin.com/in/bryant-iverson-melliza-6759b8292
• GitHub: https://github.com/brybryson
• Resume: https://bryant-melliza.vercel.app/resume/Bryant_Melliza_Resume.pdf`,
    quickReplies: ["Send email to Bryant", "What projects has he built?", "What are his core skills?"],
  },
];

export function queryBrysonKnowledge(userQuery: string): { reply: string; quickReplies: string[] } {
  const query = userQuery.toLowerCase().trim();

  // Score each chunk
  let bestChunk: KnowledgeChunk | null = null;
  let bestScore = 0;

  for (const chunk of BRYSON_KNOWLEDGE_BASE) {
    let score = 0;
    for (const kw of chunk.keywords) {
      if (query.includes(kw)) {
        score += 3;
      }
    }
    if (query.includes(chunk.id)) score += 5;
    if (score > bestScore) {
      bestScore = score;
      bestChunk = chunk;
    }
  }

  if (bestChunk && bestScore > 0) {
    return {
      reply: `[${bestChunk.title}]\n\n${bestChunk.content}`,
      quickReplies: bestChunk.quickReplies ?? ["Projects", "Stack", "Contact"],
    };
  }

  // Fallback
  return {
    reply: `Hello! I am Bryson AI, Bryant's autonomous portfolio and resume companion.
I have access to Bryant's complete vectorized background: 20 shipped projects (like Lumina Dental Studio and Lumi), tech stack, work experience, education (Summa Cum Laude), and contact details.

What would you like to know about Bryant?`,
    quickReplies: [
      "Tell me about Lumina Dental Studio",
      "What are Bryant's core skills?",
      "What services does he offer?",
      "How can I contact Bryant?",
    ],
  };
}
