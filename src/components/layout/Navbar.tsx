import { Link } from "@tanstack/react-router";
import { Command as CmdIcon } from "lucide-react";

export function Navbar({ onOpenPalette }: { onOpenPalette: () => void }) {
  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-11 max-w-7xl items-center justify-between px-4 text-mono text-xs text-muted-foreground sm:px-6 lg:px-8">
        {/* Brand / Logo */}
        <div className="flex items-center gap-2 font-medium text-foreground">
          <img
            src="/images/experience/portfolio logo.png"
            alt="Logo"
            className="h-4 w-4 object-contain"
            onError={(e) => {
              const el = e.currentTarget as HTMLImageElement;
              el.style.display = "none";
            }}
          />
          <Link to="/" className="text-foreground hover:text-signal transition">
            bryant.melliza
          </Link>
          <span className="hidden text-border-strong sm:inline">/</span>
          <span className="hidden text-muted-foreground sm:inline text-[11px]">
            available for work
          </span>
        </div>

        {/* Center Section Links */}
        <nav className="hidden items-center gap-4 lg:flex text-[11.5px]">
          <a href="/#projects" className="hover:text-foreground transition">
            projects
          </a>
          <a href="/#demo" className="hover:text-foreground transition">
            demo
          </a>
          <a href="/#experience" className="hover:text-foreground transition">
            experience
          </a>
          <a href="/#education" className="hover:text-foreground transition">
            education
          </a>
          <a href="/#certificates" className="hover:text-foreground transition">
            certificates
          </a>
          <a href="/#skills" className="hover:text-foreground transition">
            skills
          </a>
          <a href="/#contact" className="hover:text-foreground transition">
            contact
          </a>
        </nav>

        {/* Right Contacts & Command Palette Trigger */}
        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-3 md:flex text-[11px]">
            <a
              href="mailto:bryantiversonmelliza03@gmail.com"
              className="hover:text-foreground transition"
            >
              email
            </a>
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

          <button
            onClick={onOpenPalette}
            className="flex items-center gap-1.5 rounded-sm border border-border-strong bg-surface px-2 py-1 text-mono text-[10.5px] text-foreground hover:border-signal hover:text-signal transition shadow-sm"
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
