import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/container";
import { About } from "@/components/sections/about";
import { Skills } from "@/components/sections/skills";
import { Experience } from "@/components/sections/experience";
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
    title: t("aboutTitle"),
    description: t("aboutIntro"),
    alternates: {
      canonical: getPathname({ href: "/about", locale: locale as Locale }),
      languages: {
        en: getPathname({ href: "/about", locale: "en" }),
        es: getPathname({ href: "/about", locale: "es" }),
        "x-default": getPathname({ href: "/about", locale: "en" }),
      },
    },
  };
}

export default async function AboutPage({
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
            {t("aboutTitle")}
          </h1>
          <p className="mt-4 max-w-2xl text-pretty text-lg text-muted">
            {t("aboutIntro")}
          </p>
        </header>
      </Container>
      <About locale={loc} hideHeading />
      <Skills locale={loc} />
      <Experience locale={loc} />
    </main>
  );
}
