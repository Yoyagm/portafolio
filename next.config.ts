import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  // Fija la raíz del workspace (evita inferencia por lockfiles ajenos en el home).
  turbopack: { root: import.meta.dirname },
};

export default withNextIntl(nextConfig);
