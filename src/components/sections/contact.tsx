import { getTranslations } from "next-intl/server";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";
import { Link } from "@/i18n/navigation";
import { profile } from "@/content/profile";
import { ContactForm } from "@/components/contact/contact-form";
import { pick } from "@/content/types";
import type { Locale } from "@/content/types";

export async function Contact({
  locale,
  hideHeading = false,
}: {
  locale: Locale;
  /** Oculta el eyebrow propio cuando la página ya aporta un h1. */
  hideHeading?: boolean;
}) {
  const t = await getTranslations({ locale, namespace: "Contact" });

  return (
    <Section id="contact">
      {!hideHeading && (
        <Reveal>
          <h2 className="text-accent font-mono text-sm tracking-widest uppercase">
            {t("title")}
          </h2>
          <p className="text-muted mt-2">{t("subtitle")}</p>
        </Reveal>
      )}

      <Reveal delay={0.06}>
        <ContactForm />
      </Reveal>

      <Reveal delay={0.08}>
        <ul
          className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap"
          role="list"
          aria-label="Contact options"
        >
          <li>
            <a
              href={`mailto:${profile.email}`}
              className="border-border bg-surface text-fg hover:bg-surface-2 inline-flex items-center gap-2 rounded-lg border px-5 py-3 font-medium transition-colors"
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
              className="border-border bg-surface text-fg hover:bg-surface-2 inline-flex items-center gap-2 rounded-lg border px-5 py-3 font-medium transition-colors"
            >
              <span aria-hidden="true">⌥</span>
              GitHub
            </a>
          </li>

          <li>
            <a
              href={pick(profile.cvHref, locale)}
              download
              className="border-accent/30 bg-accent/10 text-accent hover:bg-accent/20 inline-flex items-center gap-2 rounded-lg border px-5 py-3 font-medium transition-colors"
            >
              <span aria-hidden="true">↓</span>
              {t("downloadCv")}
            </a>
          </li>
        </ul>
      </Reveal>

      <Reveal delay={0.14}>
        <p className="text-muted mt-10 text-sm">
          {t("privacyNote")}{" "}
          <Link
            href="/privacy"
            className="text-accent underline underline-offset-2 hover:opacity-80"
          >
            {t("privacyLink")}
          </Link>
          .
        </p>
      </Reveal>
    </Section>
  );
}
