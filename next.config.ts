import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

// Cabeceras de seguridad estáticas (RNF3.2). La CSP por-nonce se emite en proxy.ts.
const securityHeaders = [
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains; preload",
  },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
  // Reporting API v1: solo con origen absoluto conocido (se fija en deploy).
  ...(siteUrl
    ? [{ key: "Reporting-Endpoints", value: `csp="${siteUrl}/api/csp-report"` }]
    : []),
];

const nextConfig: NextConfig = {
  // Fija la raíz del workspace (evita inferencia por lockfiles ajenos en el home).
  turbopack: { root: import.meta.dirname },
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
};

export default withNextIntl(nextConfig);
