export function SectionLabel({
  index,
  label,
  hint,
}: {
  index: string;
  label: string;
  hint?: string;
}) {
  return (
    <div className="flex items-center justify-between border-b border-border-strong pb-3">
      <div className="flex items-center gap-3">
        <span className="text-mono text-xs text-signal">[{index}]</span>
        <h2 className="text-mono text-xs uppercase tracking-[0.2em] text-foreground font-semibold">
          {label}
        </h2>
      </div>
      {hint && (
        <span className="hidden text-mono text-[10px] text-muted-foreground uppercase tracking-widest sm:inline">
          {hint}
        </span>
      )}
    </div>
  );
}
