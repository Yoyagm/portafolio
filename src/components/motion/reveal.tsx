"use client";

import { m, useReducedMotion } from "motion/react";

/**
 * Envuelve children con fade + translate-y al entrar en viewport.
 * Respeta prefers-reduced-motion: si el usuario lo tiene activo,
 * renderiza sin animación (sin instanciar m.div animado).
 *
 * Requiere un ancestro <LazyMotion features={...}> (lo monta el layout/nav).
 */
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <m.div
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay, ease: "easeOut" }}
      viewport={{ once: true, margin: "-40px" }}
    >
      {children}
    </m.div>
  );
}
