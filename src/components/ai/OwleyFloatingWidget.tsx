import { useEffect, useRef, useState } from "react";
import {
  Maximize2,
  Minimize2,
  RotateCcw,
  Send,
  Sparkles,
  Terminal,
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
  const [hasUnread, setHasUnread] = useState(true);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "init",
      from: "owley",
      text: `Meow! 🐾 I'm Owley — Bryant's personalized AI companion!
I know all about Bryant's 20 shipped projects (like Lumina Dental Studio), tech stack, client services, and Summa Cum Laude credentials.

How can I help you today?`,
      timestamp: "Just now",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [quickReplies, setQuickReplies] = useState<string[]>([
    "Tell me about Lumina Dental Studio",
    "What services does Bryant offer?",
    "What is his tech stack?",
    "How can I contact Bryant?",
  ]);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setHasUnread(false);
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
      const owleyReply = reply
        .replace(/Bryson AI/g, "Owley AI 🐾")
        .replace(/I am Bryson/g, "I am Owley");

      const botMsg: Message = {
        id: `o-${Date.now()}`,
        from: "owley",
        text: owleyReply,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, botMsg]);
      setQuickReplies(newReplies);
      setIsTyping(false);
    }, 380);
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
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end">
      {/* Expanded Floating Chat Dialog */}
      {isOpen && (
        <div className="animate-in fade-in slide-in-from-bottom-5 duration-200 mb-3 flex h-[500px] w-[340px] sm:w-[390px] flex-col overflow-hidden rounded-sm border border-border-strong bg-card/95 backdrop-blur-xl shadow-2xl">
          {/* Header Bar */}
          <div className="flex items-center justify-between border-b border-border bg-surface-2 px-3.5 py-2.5 text-mono text-xs">
            <div className="flex items-center gap-2.5">
              <OwleyAvatar size="sm" isThinking={isTyping} />
              <div>
                <div className="flex items-center gap-1.5 font-bold text-foreground">
                  <span>Owley AI</span>
                  <span className="text-[10px] text-signal font-normal">🐾 Companion</span>
                </div>
                <div className="text-[9.5px] text-muted-foreground">
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
            className="flex-1 overflow-y-auto p-3.5 text-mono text-xs leading-relaxed flex flex-col gap-3"
            style={{ scrollbarWidth: "thin", scrollbarColor: "var(--scrollbar-thumb) transparent" }}
          >
            {messages.map((m) => {
              const isUser = m.from === "user";
              return (
                <div
                  key={m.id}
                  className={`flex items-start gap-2 ${
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
                    className={`flex max-w-[85%] flex-col rounded-sm p-3 text-[11.5px] leading-relaxed shadow-sm ${
                      isUser
                        ? "bg-signal/15 border border-signal/40 text-foreground"
                        : "bg-surface/90 border border-border text-foreground"
                    }`}
                  >
                    <p className="whitespace-pre-line">{m.text}</p>
                    <span className="mt-1 text-[9px] text-muted-foreground self-end">
                      {m.timestamp}
                    </span>
                  </div>
                </div>
              );
            })}

            {isTyping && (
              <div className="flex items-center gap-2 text-signal text-[11px]">
                <OwleyAvatar size="sm" isThinking={true} />
                <span className="animate-pulse">Owley is thinking... 🐾</span>
              </div>
            )}
          </div>

          {/* Quick Suggestions */}
          {quickReplies.length > 0 && (
            <div className="flex gap-1.5 overflow-x-auto border-t border-border/60 bg-surface-2/60 px-3 py-1.5 text-mono text-[10px]">
              {quickReplies.map((qr, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(qr)}
                  className="shrink-0 rounded border border-border bg-card px-2 py-0.5 text-muted-foreground hover:border-signal hover:text-signal transition"
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
            className="flex items-center gap-1.5 border-t border-border bg-surface p-2"
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
              className={`rounded px-3 py-1.5 text-mono text-xs font-semibold transition ${
                input.trim() && !isTyping
                  ? "bg-signal text-background hover:bg-signal/90"
                  : "bg-surface-2 text-muted-foreground cursor-not-allowed border border-border"
              }`}
            >
              <Send className="h-3.5 w-3.5" />
            </button>
          </form>
        </div>
      )}

      {/* Floating Cyber Cat Toggle Button on Screen */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center gap-2.5 rounded-full border border-border-strong bg-card/95 py-2 pl-2 pr-4 shadow-xl backdrop-blur-md transition-all duration-300 hover:border-signal hover:scale-105"
        aria-label="Open Owley AI Assistant"
      >
        <OwleyAvatar size="sm" />
        <div className="flex flex-col text-left">
          <div className="flex items-center gap-1 text-mono text-xs font-bold text-foreground">
            <span>Owley AI</span>
            <span className="text-signal">🐾</span>
          </div>
          <span className="text-mono text-[9px] text-muted-foreground">
            {isOpen ? "Close chat" : "Ask about Bryant"}
          </span>
        </div>

        {hasUnread && !isOpen && (
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-75" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-signal" />
          </span>
        )}
      </button>
    </div>
  );
}
