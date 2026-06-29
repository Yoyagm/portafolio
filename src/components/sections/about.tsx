import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";
import { profile } from "@/content/profile";
import { pick } from "@/content/types";
import type { Locale } from "@/content/types";

// ── Íconos SVG inline (Lucide para acciones; Simple Icons para marcas). ───────
// Reemplazan glifos/emoji por SVG accesibles (aria-hidden, currentColor).
const ICON = "size-4 shrink-0";

function MailIcon() {
  return (
    <svg className={ICON} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg className={ICON} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" x2="12" y1="15" y2="3" />
    </svg>
  );
}

function BadgeCheckIcon() {
  return (
    <svg className={ICON} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg className={ICON} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222 0 1.606-.014 2.898-.014 3.293 0 .322.216.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg className={ICON} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

// Clases compartidas de los chips (hover/foco con transición 150–300ms).
const CHIP =
  "inline-flex items-center gap-2 rounded border border-border bg-surface px-3 py-1.5 text-sm text-fg transition-colors duration-200 hover:border-accent/50 hover:bg-surface-2";

export async function About({
  locale,
  hideHeading = false,
}: {
  locale: Locale;
  /** Oculta el eyebrow propio cuando la página ya aporta un h1. */
  hideHeading?: boolean;
}) {
  const t = await getTranslations({ locale, namespace: "Sections" });
  const role = pick(profile.role, locale);
  const stage = pick(profile.stage, locale);
  const bio = pick(profile.bioLong, locale);
  const location = pick(profile.location, locale);

  return (
    <Section id="about">
      {!hideHeading && (
        <Reveal>
          <h2 className="font-mono text-sm uppercase tracking-widest text-accent">
            {t("aboutTitle")}
          </h2>
        </Reveal>
      )}

      <div className="mt-8 grid items-start gap-10 lg:grid-cols-12 lg:gap-12">
        {/* Retrato — col izquierda en desktop, arriba en móvil. */}
        <Reveal className="lg:col-span-4">
          <figure className="relative mx-auto max-w-xs lg:mx-0">
            {/* Corchetes de acento decorativos (marca "security terminal"). */}
            <span
              aria-hidden="true"
              className="absolute -left-2 -top-2 size-6 rounded-tl-lg border-l-2 border-t-2 border-accent/60"
            />
            <span
              aria-hidden="true"
              className="absolute -bottom-2 -right-2 size-6 rounded-br-lg border-b-2 border-r-2 border-accent/60"
            />
            <div className="relative aspect-[4/5] overflow-hidden rounded-xl border border-border bg-surface">
              <Image
                src={profile.photo}
                alt={profile.name}
                fill
                sizes="(min-width: 1024px) 360px, (min-width: 640px) 320px, 100vw"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-3 flex items-center gap-2 font-mono text-xs text-muted">
              <span
                aria-hidden="true"
                className="size-2 shrink-0 rounded-full bg-accent motion-safe:animate-pulse"
              />
              {location}
            </figcaption>
          </figure>
        </Reveal>

        {/* Bio + contacto — col derecha. */}
        <div className="lg:col-span-8">
          <Reveal delay={0.05}>
            <p className="text-2xl font-semibold text-fg sm:text-3xl">{role}</p>
            <p className="mt-1 font-mono text-sm text-muted">{stage}</p>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-6 max-w-3xl text-pretty leading-relaxed text-muted">
              {bio}
            </p>
          </Reveal>

          {/* Chips de contacto */}
          <Reveal delay={0.15}>
            <ul aria-label="Contact links" className="mt-8 flex flex-wrap gap-3">
              <li>
                <a href={`mailto:${profile.email}`} className={CHIP}>
                  <MailIcon />
                  {profile.email}
                </a>
              </li>

              <li>
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={CHIP}
                >
                  <GitHubIcon />
                  GitHub
                </a>
              </li>

              {profile.linkedin && (
                <li>
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={CHIP}
                  >
                    <LinkedInIcon />
                    LinkedIn
                  </a>
                </li>
              )}

              <li>
                <a href={profile.cvHref} download className={CHIP}>
                  <DownloadIcon />
                  CV
                </a>
              </li>

              <li>
                <span className="inline-flex items-center gap-2 rounded border border-accent/30 bg-accent/10 px-3 py-1.5 text-sm text-accent">
                  <BadgeCheckIcon />
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
        </div>
      </div>
    </Section>
  );
}
