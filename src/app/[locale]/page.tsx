import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { CaseStudies } from "@/components/sections/case-studies";
import { Skills } from "@/components/sections/skills";
import { Experience } from "@/components/sections/experience";
import { Contact } from "@/components/sections/contact";
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

  return (
    <main id="main">
      <Hero locale={loc} />
      <About locale={loc} />
      <CaseStudies locale={loc} />
      <Skills locale={loc} />
      <Experience locale={loc} />
      <Contact locale={loc} />
    </main>
  );
}
