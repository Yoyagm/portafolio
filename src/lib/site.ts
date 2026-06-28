import { routing } from "@/i18n/routing";

export const siteConfig = {
  name: "Johan Rodriguez",
  shortName: "Johan Rodriguez",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://portafolio.vercel.app",
  defaultLocale: routing.defaultLocale,
  locales: routing.locales,
  email: "johan.rc2020@gmail.com",
  github: "https://github.com/Yoyagm",
  repos: {
    slopguard: "https://github.com/Yoyagm/slopguard",
    goatguard: "https://github.com/Yoyagm/goatguard-app",
  },
} as const;
