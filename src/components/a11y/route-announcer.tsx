"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { usePathname } from "@/i18n/navigation";

export function RouteAnnouncer() {
  const t = useTranslations("A11y");
  const pathname = usePathname();
  const regionRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    // No anuncia en el montaje inicial (la página ya está visible)
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    // Pequeño retraso para que Next.js haya actualizado document.title
    const timer = setTimeout(() => {
      const title = document.title;

      if (regionRef.current) {
        // Fuerza re-anuncio vaciando primero el nodo
        regionRef.current.textContent = "";
        requestAnimationFrame(() => {
          if (regionRef.current) {
            regionRef.current.textContent = t("navigatedTo", { title });
          }
        });
      }

      // Mueve foco al h1 del contenido principal para usuarios de teclado/SR
      const main = document.getElementById("main");
      const h1 = main?.querySelector<HTMLElement>("h1");
      if (h1) {
        if (!h1.hasAttribute("tabindex")) {
          h1.setAttribute("tabindex", "-1");
        }
        h1.focus({ preventScroll: false });
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [pathname, t]);

  return (
    <div
      ref={regionRef}
      role="status"
      aria-live="polite"
      aria-atomic="true"
      // Visualmente oculto pero accesible para SR
      className="sr-only"
    />
  );
}
