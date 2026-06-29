import { getTranslations } from "next-intl/server";
import { Section } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";
import { Metric } from "@/components/ui/metric";
import { Reveal } from "@/components/motion/reveal";
import { caseStudies } from "@/content/case-studies";
import { pick } from "@/content/types";
import type { Locale, FeatureStatus, FeatureCategory } from "@/content/types";

export async function CaseStudies({
  locale,
  hideHeading = false,
}: {
  locale: Locale;
  /** Oculta el eyebrow propio cuando la página ya aporta un h1. */
  hideHeading?: boolean;
}) {
  const t = await getTranslations({ locale, namespace: "Sections" });

  const statusLabel: Record<FeatureStatus, string> = {
    implemented: t("statusImplemented"),
    demo: t("statusDemo"),
    simulated: t("statusSimulated"),
  };

  const categoryLabel: Record<FeatureCategory, string> = {
    security: t("categorySecurity"),
    resilience: t("categoryResilience"),
    ux: t("categoryUx"),
  };

  const sorted = [...caseStudies].sort((a, b) => a.order - b.order);

  return (
    <Section id="work">
      {!hideHeading && (
        <Reveal>
          <h2 className="font-mono text-sm uppercase tracking-widest text-accent">
            {t("workTitle")}
          </h2>
          <p className="mt-2 text-muted">{t("workSubtitle")}</p>
        </Reveal>
      )}

      <div className="mt-16 flex flex-col gap-20">
        {sorted.map((cs) => (
          <article key={cs.slug} className="rounded-xl border border-border bg-surface p-6 sm:p-8">
            <Reveal>
              <header>
                <h3 className="text-2xl font-bold text-fg">{cs.name}</h3>
                <p className="mt-1 text-pretty text-muted">{pick(cs.tagline, locale)}</p>
              </header>
            </Reveal>

            <Reveal delay={0.05}>
              <dl className="mt-4 grid gap-4 text-sm sm:grid-cols-2">
                <div>
                  <dt className="font-mono uppercase tracking-wider text-muted text-xs">{t("role")}</dt>
                  <dd className="mt-1 text-fg">{pick(cs.role, locale)}</dd>
                </div>
                <div>
                  <dt className="font-mono uppercase tracking-wider text-muted text-xs">Context</dt>
                  <dd className="mt-1 text-muted">{pick(cs.context, locale)}</dd>
                </div>
              </dl>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="mt-6">
                <h4 className="font-mono text-xs uppercase tracking-wider text-muted">{t("problem")}</h4>
                <p className="mt-2 text-pretty text-sm text-muted">{pick(cs.problem, locale)}</p>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                <div>
                  <h4 className="font-mono text-xs uppercase tracking-wider text-muted">{t("approach")}</h4>
                  <ul className="mt-2 space-y-1.5 text-sm text-muted" role="list">
                    {cs.approach.map((bullet, i) => (
                      <li key={i} className="flex gap-2">
                        <span aria-hidden="true" className="mt-0.5 shrink-0 text-accent">›</span>
                        {pick(bullet, locale)}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-mono text-xs uppercase tracking-wider text-muted">{t("impact")}</h4>
                  <ul className="mt-2 space-y-1.5 text-sm text-muted" role="list">
                    {cs.impact.map((bullet, i) => (
                      <li key={i} className="flex gap-2">
                        <span aria-hidden="true" className="mt-0.5 shrink-0 text-accent">›</span>
                        {pick(bullet, locale)}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>

            {/* Métricas */}
            <Reveal delay={0.12}>
              <div
                className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6 border-t border-border pt-6"
                role="list"
                aria-label="Metrics"
              >
                {cs.metrics.map((m) => (
                  <div key={m.value} role="listitem">
                    <Metric
                      value={m.value}
                      label={pick(m.label, locale)}
                      note={m.note ? pick(m.note, locale) : undefined}
                    />
                  </div>
                ))}
              </div>
            </Reveal>

            {/* Features */}
            <Reveal delay={0.14}>
              <div className="mt-6 border-t border-border pt-6">
                <ul className="flex flex-col gap-2" role="list">
                  {cs.features.map((feat, i) => (
                    <li key={i} className="flex flex-wrap items-start gap-2 text-sm">
                      <span className="flex-1 text-muted">{pick(feat.text, locale)}</span>
                      <span className="flex shrink-0 gap-1.5">
                        <Badge variant={feat.status}>
                          {statusLabel[feat.status]}
                        </Badge>
                        <Badge variant={feat.category}>
                          {categoryLabel[feat.category]}
                        </Badge>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            {/* Stack */}
            <Reveal delay={0.16}>
              <div className="mt-6 border-t border-border pt-6">
                <h4 className="font-mono text-xs uppercase tracking-wider text-muted">{t("stack")}</h4>
                <ul className="mt-2 flex flex-wrap gap-1.5" role="list" aria-label="Tech stack">
                  {cs.stack.map((tech) => (
                    <li
                      key={tech}
                      className="rounded border border-border bg-surface-2 px-2 py-0.5 font-mono text-xs text-fg"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            {/* Links */}
            {cs.links.length > 0 && (
              <Reveal delay={0.18}>
                <div className="mt-6 flex flex-wrap gap-3">
                  {cs.links.map((link) => (
                    <a
                      key={link.id}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-md border border-border px-4 py-2 text-sm font-medium text-fg transition-colors hover:bg-surface-2"
                    >
                      {link.id === "repo" ? t("viewRepo") : t("viewProject")}
                      <span className="sr-only"> — {cs.name}</span>
                      <span aria-hidden="true">↗</span>
                    </a>
                  ))}
                </div>
              </Reveal>
            )}
          </article>
        ))}
      </div>
    </Section>
  );
}
