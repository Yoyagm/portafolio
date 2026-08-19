import { getTranslations } from "next-intl/server";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";
import {
  experience,
  education,
  certifications,
  certificationGroups,
} from "@/content/experience";
import { pick } from "@/content/types";
import type { Locale } from "@/content/types";

export async function Experience({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "Sections" });

  return (
    <Section id="experience">
      <Reveal>
        <h2 className="text-accent font-mono text-sm tracking-widest uppercase">
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
            <li key={i} className="border-border relative border-l pl-6">
              {/* Nodo de línea de tiempo */}
              <span
                aria-hidden="true"
                className="border-border bg-accent absolute top-1 -left-1.5 size-3 rounded-full border"
              />
              <div className="flex flex-col gap-0.5">
                <h3 className="text-fg font-semibold">
                  {pick(exp.role, locale)}
                </h3>
                <p className="text-muted text-sm">
                  {exp.org} · {pick(exp.period, locale)} ·{" "}
                  {pick(exp.location, locale)}
                </p>
              </div>
              <ul className="mt-3 space-y-1.5" role="list">
                {exp.bullets.map((bullet, bi) => (
                  <li key={bi} className="text-muted flex gap-2 text-sm">
                    <span
                      aria-hidden="true"
                      className="text-accent mt-0.5 shrink-0"
                    >
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
          <h2 className="text-accent font-mono text-sm tracking-widest uppercase">
            {t("educationTitle")}
          </h2>
          <ol className="mt-6 space-y-6" role="list">
            {education.map((edu, i) => (
              <li key={i} className="border-border relative border-l pl-6">
                <span
                  aria-hidden="true"
                  className="border-border bg-surface-2 absolute top-1 -left-1.5 size-3 rounded-full border"
                />
                <h3 className="text-fg font-semibold">
                  {pick(edu.degree, locale)}
                </h3>
                <p className="text-muted text-sm">
                  {edu.org} · {pick(edu.period, locale)}
                </p>
                {edu.detail && (
                  <p className="text-muted mt-1 text-sm">
                    {pick(edu.detail, locale)}
                  </p>
                )}
              </li>
            ))}
          </ol>
        </div>
      </Reveal>

      {/* Certificaciones */}
      <Reveal delay={0.15}>
        <div className="mt-12">
          <h2 className="text-accent font-mono text-sm tracking-widest uppercase">
            {t("certificationsTitle")}
          </h2>
          <p className="text-muted mt-2 text-sm">{t("certificationsNote")}</p>

          {/* Agrupadas por área: 16 entradas planas esconden que cubren
              seguridad, IA/datos, fundamentos e idioma. */}
          <div className="mt-8 space-y-8">
            {certificationGroups.map((group) => {
              const items = certifications.filter((c) => c.group === group.id);
              if (items.length === 0) return null;

              return (
                <div key={group.id}>
                  <h3 className="text-muted font-mono text-xs tracking-wider uppercase">
                    {pick(group.title, locale)}
                  </h3>
                  <ul className="mt-3 space-y-3" role="list">
                    {items.map((cert, i) => (
                      <li
                        key={i}
                        className="border-border bg-surface flex flex-col gap-0.5 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between"
                      >
                        <div>
                          <p className="text-fg font-medium">
                            {pick(cert.name, locale)}
                          </p>
                          <p className="text-muted text-sm">
                            {cert.issuer} · {cert.year}
                          </p>
                        </div>
                        {cert.verifyUrl && (
                          <a
                            href={cert.verifyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-accent shrink-0 text-sm underline underline-offset-2 hover:opacity-80"
                            aria-label={`${t("verify")}: ${pick(cert.name, locale)}`}
                          >
                            {t("verify")} ↗
                          </a>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
