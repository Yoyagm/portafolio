"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { AppPathnames } from "@/i18n/routing";
import { cn } from "@/lib/cn";

// Solo rutas estáticas (sin params) son válidas como href directo de nav.
export type StaticPathname = Exclude<
  AppPathnames,
  "/blog/[slug]" | "/blog/tag/[tag]"
>;

export type NavLink = {
  href: StaticPathname;
  label: string;
  active: boolean;
};

interface MobileMenuProps {
  links: NavLink[];
}

const PANEL_ID = "mobile-menu-panel";

export function MobileMenu({ links }: MobileMenuProps) {
  const t = useTranslations("Nav");
  const [isOpen, setIsOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const open = () => {
    setIsOpen(true);
    document.body.style.overflow = "hidden";
  };

  const close = () => {
    setIsOpen(false);
    document.body.style.overflow = "";
    toggleRef.current?.focus();
  };

  // Focus trap, Esc y bloqueo de fondo con inert
  useEffect(() => {
    if (!isOpen) return;

    const panel = panelRef.current;
    if (!panel) return;

    const mainEl = document.getElementById("main");
    if (mainEl) mainEl.inert = true;

    const getFocusable = () =>
      Array.from(
        panel.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      );

    getFocusable()[0]?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
        return;
      }
      if (e.key !== "Tab") return;

      const items = getFocusable();
      if (items.length === 0) return;

      const first = items[0];
      const last = items[items.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
      if (mainEl) mainEl.inert = false;
    };
  }, [isOpen]);

  return (
    <>
      {/* Botón toggle (visible solo en móvil, controlado desde Nav) */}
      <button
        ref={toggleRef}
        aria-expanded={isOpen}
        aria-controls={PANEL_ID}
        aria-label={isOpen ? t("closeMenu") : t("openMenu")}
        onClick={isOpen ? close : open}
        className="flex h-9 w-9 items-center justify-center rounded text-muted transition-colors hover:text-fg"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          {isOpen ? (
            <>
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </>
          ) : (
            <>
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </>
          )}
        </svg>
      </button>

      {/* Panel del menú */}
      {isOpen && (
        <div
          id={PANEL_ID}
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label={t("openMenu")}
          className="fixed inset-0 z-50 flex flex-col bg-bg/95 backdrop-blur-sm"
        >
          <div className="flex h-14 shrink-0 items-center justify-end border-b border-border px-6">
            <button
              aria-label={t("closeMenu")}
              onClick={close}
              className="flex h-9 w-9 items-center justify-center rounded text-muted transition-colors hover:text-fg"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          <ul className="flex flex-col px-6 pt-4" role="list">
            {links.map(({ href, label, active }) => (
              <li key={href}>
                <Link
                  href={href}
                  onClick={close}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "block border-b border-border py-4 font-mono text-lg transition-colors",
                    active ? "text-accent" : "text-muted hover:text-fg",
                  )}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
