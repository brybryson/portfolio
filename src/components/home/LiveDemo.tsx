import { useEffect, useRef, useState } from "react";
import { Bot, Send, Terminal, Sparkles } from "lucide-react";
import { SectionLabel } from "@/components/common/SectionLabel";

type QA = { q: string; a: string };
const QA_BANK: QA[] = [
  {
    q: "stack",
    a: "Primary: React 19, Next.js 15, TypeScript, Tailwind CSS v4, Prisma, PostgreSQL + Supabase. AI & Automation: n8n, Google Gemini 1.5/3.1, Groq (Llama 3.3), pgvector (768-dim RAG), Slack Block Kit, REST APIs.",
  },
  {
    q: "experience",
    a: "3 developer internships across 2025–2026: OneNetworx Marketing, JLabs Innovatech, and NLP Business Development Services, plus freelance full-stack client deliveries.",
  },
  {
    q: "projects",
    a: "20 shipped projects across web, systems, and AI automation. Flagship systems: Lumina Dental Studio (Full-Stack Management Suite + Autonomous Clinical Orchestration RAG), Enterprise AI Email Triage, and Café Operations Telegram AI Suite.",
  },
  {
    q: "education",
    a: "BS Information Technology at National University Fairview. Summa Cum Laude, 100% Full Merit Blue Scholar, consistent First Honor Dean's Lister. Graduating 2026.",
  },
  {
    q: "location",
    a: "Caloocan City, Philippines (UTC+08:00). Available for remote and hybrid roles globally across APAC, US, and EU timezones.",
  },
  {
    q: "roles",
    a: "Actively positioning for Full-Stack Developer, Frontend Engineer, and AI Automation Specialist roles.",
  },
  {
    q: "contact",
    a: "Email: bryantiversonmelliza03@gmail.com | Phone: +63 939 817 0375 | LinkedIn: /in/bryant-iverson-melliza-6759b8292",
  },
];

const SUGGESTED = ["stack", "experience", "projects", "education", "roles", "contact"];

export function LiveDemo() {
  const [messages, setMessages] = useState<{ from: "user" | "agent"; text: string }[]>([
    {
      from: "agent",
      text: "resume-agent v2 online. Ask me about Bryant's stack, experience, projects, education, roles, or contact info.",
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
      hit?.a ??
      "No exact match found. Try typing: stack, experience, projects, education, roles, or contact.";
    setTimeout(() => setMessages((m) => [...m, { from: "agent", text: reply }]), 240);
    setInput("");
  };

  return (
    <section id="demo" className="py-16">
      <SectionLabel index="02" label="interactive agent" hint="rag-style resume simulator" />
      <div className="mt-8 overflow-hidden rounded-sm border border-border-strong bg-card shadow-sm">
        {/* Agent Header */}
        <div className="flex items-center justify-between border-b border-border bg-surface-2 px-4 py-2.5 text-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <div className="h-2.5 w-2.5 rounded-full bg-[#FF5F56]" />
              <div className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E]" />
              <div className="h-2.5 w-2.5 rounded-full bg-[#27C93F]" />
            </div>
            <div className="flex items-center gap-2">
              <Bot className="h-3.5 w-3.5 text-signal" />
              <span className="font-semibold text-foreground">AGENT.RESUME // RAG SIMULATOR</span>
            </div>
          </div>
          <span className="hidden sm:inline">Deterministic Rules Engine · Latency ~240ms</span>
        </div>

        {/* Message Log */}
        <div
          ref={scrollRef}
          className="flex h-[260px] flex-col gap-3 overflow-y-auto p-4 text-mono text-xs leading-relaxed"
          style={{ scrollbarWidth: "thin", scrollbarColor: "var(--scrollbar-thumb) transparent" }}
        >
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-2.5 ${
                m.from === "user" ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              <span
                className={`rounded px-1.5 py-0.5 text-[9px] uppercase font-bold shrink-0 ${
                  m.from === "user"
                    ? "bg-signal text-background font-bold"
                    : "bg-surface-2 border border-border text-signal"
                }`}
              >
                {m.from === "user" ? "YOU" : "AGENT"}
              </span>
              <p className="whitespace-pre-line">{m.text}</p>
            </div>
          ))}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            answer(input);
          }}
          className="flex items-center gap-2 border-t border-border bg-surface p-2.5"
        >
          <Terminal className="h-4 w-4 text-muted-foreground ml-2" />
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a question (e.g. stack, experience, projects, education)..."
            className="flex-1 bg-transparent text-mono text-xs text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
          <button
            type="submit"
            className="flex items-center gap-1 rounded-sm bg-signal px-3 py-1.5 text-mono text-xs font-semibold text-background transition hover:bg-signal/90"
          >
            <Send className="h-3 w-3" />
            <span>Send</span>
          </button>
        </form>

        {/* Quick Suggestion Pills */}
        <div className="flex flex-wrap items-center gap-1.5 border-t border-border/60 bg-surface-2 px-4 py-2 text-mono text-[10.5px]">
          <span className="text-muted-foreground text-[10px] mr-1 uppercase">QUICK QUERIES:</span>
          {SUGGESTED.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => answer(s)}
              className="rounded border border-border bg-surface px-2 py-0.5 text-muted-foreground hover:border-signal hover:text-signal transition"
            >
              {s}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
