import type { FeatureCategory, FeatureStatus } from "@/content/types";
import { cn } from "@/lib/cn";

export type BadgeVariant = FeatureStatus | FeatureCategory;

const variantStyles: Record<BadgeVariant, string> = {
  // Status
  implemented: "bg-accent/10 text-accent border-accent/25",
  demo: "bg-alert/10 text-alert border-alert/25",
  simulated: "bg-surface-2 text-muted border-border",
  // Category
  security: "bg-accent/10 text-accent border-accent/25",
  resilience: "bg-surface-2 text-fg border-border",
  ux: "bg-surface-2 text-muted border-border",
};

const dotStyles: Record<BadgeVariant, string> = {
  implemented: "bg-accent",
  demo: "bg-alert",
  simulated: "bg-muted",
  security: "bg-accent",
  resilience: "bg-muted",
  ux: "bg-muted",
};

export function Badge({
  variant,
  children,
  className,
}: {
  variant: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded border px-2 py-0.5 text-xs font-medium",
        variantStyles[variant],
        className,
      )}
    >
      {/* Dot: refuerzo visual del estado, el texto es la etiqueta accesible */}
      <span
        aria-hidden="true"
        className={cn("size-1.5 shrink-0 rounded-full", dotStyles[variant])}
      />
      {children}
    </span>
  );
}
