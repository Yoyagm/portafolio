/**
 * Feed RSS/Atom por locale (T16, RF8.9).
 * Ruta: /[locale]/feed.xml  →  /en/feed.xml, /es/feed.xml
 * El matcher de proxy.ts excluye paths con extensión, así que esta ruta
 * no pasa por el middleware i18n ni CSP (correcto para un feed XML).
 */
import { getAllPosts } from "@/lib/blog";
import { siteConfig } from "@/lib/site";
import type { Locale } from "@/content/types";

export const dynamic = "force-static";

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function buildRss(locale: Locale, posts: Awaited<ReturnType<typeof getAllPosts>>): string {
  const siteUrl = siteConfig.url;
  const blogUrl = `${siteUrl}/${locale}/blog`;
  const feedUrl = `${siteUrl}/${locale}/feed.xml`;

  const title = locale === "en"
    ? "Johan Rodriguez — Security Writeups"
    : "Johan Rodriguez — Writeups de Seguridad";

  const description = locale === "en"
    ? "Notes on security engineering and the software supply chain."
    : "Notas sobre ingeniería de seguridad y la cadena de suministro de software.";

  const items = posts
    .filter((p) => !p.isTranslationFallback) // solo posts nativos del locale en su feed
    .map(
      (p) => `
    <item>
      <title>${escapeXml(p.title)}</title>
      <link>${escapeXml(`${siteUrl}/${locale}/blog/${p.slug}`)}</link>
      <guid isPermaLink="true">${escapeXml(`${siteUrl}/${locale}/blog/${p.slug}`)}</guid>
      <description>${escapeXml(p.description)}</description>
      <pubDate>${new Date(p.date).toUTCString()}</pubDate>
      ${p.tags.map((t) => `<category>${escapeXml(t)}</category>`).join("\n      ")}
    </item>`,
    )
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(title)}</title>
    <link>${escapeXml(blogUrl)}</link>
    <description>${escapeXml(description)}</description>
    <language>${locale === "es" ? "es-CO" : "en-US"}</language>
    <atom:link href="${escapeXml(feedUrl)}" rel="self" type="application/rss+xml"/>
    ${items}
  </channel>
</rss>`;
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ locale: string }> },
): Promise<Response> {
  const { locale } = await params;
  const loc = (["en", "es"].includes(locale) ? locale : "en") as Locale;

  const posts = await getAllPosts(loc);
  const rss = buildRss(loc, posts);

  return new Response(rss, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
