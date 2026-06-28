import type { Certification, Education, Experience } from "@/content/types";

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

  {
    role: {
      en: "Bilingual Customer Support & Community Manager",
      es: "Soporte al Cliente Bilingüe y Community Manager",
    },
    org: "Negocios en Autopiloto (Hotmart)",
    period: {
      en: "May 2025 – Present",
      es: "May 2025 – Presente",
    },
    location: {
      en: "Remote",
      es: "Remoto",
    },
    bullets: [
      {
        en: "Bilingual (EN/ES) customer support via WhatsApp and Telegram.",
        es: "Soporte al cliente bilingüe (EN/ES) vía WhatsApp y Telegram.",
      },
      {
        en: "Handled 3–5 simultaneous conversations with a <10-minute response commitment.",
        es: "Gestión de 3–5 conversaciones simultáneas con compromiso de respuesta de <10 minutos.",
      },
      {
        en: "Community management and member engagement across digital channels.",
        es: "Gestión de comunidad y engagement de miembros en canales digitales.",
      },
    ],
  },

  {
    role: {
      en: "Assistant & Public Coordinator",
      es: "Asistente y Coordinador Público",
    },
    org: "EM Tournaments and Competitions",
    period: {
      en: "May 2025 – Present",
      es: "May 2025 – Presente",
    },
    location: {
      en: "Bucaramanga, Colombia",
      es: "Bucaramanga, Colombia",
    },
    bullets: [
      {
        en: "First point of contact for participants and attendees at live events.",
        es: "Primer punto de contacto para participantes y asistentes en eventos en vivo.",
      },
      {
        en: "Coordination between participants, organizers and staff to ensure smooth event operations.",
        es: "Coordinación entre participantes, organizadores y staff para garantizar el buen desarrollo de los eventos.",
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

export const certifications: Certification[] = [
  {
    name: {
      en: "EF SET English Certificate — CEFR C2 (Proficient), 80/100",
      es: "Certificado EF SET — CEFR C2 (Competente), 80/100",
    },
    issuer: "EF SET",
    year: "2026",
  },
  {
    name: {
      en: "Responsive Web Design",
      es: "Diseño Web Responsivo",
    },
    issuer: "freeCodeCamp",
    year: "2024",
  },
  {
    name: {
      en: "JavaScript Algorithms and Data Structures",
      es: "Algoritmos y Estructuras de Datos en JavaScript",
    },
    issuer: "freeCodeCamp",
    year: "2025",
  },
];
