import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { getAllPosts, paginatePosts } from "@/lib/blog";
import type { Locale } from "@/content/types";

const PAGE_PARAM = "page";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Blog" });
  return {
    title: t("title"),
    description: t("subtitle"),
  };
}

export default async function BlogIndexPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const sp = await searchParams;
  const t = await getTranslations("Blog");

  const loc = locale as Locale;
  const rawPage =
    typeof sp[PAGE_PARAM] === "string" ? parseInt(sp[PAGE_PARAM], 10) : 1;
  const page = Number.isNaN(rawPage) || rawPage < 1 ? 1 : rawPage;

  const allPosts = await getAllPosts(loc);
  const { posts, totalPages, currentPage } = paginatePosts(allPosts, page);

  if (page > totalPages && allPosts.length > 0) notFound();

  return (
    <main id="main" className="min-h-screen py-20 sm:py-28">
      <Container>
        {/* Encabezado */}
        <header className="mb-12">
          <h1 className="text-3xl font-bold tracking-tight text-fg sm:text-4xl">
            {t("title")}
          </h1>
          <p className="mt-3 text-muted">{t("subtitle")}</p>
        </header>

        {/* Lista de posts */}
        {posts.length === 0 ? (
          <p className="text-muted">{t("allPosts")}</p>
        ) : (
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
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          },
                        ),
                      })}
                    </time>
                    {post.readingMinutes && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span>
                          {t("readingTime", {
                            minutes: post.readingMinutes,
                          })}
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
                      {post.tags.map((tag) => (
                        <Link
                          key={tag}
                          href={{
                            pathname: "/blog/tag/[tag]",
                            params: { tag },
                          }}
                        >
                          <Badge variant="resilience" className="text-xs">
                            {tag}
                          </Badge>
                        </Link>
                      ))}
                    </div>
                  )}
                </article>
              </li>
            ))}
          </ul>
        )}

        {/* Paginación */}
        {totalPages > 1 && (
          <nav
            aria-label={t("allPosts")}
            className="mt-12 flex items-center justify-center gap-2"
          >
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <Link
                key={p}
                href={
                  p === 1
                    ? "/blog"
                    : { pathname: "/blog", query: { [PAGE_PARAM]: p } }
                }
                aria-current={p === currentPage ? "page" : undefined}
                className={
                  p === currentPage
                    ? "rounded border border-accent bg-accent/10 px-3 py-1.5 font-mono text-sm text-accent"
                    : "rounded border border-border px-3 py-1.5 font-mono text-sm text-muted hover:text-fg transition-colors"
                }
              >
                {p}
              </Link>
            ))}
          </nav>
        )}
      </Container>
    </main>
  );
}
