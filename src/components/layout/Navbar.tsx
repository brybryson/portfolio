import { Link } from "@tanstack/react-router";
import { Command as CmdIcon } from "lucide-react";

export function Navbar({ onOpenPalette }: { onOpenPalette: () => void }) {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.location.href = `/#${id}`;
    }
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex h-12 max-w-[1440px] items-center justify-between px-6 text-mono text-xs text-muted-foreground md:px-10">
        {/* Brand / Logo */}
        <div className="flex items-center gap-2 font-medium text-foreground">
          <img
            src="/images/experience/portfolio logo.png"
            alt="Logo"
            className="h-5 w-5 object-contain"
            onError={(e) => {
              const el = e.currentTarget as HTMLImageElement;
              el.style.display = "none";
            }}
          />
          <Link to="/" className="text-foreground hover:text-signal transition font-semibold">
            bryant.melliza
          </Link>
          <span className="hidden sm:inline text-border-strong">/</span>
          <span className="hidden sm:inline text-muted-foreground text-[11px]">
            available for work
          </span>
        </div>

        {/* Center Section Navigation Tabs */}
        <nav className="hidden items-center gap-1 sm:flex text-[11px]">
          <button
            onClick={() => scrollTo("projects")}
            className="rounded-sm px-2.5 py-1 text-muted-foreground hover:bg-surface hover:text-foreground transition"
          >
            [01] projects
          </button>
          <button
            onClick={() => scrollTo("demo")}
            className="rounded-sm px-2.5 py-1 text-muted-foreground hover:bg-surface hover:text-foreground transition"
          >
            [02] demo
          </button>
          <button
            onClick={() => scrollTo("experience")}
            className="rounded-sm px-2.5 py-1 text-muted-foreground hover:bg-surface hover:text-foreground transition"
          >
            [03] experience
          </button>
          <button
            onClick={() => scrollTo("education")}
            className="rounded-sm px-2.5 py-1 text-muted-foreground hover:bg-surface hover:text-foreground transition"
          >
            [04] education
          </button>
          <button
            onClick={() => scrollTo("certificates")}
            className="rounded-sm px-2.5 py-1 text-muted-foreground hover:bg-surface hover:text-foreground transition"
          >
            [05] certs
          </button>
          <button
            onClick={() => scrollTo("skills")}
            className="rounded-sm px-2.5 py-1 text-muted-foreground hover:bg-surface hover:text-foreground transition"
          >
            [06] toolkit
          </button>
          <button
            onClick={() => scrollTo("contact")}
            className="rounded-sm px-2.5 py-1 text-muted-foreground hover:bg-surface hover:text-foreground transition"
          >
            [07] contact
          </button>
        </nav>

        {/* Right Command Palette Trigger */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenPalette}
            className="flex items-center gap-1.5 rounded-sm border border-border-strong bg-surface px-2.5 py-1 text-mono text-[11px] text-foreground hover:border-signal hover:text-signal transition shadow-sm"
            aria-label="Open command palette"
          >
            <CmdIcon className="h-3 w-3" />
            <span className="hidden sm:inline">press</span>
            <kbd className="rounded-sm border border-border-strong bg-background px-1 text-[9.5px]">
              /
            </kbd>
            <span className="hidden sm:inline">or</span>
            <kbd className="hidden rounded-sm border border-border-strong bg-background px-1 text-[9.5px] sm:inline">
              ⌘K
            </kbd>
          </button>
        </div>
      </div>
    </header>
  );
}
