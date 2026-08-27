import { Link, useRouterState } from "@tanstack/react-router";
import { Command as CmdIcon, Download, Sparkles, Terminal } from "lucide-react";

export function Navbar({ onOpenPalette }: { onOpenPalette: () => void }) {
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  const navLinks = [
    { label: "Home", to: "/" },
    { label: "Projects & Pipelines", to: "/projects" },
    { label: "Experience", to: "/experience" },
    { label: "Certificates", to: "/certificates" },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand & System Status */}
        <div className="flex items-center gap-4">
          <Link to="/" className="group flex items-center gap-2 text-mono text-xs tracking-wider">
            <span className="flex h-6 w-6 items-center justify-center rounded-sm border border-border-strong bg-surface font-semibold text-foreground group-hover:border-signal group-hover:text-signal transition">
              B
            </span>
            <span className="hidden font-semibold text-foreground sm:inline">
              bryant.melliza
            </span>
          </Link>

          <div className="hidden items-center gap-2 border-l border-border pl-4 text-mono text-[10px] uppercase text-muted-foreground md:flex">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#27C93F] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#27C93F]" />
            </span>
            <span>SYSTEM: ONLINE</span>
            <span className="text-border-strong">|</span>
            <span>MANILA (+08:00)</span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1 text-mono text-xs">
          {navLinks.map((link) => {
            const isActive =
              link.to === "/"
                ? currentPath === "/"
                : currentPath.startsWith(link.to);
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`relative px-3 py-1.5 rounded-sm transition ${
                  isActive
                    ? "bg-surface-2 text-foreground border border-border-strong font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-surface/50"
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute -bottom-[9px] left-1/2 -translate-x-1/2 h-0.5 w-4 bg-signal rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenPalette}
            className="flex items-center gap-1.5 rounded-sm border border-border bg-surface px-2.5 py-1 text-mono text-[11px] text-muted-foreground hover:border-border-strong hover:text-foreground transition"
            title="Command Menu (Press ⌘K or /)"
          >
            <CmdIcon className="h-3 w-3" />
            <span className="hidden sm:inline">Menu</span>
            <kbd className="hidden rounded border border-border-strong bg-surface-2 px-1 text-[9px] font-medium text-muted-foreground sm:inline">
              ⌘K
            </kbd>
          </button>

          <a
            href="/resume.pdf"
            download
            className="hidden items-center gap-1.5 rounded-sm border border-signal/40 bg-signal/10 px-3 py-1 text-mono text-[11px] text-signal hover:bg-signal/20 hover:border-signal transition md:inline-flex"
          >
            <Download className="h-3 w-3" />
            <span>CV</span>
          </a>
        </div>
      </div>
    </header>
  );
}
