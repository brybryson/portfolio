import { Link2, Terminal } from "lucide-react";
import { Category, CATEGORY_META, Project } from "@/data/projects";

export function DirectoryExplorer({
  projects,
  active,
  setActive,
  categories = ["ai", "web", "system", "iot"],
}: {
  projects: Project[];
  active: string | null;
  setActive: (s: string) => void;
  categories?: Category[];
}) {
  return (
    <div className="relative flex h-[640px] flex-col overflow-hidden rounded-sm border border-border-strong bg-graph bg-surface/70 shadow-sm">
      <div className="flex shrink-0 items-center justify-between border-b border-border bg-surface-2 px-4 py-2.5 text-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        <div className="flex items-center gap-4">
          <div className="flex gap-1.5 shrink-0">
            <div className="h-2.5 w-2.5 rounded-full bg-[#FF5F56]" />
            <div className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E]" />
            <div className="h-2.5 w-2.5 rounded-full bg-[#27C93F]" />
          </div>
          <div className="flex items-center gap-2">
            <Terminal className="h-3 w-3" />
            <span className="uppercase tracking-widest">EXPLORER // PIPELINE GRAPH</span>
          </div>
        </div>
        <span>{projects.length} NODES</span>
      </div>

      <div
        className="flex-1 overflow-y-auto p-4"
        style={{ scrollbarWidth: "thin", scrollbarColor: "var(--scrollbar-thumb) transparent" }}
      >
        <div className="flex flex-col gap-6">
          {categories.map((c) => {
            const filtered = projects.filter((p) => p.category === c);
            if (filtered.length === 0) return null;
            return (
              <PipelineColumn
                key={c}
                category={c}
                nodes={filtered}
                active={active}
                setActive={setActive}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

function PipelineColumn({
  category,
  nodes,
  active,
  setActive,
}: {
  category: Category;
  nodes: Project[];
  active: string | null;
  setActive: (s: string) => void;
}) {
  const meta = CATEGORY_META[category];
  const Icon = meta.icon;
  return (
    <div className="relative">
      <div
        className="mb-2.5 flex items-center gap-2 text-mono text-[11px] uppercase tracking-widest font-semibold"
        style={{ color: meta.color }}
      >
        <Icon className="h-3.5 w-3.5" />
        <span>{meta.label}</span>
        <span className="text-muted-foreground">· {nodes.length}</span>
      </div>
      <div className="flex flex-col gap-1.5">
        {nodes.map((p) => {
          const isActive = p.slug === active;
          return (
            <button
              key={p.slug}
              onClick={() => setActive(p.slug)}
              className={`group relative flex w-full items-center gap-2.5 rounded-sm border px-2.5 py-2 text-left text-mono text-[11px] transition ${
                isActive
                  ? "border-transparent bg-card text-foreground font-medium"
                  : "border-border bg-background/70 text-muted-foreground hover:border-border-strong hover:text-foreground"
              }`}
              style={
                isActive
                  ? {
                      borderColor: meta.color,
                      boxShadow: `0 4px 14px -8px ${meta.color}`,
                    }
                  : undefined
              }
            >
              {/* status dot */}
              <span className="relative inline-flex h-2.5 w-2.5 shrink-0 items-center justify-center">
                {isActive && (
                  <span
                    className="absolute inline-flex h-2.5 w-2.5 rounded-full ring-pulse"
                    style={{ background: meta.color }}
                  />
                )}
                <span
                  className="relative h-2 w-2 rounded-full"
                  style={{ background: isActive ? meta.color : "var(--border-strong)" }}
                />
              </span>
              <span className="truncate">{p.name}</span>
              {p.series && (
                <span
                  className="ml-auto mr-1 inline-flex shrink-0 items-center gap-1 rounded-full border px-1.5 py-0.5 text-mono text-[8px] uppercase tracking-wider"
                  style={{
                    borderColor: `${meta.color}40`,
                    background: `${meta.color}12`,
                    color: meta.color,
                  }}
                >
                  <Link2 className="h-2 w-2" />
                  {p.series.part}/{p.series.total}
                </span>
              )}
              <span
                className={`${
                  p.series ? "" : "ml-auto"
                } text-[9.5px] uppercase tracking-widest text-muted-foreground shrink-0`}
              >
                {p.date}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
