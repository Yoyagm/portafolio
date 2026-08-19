"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function NotFound() {
  const t = useTranslations("NotFound");

  return (
    <main
      id="main"
      tabIndex={-1}
      className="flex flex-1 flex-col items-center justify-center p-8"
    >
      <div className="max-w-md space-y-4 text-center font-mono">
        <p className="text-surface-2 text-7xl font-bold" aria-hidden="true">
          404
        </p>
        <h1 className="text-fg text-2xl font-bold">{t("title")}</h1>
        <p className="text-muted">{t("description")}</p>
        <Link
          href="/"
          className="border-border text-muted hover:border-accent hover:text-fg mt-2 inline-block rounded border px-4 py-2 text-sm transition-colors"
        >
          {t("back")}
        </Link>
      </div>
    </main>
  );
}
