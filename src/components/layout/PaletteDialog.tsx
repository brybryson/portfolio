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
  Briefcase,
  Boxes,
  Download,
  Mail,
  Terminal,
  Award,
  Layers,
  Bot,
  GraduationCap,
} from "lucide-react";
import { PROJECTS } from "@/data/projects";

const SECTIONS = [
  { id: "hero", label: "identity // home", hint: "Top of page" },
  { id: "projects", label: "projects & systems", hint: "Pipeline explorer" },
  { id: "demo", label: "interactive demo", hint: "Resume QA agent" },
  { id: "experience", label: "career experience", hint: "Git commit log" },
  { id: "education", label: "education & honors", hint: "Academic credentials" },
  { id: "certificates", label: "certifications & badges", hint: "Verified credentials" },
  { id: "skills", label: "technical toolkit", hint: "Languages & Frameworks" },
  { id: "contact", label: "connect // channels", hint: "Get in touch" },
];

export function PaletteDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
}) {
  const goto = (id: string) => {
    onOpenChange(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.location.href = `/#${id}`;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        withoutOverlay
        className="overflow-hidden p-0 sm:max-w-none bottom-0 top-auto left-0 right-0 translate-x-0 translate-y-0 w-full max-h-[80vh] rounded-t-lg rounded-b-none sm:rounded-t-lg sm:rounded-b-none border-t border-border-strong bg-card/95 backdrop-blur-xl shadow-2xl"
      >
        <Command className="rounded-none bg-transparent">
          <div className="flex items-center border-b border-border px-4 py-2">
            <Terminal className="h-4 w-4 text-signal mr-2" />
            <CommandInput
              placeholder="jump to a section — projects, experience, contact..."
              className="border-none bg-transparent text-mono text-xs text-foreground placeholder:text-muted-foreground focus:ring-0"
            />
          </div>
          <CommandList className="max-h-[360px] p-3 text-mono text-xs">
            <CommandEmpty className="p-4 text-center text-muted-foreground">
              no matches found.
            </CommandEmpty>

            <CommandGroup heading="SECTIONS & MODULES" className="text-[10px] uppercase text-muted-foreground">
              {SECTIONS.map((s) => (
                <CommandItem
                  key={s.id}
                  value={`${s.label} ${s.hint}`}
                  onSelect={() => goto(s.id)}
                  className="flex items-center gap-2 rounded px-2.5 py-2 cursor-pointer hover:bg-surface-2"
                >
                  <Briefcase className="h-3.5 w-3.5 text-signal" />
                  <span className="text-foreground font-medium">{s.label}</span>
                  <span className="ml-auto text-[10.5px] uppercase tracking-widest text-muted-foreground">
                    {s.hint}
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>

            <CommandGroup heading="FLAGSHIP SYSTEMS" className="text-[10px] uppercase text-muted-foreground">
              {PROJECTS.filter((p) => p.tier === "pinned").map((p) => (
                <CommandItem
                  key={p.slug}
                  value={p.name}
                  onSelect={() => goto("projects")}
                  className="flex items-center gap-2 rounded px-2.5 py-2 cursor-pointer hover:bg-surface-2"
                >
                  <ArrowRight className="h-3.5 w-3.5 text-flow" />
                  <span className="truncate">{p.name}</span>
                  <span className="ml-auto text-[10px] uppercase text-muted-foreground shrink-0">
                    {p.date}
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>

            <CommandGroup heading="QUICK ACTIONS" className="text-[10px] uppercase text-muted-foreground">
              <CommandItem
                value="email contact mail message"
                onSelect={() => {
                  onOpenChange(false);
                  window.location.href = "mailto:bryantiversonmelliza03@gmail.com";
                }}
                className="flex items-center gap-2 rounded px-2.5 py-2 cursor-pointer hover:bg-surface-2"
              >
                <Mail className="h-3.5 w-3.5 text-signal" />
                <span>email bryantiversonmelliza03@gmail.com</span>
              </CommandItem>

              <CommandItem
                value="resume cv download"
                onSelect={() => {
                  onOpenChange(false);
                  window.open("/resume.pdf", "_blank");
                }}
                className="flex items-center gap-2 rounded px-2.5 py-2 cursor-pointer hover:bg-surface-2"
              >
                <Download className="h-3.5 w-3.5 text-signal" />
                <span>download curriculum vitae (PDF)</span>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
}
