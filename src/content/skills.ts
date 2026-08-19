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
        name: "Detection engineering (detection-as-code, MITRE ATT&CK T1566)",
        evidence: { source: "project" },
      },
      {
        name: "Risk-based vulnerability prioritisation (CISA KEV · EPSS · CVSS)",
        evidence: { source: "project" },
      },
      {
        name: "Phishing analysis & URL/host triage",
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
    ],
  },

  {
    id: "ml-ai",
    title: { en: "Applied ML & AI", es: "ML Aplicado e IA" },
    skills: [
      {
        name: "Gradient boosting (LightGBM, XGBoost) & ensembles",
        evidence: { source: "project" },
      },
      {
        name: {
          en: "Data-leakage detection & honest evaluation design",
          es: "Detección de fugas de datos y diseño de evaluaciones honestas",
        },
        evidence: { source: "project" },
      },
      {
        name: {
          en: "Model explainability (TreeSHAP), reimplemented and parity-tested",
          es: "Explicabilidad de modelos (TreeSHAP), reimplementado y verificado por paridad",
        },
        evidence: { source: "project" },
      },
      {
        name: {
          en: "Grouped, temporal and walk-forward validation; probability calibration",
          es: "Validación agrupada, temporal y walk-forward; calibración de probabilidades",
        },
        evidence: { source: "project" },
      },
      {
        name: {
          en: "Statistical evaluation with bootstrap confidence intervals",
          es: "Evaluación estadística con intervalos de confianza por bootstrap",
        },
        evidence: { source: "project" },
      },
      {
        name: "Transformer NLP for sentiment (FinBERT)",
        evidence: { source: "project" },
      },
      {
        name: "Multi-agent orchestration (CrewAI) & LLM API integration",
        evidence: { source: "project" },
      },
      {
        name: "RAG over document corpora (ChromaDB, embeddings)",
        evidence: { source: "project" },
      },
      {
        name: "Model-as-a-service (FastAPI + Docker)",
        evidence: { source: "project" },
      },
    ],
  },

  {
    id: "languages",
    title: { en: "Languages", es: "Lenguajes" },
    skills: [
      { name: "Python", evidence: { source: "project" } },
      { name: "TypeScript / JavaScript", evidence: { source: "project" } },
      { name: "SQL", evidence: { source: "project" } },
      { name: "Dart", evidence: { source: "project" } },
      { name: "HCL (Terraform)", evidence: { source: "project" } },
      { name: "LaTeX", evidence: { source: "project" } },
    ],
  },

  {
    id: "backend-data",
    title: { en: "Backend & Data", es: "Backend y Datos" },
    skills: [
      {
        name: "FastAPI · REST APIs",
        evidence: { source: "project" },
      },
      {
        name: "WebSockets & event-driven architecture (asyncio)",
        evidence: { source: "project" },
      },
      {
        name: "pandas / NumPy data pipelines",
        evidence: { source: "project" },
      },
      {
        name: "PostgreSQL · SQLAlchemy 2.0",
        evidence: { source: "project" },
      },
      {
        name: "DuckDB · SQLite · Streamlit dashboards",
        evidence: { source: "project" },
      },
      {
        name: {
          en: "Hybrid SQL / NoSQL / in-memory data architecture",
          es: "Arquitectura de datos híbrida SQL / NoSQL / in-memory",
        },
        evidence: { source: "cv" },
      },
      {
        name: {
          en: "High-availability system design",
          es: "Diseño de sistemas de alta disponibilidad",
        },
        evidence: { source: "project" },
      },
    ],
  },

  {
    id: "cloud-infra",
    title: { en: "Cloud & Infrastructure", es: "Cloud e Infraestructura" },
    skills: [
      {
        name: "Terraform (IaC), modules & state management",
        evidence: { source: "project" },
      },
      {
        name: "AWS — VPC, ALB, Auto Scaling, EC2, RDS Multi-AZ, ECR, CloudWatch",
        evidence: { source: "project" },
      },
      {
        name: {
          en: "Network segmentation & least-privilege security groups",
          es: "Segmentación de red y security groups de mínimo privilegio",
        },
        evidence: { source: "project" },
      },
      {
        name: "Docker & container image hygiene",
        evidence: { source: "project" },
      },
      {
        name: "k6 load testing & CloudWatch observability",
        evidence: { source: "project" },
      },
      {
        name: "Google Cloud (BigQuery ML, Cloud Storage, DLP)",
        evidence: { source: "cv" },
      },
    ],
  },

  {
    id: "tooling-devsecops",
    title: { en: "Tooling & DevSecOps", es: "Herramientas y DevSecOps" },
    skills: [
      { name: "Git / GitHub", evidence: { source: "project" } },
      { name: "GitHub Actions / CI-CD", evidence: { source: "project" } },
      { name: "pre-commit", evidence: { source: "project" } },
      { name: "pytest & Playwright", evidence: { source: "project" } },
      {
        name: "mypy strict · ruff · import-linter",
        evidence: { source: "project" },
      },
      { name: "CodeQL", evidence: { source: "project" } },
      {
        name: {
          en: "Package publishing (PyPI, npm)",
          es: "Publicación de paquetes (PyPI, npm)",
        },
        evidence: { source: "project" },
      },
      { name: "Vercel · GitHub Pages", evidence: { source: "project" } },
    ],
  },

  {
    id: "frontend",
    title: { en: "Frontend", es: "Frontend" },
    skills: [
      {
        name: "React / Next.js (App Router) & Tailwind",
        evidence: { source: "project" },
      },
      {
        name: { en: "Flutter UI", es: "Flutter UI" },
        evidence: { source: "project" },
      },
      {
        name: {
          en: "Responsive web (HTML / CSS / JS), D3.js data visualisation",
          es: "Web responsiva (HTML / CSS / JS), visualización de datos con D3.js",
        },
        evidence: { source: "project" },
      },
      {
        name: {
          en: "Accessibility (WCAG 2.1 AA, axe-checked)",
          es: "Accesibilidad (WCAG 2.1 AA, verificada con axe)",
        },
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
          en: "Technical writing: ADRs, specs and stakeholder-ready reports",
          es: "Redacción técnica: ADRs, especificaciones e informes para stakeholders",
        },
        evidence: { source: "project" },
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
