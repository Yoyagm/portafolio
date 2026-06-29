import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link, getPathname } from "@/i18n/navigation";
import type { Locale } from "@/content/types";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ThankYou" });
  return {
    title: t("title"),
    // Página destino del PRG: canonical propio y noindex (no aporta a SEO).
    alternates: {
      canonical: getPathname({ href: "/thank-you", locale: locale as Locale }),
    },
    robots: { index: false, follow: true },
  };
}

export default async function ThankYouPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("ThankYou");

  return (
    <main
      id="main"
      tabIndex={-1}
      className="flex flex-1 flex-col items-center justify-center p-8"
    >
      <div className="max-w-md space-y-4 text-center">
        <p className="text-5xl" aria-hidden="true">
          ✓
        </p>
        <h1 className="text-2xl font-bold text-fg">{t("title")}</h1>
        <p className="text-muted">{t("body")}</p>
        <Link
          href="/"
          className="mt-4 inline-block rounded border border-border px-5 py-2.5 font-mono text-sm text-muted transition-colors hover:border-accent hover:text-fg"
        >
          {t("back")}
        </Link>
      </div>
    </main>
  );
}
