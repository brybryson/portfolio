export interface KnowledgeChunk {
  id: string;
  category:
    | "identity"
    | "projects"
    | "stack"
    | "experience"
    | "education"
    | "services"
    | "contact"
    | "owley";
  keywords: string[];
  title: string;
  content: string;
  quickReplies?: string[];
}

export const BRYSON_KNOWLEDGE_BASE: KnowledgeChunk[] = [
  {
    id: "owley",
    category: "owley",
    keywords: ["owley", "cat", "who are you", "about you", "pet", "story", "origin"],
    title: "About Owley",
    content: `**Hi there! I'm Owley** — Bryant's favorite cat. 🐾

I'm usually very quiet and gentle. Bryant adopted me after someone threw me into their backyard. Now, I keep him company while he codes late into the night. 

As his personalized AI companion, I have full access to his verified portfolio, resume, and 20 shipped projects. **Meow! What can I help you with today?**`,
    quickReplies: [
      "Tell me about Lumina Dental Studio",
      "What is Bryant's tech stack?",
      "What services does he offer?",
    ],
  },
  {
    id: "identity",
    category: "identity",
    keywords: ["who", "bryant", "about", "bio", "summary", "profile", "background"],
    title: "About Bryant Melliza",
    content: `**Bryant Iverson Melliza** is a **Full-Stack Developer & AI Systems Architect** based in Caloocan City, Philippines.

• **Core Focus**: High-performance web applications (Next.js 15, React 19, TypeScript) and autonomous backend automation pipelines (n8n, Supabase pgvector RAG, Gemini, LLaMA).
• **Academics**: Graduating **Summa Cum Laude** with a BS in Information Technology from National University Fairview (100% Full Merit Blue Scholar).
• **Experience**: 3 software developer internships and 20 production systems shipped.`,
    quickReplies: [
      "What projects has Bryant built?",
      "What is his tech stack?",
      "Is he open for work?",
    ],
  },
  {
    id: "services",
    category: "services",
    keywords: [
      "services",
      "hire",
      "offer",
      "deliver",
      "freelance",
      "contract",
      "rates",
      "can you do",
    ],
    title: "Client Offerings & Services",
    content: `Bryant provides 5 specialized engineering solutions:

1. **AI & Workflow Automation**: Multi-branch n8n & Python pipelines, lead routing, and Slack/Telegram ops bots.
2. **UI/UX Design & Prototyping**: Luxury design systems, glassmorphism aesthetics, and Figma interactive prototypes.
3. **Full-Stack Web & SaaS**: Next.js 15 & React 19 platforms with atomic slot locking and RBAC staff portals.
4. **AI Chatbots & RAG Companions**: 24/7 SOP-grounded conversational assistants (like **Lumi**) with Supabase pgvector.
5. **Custom Enterprise & POS Systems**: Inventory tracking, automated PDF certs/invoices, and RFID hardware integrations.`,
    quickReplies: ["Tell me about Lumi", "What is his tech stack?", "How to get in touch?"],
  },
  {
    id: "lumina",
    category: "projects",
    keywords: ["lumina", "dental", "lumi", "clinic", "healthcare", "booking"],
    title: "Lumina Dental Studio Ecosystem",
    content: `**Lumina Dental Studio** is Bryant's flagship healthcare suite featuring dual architecture:

• **Web Management Platform**: Next.js 15 (App Router), React 19, Tailwind CSS v4, and Supabase. Features a 4-step dynamic booking funnel with real-time atomic slot locks, RBAC staff portal, and 0ms-latency HTML5 Canvas ImageDecoder WebP streaming.
• **8-Workflow Autonomous RAG Engine**: Features **Lumi** (24/7 AI Dental Companion), timed post-op recovery sequences (2h/24h), <3s critical medical allergy triage to Slack, and Google Drive PDF knowledge ingestion.
• **Links**: [View Live Web Platform ↗](https://luminadentalcarestudio.vercel.app/) · [Watch 3-min Walkthrough ↗](https://drive.google.com/file/d/1sEEmW5fjaorBb_zEMg2sUu4PP0W1_Jro/view?usp=sharing)`,
    quickReplies: [
      "Tell me about Lumi the chatbot",
      "What stack does he use?",
      "View all 20 projects",
    ],
  },
  {
    id: "lumi-bot",
    category: "projects",
    keywords: ["lumi", "chatbot", "rag", "vector", "embedding", "companion", "dental bot"],
    title: "Lumi — 24/7 AI Dental Companion",
    content: `**Lumi** is an autonomous 24/7 RAG-powered clinical companion engineered by Bryant for Lumina Dental Studio:

• **Vector Memory**: Ingests clinical SOPs and post-op care guidelines into Supabase pgvector (768-dim embeddings via Google text-embedding-004).
• **Triage & Safety**: Evaluates trauma severity vs routine queries, answering with grounded accuracy while alerting on-call doctors in Slack for high-risk dental allergies.
• **Ingestion Pipeline**: Automatically parses new PDF SOPs from Google Drive with human-in-the-loop Slack approval.`,
    quickReplies: [
      "Tell me about Lumina Suite",
      "What RAG stack does he use?",
      "View all projects",
    ],
  },
  {
    id: "projects",
    category: "projects",
    keywords: [
      "projects",
      "portfolio",
      "systems",
      "shipped",
      "built",
      "solace",
      "vetflow",
      "alertpoint",
    ],
    title: "20 Shipped Production Systems",
    content: `Bryant has shipped 20 projects across 3 key domains:

• **AI & Automation**: Lumina 8-Workflow Clinical Engine, Inbound Email Triage Router, Café Operations Telegram Suite, ClickUp Bug Triage Assistant, and Live Traffic Telegram Notifier.
• **Web Platforms**: Lumina Dental Studio Web Suite, Solace Point (Insurance Portal for OneNetworx), Safety Heroes (Caffeine AI Manila Hackathon), and Personal Portfolio v2.
• **Enterprise Systems & IoT**: AlertPoint (Best in IoT Award Winner), VetFlow (POS & Clinic Management), Property Custodian System, Prefect Disciplinary System, and PetSense RFID Grooming.`,
    quickReplies: [
      "Tell me about Solace Point",
      "Tell me about AlertPoint",
      "How to contact Bryant?",
    ],
  },
  {
    id: "stack",
    category: "stack",
    keywords: [
      "stack",
      "tech",
      "skills",
      "technologies",
      "tools",
      "react",
      "next",
      "python",
      "n8n",
      "languages",
      "playwright",
      "selenium",
    ],
    title: "Technical Stack & Ecosystem",
    content: `Bryant's core engineering toolkit:

• **Frontend**: React 19, Next.js 15 (App Router), TypeScript, Tailwind CSS v4, HTML5 Canvas (ImageDecoder API), Vite, Radix UI.
• **Backend & Databases**: Node.js, PHP, PostgreSQL, Supabase, MySQL, Firebase, Prisma ORM, REST APIs.
• **AI & Automation**: n8n, Google Gemini 1.5/3.1, Groq (LLaMA 3.3 70B), Supabase pgvector (768-dim), Slack Block Kit, Telegram Bot API, Google AI Studio.
• **Testing & DevOps**: Playwright E2E, Selenium WebDriver, Git/GitHub, Docker, Linux CLI, ClickUp, Jira, Figma.`,
    quickReplies: [
      "What experience does he have?",
      "What services does he offer?",
      "Download Resume",
    ],
  },
  {
    id: "experience",
    category: "experience",
    keywords: [
      "experience",
      "internship",
      "work",
      "job",
      "career",
      "history",
      "onenetworx",
      "jlabs",
    ],
    title: "Work & Internship Experience",
    content: `Bryant has completed 3 software development internships:

1. **OneNetworx Marketing** (Software Developer Intern, 2026): Engineered Solace Point digital insurance sales portal with real-time automated quotes.
2. **JLabs Innovatech** (Full-Stack Developer Intern, 2025): Developed internal web modules and automated workflows.
3. **NLP Business Development Services** (Web Developer Intern, 2025): Maintained frontend portals, UI responsiveness, and database integrations.`,
    quickReplies: ["What is his education?", "What awards has he won?", "How to get in touch?"],
  },
  {
    id: "education",
    category: "education",
    keywords: [
      "education",
      "degree",
      "university",
      "gpa",
      "scholar",
      "summa",
      "honors",
      "college",
      "school",
    ],
    title: "Education & Honors",
    content: `Academic Credentials:

• **Degree**: Bachelor of Science in Information Technology (BSIT), National University Fairview (2022–2026).
• **Academic Honors**: Graduating **Summa Cum Laude**, 100% Full Merit Blue Scholar, consistent First Honor Dean's Lister across all terms.
• **Awards**: Best in IoT-Cross Platform Competition Winner (AlertPoint), Best Web Game Design Award (XOXO TicTacToe).`,
    quickReplies: ["View his projects", "What certificates does he have?", "Contact Bryant"],
  },
  {
    id: "contact",
    category: "contact",
    keywords: [
      "contact",
      "email",
      "phone",
      "hire",
      "reach",
      "message",
      "linkedin",
      "github",
      "resume",
    ],
    title: "Contact & Availability",
    content: `Bryant is available for **Full-Time, Contract, or Freelance** roles:

• **Email**: [bryantiversonmelliza03@gmail.com](mailto:bryantiversonmelliza03@gmail.com)
• **Phone**: [+63 939 817 0375](tel:+639398170375)
• **Location**: Caloocan City, Philippines (UTC+08:00) — open to global remote roles
• **LinkedIn**: [linkedin.com/in/bryant-iverson-melliza ↗](https://www.linkedin.com/in/bryant-iverson-melliza-6759b8292)
• **GitHub**: [github.com/brybryson ↗](https://github.com/brybryson)
• **Resume**: [Download Resume (PDF) ↗](https://bryant-melliza.vercel.app/resume/Bryant_Melliza_Resume.pdf)`,
    quickReplies: [
      "Send email to Bryant",
      "What projects has he built?",
      "What are his core skills?",
    ],
  },
];

export function queryBrysonKnowledge(userQuery: string): { reply: string; quickReplies: string[] } {
  const query = userQuery.toLowerCase().trim();

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
      reply: bestChunk.content,
      quickReplies: bestChunk.quickReplies ?? ["Projects", "Stack", "Contact"],
    };
  }

  // Fallback
  return {
    reply: `Meow! 🐾 I am Owley, Bryant's AI cat companion.

I have access to Bryant's complete verified background: 20 shipped projects (including Lumina Dental Studio and Lumi), tech stack (Next.js 15, React 19, n8n, pgvector), work experience, Summa Cum Laude credentials, and contact details.

What would you like to know?`,
    quickReplies: [
      "Tell me about Lumina Dental Studio",
      "Tell me about Lumi the chatbot",
      "What are Bryant's core skills?",
      "How can I contact Bryant?",
    ],
  };
}

export const N8N_OWLEY_WEBHOOK = "https://dummyaccountbry.app.n8n.cloud/webhook/portfolio-chat";

export async function queryOwleyRAG(
  userQuery: string,
  sessionId?: string,
): Promise<{ reply: string; quickReplies: string[]; source: "rag" | "local" }> {
  const q = userQuery.trim();
  if (!q) {
    const fallback = queryBrysonKnowledge("");
    return { ...fallback, source: "local" };
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 12000);

    const response = await fetch(N8N_OWLEY_WEBHOOK, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: q,
        sessionId: sessionId || `owley-session-${Date.now()}`,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (response.ok) {
      const data = await response.json().catch(() => null);
      if (data && typeof data.reply === "string" && data.reply.trim().length > 0) {
        return {
          reply: data.reply.trim(),
          quickReplies: [
            "Tell me about Lumina Dental Studio",
            "What is his tech stack?",
            "How can I contact Bryant?",
          ],
          source: "rag",
        };
      }
    }
  } catch (err) {
    console.warn(
      "[Owley AI] n8n RAG webhook unavailable or timed out. Gracefully switching to local verified knowledge base:",
      err,
    );
  }

  // Graceful instantaneous local fallback
  const fallback = queryBrysonKnowledge(q);
  return {
    ...fallback,
    source: "local",
  };
}
