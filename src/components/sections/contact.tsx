import { getTranslations } from "next-intl/server";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";
import { Link } from "@/i18n/navigation";
import { profile } from "@/content/profile";
import { ContactForm } from "@/components/contact/contact-form";
import type { Locale } from "@/content/types";

export async function Contact({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "Contact" });

  return (
    <Section id="contact">
      <Reveal>
        <h2 className="font-mono text-sm uppercase tracking-widest text-accent">
          {t("title")}
        </h2>
        <p className="mt-2 text-muted">{t("subtitle")}</p>
      </Reveal>

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
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-5 py-3 font-medium text-fg transition-colors hover:bg-surface-2"
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
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-5 py-3 font-medium text-fg transition-colors hover:bg-surface-2"
            >
              <span aria-hidden="true">⌥</span>
              GitHub
            </a>
          </li>

          <li>
            <a
              href={profile.cvHref}
              download
              className="inline-flex items-center gap-2 rounded-lg border border-accent/30 bg-accent/10 px-5 py-3 font-medium text-accent transition-colors hover:bg-accent/20"
            >
              <span aria-hidden="true">↓</span>
              {t("downloadCv")}
            </a>
          </li>
        </ul>
      </Reveal>

      <Reveal delay={0.14}>
        <p className="mt-10 text-sm text-muted">
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
