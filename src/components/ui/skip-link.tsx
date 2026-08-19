"use client";

import { useTranslations } from "next-intl";

export function SkipLink() {
  const t = useTranslations("Common");
  return (
    <a
      href="#main"
      className="focus:bg-accent focus:text-accent-fg sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:rounded focus:px-4 focus:py-2 focus:font-mono focus:text-sm focus:font-medium"
    >
      {t("skipToContent")}
    </a>
  );
}
