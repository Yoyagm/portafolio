import type {
  Certification,
  CertificationGroupId,
  Education,
  Experience,
  Localized,
} from "@/content/types";

export const experience: Experience[] = [
  {
    role: {
      en: "Developer / Technical Support",
      es: "Desarrollador / Soporte Técnico",
    },
    org: "Pontificia Universidad Bolivariana (UPB)",
    period: {
      en: "Jan 2026 – Present",
      es: "Ene 2026 – Presente",
    },
    location: {
      en: "Bucaramanga, Colombia",
      es: "Bucaramanga, Colombia",
    },
    bullets: [
      {
        en: "Endpoint threat detection: identification and analysis of port scans and network intrusion attempts.",
        es: "Detección de amenazas en endpoints: identificación y análisis de port scans e intentos de intrusión en red.",
      },
      {
        en: "Automated asset classification system (routers, printers, cameras) with real-time monitoring dashboard and KPIs.",
        es: "Sistema de clasificación automática de activos (routers, impresoras, cámaras) con dashboard de monitoreo en tiempo real y KPIs.",
      },
      {
        en: "Technical support to end users across the institution.",
        es: "Soporte técnico a usuarios finales de la institución.",
      },
    ],
  },

  {
    role: {
      en: "Scrum Master",
      es: "Scrum Master",
    },
    org: "Pontificia Universidad Bolivariana (UPB)",
    period: {
      en: "Jun 2025 – Nov 2025",
      es: "Jun 2025 – Nov 2025",
    },
    location: {
      en: "Bucaramanga, Colombia",
      es: "Bucaramanga, Colombia",
    },
    bullets: [
      {
        en: "Contributed to the design of a high-availability infrastructure targeting ~100k concurrent users with a <500ms latency objective (design target, not a measured outcome).",
        es: "Contribución al diseño de infraestructura de alta disponibilidad orientada a ~100k usuarios concurrentes con objetivo de latencia <500ms (objetivo de diseño, no resultado medido).",
      },
      {
        en: "Collaborated on hybrid SQL / NoSQL / in-memory architecture decisions and AI-based analytics integration.",
        es: "Colaboración en decisiones de arquitectura híbrida SQL / NoSQL / in-memory e integración de analítica basada en IA.",
      },
      {
        en: "Led full Scrum cycle: sprint planning, daily stand-ups, retrospectives and stakeholder demos.",
        es: "Liderazgo del ciclo Scrum completo: planificación de sprints, daily stand-ups, retrospectivas y demos con stakeholders.",
      },
    ],
  },
];

export const education: Education[] = [
  {
    degree: {
      en: "B.S. in Systems & Software Engineering",
      es: "Ingeniería de Sistemas y Software",
    },
    org: "Pontificia Universidad Bolivariana",
    period: {
      en: "Feb 2023 – Present (7th sem.)",
      es: "Feb 2023 – Presente (7º sem.)",
    },
    detail: {
      en: "Advanced coursework in software architecture and systems design.",
      es: "Cursos avanzados de arquitectura de software y diseño de sistemas.",
    },
  },
];

/**
 * Certificaciones verificables. Todas tienen `verifyUrl` público: la lista se
 * mantiene contra el perfil de LinkedIn y cada entrada enlaza a su emisor, no
 * a una captura. Última verificación: 2026-08-19.
 */
export const certifications: Certification[] = [
  // ── Seguridad y cloud ───────────────────────────────────────────────────
  {
    name: {
      en: "Introduction to Cybersecurity",
      es: "Introduction to Cybersecurity",
    },
    issuer: "Cisco Networking Academy",
    year: "2026",
    group: "security-cloud",
    verifyUrl:
      "https://www.credly.com/badges/8f6c32af-a1f3-4bd9-9008-f13946425b1d/public_url",
  },
  {
    name: {
      en: "Protect Sensitive Data with Data Loss Prevention",
      es: "Protect Sensitive Data with Data Loss Prevention",
    },
    issuer: "Google Cloud",
    year: "2026",
    group: "security-cloud",
    verifyUrl:
      "https://www.credly.com/badges/1e70cf63-e8cc-4e57-822a-0f1a048eabaf/public_url",
  },
  {
    name: {
      en: "Secure Lakehouse Data",
      es: "Secure Lakehouse Data",
    },
    issuer: "Google Cloud",
    year: "2026",
    group: "security-cloud",
    verifyUrl:
      "https://www.skills.google/public_profiles/67827b16-32a0-4950-a764-7b2c0880b30f/badges/26689793",
  },
  {
    name: {
      en: "Use APIs to Work with Cloud Storage",
      es: "Use APIs to Work with Cloud Storage",
    },
    issuer: "Google Cloud",
    year: "2026",
    group: "security-cloud",
    verifyUrl:
      "https://www.credly.com/badges/54f34333-a046-4e52-a5c8-90ab5abfda3f/public_url",
  },

  // ── IA y datos ──────────────────────────────────────────────────────────
  {
    name: {
      en: "Google DeepMind: Train A Small Language Model",
      es: "Google DeepMind: Train A Small Language Model",
    },
    issuer: "Google",
    year: "2026",
    group: "ai-data",
    verifyUrl:
      "https://www.skills.google/public_profiles/67827b16-32a0-4950-a764-7b2c0880b30f/badges/26752033",
  },
  {
    name: {
      en: "Orchestrate Multi-agent Workflows with Gemini Enterprise",
      es: "Orchestrate Multi-agent Workflows with Gemini Enterprise",
    },
    issuer: "Google Cloud",
    year: "2026",
    group: "ai-data",
    verifyUrl:
      "https://www.credly.com/badges/054e1230-cb71-4cdb-aa19-b3bff694033b/public_url",
  },
  {
    name: {
      en: "Create Your First Gemini Enterprise Application",
      es: "Create Your First Gemini Enterprise Application",
    },
    issuer: "Google Cloud",
    year: "2026",
    group: "ai-data",
    verifyUrl:
      "https://www.credly.com/badges/d3d5a390-34f6-4d29-b4cd-6d8230b70fd8/public_url",
  },
  {
    name: {
      en: "Build a Smart Cloud Application with Vibe Coding and MCP",
      es: "Build a Smart Cloud Application with Vibe Coding and MCP",
    },
    issuer: "Google Cloud",
    year: "2026",
    group: "ai-data",
    verifyUrl:
      "https://www.credly.com/badges/2d0979c5-5a9f-4ded-96fb-63231c50eeaa/public_url",
  },
  {
    name: {
      en: "Create ML Models with BigQuery ML",
      es: "Create ML Models with BigQuery ML",
    },
    issuer: "Google Cloud",
    year: "2026",
    group: "ai-data",
    verifyUrl:
      "https://www.credly.com/badges/a9bad7f2-13f7-4f4a-a96b-9ebc862ca8c4/public_url",
  },
  {
    name: {
      en: "Hugging Face Agents Course",
      es: "Curso de Agentes de Hugging Face",
    },
    issuer: "Hugging Face",
    year: "2026",
    group: "ai-data",
    verifyUrl:
      "https://huggingface.co/datasets/agents-course/final-certificates/resolve/main/certificates/Yoyagm/2026-08-02.png",
  },
  {
    name: {
      en: "Machine Learning with Python",
      es: "Machine Learning con Python",
    },
    issuer: "freeCodeCamp",
    year: "2026",
    group: "ai-data",
    verifyUrl:
      "https://freecodecamp.org/certification/yoyagm/machine-learning-with-python-v7",
  },
  {
    name: {
      en: "Data Analysis with Python",
      es: "Análisis de Datos con Python",
    },
    issuer: "freeCodeCamp",
    year: "2026",
    group: "ai-data",
    verifyUrl:
      "https://freecodecamp.org/certification/yoyagm/data-analysis-with-python-v7",
  },

  // ── Fundamentos de ingeniería ───────────────────────────────────────────
  {
    name: {
      en: "Scientific Computing with Python",
      es: "Computación Científica con Python",
    },
    issuer: "freeCodeCamp",
    year: "2026",
    group: "engineering",
    verifyUrl:
      "https://freecodecamp.org/certification/yoyagm/scientific-computing-with-python-v7",
  },
  {
    name: {
      en: "Data Visualization",
      es: "Visualización de Datos",
    },
    issuer: "freeCodeCamp",
    year: "2026",
    group: "engineering",
    verifyUrl:
      "https://freecodecamp.org/certification/yoyagm/data-visualization",
  },
  {
    name: {
      en: "JavaScript Algorithms and Data Structures",
      es: "Algoritmos y Estructuras de Datos en JavaScript",
    },
    issuer: "freeCodeCamp",
    year: "2026",
    group: "engineering",
    verifyUrl:
      "https://freecodecamp.org/certification/yoyagm/javascript-algorithms-and-data-structures-v8",
  },

  // ── Idiomas ─────────────────────────────────────────────────────────────
  {
    name: {
      en: "EF SET English Certificate — CEFR C2 (Proficient), 80/100",
      es: "Certificado EF SET de inglés — CEFR C2 (Competente), 80/100",
    },
    issuer: "EF SET",
    year: "2026",
    group: "language",
    verifyUrl: "https://cert.efset.org/es/qpqdd3",
  },
];

/** Orden y títulos de los grupos de certificaciones. */
export const certificationGroups: {
  id: CertificationGroupId;
  title: Localized;
}[] = [
  {
    id: "security-cloud",
    title: { en: "Security & Cloud", es: "Seguridad y Cloud" },
  },
  { id: "ai-data", title: { en: "AI & Data", es: "IA y Datos" } },
  {
    id: "engineering",
    title: { en: "Engineering Fundamentals", es: "Fundamentos de Ingeniería" },
  },
  { id: "language", title: { en: "Languages", es: "Idiomas" } },
];
