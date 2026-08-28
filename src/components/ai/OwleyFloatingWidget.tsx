import React, { useEffect, useRef, useState } from "react";
import { Minus, RotateCcw, Send, User, X } from "lucide-react";
import { OwleyAvatar } from "@/components/common/OwleyAvatar";
import { queryOwleyRAG } from "@/data/agentKnowledge";

interface Message {
  id: string;
  from: "user" | "owley";
  text: string;
  timestamp: string;
}

export function OwleyFloatingWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const sessionIdRef = useRef<string>(
    `owley-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
  );
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "init",
      from: "owley",
      text: `Hey there! I'm **Owley** 🐾

I'm Bryant's cat and coding buddy. Ask me anything about his work, projects, or how to get in touch!

**What's on your mind?**`,
      timestamp: "Just now",
    },
  ]);
  const DEFAULT_QUICK_REPLIES = [
    "What is his tech stack?",
    "How can I contact Bryant?",
    "Who is Bryant?",
    "What are his most prominent projects?",
    "About Owley chatbot",
  ];

  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [quickReplies, setQuickReplies] = useState<string[]>(DEFAULT_QUICK_REPLIES);

  const scrollRef = useRef<HTMLDivElement>(null);
  const widgetRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (isOpen) {
      scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
    }
  }, [isOpen, messages, isTyping]);

  // Click outside to minimize without clearing conversation history
  useEffect(() => {
    if (!isOpen) return;

    const handleOutsideClick = (e: MouseEvent | TouchEvent) => {
      if (widgetRef.current && !widgetRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("touchstart", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("touchstart", handleOutsideClick);
    };
  }, [isOpen]);

  const handleSend = async (queryText: string) => {
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

    try {
      const { reply, quickReplies: newReplies } = await queryOwleyRAG(q, sessionIdRef.current);
      const botMsg: Message = {
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
        text: "Meow! 🐾 Chat reset. What would you like to ask about Bryant?",
        timestamp: "Just now",
      },
    ]);
    setQuickReplies(DEFAULT_QUICK_REPLIES);
  };

  const handleCloseAndReset = () => {
    handleReset();
    setIsOpen(false);
  };

  return (
    <div ref={widgetRef} className="fixed bottom-8 right-6 md:bottom-10 md:right-8 z-50 flex flex-col items-end">
      {/* Expanded Floating Chat Dialog */}
      {isOpen && (
        <div className="animate-in fade-in zoom-in-95 duration-200 flex h-[520px] w-[350px] sm:w-[410px] flex-col overflow-hidden rounded-sm border border-border-strong bg-card/95 backdrop-blur-xl shadow-2xl">
          {/* Clean Header Bar */}
          <div className="flex items-center justify-between border-b border-border bg-surface-2 px-4 py-2.5 text-mono text-xs">
            <div className="flex items-center gap-2.5">
              <OwleyAvatar size="sm" />
              <div>
                <div className="flex items-center gap-1.5 font-bold text-foreground">
                  <span>Owley</span>
                  <span className="text-[10px] font-normal text-muted-foreground">
                    · AI Cat Bot
                  </span>
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
                title="Minimize (keeps history)"
              >
                <Minus className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={handleCloseAndReset}
                className="rounded p-1 text-muted-foreground hover:bg-surface hover:text-foreground transition"
                title="Close and reset chat"
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
                  className={`flex items-start gap-2.5 ${isUser ? "flex-row-reverse" : "flex-row"}`}
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
          className="group animate-in fade-in slide-in-from-bottom-2 duration-200 relative flex items-center gap-3.5 rounded-full border border-border-strong bg-card/95 py-3 pl-3.5 pr-6 shadow-2xl backdrop-blur-md transition-all hover:border-signal hover:scale-105"
          aria-label="Open Owley AI Assistant"
        >
          <OwleyAvatar size="md" />
          <div className="flex flex-col text-left">
            <div className="flex items-center gap-1.5 text-mono text-sm md:text-base font-bold text-foreground">
              <span>Owley</span>
              <span className="text-[11px] text-muted-foreground font-normal">· AI Bot</span>
            </div>
            <span className="text-mono text-[11px] text-signal font-semibold">
              Ask about Bryant
            </span>
          </div>
        </button>
      )}
    </div>
  );
}

// Clean Formatter for Markdown, Hyperlinks, Inline Code, and Bullets
export function FormattedMessage({ text }: { text: string }) {
  const lines = text.split("\n");

  return (
    <div className="space-y-1.5 text-xs leading-relaxed text-foreground/90">
      {lines.map((rawLine, idx) => {
        const trimmed = rawLine.trim();
        if (!trimmed) return <div key={idx} className="h-1" />;

        // Horizontal divider
        if (/^(\-{3,}|\*{3,}|_{3,})$/.test(trimmed)) {
          return <hr key={idx} className="border-border/60 my-2" />;
        }

        // Headings (###, ##, #)
        const headingMatch = trimmed.match(/^(#{1,4})\s+(.+)/);
        if (headingMatch) {
          const headingText = headingMatch[2];
          return (
            <div key={idx} className="font-semibold text-foreground tracking-tight pt-1">
              {renderMarkdownSpans(headingText)}
            </div>
          );
        }

        // Bullet lists: `- `, `* `, `• `, `+ `, or indented
        const bulletMatch = rawLine.match(/^(\s*)([-*•+]|\u2022)\s*(.*)/);
        if (bulletMatch) {
          const indent = bulletMatch[1].length;
          let content = bulletMatch[3];
          // Strip secondary accidental leading dashes like "- Primary Email" after bullet
          if (/^[-*•+]\s+/.test(content)) {
            content = content.replace(/^[-*•+]\s+/, "");
          }

          return (
            <div
              key={idx}
              className={`flex items-start gap-2 ${indent >= 2 ? "pl-4 text-[11px]" : "pl-1"}`}
            >
              <span className="text-signal mt-0.5 select-none font-bold">
                {indent >= 2 ? "◦" : "•"}
              </span>
              <span className="flex-1">{renderMarkdownSpans(content)}</span>
            </div>
          );
        }

        // Numbered lists: `1. `, `2. `
        const numberedMatch = rawLine.match(/^(\s*)(\d+\.)\s*(.*)/);
        if (numberedMatch) {
          const indent = numberedMatch[1].length;
          const num = numberedMatch[2];
          const content = numberedMatch[3];

          return (
            <div
              key={idx}
              className={`flex items-start gap-2 ${indent >= 2 ? "pl-4 text-[11px]" : "pl-1"}`}
            >
              <span className="text-signal font-mono font-semibold select-none">{num}</span>
              <span className="flex-1">{renderMarkdownSpans(content)}</span>
            </div>
          );
        }

        return (
          <p key={idx} className="leading-relaxed">
            {renderMarkdownSpans(trimmed)}
          </p>
        );
      })}
    </div>
  );
}

function renderMarkdownSpans(text: string): React.ReactNode {
  // Regex to match markdown links [text](url), inline code `code`, bold **text**, italic *text*
  const tokenRegex = /(\[[^\]]+\]\([^)]+\)|`[^`]+`|\*\*[^*]+\*\*|\*[^*]+\*)/g;
  const parts: React.ReactNode[] = [];
  let lastIdx = 0;
  let match: RegExpExecArray | null;

  while ((match = tokenRegex.exec(text)) !== null) {
    if (match.index > lastIdx) {
      parts.push(text.substring(lastIdx, match.index));
    }

    const token = match[0];

    // 1. Markdown link [text](url)
    if (token.startsWith("[") && token.includes("](")) {
      const linkMatch = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (linkMatch) {
        parts.push(
          <a
            key={match.index}
            href={linkMatch[2]}
            target="_blank"
            rel="noreferrer"
            className="text-signal underline hover:text-signal/80 transition font-medium"
          >
            {linkMatch[1]}
          </a>,
        );
      } else {
        parts.push(token);
      }
    }
    // 2. Inline code `code`
    else if (token.startsWith("`") && token.endsWith("`")) {
      parts.push(
        <code
          key={match.index}
          className="rounded bg-surface-3 border border-border/70 px-1 py-0.5 font-mono text-[11px] text-signal select-all"
        >
          {token.slice(1, -1)}
        </code>,
      );
    }
    // 3. Bold **text**
    else if (token.startsWith("**") && token.endsWith("**")) {
      parts.push(
        <strong key={match.index} className="text-foreground font-semibold">
          {token.slice(2, -2)}
        </strong>,
      );
    }
    // 4. Italic *text*
    else if (token.startsWith("*") && token.endsWith("*")) {
      parts.push(
        <em key={match.index} className="text-muted-foreground italic">
          {token.slice(1, -1)}
        </em>,
      );
    }

    lastIdx = match.index + token.length;
  }

  if (lastIdx < text.length) {
    parts.push(text.substring(lastIdx));
  }

  return parts.length > 0 ? parts : text;
}
