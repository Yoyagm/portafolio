import { getTranslations } from "next-intl/server";
import { Hero3D } from "@/components/hero/hero-3d";
import { Link } from "@/i18n/navigation";
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
        className="from-bg/85 via-bg/70 to-bg absolute inset-0 -z-10 bg-gradient-to-b"
      />

      {/* Contenido principal — candidato LCP: el h1 */}
      <div className="relative mx-auto w-full max-w-5xl px-6 py-24">
        <p className="text-accent font-mono text-sm tracking-widest uppercase">
          {t("eyebrow")}
        </p>

        {/* h1 es el ÚNICO en la página y el elemento LCP (texto SSR, no canvas) */}
        <h1 className="text-fg mt-4 max-w-3xl text-4xl leading-tight font-bold text-balance sm:text-6xl">
          {t("headline")}
        </h1>

        <p className="text-muted mt-6 max-w-2xl text-lg text-pretty">
          {t("subheadline")}
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href="#work"
            className="bg-accent text-accent-fg focus-visible:outline-accent rounded-md px-5 py-2.5 font-medium transition-opacity hover:opacity-90"
          >
            {t("ctaWork")}
          </a>
          <Link
            href="/contact"
            className="border-border text-fg hover:bg-surface-2 rounded-md border px-5 py-2.5 font-medium transition-colors"
          >
            {t("ctaContact")}
          </Link>
        </div>
      </div>
    </section>
  );
}
