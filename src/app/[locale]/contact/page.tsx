import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/container";
import { Contact } from "@/components/sections/contact";
import { getPathname } from "@/i18n/navigation";
import type { Locale } from "@/content/types";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Pages" });
  return {
    title: t("contactTitle"),
    description: t("contactIntro"),
    alternates: {
      canonical: getPathname({ href: "/contact", locale: locale as Locale }),
      languages: {
        en: getPathname({ href: "/contact", locale: "en" }),
        es: getPathname({ href: "/contact", locale: "es" }),
        "x-default": getPathname({ href: "/contact", locale: "en" }),
      },
    },
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Pages" });
  const loc = locale as Locale;

  return (
    <main id="main" tabIndex={-1}>
      <Container className="pt-20 sm:pt-28">
        <header>
          <h1 className="text-4xl font-bold tracking-tight text-fg sm:text-5xl">
            {t("contactTitle")}
          </h1>
          <p className="mt-4 max-w-2xl text-pretty text-lg text-muted">
            {t("contactIntro")}
          </p>
        </header>
      </Container>
      <Contact locale={loc} hideHeading />
    </main>
  );
}
