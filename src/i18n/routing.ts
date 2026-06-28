import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "es"],
  defaultLocale: "en",
  // Prefijo de locale siempre presente (mejor SEO: una URL única por idioma).
  localePrefix: "always",
  // Detección por cookie → Accept-Language → defaultLocale (gestionado por el middleware).
  localeDetection: true,
  // Pathnames localizados (RF2). Las rutas dinámicas comparten patrón en ambos locales.
  pathnames: {
    "/": "/",
    "/blog": "/blog",
    "/blog/[slug]": "/blog/[slug]",
    "/blog/tag/[tag]": "/blog/tag/[tag]",
    "/privacy": { en: "/privacy", es: "/privacidad" },
    "/thank-you": { en: "/thank-you", es: "/gracias" },
  },
});

export type Locale = (typeof routing.locales)[number];
export type AppPathnames = keyof typeof routing.pathnames;
