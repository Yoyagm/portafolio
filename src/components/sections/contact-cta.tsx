import { getTranslations } from "next-intl/server";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/content/types";

/** Banda de llamada a la acción al final de la landing → /contact. */
export async function ContactCta({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "Pages" });

  return (
    <Section>
      <Reveal>
        <div className="border-border bg-surface rounded-2xl border p-8 text-center sm:p-12">
          <h2 className="text-fg text-2xl font-bold sm:text-3xl">
            {t("contactCtaTitle")}
          </h2>
          <p className="text-muted mx-auto mt-3 max-w-xl text-pretty">
            {t("contactCtaBody")}
          </p>
          <Link
            href="/contact"
            className="bg-accent text-accent-fg mt-6 inline-flex items-center gap-2 rounded-md px-6 py-3 font-medium transition-opacity hover:opacity-90"
          >
            {t("contactCtaButton")} →
          </Link>
        </div>
      </Reveal>
    </Section>
  );
}
