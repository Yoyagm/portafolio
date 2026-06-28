"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/cn";
import { Container } from "@/components/ui/container";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { LanguageSwitcher } from "@/components/nav/language-switcher";
import { MobileMenu, type AnchorLink } from "@/components/nav/mobile-menu";
import { siteConfig } from "@/lib/site";

const SECTION_IDS = [
  "about",
  "work",
  "skills",
  "experience",
  "contact",
] as const;

type SectionId = (typeof SECTION_IDS)[number];

export function Nav() {
  const t = useTranslations("Nav");
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState<SectionId | null>(null);
  const prefersReduced = useRef(false);

  useEffect(() => {
    prefersReduced.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
  }, []);

  // Scroll-spy con IntersectionObserver
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) setActiveSection(id);
          });
        },
        { rootMargin: "-20% 0px -60% 0px", threshold: 0 },
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [pathname]);

  const handleAnchorClick =
    (id: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
      const el = document.getElementById(id);
      if (!el) return;
      e.preventDefault();
      el.scrollIntoView({
        behavior: prefersReduced.current ? "auto" : "smooth",
      });
      // Mueve foco al encabezado de la sección para SR
      const heading = el.querySelector<HTMLElement>("h2, h3, [tabindex]") ?? el;
      if (!heading.hasAttribute("tabindex")) {
        heading.setAttribute("tabindex", "-1");
      }
      heading.focus({ preventScroll: true });
    };

  const anchorLinks: AnchorLink[] = SECTION_IDS.map((id) => ({
    id,
    label: t(id),
  }));

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg/80 backdrop-blur-sm">
      <Container>
        <nav
          aria-label="Main navigation"
          className="flex h-14 items-center gap-4"
        >
          {/* Logo */}
          <Link
            href="/"
            className="shrink-0 font-mono text-sm font-semibold text-fg transition-colors hover:text-accent"
          >
            {siteConfig.shortName}
          </Link>

          {/* Enlace de ancla: desktop */}
          <ul className="hidden flex-1 items-center gap-1 md:flex" role="list">
            {anchorLinks.map(({ id, label }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  onClick={handleAnchorClick(id)}
                  aria-current={
                    activeSection === id ? ("true" as const) : undefined
                  }
                  className={cn(
                    "rounded px-3 py-1.5 font-mono text-sm transition-colors",
                    activeSection === id
                      ? "text-accent"
                      : "text-muted hover:text-fg",
                  )}
                >
                  {label}
                </a>
              </li>
            ))}
            <li>
              <Link
                href="/blog"
                className="rounded px-3 py-1.5 font-mono text-sm text-muted transition-colors hover:text-fg"
              >
                {t("blog")}
              </Link>
            </li>
          </ul>

          {/* Acciones */}
          <div className="ml-auto flex items-center gap-1">
            <ThemeToggle />
            <LanguageSwitcher />
            {/* Menú móvil: solo <768px */}
            <div className="md:hidden">
              <MobileMenu anchorLinks={anchorLinks} />
            </div>
          </div>
        </nav>
      </Container>
    </header>
  );
}
