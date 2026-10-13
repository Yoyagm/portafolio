import type { MetadataRoute } from "next";

// Web App Manifest (PWA básica). Colores del tema "security terminal".
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Johan Rodriguez — AI & Security Engineering · final-semester student",
    short_name: "Johan Rodriguez",
    description:
      "AI & Machine Learning (model training and evaluation) · Cybersecurity · Final-semester Systems & Software Engineering student (UPB)",
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
