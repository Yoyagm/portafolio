"use client";

import { useSyncExternalStore } from "react";
import { useTranslations } from "next-intl";
import { useTheme } from "@/components/theme/theme-provider";

const emptySubscribe = () => () => {};

// Patrón hidratación-segura sin efectos: devuelve false en SSR y durante la
// primera hidratación, true ya en cliente. Evita el mismatch del icono
// (server no conoce el tema real) sin disparar set-state-in-effect.
function useHydrated() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
}

export function ThemeToggle() {
  const t = useTranslations("Nav");
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useHydrated();

  // Placeholder sin contenido visible para evitar layout shift antes de hidratar
  if (!mounted) {
    return (
      <button
        aria-label={t("toggleTheme")}
        disabled
        className="flex h-9 w-9 items-center justify-center rounded"
      />
    );
  }

  const isDark = resolvedTheme === "dark";

  const toggle = () => setTheme(isDark ? "light" : "dark");

  return (
    <button
      onClick={toggle}
      aria-label={t("toggleTheme")}
      className="flex h-9 w-9 items-center justify-center rounded text-muted transition-colors hover:text-fg"
    >
      {isDark ? (
        // Icono sol (modo oscuro activo → cambiar a claro)
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
        </svg>
      ) : (
        // Icono luna (modo claro activo → cambiar a oscuro)
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  );
}
