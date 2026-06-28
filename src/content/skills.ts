import type { SkillGroup } from "@/content/types";

export const skillGroups: SkillGroup[] = [
  {
    id: "security-appsec",
    title: { en: "Security & AppSec", es: "Seguridad y AppSec" },
    skills: [
      {
        name: "Software supply-chain security (slopsquatting detection)",
        evidence: { source: "project" },
      },
      {
        name: "Dependency scanning & pre-install guarding",
        evidence: { source: "project" },
      },
      {
        name: "Endpoint threat detection (port scans, intrusions)",
        evidence: { source: "cv" },
      },
      {
        name: "TOTP 2FA & backup codes",
        evidence: { source: "project" },
      },
      {
        name: "Secure SDLC & CI security gates",
        evidence: { source: "project" },
      },
      {
        name: "Mobile app hardening (biometric lock with lifecycle re-lock)",
        evidence: { source: "project" },
      },
      {
        name: "Argon2id PIN hashing (memory-hard)",
        evidence: { source: "project" },
      },
      {
        name: "OS-backed secure storage",
        evidence: { source: "project" },
      },
      {
        name: "Encryption at rest (SQLCipher)",
        evidence: { source: "project" },
      },
      {
        name: "Row-Level Security (RLS)",
        evidence: { source: "project" },
      },
      {
        name: "Deterministic decimal money engine",
        evidence: { source: "project" },
      },
    ],
  },

  {
    id: "languages",
    title: { en: "Languages", es: "Lenguajes" },
    skills: [
      { name: "Python", evidence: { source: "project" } },
      { name: "JavaScript", evidence: { source: "cv" } },
      { name: "TypeScript", evidence: { source: "project" } },
      { name: "SQL", evidence: { source: "project" } },
      { name: "Dart", evidence: { source: "project" } },
    ],
  },

  {
    id: "backend-data",
    title: { en: "Backend & Data", es: "Backend y Datos" },
    skills: [
      {
        name: {
          en: "Hybrid SQL / NoSQL / in-memory data architecture",
          es: "Arquitectura de datos híbrida SQL / NoSQL / in-memory",
        },
        evidence: { source: "cv" },
      },
      {
        name: "REST APIs",
        evidence: { source: "project" },
      },
      {
        name: "WebSockets",
        evidence: { source: "project" },
      },
      {
        name: "Firebase",
        evidence: { source: "cv" },
      },
      {
        name: {
          en: "AI-based analytics",
          es: "Analítica basada en IA",
        },
        evidence: { source: "cv" },
      },
      {
        name: {
          en: "High-availability system design",
          es: "Diseño de sistemas de alta disponibilidad",
        },
        evidence: { source: "cv" },
      },
    ],
  },

  {
    id: "tooling-devsecops",
    title: { en: "Tooling & DevSecOps", es: "Herramientas y DevSecOps" },
    skills: [
      { name: "Git / GitHub", evidence: { source: "project" } },
      { name: "GitHub Actions / CI", evidence: { source: "project" } },
      { name: "pre-commit", evidence: { source: "project" } },
      { name: "pytest", evidence: { source: "project" } },
      { name: "mypy strict", evidence: { source: "project" } },
      {
        name: {
          en: "Package publishing",
          es: "Publicación de paquetes",
        },
        evidence: { source: "cv" },
      },
      { name: "Vercel", evidence: { source: "project" } },
    ],
  },

  {
    id: "frontend",
    title: { en: "Frontend", es: "Frontend" },
    skills: [
      {
        name: {
          en: "Responsive web (HTML / CSS / JS)",
          es: "Web responsiva (HTML / CSS / JS)",
        },
        evidence: { source: "cv" },
      },
      {
        name: { en: "Flutter UI", es: "Flutter UI" },
        evidence: { source: "project" },
      },
      {
        name: "React / Next.js & Tailwind",
        evidence: { source: "project" },
      },
    ],
  },

  {
    id: "soft",
    title: { en: "Soft Skills", es: "Habilidades Blandas" },
    skills: [
      {
        name: {
          en: "Bilingual EN (C2) / ES (native)",
          es: "Bilingüe EN (C2) / ES (nativo)",
        },
        evidence: { source: "cv" },
      },
      {
        name: {
          en: "Agile / Scrum (Scrum Master)",
          es: "Ágil / Scrum (Scrum Master)",
        },
        evidence: { source: "cv" },
      },
      {
        name: {
          en: "Technical documentation",
          es: "Documentación técnica",
        },
        evidence: { source: "cv" },
      },
      {
        name: {
          en: "Remote / async collaboration",
          es: "Colaboración remota y asíncrona",
        },
        evidence: { source: "cv" },
      },
    ],
  },
];
