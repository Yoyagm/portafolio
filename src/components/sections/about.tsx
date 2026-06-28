import { getTranslations } from "next-intl/server";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";
import { profile } from "@/content/profile";
import { pick } from "@/content/types";
import type { Locale } from "@/content/types";

export async function About({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "Sections" });
  const role = pick(profile.role, locale);
  const stage = pick(profile.stage, locale);
  const bio = pick(profile.bioLong, locale);

  return (
    <Section id="about">
      <Reveal>
        <h2 className="font-mono text-sm uppercase tracking-widest text-accent">
          {t("aboutTitle")}
        </h2>
      </Reveal>

      <Reveal delay={0.05}>
        <p className="mt-3 text-2xl font-semibold text-fg sm:text-3xl">{role}</p>
        <p className="mt-1 font-mono text-sm text-muted">{stage}</p>
      </Reveal>

      <Reveal delay={0.1}>
        <p className="mt-6 max-w-3xl text-pretty leading-relaxed text-muted">{bio}</p>
      </Reveal>

      {/* Chips de contacto */}
      <Reveal delay={0.15}>
        <ul
          aria-label="Contact links"
          className="mt-8 flex flex-wrap gap-3"
        >
          <li>
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 rounded border border-border bg-surface px-3 py-1.5 text-sm text-fg transition-colors hover:bg-surface-2"
            >
              <span aria-hidden="true">✉</span>
              {profile.email}
            </a>
          </li>

          <li>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded border border-border bg-surface px-3 py-1.5 text-sm text-fg transition-colors hover:bg-surface-2"
            >
              <span aria-hidden="true">⌥</span>
              GitHub
            </a>
          </li>

          {profile.linkedin && (
            <li>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded border border-border bg-surface px-3 py-1.5 text-sm text-fg transition-colors hover:bg-surface-2"
              >
                <span aria-hidden="true">in</span>
                LinkedIn
              </a>
            </li>
          )}

          <li>
            <a
              href={profile.cvHref}
              download
              className="inline-flex items-center gap-2 rounded border border-border bg-surface px-3 py-1.5 text-sm text-fg transition-colors hover:bg-surface-2"
            >
              <span aria-hidden="true">↓</span>
              CV
            </a>
          </li>

          <li>
            <span className="inline-flex items-center gap-2 rounded border border-accent/30 bg-accent/10 px-3 py-1.5 text-sm text-accent">
              <span aria-hidden="true">✓</span>
              {profile.english.level}
              {profile.english.score && ` — ${profile.english.score}`}
              {profile.english.verifyUrl && (
                <>
                  {" "}
                  <a
                    href={profile.english.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-2 hover:opacity-80"
                    aria-label="Verify English C2 certificate"
                  >
                    verify
                  </a>
                </>
              )}
            </span>
          </li>
        </ul>
      </Reveal>
    </Section>
  );
}
