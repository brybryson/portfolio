import { useEffect, useRef, useState } from "react";
import { Bot, RotateCcw, Send, Sparkles, Terminal, User } from "lucide-react";
import { SectionLabel } from "@/components/common/SectionLabel";
import { OwleyAvatar } from "@/components/common/OwleyAvatar";
import { queryBrysonKnowledge } from "@/data/agentKnowledge";

interface ChatMessage {
  id: string;
  from: "user" | "owley";
  text: string;
  timestamp: string;
}

export function LiveDemo() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "init",
      from: "owley",
      text: `Meow! 🐾 I am Owley AI — Bryant's personalized cyber-cat companion & portfolio assistant.
I am indexed with Bryant's complete verified background: 20 shipped systems (including Lumina Dental Studio and Lumi), tech stack, 3 developer internships, Summa Cum Laude credentials, and client services.

Feel free to ask me anything about Bryant!`,
      timestamp: "Just now",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [quickReplies, setQuickReplies] = useState<string[]>([
    "Tell me about Lumina Dental Studio",
    "What is Bryant's tech stack?",
    "What services does he offer?",
    "Is Bryant available for hire?",
  ]);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = (queryText: string) => {
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

    setTimeout(() => {
      const { reply, quickReplies: newReplies } = queryBrysonKnowledge(q);
      const owleyReply = reply
        .replace(/Bryson AI/g, "Owley AI 🐾")
        .replace(/I am Bryson/g, "I am Owley");

      const botMsg: ChatMessage = {
        id: `o-${Date.now()}`,
        from: "owley",
        text: owleyReply,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, botMsg]);
      setQuickReplies(newReplies);
      setIsTyping(false);
    }, 400);
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
    setQuickReplies([
      "Tell me about Lumina Dental Studio",
      "What is Bryant's tech stack?",
      "What services does he offer?",
      "How to contact Bryant?",
    ]);
  };

  return (
    <section id="demo" className="py-20">
      <SectionLabel index="04" label="ai companion" hint="owley.ai // cyber-cat rag assistant" />

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
            Meet Owley (named after Bryant's cat!) — an interactive AI assistant grounded in Bryant's 20 shipped projects, CV, and client deliverables.
          </p>
        </div>

        {/* Terminal Chat Arena */}
        <div className="mt-4 overflow-hidden rounded-sm border border-border-strong bg-card/95 backdrop-blur shadow-xl">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border bg-surface-2 px-4 py-2.5 text-mono text-xs uppercase tracking-wider text-muted-foreground">
            <div className="flex items-center gap-3">
              <OwleyAvatar size="sm" isThinking={isTyping} />
              <div className="flex items-center gap-2">
                <span className="font-bold text-foreground">OWLEY_AI // CYBER-CAT AGENT v2.4</span>
                <span className="text-signal text-[11px] font-semibold">🐾</span>
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
            className="flex h-[340px] flex-col gap-4 overflow-y-auto p-4 md:p-6 text-mono text-xs md:text-[13px] leading-relaxed"
            style={{ scrollbarWidth: "thin", scrollbarColor: "var(--scrollbar-thumb) transparent" }}
          >
            {messages.map((m) => {
              const isUser = m.from === "user";
              return (
                <div
                  key={m.id}
                  className={`flex items-start gap-3 ${
                    isUser ? "flex-row-reverse" : "flex-row"
                  }`}
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
                    className={`flex max-w-[85%] flex-col gap-1 rounded-sm p-3.5 shadow-sm ${
                      isUser
                        ? "bg-signal/15 border border-signal/40 text-foreground"
                        : "bg-surface/80 border border-border text-foreground"
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] uppercase text-muted-foreground pb-1 mb-1 border-b border-border/50">
                      <span className="font-bold text-signal">
                        {isUser ? "YOU" : "OWLEY AI 🐾"}
                      </span>
                      <span>{m.timestamp}</span>
                    </div>
                    <p className="whitespace-pre-line leading-relaxed">{m.text}</p>
                  </div>
                </div>
              );
            })}

            {isTyping && (
              <div className="flex items-center gap-2 text-signal text-xs">
                <OwleyAvatar size="sm" isThinking={true} />
                <span className="animate-pulse">Owley is querying vector memory... 🐾</span>
              </div>
            )}
          </div>

          {/* Quick Queries Suggestion Ribbon */}
          {quickReplies.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5 border-t border-border/60 bg-surface-2/60 px-4 py-2 text-mono text-xs">
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
              placeholder="Ask Owley anything (e.g. Lumina Dental Studio, tech stack, services, experience)..."
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
