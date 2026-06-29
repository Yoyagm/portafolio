import { getTranslations } from "next-intl/server";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";
import { Link } from "@/i18n/navigation";
import { caseStudies } from "@/content/case-studies";
import { pick } from "@/content/types";
import type { Locale } from "@/content/types";

/**
 * Resumen de proyectos para la landing (arquitectura híbrida): cards compactas
 * que enlazan a la página dedicada /projects con los case studies completos.
 */
export async function FeaturedProjects({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "Pages" });

  const featured = [...caseStudies]
    .filter((cs) => cs.featured)
    .sort((a, b) => a.order - b.order);

  return (
    <Section id="work">
      <Reveal>
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="font-mono text-sm uppercase tracking-widest text-accent">
            {t("featuredWork")}
          </h2>
          <Link
            href="/projects"
            className="shrink-0 font-mono text-sm text-muted underline underline-offset-4 transition-colors hover:text-fg"
          >
            {t("viewAllProjects")} →
          </Link>
        </div>
      </Reveal>

      <ul className="mt-8 grid gap-6 sm:grid-cols-2" role="list">
        {featured.map((cs, i) => (
          <li key={cs.slug}>
            <Reveal delay={i * 0.06}>
              <Link
                href="/projects"
                className="group flex h-full flex-col rounded-xl border border-border bg-surface p-6 transition-colors hover:border-accent/40"
              >
                <h3 className="text-xl font-bold text-fg transition-colors group-hover:text-accent">
                  {cs.name}
                </h3>
                <p className="mt-2 flex-1 text-pretty text-sm text-muted">
                  {pick(cs.tagline, locale)}
                </p>
                <ul
                  className="mt-4 flex flex-wrap gap-1.5"
                  role="list"
                  aria-label="Tech stack"
                >
                  {cs.stack.slice(0, 5).map((tech) => (
                    <li
                      key={tech}
                      className="rounded border border-border bg-surface-2 px-2 py-0.5 font-mono text-xs text-fg"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </Link>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
