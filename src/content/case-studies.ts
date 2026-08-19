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
        label: {
          en: "ecosystems (PyPI + npm)",
          es: "ecosistemas (PyPI + npm)",
        },
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
        label: {
          en: "architecture contracts",
          es: "contratos de arquitectura",
        },
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
    slug: "phishing-url-detector",
    name: "Phishing URL Detector",
    featured: true,
    order: 2,

    tagline: {
      en: "Explainable phishing detection whose headline result is that the benchmark everyone reports 99 %+ on is broken — plus an honest baseline and exact TreeSHAP running in the browser.",
      es: "Detección de phishing explicable cuyo resultado principal es que el benchmark en el que todo el mundo reporta 99 %+ está roto — más una línea base honesta y TreeSHAP exacto ejecutándose en el navegador.",
    },

    context: {
      en: "Published work on phishing-URL classification routinely reports 99–100 % accuracy on public datasets, and those numbers are not reproducible in the field. PhiUSIIL (UCI id 967, 235,795 URLs) is the most widely cited recent dataset, so it is where the gap between the literature and reality is most worth measuring.",
      es: "El trabajo publicado sobre clasificación de URLs de phishing reporta de forma rutinaria 99–100 % de exactitud sobre datasets públicos, y esas cifras no son reproducibles en campo. PhiUSIIL (UCI id 967, 235.795 URLs) es el dataset reciente más citado, así que es donde más vale la pena medir la brecha entre la literatura y la realidad.",
    },

    problem: {
      en: "Nobody had quantified why those results fail to transfer. Auditing the raw file first — instead of training on it — was the only way to separate what the model learns from what the dataset leaks, and then to state a number that survives contact with phishing collected after the training data.",
      es: "Nadie había cuantificado por qué esos resultados no transfieren. Auditar el archivo crudo primero — en lugar de entrenar sobre él — era la única forma de separar lo que aprende el modelo de lo que filtra el dataset, y luego declarar una cifra que sobreviva al contacto con phishing recolectado después de los datos de entrenamiento.",
    },

    approach: [
      {
        en: "Leak audit before any training: two independent label leaks measured on the raw file. `URLSimilarityIndex` equals exactly 100.000 in 134,850 of 134,850 legitimate rows, and the legitimate class is a collection artefact — 100 % `https://www.`, 0.00 % with a path, a query or an `@`.",
        es: "Auditoría de fugas antes de entrenar nada: dos fugas de etiqueta independientes medidas sobre el archivo crudo. `URLSimilarityIndex` vale exactamente 100.000 en 134.850 de 134.850 filas legítimas, y la clase legítima es un artefacto de recolección — 100 % `https://www.`, 0,00 % con path, query o `@`.",
      },
      {
        en: "Every precomputed column discarded; the model trains only on the canonicalised host name. A guard test mutates the scheme, path, query, port and `www.` prefix and asserts the feature vector is bit-identical — with a negative control that plants a leak, because a guard that cannot fail is worthless.",
        es: "Se descarta toda columna precalculada; el modelo entrena solo sobre el nombre de host canonicalizado. Un test guardián muta esquema, path, query, puerto y prefijo `www.` y verifica que el vector de features sea idéntico bit a bit — con un control negativo que planta una fuga, porque un guardián que no puede fallar no vale nada.",
      },
      {
        en: "Splitting grouped by registrable domain (eTLD+1, ICANN section of the Public Suffix List) so no domain lands on both sides. Hosting suffixes are deliberately not used as grouping keys — that would reward memorising a provider — and are exposed as a feature instead.",
        es: "División agrupada por dominio registrable (eTLD+1, sección ICANN de la Public Suffix List) para que ningún dominio caiga en ambos lados. Los sufijos de hosting deliberadamente no se usan como clave de agrupación — eso premiaría memorizar un proveedor — y en su lugar se exponen como feature.",
      },
      {
        en: "Out-of-distribution and temporal evaluation: Tranco top-1M as benign, PhishTank hosts submitted after the cutoff as phishing, OpenPhish's live feed as an independent probe. Three contaminations removed and counted, each of which would otherwise flatter the result.",
        es: "Evaluación fuera de distribución y temporal: Tranco top-1M como benigno, hosts de PhishTank enviados después del corte como phishing, y el feed vivo de OpenPhish como sonda independiente. Tres contaminaciones eliminadas y contadas, cada una de las cuales habría maquillado el resultado.",
      },
      {
        en: "Exact path-dependent TreeSHAP reimplemented in dependency-free JavaScript so the demo explains its own verdict with no backend, parity-tested at 1e-12 against the Python reference.",
        es: "TreeSHAP exacto dependiente del camino reimplementado en JavaScript sin dependencias para que la demo explique su propio veredicto sin backend, con paridad verificada a 1e-12 contra la referencia de Python.",
      },
    ],

    impact: [
      {
        en: "The leak is quantified, not asserted: a one-line rule scores 99.67 % accuracy, and hand-rolled lexical features on the raw URL — the obvious rescue after throwing the tainted columns away — still score 99.51 % while measuring nothing.",
        es: "La fuga queda cuantificada, no afirmada: una regla de una línea alcanza 99,67 % de exactitud, y features léxicas hechas a mano sobre la URL cruda — el rescate obvio tras tirar las columnas contaminadas — siguen dando 99,51 % sin medir nada.",
      },
      {
        en: "The honest number, against phishing submitted two years after the training data: ROC-AUC 0.937 and 70.5 % recall at a 1 % false-positive rate.",
        es: "La cifra honesta, contra phishing enviado dos años después de los datos de entrenamiento: ROC-AUC 0,937 y 70,5 % de recall con 1 % de falsos positivos.",
      },
      {
        en: "Operating point tuned from the ROC instead of the default 0.5: false positives drop 13,453 → 999, a 92.6 % reduction, for 18 points of recall. The tradeoff is published, not hidden.",
        es: "Punto de operación ajustado desde la ROC en vez del 0,5 por defecto: los falsos positivos bajan de 13.453 a 999, una reducción del 92,6 %, a cambio de 18 puntos de recall. El intercambio se publica, no se esconde.",
      },
      {
        en: "Shipped twice over: a zero-cost static demo on GitHub Pages that scores and explains in the browser, and a containerised FastAPI service with batch scoring and a model-introspection endpoint.",
        es: "Entregado por partida doble: una demo estática de coste cero en GitHub Pages que puntúa y explica en el navegador, y un servicio FastAPI containerizado con scoring por lotes y un endpoint de introspección del modelo.",
      },
    ],

    metrics: [
      {
        value: "0.937",
        label: {
          en: "ROC-AUC (OOD + temporal)",
          es: "ROC-AUC (OOD + temporal)",
        },
        note: {
          en: "Honest regime: host names only, grouped split",
          es: "Régimen honesto: solo nombres de host, split agrupado",
        },
      },
      {
        value: "70.5%",
        label: { en: "recall at 1 % FPR", es: "recall con 1 % de FPR" },
      },
      {
        value: "99.67%",
        label: {
          en: "accuracy of the one-line leak",
          es: "exactitud de la fuga de una línea",
        },
        note: {
          en: "What the benchmark actually rewards",
          es: "Lo que el benchmark realmente premia",
        },
      },
      {
        value: "92.6%",
        label: {
          en: "false positives removed",
          es: "falsos positivos eliminados",
        },
        note: {
          en: "Threshold from the ROC, not the default 0.5",
          es: "Umbral desde la ROC, no el 0,5 por defecto",
        },
      },
      {
        value: "8.9e-16",
        label: {
          en: "max SHAP delta Python ↔ JS",
          es: "delta SHAP máx. Python ↔ JS",
        },
        note: {
          en: "28,917 attributions compared",
          es: "28.917 atribuciones comparadas",
        },
      },
      {
        value: "113",
        label: { en: "tests", es: "tests" },
      },
    ],

    features: [
      {
        text: {
          en: "Leakage guard test with a planted-leak negative control",
          es: "Test guardián de fugas con control negativo de fuga plantada",
        },
        status: "implemented",
        category: "resilience",
      },
      {
        text: {
          en: "Grouped split by eTLD+1 and post-cutoff temporal evaluation",
          es: "Split agrupado por eTLD+1 y evaluación temporal posterior al corte",
        },
        status: "implemented",
        category: "resilience",
      },
      {
        text: {
          en: "MITRE ATT&CK mapping (T1566 / T1566.002) with detection-as-code",
          es: "Mapeo a MITRE ATT&CK (T1566 / T1566.002) con detection-as-code",
        },
        status: "implemented",
        category: "security",
      },
      {
        text: {
          en: "`feature_spec_sha256` refuses to score on train/serve skew",
          es: "`feature_spec_sha256` se niega a puntuar si hay desviación train/serve",
        },
        status: "implemented",
        category: "resilience",
      },
      {
        text: {
          en: "Exact TreeSHAP in the browser — no backend, no telemetry",
          es: "TreeSHAP exacto en el navegador — sin backend, sin telemetría",
        },
        status: "implemented",
        category: "ux",
      },
      {
        text: {
          en: "Containerised FastAPI scoring service (single, batch, model introspection)",
          es: "Servicio FastAPI containerizado (individual, por lotes, introspección del modelo)",
        },
        status: "implemented",
        category: "resilience",
      },
    ],

    stack: [
      "Python 3.12",
      "LightGBM",
      "scikit-learn",
      "SHAP",
      "FastAPI",
      "Docker",
      "JavaScript (zero deps)",
      "GitHub Pages",
      "pytest",
      "LaTeX",
    ],

    links: [
      {
        id: "demo",
        href: "https://yoyagm.github.io/phishing-url-detector/",
        label: "Live demo",
      },
      {
        id: "repo",
        href: "https://github.com/Yoyagm/phishing-url-detector",
        label: "GitHub",
      },
      {
        id: "docs",
        href: "https://github.com/Yoyagm/phishing-url-detector/blob/main/paper/report.pdf",
        label: "Report (PDF)",
      },
    ],

    role: {
      en: "Sole author — leak audit, feature engineering, evaluation design, TreeSHAP port to JavaScript, service and written report.",
      es: "Único autor — auditoría de fugas, ingeniería de features, diseño de la evaluación, port de TreeSHAP a JavaScript, servicio e informe escrito.",
    },

    media: [
      {
        type: "image",
        src: "/projects/phishing-url-detector/demo_phishing_light.png",
        alt: {
          en: "The live demo scoring a brand-impersonation host at 99.9 % phishing, with the per-feature SHAP contributions that produced the verdict listed underneath.",
          es: "La demo en vivo puntuando un host de suplantación de marca al 99,9 % phishing, con las contribuciones SHAP por feature que produjeron el veredicto listadas debajo.",
        },
        width: 980,
        height: 1180,
      },
      {
        type: "image",
        src: "/projects/phishing-url-detector/leak1_similarity_index.png",
        alt: {
          en: "Leak 1: the distribution of URLSimilarityIndex, pinned at exactly 100.000 for every one of the 134,850 legitimate rows — a one-line rule that scores 99.67 % accuracy.",
          es: "Fuga 1: la distribución de URLSimilarityIndex, clavada en exactamente 100.000 para cada una de las 134.850 filas legítimas — una regla de una línea que alcanza 99,67 % de exactitud.",
        },
        width: 1007,
        height: 575,
      },
      {
        type: "image",
        src: "/projects/phishing-url-detector/leak2_structural_profile.png",
        alt: {
          en: "Leak 2: structural profile of both classes. Every legitimate URL is https://www.<domain> with no path, no query and no @ — the legitimate rows were normalised at collection time, the phishing rows were not.",
          es: "Fuga 2: perfil estructural de ambas clases. Toda URL legítima es https://www.<dominio> sin path, sin query y sin @ — las filas legítimas se normalizaron al recolectarlas, las de phishing no.",
        },
        width: 1257,
        height: 658,
      },
      {
        type: "image",
        src: "/projects/phishing-url-detector/roc_pr_curves.png",
        alt: {
          en: "ROC and precision-recall curves for both evaluation regimes: the internal grouped hold-out and the out-of-distribution temporal test, with the 1 % false-positive operating point marked.",
          es: "Curvas ROC y precisión-recall para ambos regímenes de evaluación: el hold-out interno agrupado y la prueba temporal fuera de distribución, con el punto de operación al 1 % de falsos positivos marcado.",
        },
        width: 1485,
        height: 729,
      },
      {
        type: "image",
        src: "/projects/phishing-url-detector/shap_global_importance.png",
        alt: {
          en: "Global SHAP importance across the 51 host-only features, led by brand_in_subdomain_only — the classic impersonation shape where a brand appears in the subdomain but not in the registrable domain.",
          es: "Importancia SHAP global sobre las 51 features solo-host, encabezada por brand_in_subdomain_only — la forma clásica de suplantación donde una marca aparece en el subdominio pero no en el dominio registrable.",
        },
        width: 1425,
        height: 883,
      },
    ],
  },

  {
    slug: "vuln-prioritization-dashboard",
    name: "Vulnerability Prioritisation Dashboard",
    featured: true,
    order: 3,

    tagline: {
      en: "Which vulnerability do you patch first? CISA KEV + EPSS + NVD — and a measurement showing the EPSS advantage everyone quotes is mostly evaluation artefact.",
      es: "¿Qué vulnerabilidad parcheas primero? CISA KEV + EPSS + NVD — y una medición que muestra que la ventaja de EPSS que todo el mundo cita es sobre todo artefacto de evaluación.",
    },

    context: {
      en: "Every security team has more CVEs than remediation capacity, so the queue order is the whole decision. The industry answer is EPSS, and the number quoted to justify it is that ranking by EPSS covers the same share of real-world exploitation for a fraction of the patching effort.",
      es: "Todo equipo de seguridad tiene más CVEs que capacidad de remediación, así que el orden de la cola es toda la decisión. La respuesta de la industria es EPSS, y la cifra que se cita para justificarlo es que ordenar por EPSS cubre la misma proporción de explotación real con una fracción del esfuerzo de parcheo.",
    },

    problem: {
      en: "That comparison scores a forecaster against data it has already seen: EPSS is trained on exploitation signals and the KEV catalogue *is* the exploitation ground truth. Nothing in the usual presentation separates genuine forecasting skill from hindsight, so the number that drives real remediation budgets had never been tested prospectively here.",
      es: "Esa comparación puntúa a un pronosticador contra datos que ya vio: EPSS se entrena con señales de explotación y el catálogo KEV *es* la verdad de terreno de explotación. Nada en la presentación habitual separa la habilidad real de pronóstico de la retrospectiva, así que la cifra que dirige presupuestos reales de remediación nunca se había probado de forma prospectiva aquí.",
    },

    approach: [
      {
        en: "Reproducible pipeline over three public feeds — the CISA KEV catalogue, EPSS daily scores and the complete NVD taken from the fkie-cad mirror rather than the paginated API, which turns a multi-hour crawl into a 12-second download.",
        es: "Tubería reproducible sobre tres feeds públicos — el catálogo CISA KEV, las puntuaciones diarias de EPSS y el NVD completo tomado del mirror de fkie-cad en lugar de la API paginada, lo que convierte un rastreo de horas en una descarga de 12 segundos.",
      },
      {
        en: "Ties are averaged, never broken. Tens of thousands of CVEs share a CVSS base score of exactly 9.8, so letting `sort` settle the order inside that block measures the alphabetical order of CVE identifiers. Each block is scored as its expected value under uniformly random ordering — guarded by a test that ships with a negative control.",
        es: "Los empates se promedian, nunca se rompen. Decenas de miles de CVEs comparten un CVSS base de exactamente 9,8, así que dejar que `sort` decida el orden dentro de ese bloque mide el orden alfabético de los identificadores CVE. Cada bloque se puntúa como su valor esperado bajo orden uniformemente aleatorio — protegido por un test que viene con control negativo.",
      },
      {
        en: "The honest re-run: EPSS frozen at five past dates, the universe rewound to the CVEs that existed then, and only the vulnerabilities CISA confirmed exploited *afterwards* counted as positives.",
        es: "La repetición honesta: EPSS congelado en cinco fechas pasadas, el universo rebobinado a los CVEs que existían entonces, y solo las vulnerabilidades que CISA confirmó explotadas *después* cuentan como positivos.",
      },
      {
        en: "Uncertainty bootstrapped over the positives — 2,000 resamples with a pinned seed — because with 86 to 143 confirmed-exploited CVEs per cutoff, that small number is where the sampling noise lives, not in the 300,000-row universe. The random baseline is always plotted; without it the two curves have no scale.",
        es: "Incertidumbre por bootstrap sobre los positivos — 2.000 remuestreos con semilla fija — porque con 86 a 143 CVEs confirmados como explotados por corte, ese número pequeño es donde vive el ruido de muestreo, no en el universo de 300.000 filas. La línea base aleatoria siempre se grafica; sin ella las dos curvas no tienen escala.",
      },
      {
        en: "Four dashboard views, each answering the question printed at the top of it — no chart exists for decoration — plus CSV export of the queue, which is the artefact a stakeholder actually asks for.",
        es: "Cuatro vistas del dashboard, cada una respondiendo la pregunta impresa en su encabezado — ningún gráfico existe por decoración — más exportación CSV de la cola, que es el artefacto que un stakeholder pide de verdad.",
      },
    ],

    impact: [
      {
        en: "Reproduces the industry claim exactly: ranking 359,399 live CVEs by CVSS needs 137,952 patches to cover 80 % of confirmed exploitation, against 22,736 by EPSS — a 6.1× advantage.",
        es: "Reproduce la afirmación de la industria exactamente: ordenar 359.399 CVEs vivos por CVSS exige 137.952 parches para cubrir el 80 % de la explotación confirmada, frente a 22.736 por EPSS — una ventaja de 6,1×.",
      },
      {
        en: "Then dissolves most of it. With scores frozen, EPSS still wins at the head of the queue (1.2–1.8× the later-exploited CVEs caught at equal budget) but *loses* on the long tail, needing more work than CVSS to reach 80 % coverage — effort ratio 0.5–0.7×. The direction holds at all five cutoffs.",
        es: "Y luego disuelve la mayor parte. Con las puntuaciones congeladas, EPSS sigue ganando en la cabeza de la cola (1,2–1,8× de CVEs explotados después capturados a igual presupuesto) pero *pierde* en la cola larga, necesitando más trabajo que CVSS para llegar al 80 % de cobertura — ratio de esfuerzo 0,5–0,7×. La dirección se mantiene en los cinco cortes.",
      },
      {
        en: "The dashboard ships the policy the measurement argues for rather than the headline: confirmed exploitation first, ransomware use above the rest, then forecast probability, with CVSS kept as the guard on the tail.",
        es: "El dashboard entrega la política que defiende la medición, no el titular: explotación confirmada primero, uso por ransomware por encima del resto, luego probabilidad pronosticada, con CVSS como guardia de la cola.",
      },
      {
        en: "Four limitations — KEV's own bias, unfrozen CVSS scores, small positive counts and post-cutoff exclusions — are stated in the README rather than buried, including the one that cuts against the finding.",
        es: "Cuatro limitaciones — el sesgo propio de KEV, las puntuaciones CVSS sin congelar, los recuentos pequeños de positivos y las exclusiones posteriores al corte — se declaran en el README en vez de enterrarse, incluida la que juega en contra del hallazgo.",
      },
    ],

    metrics: [
      {
        value: "6.1×",
        label: {
          en: "EPSS advantage, as usually measured",
          es: "ventaja de EPSS, medida como se suele",
        },
      },
      {
        value: "0.5–0.7×",
        label: {
          en: "the same advantage, measured honestly",
          es: "la misma ventaja, medida honestamente",
        },
        note: {
          en: "Frozen scores, long tail, five cutoffs",
          es: "Puntuaciones congeladas, cola larga, cinco cortes",
        },
      },
      {
        value: "359,399",
        label: { en: "live CVEs ranked", es: "CVEs vivos ordenados" },
      },
      {
        value: "1,665",
        label: {
          en: "KEV entries as ground truth",
          es: "entradas KEV como verdad de terreno",
        },
      },
      {
        value: "2,000",
        label: { en: "bootstrap resamples", es: "remuestreos bootstrap" },
        note: { en: "Seed pinned", es: "Semilla fija" },
      },
      {
        value: "76",
        label: { en: "tests · 5 ADRs", es: "tests · 5 ADRs" },
      },
    ],

    features: [
      {
        text: {
          en: "Hybrid queue: confirmed exploitation → ransomware use → EPSS, CVSS as tail guard",
          es: "Cola híbrida: explotación confirmada → uso por ransomware → EPSS, CVSS como guardia de cola",
        },
        status: "implemented",
        category: "security",
      },
      {
        text: {
          en: "BOD 22-01 remediation SLA view with a capacity slider costed in overdue days",
          es: "Vista de SLA de remediación BOD 22-01 con deslizador de capacidad costeado en días de retraso",
        },
        status: "implemented",
        category: "security",
      },
      {
        text: {
          en: "Tie-averaged effort/coverage metric, guarded by a test with a negative control",
          es: "Métrica de esfuerzo/cobertura con empates promediados, protegida por un test con control negativo",
        },
        status: "implemented",
        category: "resilience",
      },
      {
        text: {
          en: "Frozen-score prospective evaluation over five cutoffs with bootstrapped 95 % CIs",
          es: "Evaluación prospectiva con puntuaciones congeladas en cinco cortes con IC 95 % por bootstrap",
        },
        status: "implemented",
        category: "resilience",
      },
      {
        text: {
          en: "Committed data contract: schema tests fail the build if a feed changes shape",
          es: "Contrato de datos versionado: los tests de esquema rompen la build si un feed cambia de forma",
        },
        status: "implemented",
        category: "resilience",
      },
      {
        text: {
          en: "CSV export of the patch queue for stakeholders",
          es: "Exportación CSV de la cola de parcheo para stakeholders",
        },
        status: "implemented",
        category: "ux",
      },
    ],

    stack: [
      "Python 3.12",
      "pandas",
      "NumPy",
      "Streamlit",
      "Plotly",
      "PyArrow",
      "pytest",
      "Make",
      "CISA KEV",
      "EPSS",
      "NVD",
    ],

    links: [
      {
        id: "repo",
        href: "https://github.com/Yoyagm/vuln-prioritization-dashboard",
        label: "GitHub",
      },
    ],

    role: {
      en: "Sole author — ingestion pipeline, metric design, the prospective evaluation, dashboard and five architecture decision records.",
      es: "Único autor — tubería de ingesta, diseño de métricas, la evaluación prospectiva, dashboard y cinco registros de decisiones de arquitectura.",
    },

    media: [
      {
        type: "image",
        src: "/projects/vuln-dashboard/01-queue.png",
        alt: {
          en: "The patch queue view: CVEs ranked by the hybrid policy, filterable by vendor, severity and exploit probability, with CVSS shown alongside rather than driving the order.",
          es: "La vista de cola de parcheo: CVEs ordenados por la política híbrida, filtrables por proveedor, severidad y probabilidad de explotación, con CVSS mostrado al lado en vez de dirigir el orden.",
        },
        width: 1440,
        height: 1000,
      },
      {
        type: "image",
        src: "/projects/vuln-dashboard/03-finding.png",
        alt: {
          en: "The finding with its evidence: effort-versus-coverage curves for CVSS and EPSS against a random baseline, then the same comparison with the scores frozen and judged only on what was exploited afterwards.",
          es: "El hallazgo con su evidencia: curvas de esfuerzo contra cobertura para CVSS y EPSS frente a una línea base aleatoria, y luego la misma comparación con las puntuaciones congeladas y juzgadas solo por lo explotado después.",
        },
        width: 1440,
        height: 1000,
      },
      {
        type: "image",
        src: "/projects/vuln-dashboard/02-sla.png",
        alt: {
          en: "Remediation SLA view: CISA's BOD 22-01 deadlines drawn from seventeen fixed windows, with a slider that runs the queue at a chosen remediation rate and reports the cost in overdue days.",
          es: "Vista de SLA de remediación: los plazos BOD 22-01 de CISA tomados de diecisiete ventanas fijas, con un deslizador que corre la cola a una tasa de remediación elegida y reporta el coste en días de retraso.",
        },
        width: 1440,
        height: 1000,
      },
      {
        type: "image",
        src: "/projects/vuln-dashboard/04-catalogue.png",
        alt: {
          en: "Catalogue composition: which vendors and weakness classes dominate the KEV catalogue, and when CISA added each entry.",
          es: "Composición del catálogo: qué proveedores y clases de debilidad dominan el catálogo KEV, y cuándo añadió CISA cada entrada.",
        },
        width: 1440,
        height: 1000,
      },
    ],
  },

  {
    slug: "goatguard",
    name: "GOATGuard",
    featured: true,
    order: 4,

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

    media: [
      {
        type: "video",
        src: "/projects/goatguard/goatguard-demo.mp4",
        poster: "/projects/goatguard/goatguard-demo-poster.webp",
        alt: {
          en: "Live demo in a computer lab: a dozen machines run the monitoring agent in terminals while the GOATGuard app shows their status in real time on a phone.",
          es: "Demo en vivo en un laboratorio de cómputo: una docena de máquinas corren el agente de monitoreo en terminal mientras la app GOATGuard muestra su estado en tiempo real desde el teléfono.",
        },
        width: 832,
        height: 464,
      },
      {
        type: "image",
        src: "/projects/goatguard/goatguard-dashboard.webp",
        alt: {
          en: "Home dashboard: network health score 85/100 with ISP latency, packet loss, jitter and DNS response cards, plus the agent list with live CPU/RAM per device.",
          es: "Dashboard principal: salud de red 85/100 con tarjetas de latencia ISP, pérdida de paquetes, jitter y respuesta DNS, más la lista de agentes con CPU/RAM en vivo por equipo.",
        },
        width: 718,
        height: 1600,
      },
      {
        type: "image",
        src: "/projects/goatguard/goatguard-consumers.webp",
        alt: {
          en: "Top network consumers ranked by bandwidth (Mbps) alongside agent status, updated every 30 seconds over WebSocket.",
          es: "Top de consumidores de red ordenados por ancho de banda (Mbps) junto al estado de los agentes, actualizado cada 30 segundos vía WebSocket.",
        },
        width: 733,
        height: 1600,
      },
      {
        type: "image",
        src: "/projects/goatguard/goatguard-inventory.webp",
        alt: {
          en: "Device inventory with search and filters, split between devices with an installed agent and ARP-only discoveries; sensitive addresses redacted.",
          es: "Inventario de dispositivos con búsqueda y filtros, separado entre equipos con agente instalado y descubrimientos solo-ARP; direcciones sensibles censuradas.",
        },
        width: 713,
        height: 1600,
      },
      {
        type: "image",
        src: "/projects/goatguard/goatguard-device-detail.webp",
        alt: {
          en: "Device detail: identity (IP/MAC redacted), OS, live CPU and RAM gauges, and network KPIs like speed, latency and TCP retransmissions.",
          es: "Detalle de dispositivo: identidad (IP/MAC censuradas), SO, medidores de CPU y RAM en vivo, y KPIs de red como velocidad, latencia y retransmisiones TCP.",
        },
        width: 744,
        height: 1600,
      },
      {
        type: "image",
        src: "/projects/goatguard/goatguard-device-charts.webp",
        alt: {
          en: "Per-device time-series charts (fl_chart): TCP retransmissions with thresholds and hourly bandwidth usage, plus a critical retransmission-spike alert.",
          es: "Series de tiempo por dispositivo (fl_chart): retransmisiones TCP con umbrales y uso de ancho de banda por hora, más una alerta crítica de pico de retransmisiones.",
        },
        width: 720,
        height: 1600,
      },
      {
        type: "image",
        src: "/projects/goatguard/goatguard-alerts.webp",
        alt: {
          en: "Security alert feed with severity filters: port-scan detection, unknown device joins, heartbeat loss and unusual outbound connections.",
          es: "Feed de alertas de seguridad con filtros por severidad: detección de port scan, ingreso de dispositivos desconocidos, pérdida de heartbeat y conexiones salientes inusuales.",
        },
        width: 722,
        height: 1600,
      },
      {
        type: "image",
        src: "/projects/goatguard/goatguard-2fa-recovery.webp",
        alt: {
          en: "2FA enrolment: one-time recovery code screen (code redacted) shown before TOTP setup, with explicit save confirmation required to continue.",
          es: "Enrolamiento 2FA: pantalla del código de recuperación de un solo uso (código censurado) previa al setup TOTP, con confirmación explícita de guardado para continuar.",
        },
        width: 656,
        height: 1474,
      },
      {
        type: "image",
        src: "/projects/goatguard/goatguard-2fa-backup-codes.webp",
        alt: {
          en: "Ten single-use backup codes (redacted) generated after TOTP setup, with copy-all action and save confirmation gating access to the dashboard.",
          es: "Diez backup codes de un solo uso (censurados) generados tras el setup TOTP, con acción de copiar todos y confirmación de guardado antes de entrar al dashboard.",
        },
        width: 718,
        height: 1555,
      },
      {
        type: "image",
        src: "/projects/goatguard/goatguard-settings.webp",
        alt: {
          en: "Settings: notification preferences and security section showing the active JWT session, with sign-out.",
          es: "Ajustes: preferencias de notificaciones y sección de seguridad mostrando la sesión JWT activa, con cierre de sesión.",
        },
        width: 930,
        height: 1314,
      },
    ],
  },

  {
    slug: "aws-ha-infra",
    name: "AWS High-Availability Infrastructure",
    featured: false,
    order: 5,

    tagline: {
      en: "Three-tier architecture across two availability zones, entirely codified in Terraform and deployed by a pipeline that never runs Terraform in the hot path.",
      es: "Arquitectura de tres capas repartida en dos zonas de disponibilidad, íntegramente codificada en Terraform y desplegada por un pipeline que nunca ejecuta Terraform en la ruta caliente.",
    },

    context: {
      en: "Final evaluation for Infrastructure Design & Management (UPB) with a concrete deliverable rather than a diagram: a running service that keeps serving when an availability zone is lost, reproducible from source on an AWS Academy sandbox whose credentials expire every four hours.",
      es: "Evaluación final de Diseño y Gestión de Infraestructura Tecnológica (UPB) con un entregable concreto en vez de un diagrama: un servicio en marcha que sigue respondiendo cuando se pierde una zona de disponibilidad, reproducible desde el código en un sandbox de AWS Academy cuyas credenciales caducan cada cuatro horas.",
    },

    problem: {
      en: "High availability is easy to draw and hard to prove. The architecture had to survive an AZ failure visibly, keep the database unreachable from the internet and from the load balancer alike, and redeploy on every push without a human holding Terraform state — all inside an account that forbids creating IAM roles.",
      es: "La alta disponibilidad es fácil de dibujar y difícil de demostrar. La arquitectura tenía que sobrevivir de forma visible a la caída de una AZ, mantener la base de datos inalcanzable tanto desde internet como desde el balanceador, y redesplegarse en cada push sin que nadie sostenga el estado de Terraform — todo dentro de una cuenta que prohíbe crear roles IAM.",
    },

    approach: [
      {
        en: "VPC spanning two availability zones with public and private subnets separated by role: the load balancer and NAT gateway sit in public subnets, the application instances and the database in private ones.",
        es: "VPC repartida en dos zonas de disponibilidad con subredes públicas y privadas separadas por rol: el balanceador y el NAT gateway viven en subredes públicas, las instancias de aplicación y la base de datos en privadas.",
      },
      {
        en: "Auto Scaling Group pinned to a minimum of two instances, one per AZ, with the ALB's HTTP health check — not the EC2 status check — as the source of truth for application health.",
        es: "Auto Scaling Group fijado a un mínimo de dos instancias, una por AZ, con el health check HTTP del ALB — no el status check de EC2 — como fuente de verdad de la salud aplicativa.",
      },
      {
        en: "Least-privilege security groups in a strict chain: the ALB accepts the internet, the app tier accepts only the ALB, and the database accepts only the app tier and has no egress at all.",
        es: "Security groups de mínimo privilegio en cadena estricta: el ALB acepta internet, la capa de aplicación acepta solo al ALB, y la base de datos acepta solo a la capa de aplicación y no tiene egress alguno.",
      },
      {
        en: "RDS PostgreSQL Multi-AZ with encrypted gp3 storage, public access disabled, credentials generated with `random_password` and marked sensitive so they never reach the repository.",
        es: "RDS PostgreSQL Multi-AZ con almacenamiento gp3 cifrado, acceso público deshabilitado y credenciales generadas con `random_password` y marcadas como sensibles para que nunca lleguen al repositorio.",
      },
      {
        en: "Deployment without Terraform in the hot path: GitHub Actions lints, tests, builds the image and pushes it to ECR, then triggers an ASG instance refresh. Terraform provisions; the pipeline only rolls instances.",
        es: "Despliegue sin Terraform en la ruta caliente: GitHub Actions pasa linters y tests, construye la imagen y la sube a ECR, y luego dispara un instance refresh del ASG. Terraform aprovisiona; el pipeline solo rota instancias.",
      },
      {
        en: "k6 load tests read against CloudWatch — request count, target response time, healthy host count and 5XX rate — so the balancing claim is measured rather than asserted.",
        es: "Pruebas de carga con k6 leídas contra CloudWatch — conteo de peticiones, tiempo de respuesta del target, hosts sanos y tasa de 5XX — para que la afirmación sobre balanceo se mida en vez de afirmarse.",
      },
    ],

    impact: [
      {
        en: "The whole stack — VPC, internet and NAT gateways, ALB, Auto Scaling Group, ECR, RDS Multi-AZ, security groups, CloudWatch dashboard and alarm — reproduces from a single `terraform apply`.",
        es: "Toda la infraestructura — VPC, internet y NAT gateways, ALB, Auto Scaling Group, ECR, RDS Multi-AZ, security groups, dashboard y alarma de CloudWatch — se reproduce con un solo `terraform apply`.",
      },
      {
        en: "Trade-offs documented with their cost rather than presented as best practice: one NAT gateway instead of one per AZ (~$32/month each, with the failure mode written down), EC2 + ASG instead of Fargate because losing an instance is visibly survivable, and Multi-AZ instead of a read replica because failover mattered more than read capacity.",
        es: "Trade-offs documentados con su coste en vez de presentarse como buenas prácticas: un solo NAT gateway en lugar de uno por AZ (~32 USD/mes cada uno, con el modo de fallo escrito), EC2 + ASG en vez de Fargate porque perder una instancia se sobrevive de forma visible, y Multi-AZ en vez de una réplica de lectura porque el failover importaba más que la capacidad de lectura.",
      },
      {
        en: "Three independent workflows keep the repository honest: CI on the application, CD to ECR and the ASG, and a Terraform plan that runs on pull requests.",
        es: "Tres flujos independientes mantienen honesto el repositorio: CI sobre la aplicación, CD hacia ECR y el ASG, y un plan de Terraform que corre en los pull requests.",
      },
    ],

    metrics: [
      {
        value: "2",
        label: { en: "availability zones", es: "zonas de disponibilidad" },
        note: {
          en: "ASG holds one instance in each",
          es: "El ASG mantiene una instancia en cada una",
        },
      },
      {
        value: "3",
        label: {
          en: "tiers (web / app / data)",
          es: "capas (web / app / datos)",
        },
      },
      {
        value: "3",
        label: { en: "CI/CD workflows", es: "flujos CI/CD" },
        note: {
          en: "CI · CD · Terraform plan on PRs",
          es: "CI · CD · plan de Terraform en PRs",
        },
      },
      {
        value: "0",
        label: {
          en: "database ports open to the internet",
          es: "puertos de base de datos abiertos a internet",
        },
      },
    ],

    features: [
      {
        text: {
          en: "Least-privilege security-group chain; the database has no egress and no public access",
          es: "Cadena de security groups de mínimo privilegio; la base de datos no tiene egress ni acceso público",
        },
        status: "implemented",
        category: "security",
      },
      {
        text: {
          en: "Encryption at rest on RDS; passwords generated in Terraform and marked sensitive",
          es: "Cifrado en reposo en RDS; contraseñas generadas en Terraform y marcadas como sensibles",
        },
        status: "implemented",
        category: "security",
      },
      {
        text: {
          en: "Multi-AZ failover with the ALB health check as the source of truth",
          es: "Failover Multi-AZ con el health check del ALB como fuente de verdad",
        },
        status: "implemented",
        category: "resilience",
      },
      {
        text: {
          en: "Zero-touch redeploy via ECR push + ASG instance refresh",
          es: "Redespliegue sin intervención vía push a ECR + instance refresh del ASG",
        },
        status: "implemented",
        category: "resilience",
      },
      {
        text: {
          en: "ECR scan-on-push and a lifecycle policy capping stored images",
          es: "Escaneo al subir en ECR y política de ciclo de vida que limita las imágenes guardadas",
        },
        status: "implemented",
        category: "security",
      },
      {
        text: {
          en: "CloudWatch dashboard and 5XX alarm, exercised under k6 load",
          es: "Dashboard de CloudWatch y alarma de 5XX, ejercitados bajo carga con k6",
        },
        status: "implemented",
        category: "resilience",
      },
    ],

    stack: [
      "Terraform 1.6+",
      "AWS VPC / ALB / ASG / EC2",
      "RDS PostgreSQL 15 Multi-AZ",
      "Amazon ECR",
      "CloudWatch",
      "FastAPI",
      "SQLAlchemy 2.0",
      "Docker",
      "GitHub Actions",
      "k6",
    ],

    links: [
      {
        id: "repo",
        href: "https://github.com/Yoyagm/eval-final-dgiti",
        label: "GitHub",
      },
    ],

    role: {
      en: "Sole author — architecture, Terraform modules, application service, CI/CD pipeline, load testing and the written decision record.",
      es: "Único autor — arquitectura, módulos de Terraform, servicio de aplicación, pipeline CI/CD, pruebas de carga y el registro escrito de decisiones.",
    },

    media: [
      {
        type: "image",
        src: "/projects/aws-ha-infra/aws-architecture.png",
        alt: {
          en: "AWS architecture diagram: an internet-facing ALB in two public subnets forwarding to EC2 instances in private subnets across both availability zones, backed by a Multi-AZ RDS PostgreSQL instance, with ECR and CloudWatch alongside.",
          es: "Diagrama de arquitectura AWS: un ALB de cara a internet en dos subredes públicas que reenvía a instancias EC2 en subredes privadas de ambas zonas de disponibilidad, respaldadas por una instancia RDS PostgreSQL Multi-AZ, con ECR y CloudWatch al lado.",
        },
        width: 1632,
        height: 1161,
      },
    ],
  },

  {
    slug: "trading-system",
    name: "Autonomous Market Intelligence System",
    featured: false,
    order: 6,

    tagline: {
      en: "Event-driven market pipeline where the interesting engineering is the governance layer that can refuse to trade — and currently does.",
      es: "Tubería de mercado dirigida por eventos donde la ingeniería interesante es la capa de gobernanza capaz de negarse a operar — y que ahora mismo se niega.",
    },

    context: {
      en: "A long-running system that ingests market data, news and SEC filings, forms a view with a machine-learning ensemble and a multi-agent analyst desk, and can place bracket orders on Alpaca's paper-trading account. Stocks and crypto, on a fixed daily schedule plus continuous streaming.",
      es: "Un sistema de larga ejecución que ingiere datos de mercado, noticias y presentaciones ante la SEC, forma una opinión con un ensemble de machine learning y una mesa de analistas multiagente, y puede colocar órdenes bracket en la cuenta de paper trading de Alpaca. Acciones y cripto, con un calendario diario fijo más streaming continuo.",
    },

    problem: {
      en: "Anything that can send an order autonomously is only as safe as the thing that can stop it. The hard part was never the model — it was building a layer that refuses signals it cannot justify, escalates the ambiguous ones to a human, and keeps the whole system away from real money until the numbers earn it.",
      es: "Cualquier cosa capaz de enviar una orden de forma autónoma es tan segura como aquello que puede detenerla. La parte difícil nunca fue el modelo — fue construir una capa que rechaza señales que no puede justificar, escala las ambiguas a una persona, y mantiene todo el sistema lejos del dinero real hasta que las cifras se lo ganen.",
    },

    approach: [
      {
        en: "A governance engine with seven risk checks and a portfolio drawdown circuit breaker sits between every signal and the broker: high confidence executes, medium confidence goes to a Telegram inline keyboard and expires unanswered after 30 minutes, low confidence is refused outright.",
        es: "Un motor de gobernanza con siete comprobaciones de riesgo y un cortacircuitos por drawdown de cartera se interpone entre cada señal y el bróker: la confianza alta ejecuta, la media pasa a un teclado en línea de Telegram y expira sin respuesta a los 30 minutos, y la baja se rechaza sin más.",
      },
      {
        en: "Walk-forward validation with an expanding window and a purged 21-day gap; an ensemble of XGBoost, RandomForest and LogisticRegression with Platt calibration — isotonic was replaced because it collapsed the probabilities — and Optuna tuning every three folds.",
        es: "Validación walk-forward con ventana expansiva y un hueco purgado de 21 días; un ensemble de XGBoost, RandomForest y LogisticRegression con calibración de Platt — la isotónica se reemplazó porque colapsaba las probabilidades — y ajuste con Optuna cada tres folds.",
      },
      {
        en: "Forty engineered features spanning price action, volatility, market regime and FinBERT news sentiment, with dynamic feature selection above an importance floor.",
        es: "Cuarenta features construidas que abarcan acción del precio, volatilidad, régimen de mercado y sentimiento de noticias con FinBERT, con selección dinámica de features por encima de un piso de importancia.",
      },
      {
        en: "Event-driven runtime: an asyncio pub/sub bus over thirteen event types, three WebSocket streams with exponential-backoff reconnection and circular tick buffers, and a scheduler running eight jobs.",
        es: "Ejecución dirigida por eventos: un bus pub/sub de asyncio sobre trece tipos de evento, tres flujos WebSocket con reconexión por backoff exponencial y búferes circulares de ticks, y un planificador con ocho trabajos.",
      },
      {
        en: "A GO/NO-GO gate that has to pass before any real capital is considered: at least 30 trades over 90 days, 55 % win rate, Sharpe ≥ 1.0, max drawdown ≤ 15 % and ML accuracy ≥ 55 %.",
        es: "Una puerta GO/NO-GO que debe superarse antes de considerar capital real: al menos 30 operaciones en 90 días, 55 % de aciertos, Sharpe ≥ 1,0, drawdown máximo ≤ 15 % y exactitud del modelo ≥ 55 %.",
      },
    ],

    impact: [
      {
        en: "505 automated tests across seventeen suites, weighted towards the parts that can lose money: governance, execution, calibration, reconciliation and the streaming layer.",
        es: "505 tests automatizados en diecisiete suites, cargados hacia las partes que pueden perder dinero: gobernanza, ejecución, calibración, reconciliación y la capa de streaming.",
      },
      {
        en: "The current state is reported rather than dressed up: the ensemble sits at 52.9 % accuracy against a 55 % gate, so the system is deliberately not cleared for live capital and runs on paper only.",
        es: "El estado actual se reporta en vez de maquillarse: el ensemble está en 52,9 % de exactitud frente a una puerta del 55 %, así que el sistema deliberadamente no está autorizado para capital real y opera solo en papel.",
      },
      {
        en: "Every prediction is written back and validated against what actually happened, so model accuracy is a measured series rather than a training-time claim.",
        es: "Cada predicción se guarda y se valida contra lo que ocurrió de verdad, de modo que la exactitud del modelo es una serie medida y no una afirmación del momento de entrenamiento.",
      },
    ],

    metrics: [
      {
        value: "505",
        label: { en: "tests across 17 suites", es: "tests en 17 suites" },
      },
      {
        value: "7",
        label: {
          en: "risk checks before any order",
          es: "comprobaciones de riesgo antes de cada orden",
        },
      },
      {
        value: "40",
        label: {
          en: "engineered ML features",
          es: "features de ML construidas",
        },
      },
      {
        value: "52.9%",
        label: { en: "ML accuracy", es: "exactitud del modelo" },
        note: {
          en: "Below the 55 % gate — not cleared for live capital",
          es: "Por debajo de la puerta del 55 % — sin autorización para capital real",
        },
      },
      {
        value: "13",
        label: {
          en: "event types on the bus",
          es: "tipos de evento en el bus",
        },
      },
      {
        value: "3",
        label: { en: "WebSocket streams", es: "flujos WebSocket" },
      },
    ],

    features: [
      {
        text: {
          en: "Governance engine: 7 risk checks plus a portfolio drawdown circuit breaker",
          es: "Motor de gobernanza: 7 comprobaciones de riesgo más un cortacircuitos por drawdown de cartera",
        },
        status: "implemented",
        category: "security",
      },
      {
        text: {
          en: "Human-in-the-loop approval over Telegram, expiring after 30 minutes",
          es: "Aprobación humana en el bucle vía Telegram, con expiración a los 30 minutos",
        },
        status: "implemented",
        category: "security",
      },
      {
        text: {
          en: "GO/NO-GO gate blocking live capital until the metrics hold",
          es: "Puerta GO/NO-GO que bloquea el capital real hasta que las métricas se cumplan",
        },
        status: "implemented",
        category: "security",
      },
      {
        text: {
          en: "Walk-forward validation with a purged gap and Platt calibration",
          es: "Validación walk-forward con hueco purgado y calibración de Platt",
        },
        status: "implemented",
        category: "resilience",
      },
      {
        text: {
          en: "WebSocket streaming with exponential-backoff reconnection and fallback provider",
          es: "Streaming WebSocket con reconexión por backoff exponencial y proveedor de respaldo",
        },
        status: "implemented",
        category: "resilience",
      },
      {
        text: {
          en: "Live trading with real capital",
          es: "Operativa en vivo con capital real",
        },
        status: "simulated",
        category: "security",
        // note: paper trading only, blocked by the GO/NO-GO gate
      },
    ],

    stack: [
      "Python 3.14",
      "XGBoost",
      "scikit-learn",
      "Optuna",
      "FinBERT",
      "CrewAI",
      "DuckDB",
      "ChromaDB",
      "aiohttp",
      "APScheduler",
      "Alpaca API",
      "Telegram Bot API",
      "Streamlit",
    ],

    links: [],

    role: {
      en: "Sole author — governance engine, ML pipeline, event-driven runtime and test suite. Private repository; walkthrough available on request.",
      es: "Único autor — motor de gobernanza, tubería de ML, ejecución dirigida por eventos y suite de tests. Repositorio privado; recorrido disponible a petición.",
    },
  },
];
