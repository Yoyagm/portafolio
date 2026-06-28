"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function NotFound() {
  const t = useTranslations("NotFound");

  return (
    <main
      id="main"
      className="flex flex-1 flex-col items-center justify-center p-8"
    >
      <div className="max-w-md space-y-4 text-center font-mono">
        <p className="text-7xl font-bold text-surface-2" aria-hidden="true">
          404
        </p>
        <h1 className="text-2xl font-bold text-fg">{t("title")}</h1>
        <p className="text-muted">{t("description")}</p>
        <Link
          href="/"
          className="mt-2 inline-block rounded border border-border px-4 py-2 text-sm text-muted transition-colors hover:border-accent hover:text-fg"
        >
          {t("back")}
        </Link>
      </div>
    </main>
  );
}
