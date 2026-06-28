import { cn } from "@/lib/cn";

export function Metric({
  value,
  label,
  note,
  className,
}: {
  /** Número o etiqueta corta (p. ej. "~96%", "2687"). */
  value: string;
  /** Descripción debajo del valor. */
  label: string;
  /** Nota aclaratoria — aparece como tooltip vía title (accesible). */
  note?: string;
  className?: string;
}) {
  const content = (
    <div className={cn("flex flex-col gap-1", className)}>
      <span className="font-mono text-3xl font-bold tabular-nums text-accent">
        {value}
      </span>
      <span className="text-sm text-muted">{label}</span>
    </div>
  );

  if (note) {
    return (
      <abbr title={note} className="no-underline" aria-label={`${value} ${label} — ${note}`}>
        {content}
      </abbr>
    );
  }

  return content;
}
