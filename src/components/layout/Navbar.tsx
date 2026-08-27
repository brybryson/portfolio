import { Link } from "@tanstack/react-router";
import { Command as CmdIcon } from "lucide-react";

export function Navbar({ onOpenPalette }: { onOpenPalette: () => void }) {
  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-11 max-w-[1440px] items-center justify-between px-6 text-mono text-[11px] uppercase tracking-wider text-muted-foreground md:px-10">
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
          <Link to="/" className="text-foreground hover:text-signal transition">
            bryant.melliza
          </Link>
          <span className="hidden sm:inline">/</span>
          <span className="hidden sm:inline text-muted-foreground">
            available for work
          </span>
        </div>

        {/* Center / Right Contacts & Section Links */}
        <div className="hidden items-center gap-4 md:flex">
          <a href="mailto:bryantiversonmelliza03@gmail.com" className="hover:text-foreground transition">
            email
          </a>
          <a href="tel:+639398170375" className="hover:text-foreground transition">
            +63 939 817 0375
          </a>
          <span>Caloocan City, PH</span>
          <a
            href="https://github.com/brybryson"
            target="_blank"
            rel="noreferrer"
            className="hover:text-foreground transition"
          >
            github
          </a>
          <a
            href="https://www.linkedin.com/in/bryant-iverson-melliza-6759b8292"
            target="_blank"
            rel="noreferrer"
            className="hover:text-foreground transition"
          >
            linkedin
          </a>
        </div>

        {/* Command Palette Trigger Button */}
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
    </header>
  );
}
