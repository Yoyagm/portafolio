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
    <footer className="border-border mt-auto border-t py-8">
      <Container>
        <div className="text-muted flex flex-col gap-3 font-mono text-sm sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {CURRENT_YEAR} {siteConfig.name}. <span>{t("rights")}</span>
          </p>
          <p className="text-xs">{t("builtWith")}</p>
          <a
            href={siteConfig.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              trackEvent("outbound_click", { destination: "github_profile" })
            }
            className="hover:text-fg transition-colors"
          >
            {t("source")}
          </a>
        </div>
      </Container>
    </footer>
  );
}
