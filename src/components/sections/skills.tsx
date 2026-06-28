import { getTranslations } from "next-intl/server";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";
import { skillGroups } from "@/content/skills";
import { pick } from "@/content/types";
import type { Locale } from "@/content/types";

export async function Skills({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "Sections" });

  return (
    <Section id="skills">
      <Reveal>
        <h2 className="font-mono text-sm uppercase tracking-widest text-accent">
          {t("skillsTitle")}
        </h2>
      </Reveal>

      <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group, gi) => (
          <Reveal key={group.id} delay={gi * 0.06}>
            <div className="rounded-lg border border-border bg-surface p-5">
              <h3 className="font-semibold text-fg">{pick(group.title, locale)}</h3>
              <ul className="mt-3 space-y-1.5" role="list">
                {group.skills.map((skill, si) => {
                  const name =
                    typeof skill.name === "string"
                      ? skill.name
                      : pick(skill.name, locale);
                  return (
                    <li
                      key={si}
                      className="flex items-start gap-2 text-sm text-muted"
                    >
                      <span aria-hidden="true" className="mt-0.5 shrink-0 text-accent">
                        ›
                      </span>
                      {name}
                    </li>
                  );
                })}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
