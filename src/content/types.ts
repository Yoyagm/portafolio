/**
 * Contrato de contenido del portafolio.
 *
 * Estrategia i18n (RNF6.2): el "chrome" de UI (nav, botones, estados) vive en
 * `messages/{en,es}.json` (next-intl). El contenido editorial rico (perfil, casos
 * de estudio, skills, experiencia) vive como DATOS TIPADOS aquí, con los textos
 * localizados co-ubicados vía `Localized<T>` para mantener EN/ES en sincronía en
 * un solo lugar. Los datos no textuales (enlaces, métricas, fechas, stack) no se
 * traducen.
 */

export type Locale = "en" | "es";

/** Valor con sus dos traducciones co-ubicadas. */
export type Localized<T = string> = Record<Locale, T>;

export function pick<T>(value: Localized<T>, locale: Locale): T {
  return value[locale];
}

export type SocialLink = {
  /** Identificador estable para icono/analytics (no traducible). */
  id: "github" | "linkedin" | "email" | "cv";
  href: string;
  /** Etiqueta accesible. */
  label: string;
};

export type Profile = {
  name: string;
  role: Localized;
  /** Contexto de seniority honesto (RF4.2): early-career / estudiante avanzado. */
  stage: Localized;
  bioShort: Localized;
  bioLong: Localized;
  location: Localized;
  email: string;
  phone?: string;
  github: string;
  /** Opcional: solo se renderiza si está presente (RF4.5). */
  linkedin?: string;
  cvHref: string;
  english: {
    level: "C2";
    /** Puntaje EF SET verificado (RF4.3). */
    score?: string;
    verifyUrl?: string;
  };
};

export type Metric = {
  /** Número/etiqueta corta para mostrar grande (no traducible). */
  value: string;
  label: Localized;
  /** Nota de integridad opcional (p. ej. aclaración de la cifra). */
  note?: Localized;
};

/** Honestidad de cada feature (RF5.7/5.8). */
export type FeatureStatus = "implemented" | "demo" | "simulated";

/** RF5.9: clasifica seguridad vs resiliencia vs UX (evita inflar "seguridad"). */
export type FeatureCategory = "security" | "resilience" | "ux";

export type CaseStudyFeature = {
  text: Localized;
  status: FeatureStatus;
  category: FeatureCategory;
};

export type CaseStudyLink = {
  id: "repo" | "demo" | "docs" | "package";
  href: string;
  label: string;
};

export type MediaAsset = {
  type: "image" | "video";
  src: string;
  alt: Localized;
  width: number;
  height: number;
  /** Para type="video": imagen póster. */
  poster?: string;
};

export type CaseStudy = {
  slug: string;
  name: string;
  featured: boolean;
  /** Orden de aparición (menor primero). */
  order: number;
  tagline: Localized;
  context: Localized;
  problem: Localized;
  /** Bullets de enfoque/acciones. */
  approach: Localized[];
  /** Bullets de impacto. */
  impact: Localized[];
  metrics: Metric[];
  features: CaseStudyFeature[];
  stack: string[];
  links: CaseStudyLink[];
  role: Localized;
  media?: MediaAsset[];
};

/** Origen de la evidencia de una skill (INTERNO, no se renderiza) (RF6.3). */
export type SkillEvidence = { source: "cv" | "project" };

export type Skill = {
  name: Localized | string;
  evidence: SkillEvidence;
};

export type SkillGroupId =
  | "security-appsec"
  | "languages"
  | "backend-data"
  | "tooling-devsecops"
  | "frontend"
  | "soft";

export type SkillGroup = {
  id: SkillGroupId;
  title: Localized;
  skills: Skill[];
};

export type Experience = {
  role: Localized;
  org: string;
  /** Periodo legible (no traducible salvo "Present"/"Presente"). */
  period: Localized;
  location: Localized;
  bullets: Localized[];
};

export type Education = {
  degree: Localized;
  org: string;
  period: Localized;
  detail?: Localized;
};

export type Certification = {
  name: Localized;
  issuer: string;
  year: string;
  verifyUrl?: string;
};

/** Frontmatter tipado de los artículos MDX del blog (RF8.1). */
export type BlogFrontmatter = {
  title: string;
  description: string;
  date: string; // ISO
  tags: string[];
  locale: Locale;
  slug: string;
  readingMinutes?: number;
  draft?: boolean;
};
