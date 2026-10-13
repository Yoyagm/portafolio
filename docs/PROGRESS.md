# Progreso

## Estado actual

El portafolio está publicado en <https://johanrodriguez.is-a.dev> con seis casos
de estudio, 16 certificaciones verificables y el CV en LaTeX versionado en `cv/`.
Siguiente paso: que Johan revise y apruebe el PR `perfil/sincronizar-fuente`
(correcciones de honestidad); después, desplegar el dashboard de vulnerabilidades
en Streamlit Community Cloud y enlazar la demo viva desde su caso de estudio — es
el único de los seis que tiene repositorio público pero no demo. Bloqueos: el
despliegue necesita que Johan inicie sesión en share.streamlit.io, y las dos
insignias de Cisco que faltan esperan su URL de Credly.

## Registro

### 2026-10-13

- **Hecho:** contenido y CV sincronizados con la fuente de verdad del perfil
  (`perfil-fuente.yaml`). Se corrigió lo que no tenía evidencia: EF SET muestra
  74/100, no 80/100; el rol de la UPB es voluntariado; el Scrum Master fue un
  proyecto académico; GOATGuard fue un proyecto en equipo (Johan escribió el cliente
  móvil, 19 de 25 commits); el caso `aws-ha-infra` describe lo que despliega el
  Terraform (PostgreSQL en EC2 con réplica, imagen en GHCR, sin RDS ni ECR); el
  sistema de mercado empezó en 2026. EM Torneos y GreenPulse salen del CV.
- **Hecho:** Educación incluye la Especialización en Seguridad Informática de la
  UPB, en curso y sin fechas.
- **Decisión:** «último semestre» se conserva (Johan lo confirmó) y «7.º semestre»
  se quita. El diagrama de `aws-ha-infra` se queda, con una nota de que muestra el
  diseño objetivo y no lo desplegado: borrarlo habría ocultado de dónde salió el
  error. Se descartó añadir un campo de pie de imagen, porque obliga a tocar un
  componente.
- **Bloqueo:** la documentación del propio repo `eval-final-dgiti` (README y
  `docs/ARQUITECTURA.md`) sigue diciendo RDS Multi-AZ y ECR; hasta corregirla,
  quien la lea verá lo contrario que el portafolio.

### 2026-08-19 (tarde)

- **Hecho:** CV en español, en las mismas dos variantes que el inglés. Cuatro PDF generales
  salen ahora de dos cuerpos (`cv-body.tex`, `cv-body-es.tex`) y un preámbulo compartido
  (`cv-preamble.tex`), con babel por idioma para que la justificación parta bien las palabras.
- **Hecho:** el botón de descarga del CV es sensible al idioma. `profile.cvHref` pasó de
  `string` a `Localized<string>`: en `/es` se descarga el CV en español y en `/en` el inglés.
- **Decisión:** `cv/dirigidos/` —un CV por vacante— queda **fuera de git**. El repositorio es
  público y ni el nombre de la empresa a la que se postula ni una carta que reconoce un
  requisito no cumplido deberían poder leerlos otros reclutadores. Se descartó versionarlos.
- **Decisión:** el CV dirigido no afirma la experiencia en RPA que la vacante pide y Johan no
  tiene, ni menciona VB.Net. Se reordena y se reescribe lo que ya es cierto para que hable el
  idioma de la oferta —triggers por tiempo y por cola, transacciones abandonadas, caídas por
  desconexión, trazar el punto de falla— y el hueco se aborda en la carta. Un CV que no se
  puede defender en la entrevista no sirve de nada.

### 2026-08-19

- **Hecho:** cuatro casos de estudio nuevos — detector de phishing por URL,
  dashboard de priorización de vulnerabilidades, infraestructura AWS de alta
  disponibilidad y sistema autónomo de inteligencia de mercado — con evidencia
  real: 10 capturas y figuras copiadas de los repositorios de origen a
  `public/projects/`. El portafolio pasa de 2 proyectos a 6.
- **Hecho:** las 16 certificaciones del perfil de LinkedIn, cada una con
  `verifyUrl` a su emisor (Credly, Google Skills, freeCodeCamp, Hugging Face,
  EF SET), agrupadas en cuatro áreas.
- **Hecho:** CV reescrito en LaTeX en `cv/`, en dos variantes que salen del mismo
  cuerpo: una página para postular y dos páginas detallada. `make -C cv` compila,
  verifica y publica en `public/cv/`.
- **Decisión:** las skills del CV pasan de una tabla de dos columnas a líneas de
  texto corrido. Se comprobó con `pdftotext` que la tabla se extraía desordenada
  —primero las seis etiquetas, después los seis valores— y un ATS perdía la
  asociación etiqueta→keywords. Se descartó mantener la tabla por estética.
- **Decisión:** el rol de Developer / Technical Support en la UPB sube a
  `Experience` en el CV, y GOATGuard se describe dentro de él en vez de repetirse
  como proyecto. Es experiencia laboral real y estaba enterrada entre los
  proyectos personales, que es justo lo que no conviene en un CV sin trayectoria
  laboral larga.
- **Decisión:** el sitio sirve la versión de **una página** en la ruta canónica
  `/cv/Johan-Rodriguez-Security-Engineer.pdf`. La profundidad ya la aporta el
  propio portafolio; el CV es el artefacto compacto que se reenvía.
- **Decisión:** el posicionamiento pasa de "Security & AppSec Engineer" a
  "Security & AI Engineer". Con phishing, priorización de vulnerabilidades y el
  sistema multiagente en cartera, AppSec se había quedado corto como etiqueta.
- **Corregido:** la certificación _Responsive Web Design_ de freeCodeCamp que
  figuraba en el CV y en el portafolio no existe. El perfil público de
  freeCodeCamp de Johan tiene cinco certificaciones y esa no está entre ellas.
  Retirada de ambos sitios.
- **Corregido:** las fechas de las certificaciones de freeCodeCamp. El CV decía
  2024 y 2025; las emisiones reales son de julio y agosto de 2026.
- **Corregido:** el nombre del proyecto se unifica como **GOATGuard** (así lo
  escriben el repositorio y su README), no "GoatGuard".
