/**
 * Utilidades de blog — server-side only (usa fs de Node).
 * Compila MDX con next-mdx-remote/rsc; nunca se ejecuta en el cliente.
 */
import fs from "node:fs/promises";
import path from "node:path";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import type { BlogFrontmatter, Locale } from "@/content/types";
import { MdxComponents } from "@/components/mdx/mdx-components";

const BLOG_DIR = path.join(process.cwd(), "content/blog");
const PAGE_SIZE = 6;

export type PostMeta = BlogFrontmatter & {
  /** Verdadero si el post se muestra en un locale diferente al original. */
  isTranslationFallback: boolean;
  /** Locale en el que está escrito realmente el post. */
  originalLocale: Locale;
};

// ── Frontmatter parser ligero (sin gray-matter) ────────────────────────────────

/**
 * Parsea un bloque YAML simple de frontmatter MDX.
 * Soporta string, number, boolean y arrays inline (tag: [a, b, c]).
 */
function parseFrontmatterRaw(source: string): { data: Record<string, unknown>; body: string } {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return { data: {}, body: source };

  const data: Record<string, unknown> = {};
  for (const line of match[1].split("\n")) {
    const colonIdx = line.indexOf(":");
    if (colonIdx === -1) continue;
    const key = line.slice(0, colonIdx).trim();
    const raw = line.slice(colonIdx + 1).trim();

    if (raw.startsWith("[") && raw.endsWith("]")) {
      data[key] = raw
        .slice(1, -1)
        .split(",")
        .map((s) => s.trim().replace(/^['"]|['"]$/g, ""))
        .filter(Boolean);
    } else if (raw === "true") {
      data[key] = true;
    } else if (raw === "false") {
      data[key] = false;
    } else if (raw !== "" && !Number.isNaN(Number(raw))) {
      data[key] = Number(raw);
    } else {
      data[key] = raw.replace(/^['"]|['"]$/g, "");
    }
  }

  return { data, body: match[2] };
}

function estimateReadingMinutes(body: string): number {
  return Math.max(1, Math.ceil(body.trim().split(/\s+/).length / 200));
}

function toPostMeta(data: Record<string, unknown>, body: string, isTranslationFallback: boolean): PostMeta {
  return {
    title: String(data.title ?? ""),
    description: String(data.description ?? ""),
    date: String(data.date ?? ""),
    tags: Array.isArray(data.tags) ? (data.tags as string[]) : [],
    locale: (data.locale as Locale) ?? "en",
    slug: String(data.slug ?? ""),
    readingMinutes: typeof data.readingMinutes === "number" ? data.readingMinutes : estimateReadingMinutes(body),
    draft: data.draft === true,
    isTranslationFallback,
    originalLocale: (data.locale as Locale) ?? "en",
  };
}

// ── Lectura de archivos ────────────────────────────────────────────────────────

async function readPostsFromDir(localeDir: string, isFallback: boolean): Promise<PostMeta[]> {
  let entries: string[];
  try {
    entries = await fs.readdir(localeDir);
  } catch {
    return [];
  }

  const posts: PostMeta[] = [];
  for (const entry of entries) {
    if (!entry.endsWith(".mdx")) continue;
    try {
      const source = await fs.readFile(path.join(localeDir, entry), "utf-8");
      const { data, body } = parseFrontmatterRaw(source);
      const meta = toPostMeta(data, body, isFallback);
      if (!meta.draft) posts.push(meta);
    } catch {
      // Archivo ilegible: se omite
    }
  }
  return posts;
}

// ── API pública ────────────────────────────────────────────────────────────────

/** Devuelve todos los posts para un locale, incluyendo fallbacks del otro locale. */
export async function getAllPosts(locale: Locale): Promise<PostMeta[]> {
  const localeDir = path.join(BLOG_DIR, locale);
  const otherLocale: Locale = locale === "en" ? "es" : "en";
  const otherDir = path.join(BLOG_DIR, otherLocale);

  const [localePosts, otherPosts] = await Promise.all([
    readPostsFromDir(localeDir, false),
    readPostsFromDir(otherDir, true),
  ]);

  const localeSlugs = new Set(localePosts.map((p) => p.slug));
  const fallbacks = otherPosts.filter((p) => !localeSlugs.has(p.slug));

  return [...localePosts, ...fallbacks].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

/** Devuelve los posts de una página (indexados desde 1). */
export function paginatePosts(
  posts: PostMeta[],
  page: number,
): { posts: PostMeta[]; totalPages: number; currentPage: number } {
  const totalPages = Math.max(1, Math.ceil(posts.length / PAGE_SIZE));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const start = (currentPage - 1) * PAGE_SIZE;
  return { posts: posts.slice(start, start + PAGE_SIZE), totalPages, currentPage };
}

/** Devuelve los posts filtrados por tag. */
export async function getPostsByTag(tag: string, locale: Locale): Promise<PostMeta[]> {
  const all = await getAllPosts(locale);
  return all.filter((p) => p.tags.includes(tag));
}

/** Devuelve todos los tags únicos para un locale. */
export async function getAllTags(locale: Locale): Promise<string[]> {
  const all = await getAllPosts(locale);
  return [...new Set(all.flatMap((p) => p.tags))].sort();
}

/** Compila y devuelve el contenido MDX + metadata de un post por slug. */
export async function getPostBySlug(
  slug: string,
  locale: Locale,
): Promise<{ content: React.ReactElement; meta: PostMeta } | null> {
  // Busca en el locale solicitado; si no existe, busca en el otro locale (fallback).
  const localePath = path.join(BLOG_DIR, locale, `${slug}.mdx`);
  const otherLocale: Locale = locale === "en" ? "es" : "en";
  const fallbackPath = path.join(BLOG_DIR, otherLocale, `${slug}.mdx`);

  let source: string;
  let isFallback = false;

  try {
    source = await fs.readFile(localePath, "utf-8");
  } catch {
    try {
      source = await fs.readFile(fallbackPath, "utf-8");
      isFallback = true;
    } catch {
      return null;
    }
  }

  const { data: frontmatterData, body } = parseFrontmatterRaw(source);
  const meta = toPostMeta(frontmatterData, body, isFallback);

  const { content } = await compileMDX<BlogFrontmatter>({
    source,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          rehypeSlug,
          [rehypeAutolinkHeadings, { behavior: "wrap" }],
          [
            rehypePrettyCode,
            {
              theme: {
                dark: "github-dark-dimmed",
                light: "github-light",
              },
              keepBackground: false,
            },
          ],
        ],
      },
    },
    components: MdxComponents,
  });

  return { content, meta };
}

export { PAGE_SIZE };
