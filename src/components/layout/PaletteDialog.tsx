import { useNavigate } from "@tanstack/react-router";
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
  Bot,
  Boxes,
  Briefcase,
  Cpu,
  Download,
  GraduationCap,
  Layers,
  Linkedin,
  Mail,
  Award,
  Terminal,
  ArrowRight,
  GitBranch,
} from "lucide-react";
import { PROJECTS } from "@/data/projects";

export function PaletteDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
}) {
  const navigate = useNavigate();

  const handleSelect = (action: () => void) => {
    onOpenChange(false);
    action();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="overflow-hidden p-0 max-w-xl border-border-strong bg-card text-foreground shadow-2xl">
        <Command className="rounded-none bg-transparent">
          <div className="flex items-center border-b border-border px-3">
            <Terminal className="h-4 w-4 text-muted-foreground mr-2" />
            <CommandInput
              placeholder="Jump to page, system, case study, or tool..."
              className="border-none bg-transparent text-sm focus:ring-0"
            />
          </div>
          <CommandList className="max-h-[380px] p-2 text-mono text-xs">
            <CommandEmpty className="p-4 text-center text-muted-foreground">
              No matching commands or projects found.
            </CommandEmpty>

            <CommandGroup heading="PAGES & DIRECTORIES" className="text-[10px] uppercase text-muted-foreground">
              <CommandItem
                onSelect={() =>
                  handleSelect(() => navigate({ to: "/" }))
                }
                className="flex items-center gap-2 rounded px-2 py-1.5 cursor-pointer hover:bg-surface-2"
              >
                <Terminal className="h-3.5 w-3.5 text-signal" />
                <span>Home (Flagship Spotlight & Bio)</span>
                <span className="ml-auto text-[10px] text-muted-foreground">/</span>
              </CommandItem>

              <CommandItem
                onSelect={() =>
                  handleSelect(() => navigate({ to: "/projects" }))
                }
                className="flex items-center gap-2 rounded px-2 py-1.5 cursor-pointer hover:bg-surface-2"
              >
                <Boxes className="h-3.5 w-3.5 text-flow" />
                <span>Projects Hub & Pipeline Explorer</span>
                <span className="ml-auto text-[10px] text-muted-foreground">/projects</span>
              </CommandItem>

              <CommandItem
                onSelect={() =>
                  handleSelect(() => navigate({ to: "/experience" }))
                }
                className="flex items-center gap-2 rounded px-2 py-1.5 cursor-pointer hover:bg-surface-2"
              >
                <Briefcase className="h-3.5 w-3.5 text-signal" />
                <span>Career Experience & Education</span>
                <span className="ml-auto text-[10px] text-muted-foreground">/experience</span>
              </CommandItem>

              <CommandItem
                onSelect={() =>
                  handleSelect(() => navigate({ to: "/certificates" }))
                }
                className="flex items-center gap-2 rounded px-2 py-1.5 cursor-pointer hover:bg-surface-2"
              >
                <Award className="h-3.5 w-3.5 text-[#27C93F]" />
                <span>Certificates & Credentials</span>
                <span className="ml-auto text-[10px] text-muted-foreground">/certificates</span>
              </CommandItem>
            </CommandGroup>

            <CommandGroup heading="FEATURED SYSTEMS & CASE STUDIES" className="text-[10px] uppercase text-muted-foreground">
              {PROJECTS.filter((p) => p.tier === "pinned").map((p) => (
                <CommandItem
                  key={p.slug}
                  onSelect={() =>
                    handleSelect(() =>
                      navigate({
                        to: "/projects/$slug",
                        params: { slug: p.slug },
                      })
                    )
                  }
                  className="flex items-center gap-2 rounded px-2 py-1.5 cursor-pointer hover:bg-surface-2"
                >
                  <ArrowRight className="h-3.5 w-3.5 text-signal" />
                  <span className="truncate">{p.name}</span>
                  <span className="ml-auto rounded border border-border px-1 text-[9px] uppercase text-muted-foreground shrink-0">
                    {p.category}
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>

            <CommandGroup heading="ACTIONS & CONTACT" className="text-[10px] uppercase text-muted-foreground">
              <CommandItem
                onSelect={() =>
                  handleSelect(() => {
                    const el = document.getElementById("contact");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                    else navigate({ to: "/", hash: "contact" });
                  })
                }
                className="flex items-center gap-2 rounded px-2 py-1.5 cursor-pointer hover:bg-surface-2"
              >
                <Mail className="h-3.5 w-3.5 text-signal" />
                <span>Contact Bryant (Email & Socials)</span>
              </CommandItem>

              <CommandItem
                onSelect={() =>
                  handleSelect(() => {
                    window.open("/resume.pdf", "_blank");
                  })
                }
                className="flex items-center gap-2 rounded px-2 py-1.5 cursor-pointer hover:bg-surface-2"
              >
                <Download className="h-3.5 w-3.5 text-signal" />
                <span>Download Resume (PDF)</span>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
}
