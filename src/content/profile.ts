import type { Profile } from "@/content/types";

export const profile: Profile = {
  name: "Johan David Rodriguez Castro",

  role: {
    en: "AI & Security Engineering · final-semester student | Model Training & Evaluation · Detection Engineering · Supply-Chain Security",
    es: "Ingeniería de IA y Seguridad · estudiante de último semestre | Entrenamiento y evaluación de modelos · Detection Engineering · Seguridad de la cadena de suministro",
  },

  stage: {
    en: "Final-semester Systems & Software Engineering student (UPB Bucaramanga; expected to graduate in 2026)",
    es: "Estudiante de último semestre de Ingeniería de Sistemas y Software (UPB Bucaramanga; fin de carrera previsto en 2026)",
  },

  bioShort: {
    en: "I am a final-semester Systems & Software Engineering student at UPB (Bucaramanga, Colombia) with verified C2 English (EF SET), looking for a first remote role in AI and machine learning: training models and, above all, evaluating them properly. My second focus is cybersecurity, where I have applied most of what I have trained.",
    es: "Soy estudiante de último semestre de Ingeniería de Sistemas y Software en la UPB (Bucaramanga), con inglés C2 verificado (EF SET), y busco un primer rol remoto en IA y machine learning: entrenar modelos y, sobre todo, evaluarlos bien. Mi segunda pata es la ciberseguridad, donde he aplicado casi todo lo que he entrenado.",
  },

  bioLong: {
    en: "I am a final-semester Systems & Software Engineering student at UPB (Bucaramanga, Colombia) with verified C2 English (EF SET), looking for a first remote role in AI and machine learning: training models and, above all, evaluating them properly. My second focus is cybersecurity, where I have applied most of what I have trained. I have trained tabular models (LightGBM, XGBoost), neural networks with TensorFlow/Keras (an SMS classifier at 98.1 % validation accuracy) and, right now, a LoRA adapter on a small language model (Qwen3-1.7B) with my own synthetic dataset, not yet evaluated against the base model. I work in Python and SQL. What I have measured, with its honest number. Phishing URL detector (LightGBM + SHAP): before training, I found two independent label leaks in the PhiUSIIL dataset; with both removed, the model reaches 70.5 % recall at a 1 % false-positive rate against phishing submitted two years later. Vulnerability prioritisation dashboard: I reproduced the 6.1× advantage usually quoted for the EPSS forecaster over CVSS, then froze its scores at five past dates and counted only later exploitation; the effort to reach 80 % coverage drops to 0.5–0.7×. Market system with XGBoost and agents (private repository): walk-forward validation and a gate that blocks live capital until the model clears 55 % accuracy; it scores 52.9 % today, so the gate stays shut. SlopGuard: a guard against slopsquatting, the package names a language model invents and an attacker registers, with 5 detection layers and 2,687 tests. At UPB I have volunteered as a developer and technical support since January 2026: I support the institution's end users, identify and analyse port scans and intrusion attempts on the network, and built, as part of a team, the GOATGuard mobile client (Flutter, TOTP 2FA). In 2025 I was Scrum Master of an academic project on high-availability infrastructure.",
    es: "Soy estudiante de último semestre de Ingeniería de Sistemas y Software en la UPB (Bucaramanga), con inglés C2 verificado (EF SET), y busco un primer rol remoto en IA y machine learning: entrenar modelos y, sobre todo, evaluarlos bien. Mi segunda pata es la ciberseguridad, donde he aplicado casi todo lo que he entrenado. He entrenado modelos tabulares (LightGBM, XGBoost), redes con TensorFlow/Keras (un clasificador de SMS con 98,1 % de exactitud en validación) y, ahora mismo, un adaptador LoRA sobre un modelo de lenguaje pequeño (Qwen3-1.7B) con un dataset sintético propio, todavía sin evaluar frente al modelo base. Trabajo en Python y SQL. Lo que he medido, con su cifra honesta. Detector de URLs de phishing (LightGBM + SHAP): antes de entrenar encontré dos fugas de etiqueta independientes en el dataset PhiUSIIL; sin ellas, el modelo logra un 70,5 % de recall con un 1 % de falsos positivos frente a phishing enviado dos años después. Dashboard de priorización de vulnerabilidades: reproduje la ventaja de 6,1× que se cita para el pronosticador EPSS frente a CVSS y, al congelar sus puntuaciones en cinco fechas pasadas y contar solo la explotación posterior, el esfuerzo para cubrir el 80 % queda en 0,5–0,7×. Sistema de mercado con XGBoost y agentes (repositorio privado): validación walk-forward y una puerta que bloquea el capital real mientras el modelo no supere el 55 % de exactitud; hoy da 52,9 % y la puerta sigue cerrada. SlopGuard: un guardián contra el slopsquatting, los paquetes que un modelo de lenguaje inventa y un atacante registra, con 5 capas de detección y 2.687 tests. En la UPB colaboro como desarrollador y soporte técnico desde enero de 2026, en voluntariado: doy soporte a usuarios finales, identifico y analizo escaneos de puertos e intentos de intrusión en la red, y desarrollé en equipo el cliente móvil de GOATGuard (Flutter, 2FA TOTP). En 2025 fui Scrum Master de un proyecto académico de infraestructura de alta disponibilidad.",
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
    score: "EF SET 74/100",
    verifyUrl: "https://cert.efset.org/es/qpqdd3",
  },
};
