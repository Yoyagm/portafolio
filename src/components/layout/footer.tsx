"use client";

import { useTranslations } from "next-intl";
import { siteConfig } from "@/lib/site";
import { trackEvent } from "@/lib/analytics";
import { Container } from "@/components/ui/container";

// Constante fija en módulo: evita recalcular en cada render y es estable en SSR/CSR
const CURRENT_YEAR = new Date().getFullYear();

export function Footer() {
  const t = useTranslations("Footer");

  return (
    <footer className="mt-auto border-t border-border py-8">
      <Container>
        <div className="flex flex-col gap-3 font-mono text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {CURRENT_YEAR} {siteConfig.name}.{" "}
            <span>{t("rights")}</span>
          </p>
          <p className="text-xs">{t("builtWith")}</p>
          <a
            href={siteConfig.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              trackEvent("outbound_click", { destination: "github_profile" })
            }
            className="transition-colors hover:text-fg"
          >
            {t("source")}
          </a>
        </div>
      </Container>
    </footer>
  );
}
