"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/cn";
import { Container } from "@/components/ui/container";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { LanguageSwitcher } from "@/components/nav/language-switcher";
import {
  MobileMenu,
  type NavLink,
  type StaticPathname,
} from "@/components/nav/mobile-menu";
import { siteConfig } from "@/lib/site";

// Enlaces de navegación por RUTA (arquitectura multi-página/híbrida).
const NAV_LINKS: { href: StaticPathname; key: string }[] = [
  { href: "/", key: "home" },
  { href: "/projects", key: "projects" },
  { href: "/about", key: "about" },
  { href: "/blog", key: "blog" },
  { href: "/contact", key: "contact" },
];

export function Nav() {
  const t = useTranslations("Nav");
  const pathname = usePathname();

  // Activo: home solo en "/"; el resto con startsWith para cubrir subrutas
  // (p. ej. /blog activo en /blog/[slug]).
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const links: NavLink[] = NAV_LINKS.map(({ href, key }) => ({
    href,
    label: t(key),
    active: isActive(href),
  }));

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg/80 backdrop-blur-sm">
      <Container>
        <nav
          aria-label="Main navigation"
          className="flex h-14 items-center gap-4"
        >
          {/* Logo → inicio */}
          <Link
            href="/"
            className="shrink-0 font-mono text-sm font-semibold text-fg transition-colors hover:text-accent"
          >
            {siteConfig.shortName}
          </Link>

          {/* Enlaces de ruta: desktop */}
          <ul className="hidden flex-1 items-center gap-1 md:flex" role="list">
            {links.map(({ href, label, active }) => (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "rounded px-3 py-1.5 font-mono text-sm transition-colors",
                    active ? "text-accent" : "text-muted hover:text-fg",
                  )}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Acciones */}
          <div className="ml-auto flex items-center gap-1">
            <ThemeToggle />
            <LanguageSwitcher />
            <div className="md:hidden">
              <MobileMenu links={links} />
            </div>
          </div>
        </nav>
      </Container>
    </header>
  );
}
