import type { Metadata } from "next";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { routing } from "@/i18n/routing";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { ThemeScript } from "@/components/theme/theme-script";
import { SkipLink } from "@/components/ui/skip-link";
import { MotionProvider } from "@/components/motion/motion-provider";
import { Nav } from "@/components/nav/nav";
import { RouteAnnouncer } from "@/components/a11y/route-announcer";
import { Footer } from "@/components/layout/footer";
import { siteConfig } from "@/lib/site";
import { profile } from "@/content/profile";
import "../globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jbmono",
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  const title = t("title");
  const description = t("description");
  const ogLocale = locale === "es" ? "es_CO" : "en_US";
  const ogLocaleAlt = locale === "es" ? "en_US" : "es_CO";

  return {
    metadataBase: new URL(siteConfig.url),
    title: { default: title, template: `%s | Johan Rodriguez` },
    description,
    // Hreflang EN/ES + x-default (T19, RF11.1)
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: "/en",
        es: "/es",
        "x-default": "/en",
      },
      types: {
        "application/rss+xml": [{ url: `/${locale}/feed.xml`, title }],
      },
    },
    // OpenGraph
    openGraph: {
      type: "website",
      locale: ogLocale,
      alternateLocale: [ogLocaleAlt],
      url: `${siteConfig.url}/${locale}`,
      siteName: siteConfig.name,
      title,
      description,
      images: [
        {
          url: `/api/og?locale=${locale}`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    // Twitter/X card
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`/api/og?locale=${locale}`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);
  const messages = await getMessages();
  // Nonce de la CSP (lo inyecta proxy.ts). Leer headers() hace el render dinámico
  // (trade-off aceptado en ADR-004 para una CSP estricta sin 'unsafe-inline').
  const nonce = (await headers()).get("x-nonce") ?? undefined;

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${inter.variable} ${jetbrainsMono.variable} h-full`}
    >
      <head>
        <ThemeScript nonce={nonce} />
        {/* JSON-LD Person — nonce requerido por CSP (ADR-004, T19) */}
        <script
          type="application/ld+json"
          nonce={nonce}
          dangerouslySetInnerHTML={{
            // .replace(/</g,…) por robustez ante un eventual cierre de </script>
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: profile.name,
              url: siteConfig.url,
              email: profile.email,
              sameAs: [profile.github],
              jobTitle:
                locale === "es"
                  ? "Ingeniero de Seguridad y AppSec"
                  : "Security & AppSec Engineer",
              // Postura honesta: estudiante avanzado / early-career (RF4.2).
              description:
                locale === "es"
                  ? "Estudiante avanzado de Ingeniería de Sistemas (UPB), early-career, enfocado en seguridad de la cadena de suministro y detección de amenazas."
                  : "Advanced Systems Engineering student (UPB), early-career, focused on software supply-chain security and threat detection.",
              knowsLanguage: ["en", "es"],
              affiliation: {
                "@type": "CollegeOrUniversity",
                name: "Pontificia Universidad Bolivariana",
                address: {
                  "@type": "PostalAddress",
                  addressLocality: "Bucaramanga",
                  addressCountry: "CO",
                },
              },
            }).replace(/</g, "\\u003c"),
          }}
        />
      </head>
      <body className="flex min-h-full flex-col">
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider>
            <SkipLink />
            <MotionProvider>
              <Nav />
              <RouteAnnouncer />
              {children}
              <Footer />
            </MotionProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
