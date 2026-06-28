import type { MetadataRoute } from "next";

// Web App Manifest (PWA básica). Colores del tema "security terminal".
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Johan Rodriguez — Security & AppSec Engineer",
    short_name: "Johan Rodriguez",
    description:
      "Security & AppSec engineer building supply-chain defense and threat-detection tooling.",
    start_url: "/",
    display: "standalone",
    background_color: "#06090b",
    theme_color: "#06090b",
    icons: [
      { src: "/icon", sizes: "32x32", type: "image/png" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
