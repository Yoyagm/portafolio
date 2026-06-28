"use client";

import { useTranslations } from "next-intl";

export function SkipLink() {
  const t = useTranslations("Common");
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[9999] focus:rounded focus:bg-accent focus:px-4 focus:py-2 focus:font-mono focus:text-sm focus:font-medium focus:text-accent-fg"
    >
      {t("skipToContent")}
    </a>
  );
}
