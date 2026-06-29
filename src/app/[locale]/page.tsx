import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { FeaturedProjects } from "@/components/sections/featured-projects";
import { ContactCta } from "@/components/sections/contact-cta";
import type { Locale } from "@/content/types";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  // El layout ([locale]/layout.tsx) valida el locale con hasLocale → notFound()
  // antes de que esta page se ejecute, por tanto el cast es seguro.
  const { locale } = await params;
  setRequestLocale(locale);

  const loc = locale as Locale;

  // Landing híbrida: cuenta la historia y deriva a las páginas dedicadas
  // (/projects, /about, /contact) para el detalle.
  return (
    <main id="main" tabIndex={-1}>
      <Hero locale={loc} />
      <About locale={loc} />
      <FeaturedProjects locale={loc} />
      <ContactCta locale={loc} />
    </main>
  );
}
