import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Hero");

  return (
    <main id="main" className="flex flex-1 flex-col">
      <section className="mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center px-6 py-24">
        <p className="font-mono text-sm uppercase tracking-widest text-accent">
          {t("eyebrow")}
        </p>
        <h1 className="mt-4 max-w-3xl text-balance text-4xl font-bold leading-tight text-fg sm:text-6xl">
          {t("headline")}
        </h1>
        <p className="mt-6 max-w-2xl text-pretty text-lg text-muted">
          {t("subheadline")}
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href="/blog"
            className="rounded-md bg-accent px-5 py-2.5 font-medium text-accent-fg transition-opacity hover:opacity-90"
          >
            {t("ctaWork")}
          </Link>
          <Link
            href="/blog"
            className="rounded-md border border-border px-5 py-2.5 font-medium text-fg transition-colors hover:bg-surface-2"
          >
            {t("ctaContact")}
          </Link>
        </div>
      </section>
    </main>
  );
}
