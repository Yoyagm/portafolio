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
      en: "Developer / Technical Support (Volunteer)",
      es: "Desarrollador / Soporte Técnico (Voluntariado)",
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
        en: "Technical support for the institution's end users.",
        es: "Soporte técnico a usuarios finales de la institución.",
      },
      {
        en: "Endpoint threat detection: identifying and analysing port scans and network intrusion attempts.",
        es: "Detección de amenazas en endpoints: identificación y análisis de escaneos de puertos (port scans) e intentos de intrusión en la red.",
      },
      {
        en: "Automatic classification of network assets (routers, printers, cameras) with a real-time monitoring dashboard and KPIs.",
        es: "Clasificación automática de activos de red (routers, impresoras, cámaras) con un panel de monitoreo en tiempo real y KPIs.",
      },
      {
        en: "GOATGuard Android client (Flutter), a team network-monitoring project: real-time dashboard, inventory, severity-filtered alerts, TOTP 2FA and the JWT kept in OS-backed secure storage. Author of 19 of the client repository's 25 commits.",
        es: "Cliente móvil Android de GOATGuard (Flutter), proyecto en equipo de monitoreo de red: panel en tiempo real, inventario, alertas por severidad, 2FA TOTP y token JWT en el almacenamiento seguro del sistema operativo. Autor de 19 de los 25 commits del repositorio del cliente.",
      },
    ],
  },

  {
    role: {
      en: "Scrum Master (academic project)",
      es: "Scrum Master (proyecto académico)",
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
        en: "Ran the full Scrum cycle: sprint planning, daily stand-ups, retrospectives and stakeholder demos.",
        es: "Conduje el ciclo Scrum completo: planificación de sprints, reuniones diarias, retrospectivas y demostraciones con los interesados.",
      },
      {
        en: "Contributed to the design of a high-availability infrastructure sized for about 100,000 concurrent users with a <500 ms latency objective (design targets, not measured outcomes), with hybrid SQL / NoSQL / in-memory data.",
        es: "Participé en el diseño de una infraestructura de alta disponibilidad dimensionada para unos 100.000 usuarios concurrentes con un objetivo de latencia <500 ms (objetivos de diseño, no resultados medidos), con datos híbridos SQL / NoSQL / en memoria.",
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
      en: "Feb 2023 – Present (final semester)",
      es: "Feb 2023 – Presente (último semestre)",
    },
    detail: {
      en: "Advanced coursework in software architecture and systems design.",
      es: "Cursos avanzados de arquitectura de software y diseño de sistemas.",
    },
  },
  {
    degree: {
      en: "Postgraduate Specialisation in Information Security",
      es: "Especialización en Seguridad Informática",
    },
    org: "Pontificia Universidad Bolivariana",
    period: {
      en: "Sep 2026 – Nov 2026 (in progress)",
      es: "Sep 2026 – Nov 2026 (en curso)",
    },
  },
];

/**
 * Certificaciones verificables. Todas tienen `verifyUrl` público: la lista se
 * mantiene contra el perfil de LinkedIn y cada entrada enlaza a su emisor, no
 * a una captura. Última verificación: 2026-10-13.
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
  {
    name: {
      en: "Intro to Machine Learning",
      es: "Introducción al Machine Learning",
    },
    issuer: "Kaggle",
    year: "2026",
    group: "ai-data",
    verifyUrl:
      "https://www.kaggle.com/learn/certification/johanrodriguezyoyagm/intro-to-machine-learning",
  },
  {
    name: {
      en: "Intermediate Machine Learning",
      es: "Machine Learning Intermedio",
    },
    issuer: "Kaggle",
    year: "2026",
    group: "ai-data",
    verifyUrl:
      "https://www.kaggle.com/learn/certification/johanrodriguezyoyagm/intermediate-machine-learning",
  },
  {
    name: {
      en: "Feature Engineering",
      es: "Ingeniería de Características",
    },
    issuer: "Kaggle",
    year: "2026",
    group: "ai-data",
    verifyUrl:
      "https://www.kaggle.com/learn/certification/johanrodriguezyoyagm/feature-engineering",
  },
  {
    name: {
      en: "Intro to Deep Learning",
      es: "Introducción al Deep Learning",
    },
    issuer: "Kaggle",
    year: "2026",
    group: "ai-data",
    verifyUrl:
      "https://www.kaggle.com/learn/certification/johanrodriguezyoyagm/intro-to-deep-learning",
  },
  {
    name: {
      en: "Pandas",
      es: "Pandas",
    },
    issuer: "Kaggle",
    year: "2026",
    group: "ai-data",
    verifyUrl:
      "https://www.kaggle.com/learn/certification/johanrodriguezyoyagm/pandas",
  },
  {
    name: {
      en: "Intro to SQL",
      es: "Introducción a SQL",
    },
    issuer: "Kaggle",
    year: "2026",
    group: "ai-data",
    verifyUrl:
      "https://www.kaggle.com/learn/certification/johanrodriguezyoyagm/intro-to-sql",
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
  {
    name: {
      en: "Intro to Programming",
      es: "Introducción a la Programación",
    },
    issuer: "Kaggle",
    year: "2026",
    group: "engineering",
    verifyUrl:
      "https://www.kaggle.com/learn/certification/johanrodriguezyoyagm/intro-to-programming",
  },

  // ── Idiomas ─────────────────────────────────────────────────────────────
  {
    name: {
      en: "EF SET English Certificate — CEFR C2 (Proficient), 74/100",
      es: "Certificado EF SET de inglés — CEFR C2 (Competente), 74/100",
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
