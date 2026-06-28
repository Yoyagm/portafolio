import { getTranslations } from "next-intl/server";
import { Hero3D } from "@/components/hero/hero-3d";
import type { Locale } from "@/content/types";

export async function Hero({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "Hero" });

  return (
    <section
      id="hero"
      className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden"
    >
      {/* Póster 3D decorativo — otro agente implementa Hero3D */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <Hero3D />
      </div>

      {/* Scrim: garantiza contraste del texto sobre el canvas */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-b from-bg/85 via-bg/70 to-bg"
      />

      {/* Contenido principal — candidato LCP: el h1 */}
      <div className="relative mx-auto w-full max-w-5xl px-6 py-24">
        <p className="font-mono text-sm uppercase tracking-widest text-accent">
          {t("eyebrow")}
        </p>

        {/* h1 es el ÚNICO en la página y el elemento LCP (texto SSR, no canvas) */}
        <h1 className="mt-4 max-w-3xl text-balance text-4xl font-bold leading-tight text-fg sm:text-6xl">
          {t("headline")}
        </h1>

        <p className="mt-6 max-w-2xl text-pretty text-lg text-muted">
          {t("subheadline")}
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href="#work"
            className="rounded-md bg-accent px-5 py-2.5 font-medium text-accent-fg transition-opacity hover:opacity-90 focus-visible:outline-accent"
          >
            {t("ctaWork")}
          </a>
          <a
            href="#contact"
            className="rounded-md border border-border px-5 py-2.5 font-medium text-fg transition-colors hover:bg-surface-2"
          >
            {t("ctaContact")}
          </a>
        </div>
      </div>
    </section>
  );
}
