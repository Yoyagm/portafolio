# Progreso

## Estado actual

El portafolio está publicado en <https://johan-rodriguez.vercel.app> con seis casos
de estudio, 16 certificaciones verificables y el CV en LaTeX versionado en `cv/`.
Siguiente paso: desplegar el dashboard de vulnerabilidades en Streamlit Community
Cloud y enlazar la demo viva desde su caso de estudio — es el único de los seis que
tiene repositorio público pero no demo. Sin bloqueos técnicos; el despliegue
necesita que Johan inicie sesión en share.streamlit.io.

## Registro

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
- **Corregido:** la certificación *Responsive Web Design* de freeCodeCamp que
  figuraba en el CV y en el portafolio no existe. El perfil público de
  freeCodeCamp de Johan tiene cinco certificaciones y esa no está entre ellas.
  Retirada de ambos sitios.
- **Corregido:** las fechas de las certificaciones de freeCodeCamp. El CV decía
  2024 y 2025; las emisiones reales son de julio y agosto de 2026.
- **Corregido:** el nombre del proyecto se unifica como **GOATGuard** (así lo
  escriben el repositorio y su README), no "GoatGuard".
