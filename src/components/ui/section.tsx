import { cn } from "@/lib/cn";
import { Container } from "@/components/ui/container";

export function Section({
  id,
  className,
  children,
  contained = true,
}: {
  id?: string;
  className?: string;
  children: React.ReactNode;
  /** Envuelve en Container (ancho máximo). */
  contained?: boolean;
}) {
  // scroll-mt-24 = scroll-margin-top: deja al heading/ancla libre del header
  // sticky (WCAG 2.2 SC 2.4.11).
  return (
    <section id={id} className={cn("scroll-mt-24 py-20 sm:py-28", className)}>
      {contained ? <Container>{children}</Container> : children}
    </section>
  );
}
