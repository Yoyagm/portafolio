/**
 * Sitemap dinámico (T19, RF11.4).
 * Genera alternates por locale para cada URL (hreflang correcto en sitemap).
 * Incluye posts del blog leídos del filesystem al momento del build.
 */
import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { getAllPosts, getAllTags } from "@/lib/blog";
import type { Locale } from "@/content/types";

const locales: Locale[] = ["en", "es"];
// Fecha de última modificación base (actualizar en cada deploy relevante)
const lastMod = new Date("2026-01-15").toISOString();

function alternates(path: string) {
  return {
    languages: Object.fromEntries(
      locales.map((l) => [l, `${siteConfig.url}/${l}${path}`]),
    ) as Record<string, string>,
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.url;

  // Páginas estáticas
  const staticRoutes: MetadataRoute.Sitemap = [
    // Home
    ...locales.map((l) => ({
      url: `${baseUrl}/${l}`,
      lastModified: lastMod,
      changeFrequency: "monthly" as const,
      priority: 1.0,
      alternates: alternates(""),
    })),
    // Blog index
    ...locales.map((l) => ({
      url: `${baseUrl}/${l}/blog`,
      lastModified: lastMod,
      changeFrequency: "weekly" as const,
      priority: 0.8,
      alternates: alternates("/blog"),
    })),
    // Privacy
    {
      url: `${baseUrl}/en/privacy`,
      lastModified: lastMod,
      changeFrequency: "yearly" as const,
      priority: 0.3,
      alternates: { languages: { en: `${baseUrl}/en/privacy`, es: `${baseUrl}/es/privacidad` } },
    },
  ];

  // Páginas de blog (slugs únicos)
  const enPosts = await getAllPosts("en");
  const nativeSlugs = new Set(enPosts.filter((p) => !p.isTranslationFallback).map((p) => p.slug));
  const allSlugs = [...new Set(enPosts.map((p) => p.slug))];

  const blogRoutes: MetadataRoute.Sitemap = allSlugs.map((slug) => ({
    url: `${baseUrl}/en/blog/${slug}`,
    lastModified: enPosts.find((p) => p.slug === slug)?.date ?? lastMod,
    changeFrequency: "monthly" as const,
    priority: 0.7,
    alternates: {
      languages: nativeSlugs.has(slug)
        ? { en: `${baseUrl}/en/blog/${slug}`, es: `${baseUrl}/es/blog/${slug}` }
        : { en: `${baseUrl}/en/blog/${slug}` },
    },
  }));

  // Páginas de tag: enumeradas POR locale (los tags difieren entre idiomas:
  // p.ej. "security" vs "seguridad"); sin hreflang cruzado a tags inexistentes.
  const tagRoutes: MetadataRoute.Sitemap = [];
  for (const l of locales) {
    const localeTags = await getAllTags(l);
    for (const tag of localeTags) {
      tagRoutes.push({
        url: `${baseUrl}/${l}/blog/tag/${encodeURIComponent(tag)}`,
        lastModified: lastMod,
        changeFrequency: "monthly" as const,
        priority: 0.4,
      });
    }
  }

  return [...staticRoutes, ...blogRoutes, ...tagRoutes];
}
