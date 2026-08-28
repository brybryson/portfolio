import { useNavigate, useRouterState } from "@tanstack/react-router";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  ArrowRight,
  Award,
  Bot,
  Boxes,
  Briefcase,
  Download,
  Home,
  Layers,
  Mail,
  Palette,
  Terminal,
  Zap,
} from "lucide-react";
import { PROJECTS } from "@/data/projects";

const SECTIONS = [
  { id: "hero", label: "00 // Hero Identity", hint: "Top of page", route: "/" },
  { id: "services", label: "01 // Solutions & Offerings", hint: "5 Client Services", route: "/" },
  { id: "skills", label: "02 // Technical Stack", hint: "Languages & Frameworks", route: "/" },
  { id: "flagships", label: "03 // Flagship Showcase", hint: "Lumina Dental & Lumi", route: "/" },
  { id: "contact", label: "04 // CONTACT.EXE", hint: "Get in touch", route: "/" },
];

const PAGES = [
  {
    label: "Projects & Pipelines Hub",
    hint: "20 Shipped Systems",
    route: "/projects",
    icon: Boxes,
  },
  {
    label: "Career Experience & Logs",
    hint: "Internships & Honors",
    route: "/experience",
    icon: Briefcase,
  },
  {
    label: "Certifications & Credentials",
    hint: "Badges & Degrees",
    route: "/certificates",
    icon: Award,
  },
];

export function PaletteDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  onOpenOwley?: () => void;
}) {
  const navigate = useNavigate();
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  const handleSelectSection = (sectionId: string) => {
    onOpenChange(false);
    if (currentPath === "/") {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } else {
      navigate({ to: "/" }).then(() => {
        setTimeout(() => {
          const el = document.getElementById(sectionId);
          el?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 150);
      });
    }
  };

  const handleSelectPage = (to: string) => {
    onOpenChange(false);
    navigate({ to });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        withoutOverlay
        className="overflow-hidden p-0 sm:max-w-none bottom-0 top-auto left-0 right-0 translate-x-0 translate-y-0 w-full max-h-[380px] sm:max-h-[420px] rounded-t-lg rounded-b-none border-t border-border-strong bg-card/95 backdrop-blur-xl shadow-2xl"
      >
        <Command className="rounded-none bg-transparent">
          {/* Header Search Input */}
          <div className="flex items-center border-b border-border px-4 py-2">
            <Terminal className="h-4 w-4 text-signal mr-2" />
            <CommandInput
              placeholder="jump to a section — projects, experience, contact..."
              className="border-none bg-transparent text-mono text-xs text-foreground placeholder:text-muted-foreground focus:ring-0"
            />
          </div>

          <CommandList
            className="max-h-[280px] p-2.5 text-mono text-xs"
            style={{ scrollbarWidth: "thin" }}
          >
            <CommandEmpty className="p-3 text-center text-muted-foreground">
              no matching section found.
            </CommandEmpty>

            {/* SECTIONS & MODULES */}
            <CommandGroup
              heading="SECTIONS & MODULES"
              className="text-[10px] uppercase text-muted-foreground"
            >
              {SECTIONS.map((s) => (
                <CommandItem
                  key={s.id}
                  value={`${s.label} ${s.hint}`}
                  onSelect={() => handleSelectSection(s.id)}
                  className="flex items-center gap-2 rounded px-2.5 py-1.5 cursor-pointer hover:bg-surface-2"
                >
                  <Home className="h-3.5 w-3.5 text-signal" />
                  <span className="text-foreground font-medium">{s.label}</span>
                  <span className="ml-auto text-[10px] uppercase tracking-widest text-muted-foreground">
                    {s.hint}
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>

            {/* DEDICATED ROUTES */}
            <CommandGroup
              heading="DEDICATED PAGES & DIRECTORIES"
              className="text-[10px] uppercase text-muted-foreground"
            >
              {PAGES.map((p) => {
                const Icon = p.icon;
                return (
                  <CommandItem
                    key={p.route}
                    value={`${p.label} ${p.hint}`}
                    onSelect={() => handleSelectPage(p.route)}
                    className="flex items-center gap-2 rounded px-2.5 py-1.5 cursor-pointer hover:bg-surface-2"
                  >
                    <Icon className="h-3.5 w-3.5 text-flow" />
                    <span className="text-foreground font-medium">{p.label}</span>
                    <span className="ml-auto text-[10px] uppercase tracking-widest text-muted-foreground">
                      {p.hint}
                    </span>
                  </CommandItem>
                );
              })}
            </CommandGroup>

            {/* FLAGSHIP DEEP DIVES */}
            <CommandGroup
              heading="FLAGSHIP DEEP DIVES"
              className="text-[10px] uppercase text-muted-foreground"
            >
              {PROJECTS.filter((p) => p.tier === "pinned").map((p) => (
                <CommandItem
                  key={p.slug}
                  value={p.name}
                  onSelect={() => {
                    onOpenChange(false);
                    navigate({ to: "/projects/$slug", params: { slug: p.slug } });
                  }}
                  className="flex items-center gap-2 rounded px-2.5 py-1.5 cursor-pointer hover:bg-surface-2"
                >
                  <ArrowRight className="h-3.5 w-3.5 text-signal" />
                  <span className="truncate">{p.name}</span>
                  <span className="ml-auto text-[10px] uppercase text-muted-foreground shrink-0">
                    {p.date}
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>

            {/* QUICK ACTIONS */}
            <CommandGroup
              heading="QUICK ACTIONS"
              className="text-[10px] uppercase text-muted-foreground"
            >
              <CommandItem
                value="email contact mail message"
                onSelect={() => {
                  onOpenChange(false);
                  window.location.href = "mailto:bryantiversonmelliza03@gmail.com";
                }}
                className="flex items-center gap-2 rounded px-2.5 py-1.5 cursor-pointer hover:bg-surface-2"
              >
                <Mail className="h-3.5 w-3.5 text-signal" />
                <span>email bryantiversonmelliza03@gmail.com</span>
              </CommandItem>

              <CommandItem
                value="resume cv download"
                onSelect={() => {
                  onOpenChange(false);
                  window.open(
                    "https://bryant-melliza.vercel.app/resume/Bryant_Melliza_Resume.pdf",
                    "_blank",
                  );
                }}
                className="flex items-center gap-2 rounded px-2.5 py-1.5 cursor-pointer hover:bg-surface-2"
              >
                <Download className="h-3.5 w-3.5 text-signal" />
                <span>download resume (PDF)</span>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
}
