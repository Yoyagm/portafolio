import { routing } from "@/i18n/routing";

/**
 * URL base del sitio (sin slash final). Prioridad:
 *   1. NEXT_PUBLIC_SITE_URL — override explícito (p. ej. dominio propio).
 *   2. VERCEL_PROJECT_PRODUCTION_URL — dominio de producción que Vercel inyecta
 *      (sin protocolo) en build y runtime. Sigue automáticamente al dominio
 *      configurado en el proyecto, evitando mantener una URL a mano.
 *   3. localhost para desarrollo.
 * Solo se consume en código de SERVIDOR (metadata, sitemap, robots, OG, feed,
 * JSON-LD); por eso es seguro leer VERCEL_PROJECT_PRODUCTION_URL (no NEXT_PUBLIC_).
 */
function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return explicit.replace(/\/+$/, "");

  const vercelProd = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (vercelProd) return `https://${vercelProd}`;

  return "http://localhost:3000";
}

export const siteConfig = {
  name: "Johan Rodriguez",
  shortName: "Johan Rodriguez",
  url: resolveSiteUrl(),
  defaultLocale: routing.defaultLocale,
  locales: routing.locales,
  email: "johan.rc2020@gmail.com",
  github: "https://github.com/Yoyagm",
  repos: {
    slopguard: "https://github.com/Yoyagm/slopguard",
    goatguard: "https://github.com/Yoyagm/goatguard-app",
  },
} as const;
