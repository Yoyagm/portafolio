import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/container";
import { CaseStudies } from "@/components/sections/case-studies";
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
    title: t("projectsTitle"),
    description: t("projectsIntro"),
    alternates: {
      canonical: getPathname({ href: "/projects", locale: locale as Locale }),
      languages: {
        en: getPathname({ href: "/projects", locale: "en" }),
        es: getPathname({ href: "/projects", locale: "es" }),
        "x-default": getPathname({ href: "/projects", locale: "en" }),
      },
    },
  };
}

export default async function ProjectsPage({
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
            {t("projectsTitle")}
          </h1>
          <p className="mt-4 max-w-2xl text-pretty text-lg text-muted">
            {t("projectsIntro")}
          </p>
        </header>
      </Container>
      <CaseStudies locale={loc} hideHeading />
    </main>
  );
}
