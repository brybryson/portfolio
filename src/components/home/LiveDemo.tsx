import { useEffect, useRef, useState } from "react";
import { Bot, RotateCcw, Send, Sparkles, Terminal, User } from "lucide-react";
import { SectionLabel } from "@/components/common/SectionLabel";
import { OwleyAvatar } from "@/components/common/OwleyAvatar";
import { queryOwleyRAG } from "@/data/agentKnowledge";
import { FormattedMessage } from "@/components/ai/OwleyFloatingWidget";

interface ChatMessage {
  id: string;
  from: "user" | "owley";
  text: string;
  timestamp: string;
}

export function LiveDemo() {
  const sessionIdRef = useRef<string>(
    `demo-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
  );
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "init",
      from: "owley",
      text: `Hi there! I'm **Owley** 🐾 — Bryant's AI companion.

Connected to his **RAG vector memory**, I can answer questions about his **20 shipped projects**, tech stack, and experience.

**What would you like to explore today?**`,
      timestamp: "Just now",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [quickReplies, setQuickReplies] = useState<string[]>([
    "Tell me about Lumina Dental Studio",
    "Tell me about Lumi the chatbot",
    "What is Bryant's tech stack?",
    "Is Bryant available for hire?",
  ]);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = async (queryText: string) => {
    const q = queryText.trim();
    if (!q) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      from: "user",
      text: q,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    try {
      const { reply, quickReplies: newReplies } = await queryOwleyRAG(q, sessionIdRef.current);
      const botMsg: ChatMessage = {
        id: `o-${Date.now()}`,
        from: "owley",
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, botMsg]);
      setQuickReplies(newReplies);
    } catch (err) {
      console.error("Chat error:", err);
    } finally {
      setIsTyping(false);
    }
  };

  const handleReset = () => {
    setMessages([
      {
        id: "reset",
        from: "owley",
        text: "Meow! 🐾 Chat reset. What would you like to know about Bryant's projects, stack, or experience?",
        timestamp: "Just now",
      },
    ]);
  };

  return (
    <section id="demo" className="py-20">
      <SectionLabel index="04" label="ai companion" hint="owley.ai // cyber-cat assistant" />

      <div className="mt-8 flex flex-col gap-4">
        <div className="flex flex-col gap-2 max-w-3xl">
          <div className="flex items-center gap-2 text-mono text-xs text-signal font-semibold uppercase tracking-wider">
            <Sparkles className="h-4 w-4" />
            <span>PERSONALIZED CYBER-CAT AI COMPANION</span>
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Owley AI — Interactive Portfolio & Resume Assistant
          </h2>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
            Meet Owley (named after Bryant's adopted cat!) — an interactive companion grounded in
            Bryant's 20 shipped projects, CV, and client deliverables.
          </p>
        </div>

        {/* Terminal Chat Arena */}
        <div className="mt-4 overflow-hidden rounded-sm border border-border-strong bg-card/95 backdrop-blur shadow-xl">
          {/* Clean Header */}
          <div className="flex items-center justify-between border-b border-border bg-surface-2 px-4 py-2.5 text-mono text-xs uppercase tracking-wider text-muted-foreground">
            <div className="flex items-center gap-3">
              <OwleyAvatar size="sm" isThinking={isTyping} />
              <div className="flex items-center gap-2">
                <span className="font-bold text-foreground">OWLEY</span>
                <span className="text-muted-foreground text-[11px]">· AI CAT BOT</span>
              </div>
            </div>

            <div className="flex items-center gap-4 text-[11px]">
              <span className="hidden sm:inline text-signal font-semibold">
                ● VECTOR MEMORY READY
              </span>
              <button
                onClick={handleReset}
                className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition"
                title="Reset conversation"
              >
                <RotateCcw className="h-3 w-3" />
                <span>Reset</span>
              </button>
            </div>
          </div>

          {/* Message Stream */}
          <div
            ref={scrollRef}
            className="flex h-[360px] flex-col gap-4 overflow-y-auto p-4 md:p-6 text-mono text-xs md:text-[13px] leading-relaxed"
            style={{ scrollbarWidth: "thin", scrollbarColor: "var(--scrollbar-thumb) transparent" }}
          >
            {messages.map((m) => {
              const isUser = m.from === "user";
              return (
                <div
                  key={m.id}
                  className={`flex items-start gap-3 ${isUser ? "flex-row-reverse" : "flex-row"}`}
                >
                  <span className="shrink-0 mt-0.5">
                    {isUser ? (
                      <span className="flex h-7 w-7 items-center justify-center rounded-sm bg-signal text-background text-xs font-bold shadow-sm">
                        <User className="h-3.5 w-3.5" />
                      </span>
                    ) : (
                      <OwleyAvatar size="sm" />
                    )}
                  </span>

                  <div
                    className={`flex max-w-[85%] flex-col gap-1 rounded-sm p-4 shadow-sm break-words ${
                      isUser
                        ? "bg-signal/15 border border-signal/40 text-foreground"
                        : "bg-surface/80 border border-border text-foreground/90"
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] uppercase text-muted-foreground pb-1.5 mb-1 border-b border-border/50">
                      <span className="font-bold text-signal">{isUser ? "YOU" : "OWLEY AI"}</span>
                      <span>{m.timestamp}</span>
                    </div>
                    <FormattedMessage text={m.text} />
                  </div>
                </div>
              );
            })}

            {isTyping && (
              <div className="flex items-center gap-2 text-signal text-xs">
                <OwleyAvatar size="sm" isThinking={true} />
                <span className="animate-pulse">Owley is querying vector memory...</span>
              </div>
            )}
          </div>

          {/* Quick Queries Suggestion Ribbon */}
          {quickReplies.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5 border-t border-border/60 bg-surface-2/60 px-4 py-2.5 text-mono text-xs">
              <span className="text-muted-foreground text-[10.5px] uppercase mr-1 font-semibold">
                SUGGESTED:
              </span>
              {quickReplies.map((qr, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(qr)}
                  className="rounded-sm border border-border bg-card px-2.5 py-1 text-[11.5px] text-muted-foreground hover:border-signal hover:text-signal transition shadow-sm"
                >
                  {qr}
                </button>
              ))}
            </div>
          )}

          {/* Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(input);
            }}
            className="flex items-center gap-2 border-t border-border bg-surface p-3"
          >
            <Terminal className="h-4 w-4 text-signal ml-2" />
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Owley anything (e.g. Lumina Dental Studio, Lumi, tech stack, experience)..."
              className="flex-1 bg-transparent text-mono text-xs md:text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              className={`flex items-center gap-1.5 rounded-sm px-4 py-2 text-mono text-xs font-bold uppercase tracking-wider transition ${
                input.trim() && !isTyping
                  ? "bg-signal text-background hover:bg-signal/90 shadow-md"
                  : "bg-surface-2 text-muted-foreground cursor-not-allowed border border-border"
              }`}
            >
              <Send className="h-3.5 w-3.5" />
              <span>Ask Owley</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
