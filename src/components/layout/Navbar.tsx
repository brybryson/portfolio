import { Link, useRouterState } from "@tanstack/react-router";
import { Award, Boxes, Briefcase, Command as CmdIcon, Home } from "lucide-react";

export function Navbar({ onOpenPalette }: { onOpenPalette: () => void }) {
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  const navLinks = [
    { label: "Home", to: "/home", icon: Home },
    { label: "Projects & Pipelines", to: "/projects", icon: Boxes },
    { label: "Experience", to: "/experience", icon: Briefcase },
    { label: "Certificates", to: "/certificates", icon: Award },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex h-13 max-w-[1536px] items-center justify-between px-6 sm:px-10 lg:px-14 text-mono text-xs">
        {/* Brand / Logo */}
        <div className="flex items-center gap-3">
          <Link
            to="/home"
            className="flex items-center gap-2 font-medium text-foreground hover:text-signal transition"
          >
            <img
              src="/images/experience/portfolio logo.png"
              alt="Logo"
              className="h-5 w-5 object-contain"
              onError={(e) => {
                const el = e.currentTarget as HTMLImageElement;
                el.style.display = "none";
              }}
            />
            <span className="font-semibold text-foreground">bryant.melliza</span>
          </Link>
          <span className="hidden sm:inline text-border-strong">/</span>
          <span className="hidden sm:inline text-muted-foreground text-[11px]">
            available for work
          </span>
        </div>

        {/* Dedicated Route Tabs (/projects, /experience, /certificates) */}
        <nav className="flex items-center gap-1 rounded-sm border border-border/80 bg-surface/80 p-1 backdrop-blur shadow-sm">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive =
              link.to === "/home"
                ? currentPath === "/" || currentPath === "/home"
                : currentPath.startsWith(link.to);

            return (
              <Link
                key={link.to}
                to={link.to}
                className={`relative flex items-center gap-1.5 rounded-sm px-3 py-1.5 text-xs transition ${
                  isActive
                    ? "bg-card text-signal font-bold shadow-sm border border-signal/40"
                    : "text-muted-foreground hover:bg-surface-2 hover:text-foreground border border-transparent"
                }`}
              >
                <Icon
                  className={`h-3.5 w-3.5 ${isActive ? "text-signal" : "text-muted-foreground"}`}
                />
                <span>{link.label}</span>
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-0.5 w-4 bg-signal rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Contacts & Command Menu */}
        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-3 xl:flex text-[11px] text-muted-foreground">
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
