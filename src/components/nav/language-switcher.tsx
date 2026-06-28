"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";

export function LanguageSwitcher() {
  const t = useTranslations("Nav");
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();

  const nextLocale: Locale = locale === "en" ? "es" : "en";

  const handleSwitch = () => {
    const hash =
      typeof window !== "undefined" ? window.location.hash : "";

    router.replace(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      pathname as any,
      { locale: nextLocale },
    );

    // Restaura el hash después de que la navegación asigne la nueva URL
    if (hash) {
      requestAnimationFrame(() => {
        window.location.hash = hash;
      });
    }
  };

  return (
    <button
      onClick={handleSwitch}
      aria-label={t("toggleLanguage")}
      className="flex h-9 w-12 items-center justify-center rounded font-mono text-xs font-medium text-muted transition-colors hover:text-fg"
    >
      {nextLocale.toUpperCase()}
    </button>
  );
}
