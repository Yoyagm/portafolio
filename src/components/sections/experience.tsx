import { getTranslations } from "next-intl/server";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";
import { experience, education, certifications } from "@/content/experience";
import { pick } from "@/content/types";
import type { Locale } from "@/content/types";

export async function Experience({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "Sections" });

  return (
    <Section id="experience">
      <Reveal>
        <h2 className="font-mono text-sm uppercase tracking-widest text-accent">
          {t("experienceTitle")}
        </h2>
      </Reveal>

      {/* Timeline de experiencia. El Reveal envuelve el <ol> completo (no cada
          <li>) para no romper la relación ol>li requerida por a11y (axe listitem). */}
      <Reveal>
        <ol
          className="mt-10 space-y-10"
          role="list"
          aria-label="Work experience"
        >
          {experience.map((exp, i) => (
            <li key={i} className="relative border-l border-border pl-6">
              {/* Nodo de línea de tiempo */}
              <span
                aria-hidden="true"
                className="absolute -left-1.5 top-1 size-3 rounded-full border border-border bg-accent"
              />
              <div className="flex flex-col gap-0.5">
                <h3 className="font-semibold text-fg">
                  {pick(exp.role, locale)}
                </h3>
                <p className="text-sm text-muted">
                  {exp.org} · {pick(exp.period, locale)} ·{" "}
                  {pick(exp.location, locale)}
                </p>
              </div>
              <ul className="mt-3 space-y-1.5" role="list">
                {exp.bullets.map((bullet, bi) => (
                  <li key={bi} className="flex gap-2 text-sm text-muted">
                    <span aria-hidden="true" className="mt-0.5 shrink-0 text-accent">
                      ›
                    </span>
                    {pick(bullet, locale)}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </Reveal>

      {/* Educación */}
      <Reveal delay={0.1}>
        <div className="mt-16">
          <h2 className="font-mono text-sm uppercase tracking-widest text-accent">
            {t("educationTitle")}
          </h2>
          <ol className="mt-6 space-y-6" role="list">
            {education.map((edu, i) => (
              <li key={i} className="relative border-l border-border pl-6">
                <span
                  aria-hidden="true"
                  className="absolute -left-1.5 top-1 size-3 rounded-full border border-border bg-surface-2"
                />
                <h3 className="font-semibold text-fg">{pick(edu.degree, locale)}</h3>
                <p className="text-sm text-muted">
                  {edu.org} · {pick(edu.period, locale)}
                </p>
                {edu.detail && (
                  <p className="mt-1 text-sm text-muted">{pick(edu.detail, locale)}</p>
                )}
              </li>
            ))}
          </ol>
        </div>
      </Reveal>

      {/* Certificaciones */}
      <Reveal delay={0.15}>
        <div className="mt-12">
          <h2 className="font-mono text-sm uppercase tracking-widest text-accent">
            {t("certificationsTitle")}
          </h2>
          <ul className="mt-6 space-y-4" role="list">
            {certifications.map((cert, i) => (
              <li
                key={i}
                className="flex flex-col gap-0.5 rounded-lg border border-border bg-surface p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="font-medium text-fg">{pick(cert.name, locale)}</p>
                  <p className="text-sm text-muted">{cert.issuer} · {cert.year}</p>
                </div>
                {cert.verifyUrl && (
                  <a
                    href={cert.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 text-sm text-accent underline underline-offset-2 hover:opacity-80"
                    aria-label={`Verify certificate: ${pick(cert.name, locale)}`}
                  >
                    Verify ↗
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </Section>
  );
}
