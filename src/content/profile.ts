import type { Profile } from "@/content/types";

export const profile: Profile = {
  name: "Johan David Rodriguez Castro",

  role: {
    en: "Security & AI Engineer | Detection Engineering · Supply-Chain Security · Applied ML",
    es: "Ingeniero de Seguridad e IA | Detection Engineering · Seguridad de la Cadena de Suministro · ML Aplicado",
  },

  stage: {
    en: "Final-semester Systems & Software Engineering student (UPB Bucaramanga), early-career — I ship real tools and measure whether they work.",
    es: "Estudiante de último semestre de Ingeniería de Sistemas y Software (UPB Bucaramanga), early-career — entrego herramientas reales y mido si funcionan.",
  },

  bioShort: {
    en: "Security engineer who builds real tools and then tries to break his own results. SlopGuard guards installs against AI-hallucinated packages; a phishing classifier that proved its own benchmark was leaking; a KEV/EPSS dashboard that measured away the advantage it was built to show. Tests, CI gates, strict typing. Bilingual C2 English.",
    es: "Ingeniero de seguridad que construye herramientas reales y luego intenta romper sus propios resultados. SlopGuard protege las instalaciones frente a paquetes alucinados por IA; un clasificador de phishing que demostró que su propio benchmark tenía fugas; un dashboard KEV/EPSS que midió y desmontó la ventaja que venía a mostrar. Tests, gates de CI, tipado estricto. Inglés C2 bilingüe.",
  },

  bioLong: {
    en: "I'm a final-semester Systems & Software Engineering student at UPB (Bucaramanga) who operates at an engineering level rather than a findings level. The thread running through my work is measurement: I build production-grade tools with tests, CI pipelines and strict typing, and then I check whether the number I just produced means anything. SlopGuard, my flagship, addresses slopsquatting — the attack surface where LLMs suggest package names that do not exist and attackers pre-register them with malicious code — with a 5-layer detection engine, zero runtime dependencies and frontends for CLI, pre-commit, GitHub Actions and a self-hostable SaaS. My phishing classifier found two independent label leaks in the dataset the literature reports 99 %+ on, and publishes the honest number instead: 70.5 % recall at a 1 % false-positive rate against phishing collected two years later. My vulnerability-prioritisation dashboard reproduced the 6.1× advantage everyone quotes for EPSS and then showed most of it is an artefact of scoring a forecaster against data it had already seen. Alongside that: mobile hardening with TOTP 2FA and OS-backed secure storage, and high-availability AWS infrastructure fully codified in Terraform. Verified C2 English (EF SET 80/100). Available for remote collaboration.",
    es: "Soy estudiante de último semestre de Ingeniería de Sistemas y Software en UPB (Bucaramanga) y opero a nivel de ingeniería, no de hallazgos. El hilo que atraviesa mi trabajo es la medición: construyo herramientas de nivel productivo con tests, pipelines de CI y tipado estricto, y después compruebo si la cifra que acabo de producir significa algo. SlopGuard, mi proyecto principal, aborda el slopsquatting — la superficie de ataque donde los LLMs sugieren nombres de paquetes que no existen y los atacantes los pre-registran con código malicioso — con un motor de detección de 5 capas, cero dependencias en tiempo de ejecución y frontends para CLI, pre-commit, GitHub Actions y un SaaS auto-hospedable. Mi clasificador de phishing encontró dos fugas de etiqueta independientes en el dataset sobre el que la literatura reporta 99 %+, y publica la cifra honesta en su lugar: 70,5 % de recall con 1 % de falsos positivos contra phishing recolectado dos años después. Mi dashboard de priorización de vulnerabilidades reprodujo la ventaja de 6,1× que todo el mundo cita para EPSS y luego mostró que la mayor parte es un artefacto de puntuar a un pronosticador contra datos que ya había visto. Junto a eso: hardening móvil con 2FA TOTP y almacenamiento seguro del sistema operativo, e infraestructura AWS de alta disponibilidad íntegramente codificada en Terraform. Inglés C2 verificado (EF SET 80/100). Disponible para colaboración remota.",
  },

  location: {
    en: "Bucaramanga, Santander, Colombia (remote-ready)",
    es: "Bucaramanga, Santander, Colombia (disponible remoto)",
  },

  email: "johan.rc2020@gmail.com",
  phone: "+57 313 878 4948",
  github: "https://github.com/Yoyagm",
  linkedin: "https://www.linkedin.com/in/johan-rodriguez-97bb29323/",
  cvHref: {
    en: "/cv/Johan-Rodriguez-Security-Engineer.pdf",
    es: "/cv/Johan-Rodriguez-Ingeniero-Seguridad.pdf",
  },
  photo: "/profile/me.jpg",

  english: {
    level: "C2",
    score: "EF SET 80/100",
    verifyUrl: "https://cert.efset.org/es/qpqdd3",
  },
};
