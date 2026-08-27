import React, { useEffect, useRef, useState } from "react";
import {
  RotateCcw,
  Send,
  User,
  X,
} from "lucide-react";
import { OwleyAvatar } from "@/components/common/OwleyAvatar";
import { queryBrysonKnowledge } from "@/data/agentKnowledge";

interface Message {
  id: string;
  from: "user" | "owley";
  text: string;
  timestamp: string;
}

export function OwleyFloatingWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "init",
      from: "owley",
      text: `Hi there! I'm **Owley** — Bryant's favorite cat. 🐾

I'm usually very quiet and gentle. Bryant adopted me after someone threw me into their backyard, and now I keep him company while he codes late into the night.

As his AI companion, I'm here to answer any questions about his **20 shipped projects** (like Lumina Dental Studio and Lumi), tech stack, and experience. 

**Meow! What can I help you with today?**`,
      timestamp: "Just now",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [quickReplies, setQuickReplies] = useState<string[]>([
    "Tell me about Lumina Dental Studio",
    "Tell me about Lumi the chatbot",
    "What is his tech stack?",
    "How can I contact Bryant?",
  ]);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
    }
  }, [isOpen, messages, isTyping]);

  const handleSend = (queryText: string) => {
    const q = queryText.trim();
    if (!q) return;

    const userMsg: Message = {
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
      const botMsg: Message = {
        id: `o-${Date.now()}`,
        from: "owley",
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, botMsg]);
      setQuickReplies(newReplies);
      setIsTyping(false);
    }, 350);
  };

  const handleReset = () => {
    setMessages([
      {
        id: "reset",
        from: "owley",
        text: "Meow! 🐾 Chat reset. What would you like to ask about Bryant's projects, stack, or experience?",
        timestamp: "Just now",
      },
    ]);
  };

  return (
    <div className="fixed bottom-8 right-6 md:bottom-10 md:right-8 z-50 flex flex-col items-end">
      {/* Expanded Floating Chat Dialog */}
      {isOpen && (
        <div className="animate-in fade-in zoom-in-95 duration-200 flex h-[520px] w-[350px] sm:w-[410px] flex-col overflow-hidden rounded-sm border border-border-strong bg-card/95 backdrop-blur-xl shadow-2xl">
          {/* Clean Header Bar */}
          <div className="flex items-center justify-between border-b border-border bg-surface-2 px-4 py-2.5 text-mono text-xs">
            <div className="flex items-center gap-2.5">
              <OwleyAvatar size="sm" isThinking={isTyping} />
              <div>
                <div className="flex items-center gap-1.5 font-bold text-foreground">
                  <span>Owley</span>
                  <span className="text-[10px] font-normal text-muted-foreground">· AI Cat Bot</span>
                </div>
                <div className="text-[9.5px] text-signal font-medium">
                  ● Verified Portfolio Memory
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleReset}
                className="rounded p-1 text-muted-foreground hover:bg-surface hover:text-foreground transition"
                title="Reset conversation"
              >
                <RotateCcw className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded p-1 text-muted-foreground hover:bg-surface hover:text-foreground transition"
                title="Close chat"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Messages Stream */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-4 text-mono text-xs leading-relaxed flex flex-col gap-3.5"
            style={{ scrollbarWidth: "thin", scrollbarColor: "var(--scrollbar-thumb) transparent" }}
          >
            {messages.map((m) => {
              const isUser = m.from === "user";
              return (
                <div
                  key={m.id}
                  className={`flex items-start gap-2.5 ${
                    isUser ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  <span className="shrink-0 mt-0.5">
                    {isUser ? (
                      <span className="flex h-6 w-6 items-center justify-center rounded bg-signal text-background text-[10px] font-bold">
                        <User className="h-3 w-3" />
                      </span>
                    ) : (
                      <OwleyAvatar size="sm" />
                    )}
                  </span>

                  <div
                    className={`flex max-w-[85%] flex-col rounded-sm p-3.5 text-xs leading-relaxed shadow-sm break-words ${
                      isUser
                        ? "bg-signal/15 border border-signal/40 text-foreground"
                        : "bg-surface/90 border border-border text-foreground/90"
                    }`}
                  >
                    <div className="prose prose-invert prose-xs max-w-none">
                      <FormattedMessage text={m.text} />
                    </div>
                    <span className="mt-1.5 text-[9px] text-muted-foreground self-end">
                      {m.timestamp}
                    </span>
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

          {/* Quick Suggestions Ribbon */}
          {quickReplies.length > 0 && (
            <div className="flex gap-1.5 overflow-x-auto border-t border-border/60 bg-surface-2/60 px-3 py-2 text-mono text-[10.5px]">
              {quickReplies.map((qr, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(qr)}
                  className="shrink-0 rounded-sm border border-border bg-card px-2.5 py-1 text-muted-foreground hover:border-signal hover:text-signal transition"
                >
                  {qr}
                </button>
              ))}
            </div>
          )}

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(input);
            }}
            className="flex items-center gap-2 border-t border-border bg-surface p-2.5"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Owley anything about Bryant..."
              className="flex-1 bg-transparent px-2 text-mono text-xs text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              className={`rounded-sm px-3.5 py-1.5 text-mono text-xs font-bold transition ${
                input.trim() && !isTyping
                  ? "bg-signal text-background hover:bg-signal/90 shadow-sm"
                  : "bg-surface-2 text-muted-foreground cursor-not-allowed border border-border"
              }`}
            >
              <Send className="h-3.5 w-3.5" />
            </button>
          </form>
        </div>
      )}

      {/* Floating Cyber Cat Toggle Button (Bigger, Clean & No Blue Pulse) */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group animate-in fade-in slide-in-from-bottom-2 duration-200 relative flex items-center gap-3 rounded-full border border-border-strong bg-card/95 py-2.5 pl-3 pr-5 shadow-2xl backdrop-blur-md transition-all hover:border-signal hover:scale-105"
          aria-label="Open Owley AI Assistant"
        >
          <OwleyAvatar size="md" />
          <div className="flex flex-col text-left">
            <div className="flex items-center gap-1.5 text-mono text-sm font-bold text-foreground">
              <span>Owley</span>
              <span className="text-[11px] text-muted-foreground font-normal">· AI Bot</span>
            </div>
            <span className="text-mono text-[10.5px] text-signal font-semibold">
              Ask about Bryant
            </span>
          </div>
        </button>
      )}
    </div>
  );
}

// Clean Formatter for Markdown, Hyperlinks, and Bullets
export function FormattedMessage({ text }: { text: string }) {
  const lines = text.split("\n");

  return (
    <div className="space-y-1.5">
      {lines.map((line, idx) => {
        if (!line.trim()) return <div key={idx} className="h-1" />;

        const formatted = renderMarkdownSpans(line);

        if (line.startsWith("• ") || line.startsWith("- ")) {
          return (
            <div key={idx} className="flex items-start gap-2 pl-1">
              <span className="text-signal mt-0.5">•</span>
              <span className="flex-1">{formatted}</span>
            </div>
          );
        }

        if (/^\d+\.\s/.test(line)) {
          const match = line.match(/^(\d+\.)\s(.*)/);
          return (
            <div key={idx} className="flex items-start gap-2 pl-1">
              <span className="text-signal font-bold">{match?.[1]}</span>
              <span className="flex-1">{renderMarkdownSpans(match?.[2] || "")}</span>
            </div>
          );
        }

        return (
          <p key={idx} className="leading-relaxed">
            {formatted}
          </p>
        );
      })}
    </div>
  );
}

function renderMarkdownSpans(text: string): React.ReactNode {
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts: React.ReactNode[] = [];
  let lastIdx = 0;
  let match: RegExpExecArray | null;

  while ((match = linkRegex.exec(text)) !== null) {
    if (match.index > lastIdx) {
      parts.push(parseBold(text.substring(lastIdx, match.index)));
    }
    const linkText = match[1];
    const linkUrl = match[2];
    parts.push(
      <a
        key={match.index}
        href={linkUrl}
        target="_blank"
        rel="noreferrer"
        className="text-signal underline hover:text-signal/80 transition font-semibold"
      >
        {linkText}
      </a>
    );
    lastIdx = match.index + match[0].length;
  }

  if (lastIdx < text.length) {
    parts.push(parseBold(text.substring(lastIdx)));
  }

  return parts.length > 0 ? parts : parseBold(text);
}

function parseBold(text: string): React.ReactNode {
  const boldParts = text.split(/(\*\*[^*]+\*\*)/g);
  return boldParts.map((part, idx) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={idx} className="text-foreground font-bold">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}
