import type { CaseStudy } from "@/content/types";

export const caseStudies: CaseStudy[] = [
  {
    slug: "slopguard",
    name: "SlopGuard",
    featured: true,
    order: 1,

    tagline: {
      en: "Pre-install supply-chain guard that catches AI-hallucinated, typosquatted and malicious dependencies — zero runtime deps.",
      es: "Guardián pre-instalación de la cadena de suministro que detecta dependencias alucinadas por IA, typosquatted y maliciosas — sin dependencias en tiempo de ejecución.",
    },

    context: {
      en: "Slopsquatting is an emerging supply-chain threat documented in USENIX Security 2025: LLMs frequently recommend `pip install` or `npm install` of packages that do not exist — roughly 20% of AI-suggested packages are hallucinated, with ~38% being near-misses on real package names. Attackers monitor LLM outputs and pre-register those hallucinated names with malicious payloads.",
      es: "El slopsquatting es una amenaza emergente en la cadena de suministro documentada en USENIX Security 2025: los LLMs frecuentemente recomiendan `pip install` o `npm install` de paquetes que no existen — aproximadamente el 20% de los paquetes sugeridos por IA son alucinados, con ~38% siendo near-misses de nombres de paquetes reales. Los atacantes monitorizan las salidas de los LLMs y pre-registran esos nombres alucinados con payloads maliciosos.",
    },

    problem: {
      en: "There was no pre-install interception layer that could deterministically evaluate a package's legitimacy — checking typosquatting distance, publication age, download velocity, OSV threat intelligence and LLM hallucination likelihood — before any code executes on the developer's machine.",
      es: "No existía una capa de interceptación pre-instalación que pudiera evaluar deterministamente la legitimidad de un paquete — comprobando distancia de typosquatting, antigüedad de publicación, velocidad de descargas, inteligencia de amenazas OSV y probabilidad de alucinación por LLM — antes de que cualquier código se ejecute en la máquina del desarrollador.",
    },

    approach: [
      {
        en: "5-layer detection engine (layers 0–4) that scores packages without executing any of their code.",
        es: "Motor de detección de 5 capas (capas 0–4) que puntúa los paquetes sin ejecutar ninguno de su código.",
      },
      {
        en: "Ecosystem-agnostic core with pluggable adapters for PyPI and npm.",
        es: "Núcleo agnóstico de ecosistema con adaptadores intercambiables para PyPI y npm.",
      },
      {
        en: "Multiple frontends covering every integration point: CLI, pre-commit hook, GitHub Action and self-hostable SaaS.",
        es: "Múltiples frontends que cubren cada punto de integración: CLI, pre-commit hook, GitHub Action y SaaS auto-hospedable.",
      },
      {
        en: "Provable anti-false-positive invariant: the opt-in LLM hallucination layer is structurally unable to block a legitimate package on its own.",
        es: "Invariante anti-falso-positivo demostrable: la capa de alucinación LLM opt-in es estructuralmente incapaz de bloquear un paquete legítimo por sí sola.",
      },
    ],

    impact: [
      {
        en: "Catches malicious and hallucinated packages before installation — zero runtime dependencies shipped to consumer environments.",
        es: "Detecta paquetes maliciosos y alucinados antes de la instalación — sin dependencias en tiempo de ejecución en entornos del consumidor.",
      },
      {
        en: "Test suite of 2687 collected tests (including parametrized) enforces correctness at every detection layer with a CI gate of ≥90% global coverage and ≥95% on critical paths.",
        es: "Suite de 2687 tests recogidos (incluyendo parametrizados) garantiza la corrección en cada capa de detección con un gate de CI de ≥90% de cobertura global y ≥95% en rutas críticas.",
      },
      {
        en: "8 import-linter architecture contracts prevent cross-boundary coupling as the codebase grows.",
        es: "8 contratos de arquitectura con import-linter previenen el acoplamiento entre capas a medida que crece la base de código.",
      },
    ],

    metrics: [
      {
        value: "0",
        label: { en: "runtime dependencies", es: "dependencias en runtime" },
      },
      {
        value: "5",
        label: { en: "detection layers", es: "capas de detección" },
      },
      {
        value: "2",
        label: { en: "ecosystems (PyPI + npm)", es: "ecosistemas (PyPI + npm)" },
      },
      {
        value: "~96%",
        label: { en: "test coverage", es: "cobertura de tests" },
        note: {
          en: "CI gate: ≥90% global / ≥95% critical paths",
          es: "Gate CI: ≥90% global / ≥95% rutas críticas",
        },
      },
      {
        value: "2687",
        label: { en: "tests collected", es: "tests recogidos" },
        note: {
          en: "Collected by pytest (2033 def test_ functions, rest parametrized)",
          es: "Recogidos por pytest (2033 funciones def test_, el resto parametrizados)",
        },
      },
      {
        value: "8",
        label: { en: "architecture contracts", es: "contratos de arquitectura" },
        note: {
          en: "Enforced by import-linter",
          es: "Verificados por import-linter",
        },
      },
    ],

    features: [
      {
        text: {
          en: "Layered scoring with provable anti-false-positive invariant",
          es: "Puntuación por capas con invariante anti-falso-positivo demostrable",
        },
        status: "implemented",
        category: "security",
      },
      {
        text: {
          en: "OSV.dev threat-intel with fail-closed degradation",
          es: "Inteligencia de amenazas OSV.dev con degradación fail-closed",
        },
        status: "implemented",
        category: "security",
      },
      {
        text: {
          en: "Opt-in LLM hallucination layer, structurally unable to block legitimate packages",
          es: "Capa de alucinación LLM opt-in, estructuralmente incapaz de bloquear paquetes legítimos",
        },
        status: "implemented",
        category: "security",
      },
      {
        text: {
          en: "Deterministic, network-free typosquatting detection (Damerau-Levenshtein + Jaro-Winkler)",
          es: "Detección de typosquatting determinista sin red (Damerau-Levenshtein + Jaro-Winkler)",
        },
        status: "implemented",
        category: "security",
      },
    ],

    stack: [
      "Python 3.11+",
      "stdlib only",
      "mypy strict",
      "ruff (bandit)",
      "import-linter",
      "pytest",
      "GitHub Actions",
      "CodeQL",
      "FastAPI",
      "Next.js",
      "PostgreSQL",
      "Redis",
    ],

    links: [
      {
        id: "repo",
        href: "https://github.com/Yoyagm/slopguard",
        label: "GitHub",
      },
    ],

    role: {
      en: "Sole author — architecture, detection engine, CLI, CI integrations and SaaS.",
      es: "Único autor — arquitectura, motor de detección, CLI, integraciones CI y SaaS.",
    },

    media: [
      {
        type: "image",
        src: "/projects/slopguard/slopguard-cli-block.png",
        alt: {
          en: "SlopGuard CLI blocking four typosquatted PyPI packages, showing Damerau-Levenshtein matches and a suggested exit code 2.",
          es: "CLI de SlopGuard bloqueando cuatro paquetes typosquat de PyPI, mostrando coincidencias Damerau-Levenshtein y exit code 2 sugerido.",
        },
        width: 880,
        height: 960,
      },
      {
        type: "image",
        src: "/projects/slopguard/slopguard-cli-clean.png",
        alt: {
          en: "SlopGuard CLI scanning a clean manifest — all four dependencies allowed, exit code 0 (no false positives).",
          es: "CLI de SlopGuard escaneando un manifiesto limpio — las cuatro dependencias permitidas, exit code 0 (sin falsos positivos).",
        },
        width: 880,
        height: 670,
      },
      {
        type: "image",
        src: "/projects/slopguard/slopguard-ui-scan-report.png",
        alt: {
          en: "SlopGuard SaaS scan report for a PyPI manifest — global verdict Blocked (exit 2): 5 dependencies allowed and 2 blocked (a nonexistent/hallucinated package and the 'reqursts' typosquat of requests).",
          es: "Reporte de escaneo del SaaS de SlopGuard para un manifiesto PyPI — veredicto global Bloqueado (exit 2): 5 dependencias permitidas y 2 bloqueadas (un paquete inexistente/alucinado y el typosquat 'reqursts' de requests).",
        },
        width: 1440,
        height: 900,
      },
      {
        type: "image",
        src: "/projects/slopguard/slopguard-ui-report-detail.png",
        alt: {
          en: "SlopGuard scan detail with expanded detection signals — Layer 0 (package absent from PyPI, possible hallucination) and Layer 1 typosquatting (Damerau-Levenshtein distance 1 to 'requests').",
          es: "Detalle de escaneo de SlopGuard con señales de detección expandidas — Capa 0 (paquete ausente de PyPI, posible alucinación) y Capa 1 typosquatting (distancia Damerau-Levenshtein 1 respecto a 'requests').",
        },
        width: 1104,
        height: 978,
      },
      {
        type: "image",
        src: "/projects/slopguard/slopguard-ui-history.png",
        alt: {
          en: "SlopGuard SaaS scan history — six on-demand scans across PyPI and npm, each with an allow/block summary, total dependency count and ecosystem filtering.",
          es: "Historial de escaneos del SaaS de SlopGuard — seis escaneos on-demand en PyPI y npm, cada uno con resumen de permitidos/bloqueados, total de dependencias y filtro por ecosistema.",
        },
        width: 1440,
        height: 900,
      },
      {
        type: "image",
        src: "/projects/slopguard/slopguard-ui-dashboard.png",
        alt: {
          en: "SlopGuard SaaS dashboard — quick actions (new scan, history) and an explainer of slopsquatting and the allow / warn / block verdict model for PyPI and npm.",
          es: "Dashboard del SaaS de SlopGuard — acciones rápidas (nuevo escaneo, historial) y una explicación del slopsquatting y el modelo de veredictos allow / warn / block para PyPI y npm.",
        },
        width: 1440,
        height: 900,
      },
    ],
  },

  {
    slug: "goatguard",
    name: "GoatGuard",
    featured: true,
    order: 2,

    tagline: {
      en: "Flutter mobile client for network monitoring & security, with full TOTP 2FA.",
      es: "Cliente móvil Flutter para monitoreo de red y seguridad, con 2FA TOTP completo.",
    },

    context: {
      en: "Small networks — home offices and SMEs — lack an accessible mobile interface to visualize connected assets, link health and security alerts without deploying enterprise-grade NMS infrastructure.",
      es: "Las redes pequeñas — oficinas en casa y PyMEs — carecen de una interfaz móvil accesible para visualizar activos conectados, salud del enlace y alertas de seguridad sin desplegar infraestructura NMS empresarial.",
    },

    problem: {
      en: "Existing solutions are either enterprise-tier (expensive, complex) or consumer tools with no security posture visibility. There was no lightweight mobile client that combined real-time network monitoring with hardened authentication.",
      es: "Las soluciones existentes son de nivel empresarial (costosas, complejas) o herramientas de consumo sin visibilidad de la postura de seguridad. No existía un cliente móvil ligero que combinara monitoreo de red en tiempo real con autenticación reforzada.",
    },

    approach: [
      {
        en: "Network health dashboard with device inventory classified by type (routers, printers, cameras, etc.).",
        es: "Dashboard de salud de red con inventario de dispositivos clasificados por tipo (routers, impresoras, cámaras, etc.).",
      },
      {
        en: "Security alert feed with severity levels, including port-scan detection.",
        es: "Feed de alertas de seguridad con niveles de severidad, incluyendo detección de port scans.",
      },
      {
        en: "Full TOTP 2FA flow: QR enrolment, login verification, backup codes and account recovery.",
        es: "Flujo 2FA TOTP completo: enrolamiento por QR, verificación en login, backup codes y recuperación de cuenta.",
      },
      {
        en: "JWT stored in OS secure storage (Keystore/Keychain) with a global 401 interceptor for session management.",
        es: "JWT almacenado en el secure storage del SO (Keystore/Keychain) con interceptor global de errores 401 para gestión de sesión.",
      },
      {
        en: "WebSocket architecture with exponential backoff reconnection for real-time data streams.",
        es: "Arquitectura WebSocket con reconexión por backoff exponencial para flujos de datos en tiempo real.",
      },
    ],

    impact: [
      {
        en: "14-screen mobile application with 5-tab architecture delivering a complete network security management experience.",
        es: "Aplicación móvil de 14 pantallas con arquitectura de 5 tabs que ofrece una experiencia completa de gestión de seguridad de red.",
      },
      {
        en: "3-factor account security (TOTP + backup codes + recovery) backed by OS-level secure storage.",
        es: "Seguridad de cuenta con 3 factores (TOTP + backup codes + recovery) respaldada por almacenamiento seguro a nivel de SO.",
      },
    ],

    metrics: [
      {
        value: "6.6K",
        label: { en: "lines of Dart", es: "líneas de Dart" },
      },
      {
        value: "3",
        label: {
          en: "account-security factors",
          es: "factores de seguridad de cuenta",
        },
        note: {
          en: "TOTP + backup codes + recovery",
          es: "TOTP + backup codes + recovery",
        },
      },
      {
        value: "20+",
        label: { en: "REST endpoints", es: "endpoints REST" },
      },
      {
        value: "14",
        label: { en: "screens (5-tab arch)", es: "pantallas (arq. 5 tabs)" },
      },
    ],

    features: [
      {
        text: {
          en: "TOTP 2FA: QR enrolment, login verification, backup & recovery codes",
          es: "2FA TOTP: enrolamiento QR, verificación en login, backup y recovery codes",
        },
        status: "implemented",
        category: "security",
      },
      {
        text: {
          en: "JWT in OS secure storage (Keystore/Keychain) + global 401 interceptor",
          es: "JWT en secure storage del SO (Keystore/Keychain) + interceptor global 401",
        },
        status: "implemented",
        category: "security",
      },
      {
        text: {
          en: "Real-time dashboard architecture (REST + WebSocket)",
          es: "Arquitectura de dashboard en tiempo real (REST + WebSocket)",
        },
        status: "demo",
        category: "resilience",
        // note: backend-ready
      },
      {
        text: {
          en: "WebSocket reconnection with exponential backoff",
          es: "Reconexión WebSocket con backoff exponencial",
        },
        status: "implemented",
        category: "resilience",
      },
      {
        text: {
          en: "Time-series charts",
          es: "Gráficas de series de tiempo",
        },
        status: "simulated",
        category: "ux",
        // note: simulated data, backend-ready
      },
      {
        text: {
          en: "Push notifications",
          es: "Notificaciones push",
        },
        status: "simulated",
        category: "ux",
        // note: declared, NOT implemented
      },
    ],

    stack: [
      "Flutter",
      "Dart",
      "Provider",
      "Dio",
      "web_socket_channel",
      "flutter_secure_storage",
      "qr_flutter",
      "fl_chart",
    ],

    links: [
      {
        id: "repo",
        href: "https://github.com/Yoyagm/goatguard-app",
        label: "GitHub",
      },
    ],

    role: {
      en: "Author — mobile client architecture, auth/2FA flows, state & services.",
      es: "Único autor — arquitectura del cliente móvil, flujos de auth/2FA, estado y servicios.",
    },
  },
];
