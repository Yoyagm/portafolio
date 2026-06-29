import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { headers } from "next/headers";
import { Link, getPathname } from "@/i18n/navigation";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { siteConfig } from "@/lib/site";
import type { Locale } from "@/content/types";

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
  const { meta } = result;
  // canonical/hreflang propios del post (si no, hereda el del home → duplicados).
  const href = { pathname: "/blog/[slug]" as const, params: { slug } };
  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: getPathname({ href, locale: locale as Locale }),
      languages: {
        en: getPathname({ href, locale: "en" }),
        es: getPathname({ href, locale: "es" }),
        "x-default": getPathname({ href, locale: "en" }),
      },
    },
    openGraph: {
      type: "article",
      title: meta.title,
      description: meta.description,
      publishedTime: meta.date,
      tags: meta.tags,
      images: [
        {
          url: `/api/og?locale=${locale}&title=${encodeURIComponent(meta.title)}`,
          width: 1200,
          height: 630,
          alt: meta.title,
        },
      ],
    },
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
  const nonce = (await headers()).get("x-nonce") ?? undefined;

  const result = await getPostBySlug(slug, locale as Locale);
  if (!result) notFound();

  const { content, meta } = result;

  // JSON-LD TechArticle (T19, RF11.2)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: meta.title,
    description: meta.description,
    datePublished: meta.date,
    author: {
      "@type": "Person",
      name: "Johan David Rodriguez Castro",
      url: siteConfig.url,
    },
    url: `${siteConfig.url}/${locale}/blog/${slug}`,
    inLanguage: meta.originalLocale,
    keywords: meta.tags.join(", "),
  };

  return (
    <main id="main" tabIndex={-1} className="min-h-screen py-20 sm:py-28">
      {/* JSON-LD con nonce (ADR-004, CSP) */}
      <script
        type="application/ld+json"
        nonce={nonce}
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

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
