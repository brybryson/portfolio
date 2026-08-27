import { useEffect, useState } from "react";
import {
  Award,
  Bot,
  Boxes,
  Briefcase,
  Cpu,
  GraduationCap,
  Mail,
  Terminal,
  User,
} from "lucide-react";

const NAV_ITEMS = [
  { id: "hero", label: "00 Identity", short: "00", icon: User },
  { id: "skills", label: "06 Toolkit", short: "06", icon: Cpu },
  { id: "projects", label: "01 Projects", short: "01", icon: Boxes },
  { id: "demo", label: "02 Demo", short: "02", icon: Bot },
  { id: "experience", label: "03 Experience", short: "03", icon: Briefcase },
  { id: "education", label: "04 Education", short: "04", icon: GraduationCap },
  { id: "certificates", label: "05 Badges", short: "05", icon: Award },
  { id: "contact", label: "07 Contact", short: "07", icon: Mail },
];

export function SideNavRail() {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const offsets = NAV_ITEMS.map((item) => {
        const el = document.getElementById(item.id);
        if (!el) return { id: item.id, top: 0 };
        const rect = el.getBoundingClientRect();
        return { id: item.id, top: Math.abs(rect.top) };
      });

      offsets.sort((a, b) => a.top - b.top);
      if (offsets[0]) {
        setActiveSection(offsets[0].id);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <aside
      aria-label="Section Navigation"
      className="fixed right-4 top-1/2 -translate-y-1/2 z-30 hidden 2xl:flex flex-col gap-2 rounded-sm border border-border-strong bg-card/90 p-2 backdrop-blur-md shadow-xl text-mono"
    >
      <div className="flex items-center justify-center pb-2 border-b border-border/80 text-[10px] text-signal font-semibold">
        <span>NAV</span>
      </div>

      <nav className="flex flex-col gap-1">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`group relative flex items-center gap-2 rounded-sm px-2.5 py-1.5 text-left text-xs transition ${
                isActive
                  ? "bg-surface-2 text-signal font-bold border border-signal/40 shadow-sm"
                  : "text-muted-foreground hover:bg-surface hover:text-foreground border border-transparent"
              }`}
              title={item.label}
            >
              <Icon className={`h-3.5 w-3.5 ${isActive ? "text-signal" : "text-muted-foreground group-hover:text-foreground"}`} />
              <span className="text-[11px] uppercase tracking-wider">{item.short}</span>

              {/* Tooltip on Hover */}
              <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-sm border border-border bg-background/95 px-2 py-1 text-[11px] font-medium text-foreground opacity-0 shadow-lg backdrop-blur transition group-hover:opacity-100">
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
