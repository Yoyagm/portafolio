import type { Profile } from "@/content/types";

export const profile: Profile = {
  name: "Johan David Rodriguez Castro",

  role: {
    en: "Security & AppSec Engineer | Supply-Chain Security & Threat Detection",
    es: "Ingeniero de Seguridad y AppSec | Seguridad de la Cadena de Suministro y Detección de Amenazas",
  },

  stage: {
    en: "Advanced Systems & Software Engineering student (UPB, 7th semester), early-career — I ship real tools.",
    es: "Estudiante avanzado de Ingeniería de Sistemas y Software (UPB, 7º semestre), early-career — entrego herramientas reales.",
  },

  bioShort: {
    en: "Security engineer who builds real tools, not just findings. Creator of SlopGuard — a pre-install supply-chain guard against AI-hallucinated and malicious packages. Engineering mindset: tests, CI gates, mypy strict. Bilingual C2 English.",
    es: "Ingeniero de seguridad que construye herramientas reales, no solo hallazgos. Creador de SlopGuard — un guardián pre-instalación contra dependencias alucinadas por IA y maliciosas. Mentalidad de ingeniería: tests, gates de CI, mypy strict. Inglés C2 bilingüe.",
  },

  bioLong: {
    en: "I'm a 7th-semester Systems & Software Engineering student at UPB (Bucaramanga) who operates at an engineering level rather than a findings level. I build production-grade security tools with tests, CI pipelines, and strict typing — not just reports. My flagship project, SlopGuard, addresses slopsquatting: the emerging attack surface where LLMs suggest non-existent package names and attackers pre-register them with malicious code. The tool runs a 5-layer detection engine with zero runtime dependencies, covering PyPI and npm, with CLI, pre-commit, GitHub Action and self-hostable SaaS frontends. I also have hands-on experience with mobile app hardening, TOTP 2FA, secure storage, and real-time network monitoring. Verified C2 English (EF SET 80/100). Available for remote collaboration.",
    es: "Estudiante de 7º semestre de Ingeniería de Sistemas y Software en UPB (Bucaramanga) que opera a nivel de ingeniería, no de hallazgos. Construyo herramientas de seguridad de nivel productivo con tests, pipelines de CI y tipado estricto — no solo reportes. Mi proyecto principal, SlopGuard, aborda el slopsquatting: la superficie de ataque emergente donde los LLMs sugieren nombres de paquetes inexistentes y los atacantes los pre-registran con código malicioso. La herramienta ejecuta un motor de detección de 5 capas sin dependencias en tiempo de ejecución, cubriendo PyPI y npm, con frontends CLI, pre-commit, GitHub Action y SaaS auto-hospedable. También tengo experiencia práctica en hardening de aplicaciones móviles, 2FA TOTP, almacenamiento seguro y monitoreo de red en tiempo real. Inglés C2 verificado (EF SET 80/100). Disponible para colaboración remota.",
  },

  location: {
    en: "Bucaramanga, Santander, Colombia (remote-ready)",
    es: "Bucaramanga, Santander, Colombia (disponible remoto)",
  },

  email: "johan.rc2020@gmail.com",
  phone: "+57 313 878 4948",
  github: "https://github.com/Yoyagm",
  cvHref: "/cv/Johan-Rodriguez-Security-Engineer.pdf",
  photo: "/me.jpg",

  english: {
    level: "C2",
    score: "EF SET 80/100",
  },
};
