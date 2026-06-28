import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import type { Locale } from "@/content/types";

// En App Router, generateStaticParams recibe los params del padre YA resueltos
// (no es Promise, a diferencia de los props de page/generateMetadata).
export async function generateStaticParams({
  params,
}: {
  params: { locale: string };
}) {
  const posts = await getAllPosts(params.locale as Locale);
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const result = await getPostBySlug(slug, locale as Locale);
  if (!result) return {};
  return {
    title: result.meta.title,
    description: result.meta.description,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Blog");

  const result = await getPostBySlug(slug, locale as Locale);
  if (!result) notFound();

  const { content, meta } = result;

  return (
    <main id="main" className="min-h-screen py-20 sm:py-28">
      <Container className="max-w-3xl">
        {/* Aviso de idioma original (SC 3.1.2, RF8.6-8.7) */}
        {meta.isTranslationFallback && (
          <div
            role="note"
            lang={meta.originalLocale}
            className="mb-8 rounded-lg border border-alert/40 bg-alert/5 px-4 py-3 text-sm text-alert"
          >
            {t("originalLanguageNotice")}
          </div>
        )}

        {/* Cabecera del artículo */}
        <header className="mb-10">
          <div className="mb-4 flex flex-wrap items-center gap-3 text-xs text-muted">
            <time dateTime={meta.date}>
              {t("postedOn", {
                date: new Date(meta.date).toLocaleDateString(
                  locale === "es" ? "es-CO" : "en-US",
                  { year: "numeric", month: "long", day: "numeric" },
                ),
              })}
            </time>
            {meta.readingMinutes && (
              <>
                <span aria-hidden="true">·</span>
                <span>{t("readingTime", { minutes: meta.readingMinutes })}</span>
              </>
            )}
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-fg sm:text-4xl">
            {meta.title}
          </h1>

          <p className="mt-3 text-lg text-muted">{meta.description}</p>

          {meta.tags.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-2">
              {meta.tags.map((tag) => (
                <Link
                  key={tag}
                  href={{ pathname: "/blog/tag/[tag]", params: { tag } }}
                >
                  <Badge variant="resilience" className="text-xs">
                    {tag}
                  </Badge>
                </Link>
              ))}
            </div>
          )}
        </header>

        {/* Contenido MDX */}
        {/* Si es fallback, el contenedor tiene lang del locale original (SC 3.1.2) */}
        <div lang={meta.isTranslationFallback ? meta.originalLocale : undefined}>
          {content}
        </div>

        {/* Navegación de vuelta */}
        <footer className="mt-16 border-t border-border pt-8">
          <Link
            href="/blog"
            className="font-mono text-sm text-muted hover:text-accent transition-colors"
          >
            ← {t("backToBlog")}
          </Link>
        </footer>
      </Container>
    </main>
  );
}
