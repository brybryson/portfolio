import {
  Bot,
  Boxes,
  Cpu,
  Layers,
  LucideIcon,
} from "lucide-react";

export type ProjectTier = "pinned" | "core" | "archive";
export type Category = "ai" | "web" | "system" | "iot";

export const CATEGORY_META: Record<
  Category,
  { label: string; color: string; icon: LucideIcon }
> = {
  ai: { label: "AI & Automation", color: "var(--pulse-c)", icon: Bot },
  web: { label: "Web Applications", color: "var(--signal)", icon: Layers },
  system: { label: "Systems", color: "var(--flow)", icon: Boxes },
  iot: { label: "Hardware & IoT", color: "#22C55E", icon: Cpu },
};

export type Project = {
  slug: string;
  name: string;
  date: string;
  category: Category;
  tier: ProjectTier;
  role?: string;
  summary: string;
  problem: string;
  solution: string;
  outcome: string;
  metrics?: { label: string; value: string }[];
  stack: string[];
  image: string | string[];
  demoUrl?: string;
  githubUrl?: string;
  series?: { name: string; part: number; total: number };
};

export const PROJECTS: Project[] = [
  // ==========================================
  // LUMINA DENTAL STUDIO (NEWEST FLAGSHIP)
  // ==========================================
  {
    slug: "lumina-dental-studio",
    name: "Lumina Dental Studio — Smart Healthcare Management & Automated Patient Care Suite",
    date: "2026.08",
    category: "web",
    tier: "pinned",
    role: "Full-Stack Developer & UI/UX Architect",
    summary:
      "Modern, luxury dental healthcare platform featuring a high-converting 4-step dynamic booking funnel, a secure staff administrative portal with RBAC/JWT authentication, frame-accurate canvas animation streams, and automated medical intake compliance.",
    problem:
      "Traditional dental practices suffer from severe administrative friction: manual telephone scheduling bottlenecks, high no-show rates (~18%), physical paperwork cluttering the waiting room, and lack of real-time schedule locking between online visitors and clinic staff.",
    solution:
      "4-Step Patient Booking Funnel: Built with dynamic date/time slot validation and real-time database locks preventing double-bookings. Enterprise Staff Portal: Secure admin dashboard featuring role-based access control (Admin / Doctor / Receptionist), patient intake inspection with high-contrast medical alert warning badges, and instant appointment status lifecycle management. Frame-Accurate Canvas Animation Engine: Custom HTML5 Canvas implementation using the modern ImageDecoder WebP streaming API with global ArrayBuffer caching for interactive 0ms-latency hover/pause effects. Defensive API Architecture: Robust pre-flight regex sanitizers blocking SQL injection, XSS, and malicious payloads before reaching the database.",
    outcome:
      "Reduced in-clinic front-desk intake paperwork time by ~80% via pre-appointment digital tokens. 100% pass rate across automated end-to-end Playwright and visual regression test suites. Atomic schedule locks eliminating 100% of conflicting appointment requests.",
    metrics: [
      { label: "Intake Time", value: "-80% via tokens" },
      { label: "Playwright E2E", value: "100% Coverage" },
      { label: "Canvas Stream", value: "0ms ArrayBuffer" },
      { label: "Double-bookings", value: "0 Conflicts" },
    ],
    stack: [
      "Next.js 15 (App Router)",
      "React 19",
      "TypeScript",
      "Tailwind CSS v4",
      "Supabase (PostgreSQL)",
      "Radix UI",
      "HTML5 Canvas (ImageDecoder API)",
      "Playwright E2E",
    ],
    image: "/automation/LUMINA WORKFLOW (PORTFOLIO)/LUMINA WEBSITE .png",
    demoUrl: "https://luminadentalcarestudio.vercel.app/",
  },
  {
    slug: "lumina-clinical-orchestration-rag",
    name: "Lumina Dental Studio — Autonomous Clinical Orchestration & RAG Engine",
    date: "2026.08",
    category: "ai",
    tier: "pinned",
    role: "AI Automation Specialist & Systems Architect",
    summary:
      "Enterprise 8-workflow autonomous clinical orchestration system in n8n integrating Google Gemini RAG, Supabase pgvector, Slack Block Kit, and Google Workspace to automate 100% of patient lifecycle operations, urgent allergy escalations, and clinic knowledge ingestion.",
    problem:
      "Clinical operations face severe operational hazards: critical medical allergies (e.g., Penicillin, Latex) buried in physical charts failing to reach surgical teams prior to anesthesia, lost revenue from uncontacted booking drop-offs, repetitive front-desk FAQ inquiries, and silent background automation failures.",
    solution:
      "Architected an end-to-end 8-workflow autonomous pipeline in n8n backed by a centralized fault-tolerance engine: (1) Pre-Appointment Digital Intake Dispatch via Gmail OAuth2 / Resend with debounce guards; (2) Clinical Allergy & High-Risk Escalation routing interactive Block Kit alert cards to Slack #clinical-urgent-alerts (3-hour escalation timeout); (3) 2-Way Google Calendar Synchronization (Asia/Manila +08:00); (4) Timed Post-Op Recovery Sequence dispatching care guidelines at 2h and 24h intervals with attached PDF medical guidelines; (5) 6-Month Preventive Hygiene Recall Engine via weekly cron (>180 days); (6) Abandoned Lead Recovery Engine (24h follow-ups); (7) 24/7 RAG AI Dental Companion (Lumi) using vector similarity search (text-embedding-004, 768-dim) against verified clinical SOPs; (8) Automated Knowledge Ingestion Pipeline with Google Drive PDF parsing and human-in-the-loop Slack approval gates; and Central Error Handler & Telemetry with Slack deep-link diagnostics.",
    outcome:
      "<3 second instant triage for critical medical alerts delivered directly to surgical teams. Estimated ~70% drop in repetitive front-desk phone inquiries and patient no-shows. 0 silent failures across all clinical automation pipelines with unified Slack diagnostic telemetry.",
    metrics: [
      { label: "Critical Allergy Triage", value: "<3s direct alert" },
      { label: "Autonomous Workflows", value: "8 Pipelines" },
      { label: "Silent Failures", value: "0% (Unified Slack)" },
      { label: "Vector Search", value: "768-dim RAG" },
    ],
    stack: [
      "n8n Workflow Automation",
      "Google Gemini 1.5 Flash",
      "Groq (LLaMA 3.3 70B)",
      "Supabase pgvector (768-dim)",
      "Slack Block Kit API",
      "Gmail OAuth2 / Resend API",
      "Google Calendar API",
      "Google Drive API",
    ],
    image: [
      "/automation/LUMINA WORKFLOW (PORTFOLIO)/45.png",
      "/automation/LUMINA WORKFLOW (PORTFOLIO)/46.png",
      "/automation/LUMINA WORKFLOW (PORTFOLIO)/47.png",
      "/automation/LUMINA WORKFLOW (PORTFOLIO)/48.png",
      "/automation/LUMINA WORKFLOW (PORTFOLIO)/49.png",
      "/automation/LUMINA WORKFLOW (PORTFOLIO)/50.png",
      "/automation/LUMINA WORKFLOW (PORTFOLIO)/51.png",
      "/automation/LUMINA WORKFLOW (PORTFOLIO)/52.png",
      "/automation/LUMINA WORKFLOW (PORTFOLIO)/53.png",
    ],
  },
  {
    slug: "solace-point",
    name: "Solace Point",
    date: "2026.06",
    category: "web",
    tier: "pinned",
    summary:
      "Full-stack digital insurance platform for OneNetworx Marketing, streamlining customer onboarding and quotation requests.",
    problem:
      "Developing a high-impact digital platform to replace traditional, offline insurance pipelines and accelerate lead generation.",
    solution:
      "Engineered a full-stack sales portal featuring real-time automated quote generation, secure database registration, and a high-fidelity UI.",
    outcome:
      "Converted visitors into active policyholders and optimized user journeys to significantly improve customer engagement.",
    metrics: [
      { label: "Client Deployment", value: "OneNetworx Marketing" },
      { label: "Quote Generation", value: "Real-Time Automated" },
      { label: "Stack Performance", value: "Vite + Supabase" },
    ],
    stack: ["React", "Vite", "Tailwind CSS", "PostgreSQL", "Supabase", "Node.js"],
    image: "/images/solacepoint/heropage.png",
    demoUrl: "https://solacepoint.vercel.app/SolacePoint/Home",
  },
  {
    slug: "inbound-email-triage-router",
    series: { name: "Enterprise AI Email Pipeline", part: 2, total: 3 },
    name: "Inbound Email Triage & Support/Sales Router",
    date: "2026.07",
    category: "ai",
    tier: "pinned",
    summary:
      "Autonomous multi-branch email processing system that classifies intent, executes hybrid vector search, generates grounded support drafts, logs CRM tickets, and alerts cross-functional teams.",
    problem:
      "Support and sales teams waste hundreds of hours manually categorizing inbound emails, sifting through spam, searching internal PDF documentation for accurate answers, and creating tickets in CRMs—causing delayed lead response times, duplicate effort, and human error.",
    solution:
      "Engineered an automated email orchestration engine polling Gmail every minute. Uses Google Gemini 3.1 Flash Lite with strict system prompts and minified JSON schema enforcement to deterministically classify inbound emails into SUPPORT, LEAD, or SPAM_OR_OFF_TOPIC. SUPPORT Path: Runs a semantic vector search query against Supabase pgvector using Gemini embeddings to retrieve top matching knowledge base chunks, generates a context-grounded AI reply draft, creates a thread-bound Gmail Draft, logs a structured ClickUp support ticket, and dispatches a Slack alert to #alerts-support. LEAD Path: Extracts customer intent and urgency ratings, automatically creates a sales opportunity task in ClickUp, and posts an alert card to Slack #leads-sales. SPAM_OR_OFF_TOPIC Path: Applies the SPAM label in Gmail, stripping INBOX and UNREAD labels to automatically archive marketing pitches and troll messages into the Gmail Spam folder.",
    outcome:
      "Reduced support triage and reply drafting time from hours to under 30 seconds. Achieved 100% human-in-the-loop review safety (no unreviewed AI auto-sends), completely eliminated spam noise, and enabled instant CRM routing for high-value sales inquiries.",
    metrics: [
      { label: "Reply Drafting Time", value: "<30s (from hours)" },
      { label: "Review Safety", value: "100% Human-in-the-loop" },
      { label: "Spam Defense", value: "Automatic Isolation" },
    ],
    stack: [
      "n8n Workflow Engine",
      "Google Gemini 3.1 Flash Lite",
      "RAG (Retrieval-Augmented Generation)",
      "Supabase pgvector (Semantic Search)",
      "Gemini Embeddings",
      "Gmail API (OAuth 2.0)",
      "ClickUp REST API",
      "Slack API",
      "JSON Schema Enforcement",
    ],
    image: [
      "/automation/Email Triage Support Draft & Lead Routing.gif",
      "/automation/Engine & Router (n8n Canvas + Spam Defense).gif",
      "/automation/Sales Lead Branch (Lead Routing).gif",
    ],
    githubUrl: "https://github.com/brybryson",
  },
  {
    slug: "cafe-ops-telegram-automation-suite",
    name: "Café Operations Telegram Automation & AI RAG Suite",
    date: "2026.08",
    category: "ai",
    tier: "pinned",
    summary:
      "Autonomous 5-workflow Telegram operational system combining real-time inventory monitoring, Google Drive SOP RAG knowledge retrieval, Llama 3.1 intent routing, scheduled staff reminders, and private executive error DMs.",
    problem:
      "Café operations faced frequent ingredient stockouts, delayed shift handovers, cluttered group chats with manual manager reminders, repetitive staff SOP questions, and untracked automation errors.",
    solution:
      "Engineered an enterprise 5-workflow n8n automation suite: (1) Inventory Monitor running 4x daily with unit sanitization and 🔴/🟠/🟡 severity digests, (2) Google Drive SOP RAG Ingestion chunking PDFs into Supabase pgvector, (3) Llama 3.1 Conversational Agent & Intent Router answering staff questions and scheduling tasks with a -55s time offset calculation, (4) Scheduled Reminder Dispatcher polling tasks every 60s with idempotency state locks, and (5) Central Error Handler silently routing node failure stack traces directly to the manager's private Telegram DM.",
    outcome:
      "Eliminated stockouts via 4x daily digests, reduced staff SOP answer latency to seconds via vector RAG, guaranteed 100% on-time reminder pings, and achieved total group anti-spam isolation for technical error logs.",
    metrics: [
      { label: "Inventory Digests", value: "4x Daily Multi-Tier" },
      { label: "Reminder Accuracy", value: "100% On-Time" },
      { label: "SOP Response Latency", value: "<2s Vector RAG" },
    ],
    stack: [
      "n8n Workflow Engine",
      "Telegram Bot API",
      "Groq API (Llama 3.1)",
      "Supabase pgvector (Vector Store)",
      "Google Gemini Embeddings",
      "Google Sheets & Drive APIs",
      "Recursive Character Text Splitter",
      "Idempotent Dispatch & Error Routing",
    ],
    image: [
      "/automation/cafe bot/39.png",
      "/automation/cafe bot/40.png",
      "/automation/cafe bot/41.png",
      "/automation/cafe bot/42.png",
      "/automation/cafe bot/43.png",
    ],
    demoUrl: "https://drive.google.com/file/d/1T5IKOOaFuTXqngxqMSXE7ASvuaKj7ll-/view?usp=sharing",
  },
  {
    slug: "alertpoint",
    name: "AlertPoint: Disaster Risk Reduction System",
    date: "2025.10",
    category: "system",
    tier: "pinned",
    summary:
      "Award-winning disaster response platform integrating IoT sensors and mobile broadcasting.",
    problem:
      "Disaster-prone communities often lack localized, real-time warning systems, relying on delayed national broadcasts that may not reflect immediate local conditions.",
    solution:
      "AlertPoint uses localized IoT sensors for floods and fires, delivering instant alerts via a centralized web dashboard and public notification system to reduce response times.",
    outcome:
      "Won Best in IoT-Cross Platform Award. Enabled real-time monitoring and rapid dissemination of alerts for disaster preparedness and community safety initiatives.",
    metrics: [
      { label: "Competition Award", value: "Best in IoT (Winner)" },
      { label: "Sensory Response", value: "Instant Local Alerts" },
      { label: "Hardware Stack", value: "Multi-Sensor IoT Node" },
    ],
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

  // ==========================================
  // CORE PRODUCTION SYSTEMS & FULL-STACK APPS
  // ==========================================
  {
    slug: "knowledge-base-sync-rag",
    series: { name: "Enterprise AI Email Pipeline", part: 1, total: 3 },
    name: "Knowledge Base Sync (RAG Vector Ingestion)",
    date: "2026.07",
    category: "ai",
    tier: "core",
    summary:
      "Autonomous RAG memory engine built on n8n, Google Gemini Embeddings, and Supabase pgvector that ingests, cleans, chunks, and synchronizes company documentation.",
    problem:
      "AI customer support and triage models suffer from hallucinations, inaccurate answers, or outdated information when enterprise product catalogs, compliance guides, and internal policy documents are frequently updated or replaced in cloud storage.",
    solution:
      "Engineered an event-driven RAG ingestion pipeline in n8n triggered by Google Drive file creations and updates. The workflow automatically streams PDF documents, extracts raw text content, and attaches structural JSON metadata (file_id, file_name, modified_time). To prevent database bloat and memory contamination, it executes an automated SQL purge in Supabase (Delete Old Chunks) to eliminate stale vector records matching the file_id. It then splits the document into 500-character segments with a 50-character overlap using a Recursive Character Text Splitter to preserve semantic boundary context, generates high-dimensional vector embeddings via Google Gemini, and upserts the processed chunks into Supabase pgvector.",
    outcome:
      "Guaranteed real-time, single-source-of-truth knowledge synchronization for downstream AI support models, completely eliminating duplicate or conflicting vector memory while maintaining optimal vector database search performance.",
    stack: [
      "n8n Workflow Engine",
      "Google Gemini Vector Embeddings",
      "Supabase (PostgreSQL / pgvector)",
      "Google Drive API",
      "JavaScript (Code Nodes)",
      "Recursive Character Text Splitter",
      "LangChain Document Loaders",
      "SQL Vector Purging",
    ],
    image: [
      "/automation/Knowledge Base Sync (RAG Ingestion) - client.gif",
      "/automation/Knowledge Base Sync (RAG Ingestion) - n8n workflow.gif",
    ],
    githubUrl: "https://github.com/brybryson",
  },
  {
    slug: "error-handler-reliability-engine",
    series: { name: "Enterprise AI Email Pipeline", part: 3, total: 3 },
    name: "Global System Error Handler & Reliability Engine",
    date: "2026.07",
    category: "ai",
    tier: "core",
    summary:
      "Centralized fault-tolerance sub-workflow providing instant error logging, failure payload generation, self-healing retries, and real-time team notifications.",
    problem:
      "API rate limits, transient network drops, expired OAuth tokens, or third-party service downtime can cause background automations to fail silently, resulting in missed customer emails, untracked sales leads, or stalled vector ingestion without developer awareness.",
    solution:
      "Architected a centralized system error handler sub-workflow connected globally across all production pipelines via n8n Error Triggers, paired with native retryOnFail exponential backoff policies across all primary API nodes for self-healing transient glitches. Upon an unhandled runtime failure, the engine dynamically constructs a diagnostic error payload—extracting the workflow name, failing node ID, error message, execution timestamp, and direct execution URL—and broadcasts an urgent alert card to Slack #alerts-prod-errors.",
    outcome:
      "Achieved zero silent failures across production automations, establishing enterprise-grade uptime monitoring, rapid incident response, and self-healing resilience against transient API rate limits and network drops.",
    stack: [
      "n8n Workflow Engine (Global Error Triggers)",
      "Slack API / Webhooks",
      "Exponential Backoff Retries (retryOnFail)",
      "JSON Error Payloads",
      "Incident Management",
    ],
    image: "/automation/Error Handler & Reliability Engine.gif",
    githubUrl: "https://github.com/brybryson",
  },
  {
    slug: "bug-triage-assistant",
    series: { name: "ClickUp AI Bug Triage Pipeline", part: 1, total: 2 },
    name: "ClickUp AI Bug Triage Assistant",
    date: "2026.07",
    category: "ai",
    tier: "core",
    summary:
      "Autonomous event-driven AI agent pipeline built on n8n and LLaMA 3.1 that ingests, triages, prioritizes, and reports ClickUp bug tickets.",
    problem:
      "Engineering teams waste significant time manually triaging ClickUp bug reports, determining priority, and routing tasks to owning teams—causing delayed response times, duplicate runs, and inconsistent task categorization.",
    solution:
      "Engineered an event-driven 5-phase n8n workflow pipeline with Ollama LLaMA 3.1 LLM, featuring webhook payload ingestion, a JS idempotency guard against duplicate runs, structured JSON schema enforcement (severity, owning team, summary, action items), automatic ClickUp priority mapping, and direct markdown QA comment reporting.",
    outcome:
      "Automated end-to-end bug triage pipeline. Prevents duplicate processing, automatically sets ClickUp priority levels, and posts comprehensive AI QA reports directly onto task tickets in seconds.",
    stack: [
      "n8n Workflow Engine",
      "Ollama (LLaMA 3.1)",
      "ClickUp Webhooks & REST API",
      "JavaScript (Code Nodes)",
      "ngrok Tunneling",
      "JSON Schema Enforcement",
    ],
    image: "/automation/bug triage assistant.gif",
    githubUrl: "https://github.com/brybryson/clickup-ai-bug-triage",
  },
  {
    slug: "bug-triage-backfill-sweep",
    series: { name: "ClickUp AI Bug Triage Pipeline", part: 2, total: 2 },
    name: "ClickUp AI Bug Triage — Scheduled Backfill Engine",
    date: "2026.07",
    category: "ai",
    tier: "core",
    summary:
      "Scheduled self-healing reconciliation cron workflow in n8n that periodically sweeps, triages, and resolves untriaged ClickUp bug tickets.",
    problem:
      "Real-time webhook automations can occasionally miss events during network outages, server maintenance, or rate-limiting spikes, leaving orphaned, untriaged bug tickets in the queue.",
    solution:
      "Engineered a self-healing hourly reconciliation engine in n8n that automatically fetches all active ClickUp tickets, filters for untriaged issues lacking priority ratings, feeds them through a local LLaMA 3.1 LLM via REST API, and applies automated triage reports in bulk.",
    outcome:
      "Guaranteed 100% triage coverage across all engineering tickets, eliminated human oversight risks, and established enterprise-grade fault tolerance for the AI triage pipeline.",
    stack: [
      "n8n Workflow Engine",
      "Ollama (LLaMA 3.1)",
      "ClickUp API",
      "ngrok Tunneling",
      "Cron / Schedule Triggers",
      "JavaScript (ES6+)",
    ],
    image: "/automation/bug triage assistant hourly.gif",
    githubUrl: "https://github.com/brybryson/clickup-ai-bug-triage",
  },
  {
    slug: "live-traffic-telegram-notifier",
    name: "Live Traffic Telegram Notifier",
    date: "2026.07",
    category: "ai",
    tier: "core",
    summary:
      "Enterprise-grade real-time portfolio telemetry and privacy-conscious Telegram alert engine built on n8n, Supabase, and REST APIs.",
    problem:
      "Traditional web analytics rely on intrusive third-party cookies, expose PII (Personally Identifiable Information) in team channels, and suffer from high bot noise and server downtime during API outages.",
    solution:
      "Engineered an event-driven telemetry pipeline featuring 15+ pattern bot filtering, rolling 15-minute in-memory IP deduplication via n8n global memory state, automated primary/secondary API failover (ipwho.is → ip-api.com), anonymous Telegram alert formatting for privacy compliance, and structured visit logging to Supabase (PostgreSQL).",
    outcome:
      "Achieved 100% fault-tolerant tracking, eliminated 95%+ crawler noise, protected visitor privacy by obscuring IP/PII in public broadcast channels, and persisted structured visitor metrics for real-time analytics.",
    stack: [
      "n8n Workflow Engine",
      "Supabase (PostgreSQL)",
      "Telegram Bot API",
      "ipwho.is & ip-api.com REST APIs",
      "JavaScript (ES6+)",
      "Privacy-by-Design (GDPR-Aligned)",
    ],
    image: "/automation/Live Traffic Telegram Notifier.gif",
    githubUrl: "https://github.com/brybryson/Live-Traffic-Telegram-Notifier",
  },
  {
    slug: "vetflow",
    name: "VetFlow",
    date: "2025.02",
    category: "system",
    tier: "core",
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
    slug: "property-custodian",
    name: "Property Custodian Management System",
    date: "2026.02",
    category: "system",
    tier: "core",
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
    tier: "core",
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
    tier: "core",
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
    slug: "safety-heroes",
    name: "Safety Heroes",
    date: "2025.10",
    category: "web",
    tier: "core",
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
    slug: "personal-portfolio",
    name: "Personal Portfolio (v2)",
    date: "2026.06",
    category: "web",
    tier: "core",
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
    slug: "salbag",
    name: "SALBAG: Smart Anti-Theft IoT Device",
    date: "2024.06",
    category: "iot",
    tier: "core",
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

  // ==========================================
  // ARCHIVE / LEGACY WORK
  // ==========================================
  {
    slug: "confession-wall",
    name: "Confession Wall",
    date: "2024.05",
    category: "web",
    tier: "archive",
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
    tier: "archive",
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
];
