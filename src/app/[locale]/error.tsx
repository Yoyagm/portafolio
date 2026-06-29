"use client";

import { useTranslations } from "next-intl";

interface ErrorBoundaryProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorBoundary({ reset }: ErrorBoundaryProps) {
  const t = useTranslations("Error");

  return (
    <main
      id="main"
      tabIndex={-1}
      className="flex flex-1 flex-col items-center justify-center p-8"
    >
      <div className="max-w-md space-y-4 font-mono">
        <p className="text-sm uppercase tracking-widest text-alert">error</p>
        <h1 className="text-2xl font-bold text-fg">{t("title")}</h1>
        <p className="text-muted">{t("description")}</p>
        <button
          onClick={reset}
          className="mt-2 rounded border border-border px-4 py-2 text-sm text-muted transition-colors hover:border-accent hover:text-fg"
        >
          {t("retry")}
        </button>
      </div>
    </main>
  );
}
