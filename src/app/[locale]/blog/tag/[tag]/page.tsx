import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { getAllTags, getPostsByTag } from "@/lib/blog";
import type { Locale } from "@/content/types";

// params del padre ([locale]) ya resueltos en generateStaticParams.
export async function generateStaticParams({
  params,
}: {
  params: { locale: string };
}) {
  const tags = await getAllTags(params.locale as Locale);
  return tags.map((tag) => ({ tag }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; tag: string }>;
}): Promise<Metadata> {
  const { locale, tag } = await params;
  const t = await getTranslations({ locale, namespace: "Blog" });
  return {
    title: `${t("tags")}: ${tag}`,
  };
}

export default async function TagPage({
  params,
}: {
  params: Promise<{ locale: string; tag: string }>;
}) {
  const { locale, tag } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Blog");

  const loc = locale as Locale;
  const posts = await getPostsByTag(tag, loc);

  if (posts.length === 0) notFound();

  return (
    <main id="main" className="min-h-screen py-20 sm:py-28">
      <Container>
        {/* Encabezado */}
        <header className="mb-12">
          <p className="mb-2 font-mono text-sm text-muted">{t("tags")}</p>
          <h1 className="text-3xl font-bold tracking-tight text-fg sm:text-4xl">
            {tag}
          </h1>
        </header>

        {/* Lista de posts */}
        <ul className="space-y-8" role="list">
          {posts.map((post) => (
            <li
              key={post.slug}
              className="rounded-lg border border-border bg-surface p-6 transition-colors hover:border-accent/40"
            >
              <article>
                <div className="mb-2 flex flex-wrap items-center gap-2 text-xs text-muted">
                  <time dateTime={post.date}>
                    {t("postedOn", {
                      date: new Date(post.date).toLocaleDateString(
                        locale === "es" ? "es-CO" : "en-US",
                        { year: "numeric", month: "long", day: "numeric" },
                      ),
                    })}
                  </time>
                  {post.readingMinutes && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span>
                        {t("readingTime", { minutes: post.readingMinutes })}
                      </span>
                    </>
                  )}
                </div>

                <h2 className="text-xl font-semibold text-fg">
                  <Link
                    href={{
                      pathname: "/blog/[slug]",
                      params: { slug: post.slug },
                    }}
                    className="hover:text-accent transition-colors"
                  >
                    {post.title}
                  </Link>
                </h2>

                <p className="mt-2 text-sm text-muted line-clamp-2">
                  {post.description}
                </p>

                {post.tags.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {post.tags.map((postTag) => (
                      <Link
                        key={postTag}
                        href={{
                          pathname: "/blog/tag/[tag]",
                          params: { tag: postTag },
                        }}
                      >
                        <Badge
                          variant={postTag === tag ? "security" : "resilience"}
                          className="text-xs"
                        >
                          {postTag}
                        </Badge>
                      </Link>
                    ))}
                  </div>
                )}
              </article>
            </li>
          ))}
        </ul>

        {/* Volver al blog */}
        <div className="mt-12">
          <Link
            href="/blog"
            className="font-mono text-sm text-muted hover:text-accent transition-colors"
          >
            ← {t("backToBlog")}
          </Link>
        </div>
      </Container>
    </main>
  );
}
