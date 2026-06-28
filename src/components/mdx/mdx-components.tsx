/**
 * Componentes RSC para el renderizado de MDX (T14, ADR-008).
 * Sin hooks ni directivas "use client" — compatibles con Server Components.
 * No usar dangerouslySetInnerHTML; todo el escape lo gestiona compileMDX.
 */
import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

// Utilidades de clase por tipo de elemento
const prose = {
  h1: "mt-10 mb-4 text-3xl font-bold tracking-tight text-fg",
  h2: "mt-10 mb-3 text-2xl font-bold tracking-tight text-fg scroll-mt-24 border-b border-border pb-2",
  h3: "mt-8 mb-3 text-xl font-semibold text-fg scroll-mt-24",
  h4: "mt-6 mb-2 text-lg font-semibold text-fg scroll-mt-24",
  p: "my-4 leading-7 text-fg",
  ul: "my-4 ml-6 list-disc space-y-2 text-fg",
  ol: "my-4 ml-6 list-decimal space-y-2 text-fg",
  li: "leading-7",
  blockquote: "my-6 border-l-4 border-accent pl-4 italic text-muted",
  hr: "my-8 border-border",
  a: "text-accent underline underline-offset-2 hover:text-accent/80 transition-colors",
  inlineCode:
    "rounded bg-surface-2 px-1.5 py-0.5 font-mono text-sm text-fg",
  pre: "my-6 overflow-x-auto rounded-lg border border-border bg-surface p-4",
  table: "my-6 w-full border-collapse text-sm",
  th: "border border-border bg-surface-2 px-4 py-2 text-left font-semibold text-fg",
  td: "border border-border px-4 py-2 text-fg",
};

export const MdxComponents = {
  h1: ({ className, ...props }: ComponentPropsWithoutRef<"h1">) => (
    <h1 className={cn(prose.h1, className)} {...props} />
  ),
  h2: ({ className, ...props }: ComponentPropsWithoutRef<"h2">) => (
    <h2 className={cn(prose.h2, className)} {...props} />
  ),
  h3: ({ className, ...props }: ComponentPropsWithoutRef<"h3">) => (
    <h3 className={cn(prose.h3, className)} {...props} />
  ),
  h4: ({ className, ...props }: ComponentPropsWithoutRef<"h4">) => (
    <h4 className={cn(prose.h4, className)} {...props} />
  ),
  p: ({ className, ...props }: ComponentPropsWithoutRef<"p">) => (
    <p className={cn(prose.p, className)} {...props} />
  ),
  ul: ({ className, ...props }: ComponentPropsWithoutRef<"ul">) => (
    <ul className={cn(prose.ul, className)} {...props} />
  ),
  ol: ({ className, ...props }: ComponentPropsWithoutRef<"ol">) => (
    <ol className={cn(prose.ol, className)} {...props} />
  ),
  li: ({ className, ...props }: ComponentPropsWithoutRef<"li">) => (
    <li className={cn(prose.li, className)} {...props} />
  ),
  blockquote: ({ className, ...props }: ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote className={cn(prose.blockquote, className)} {...props} />
  ),
  hr: ({ className, ...props }: ComponentPropsWithoutRef<"hr">) => (
    <hr className={cn(prose.hr, className)} {...props} />
  ),
  a: ({ className, href, ...props }: ComponentPropsWithoutRef<"a">) => {
    const isExternal = href?.startsWith("http");
    return (
      <a
        href={href}
        className={cn(prose.a, className)}
        {...(isExternal
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
        {...props}
      />
    );
  },
  code: ({ className, ...props }: ComponentPropsWithoutRef<"code">) => {
    // rehype-pretty-code envuelve bloques en <figure data-rehype-pretty-code-figure>
    // y pone className="language-*" en el <code> dentro de <pre>.
    // Este componente cubre solo el inline code (sin className de lenguaje).
    const isBlock = className?.startsWith("language-");
    if (isBlock) return <code className={className} {...props} />;
    return <code className={cn(prose.inlineCode, className)} {...props} />;
  },
  pre: ({ className, ...props }: ComponentPropsWithoutRef<"pre">) => (
    <pre className={cn(prose.pre, className)} {...props} />
  ),
  table: ({ className, ...props }: ComponentPropsWithoutRef<"table">) => (
    <div className="my-6 overflow-x-auto">
      <table className={cn(prose.table, className)} {...props} />
    </div>
  ),
  th: ({ className, ...props }: ComponentPropsWithoutRef<"th">) => (
    <th className={cn(prose.th, className)} {...props} />
  ),
  td: ({ className, ...props }: ComponentPropsWithoutRef<"td">) => (
    <td className={cn(prose.td, className)} {...props} />
  ),
  strong: ({ className, ...props }: ComponentPropsWithoutRef<"strong">) => (
    <strong className={cn("font-semibold text-fg", className)} {...props} />
  ),
  em: ({ className, ...props }: ComponentPropsWithoutRef<"em">) => (
    <em className={cn("italic", className)} {...props} />
  ),
};
