# Portafolio — Johan David Rodriguez Castro

Portafolio personal en Next.js 16 (App Router), bilingüe EN/ES, con seis casos de
estudio de seguridad y ML aplicado. En producción:
**<https://johanrodriguez.is-a.dev>**

## Cómo está organizado

El contenido editorial **no vive en los componentes**: vive tipado en
`src/content/`, con las dos traducciones co-ubicadas en cada campo (`Localized<T>`)
para que EN y ES no se desincronicen. Los componentes solo lo renderizan.

| Archivo | Qué contiene |
|---|---|
| `src/content/profile.ts` | Identidad, bio, enlaces, nivel de inglés |
| `src/content/case-studies.ts` | Los seis proyectos: contexto, problema, enfoque, impacto, métricas, features, stack, media |
| `src/content/experience.ts` | Experiencia, educación y las 16 certificaciones verificables |
| `src/content/skills.ts` | Skills agrupadas, cada una con su origen de evidencia |
| `messages/{en,es}.json` | El "chrome" de UI (navegación, botones, estados) vía next-intl |

Añadir un proyecto es añadir una entrada a `case-studies.ts` y dejar sus capturas
en `public/projects/<slug>/`. No hay que tocar ningún componente.

## Reglas de contenido

Estas son las que hacen que el portafolio valga algo, y son las fáciles de romper:

- **Cada feature declara su estado**: `implemented`, `demo` o `simulated`. Si algo
  usa datos simulados, la insignia lo dice. Nunca se marca `implemented` lo que
  no lo está.
- **Cada feature declara su categoría**: `security`, `resilience` o `ux`. Existe
  para no inflar la columna de "seguridad" con cosas que son de UX.
- **Cada métrica lleva su matiz cuando lo necesita** (`note`). Si una cifra es un
  objetivo de diseño y no un resultado medido, se escribe en el matiz.
- **Cada skill declara su evidencia** (`cv` o `project`). Es interno, no se
  renderiza, pero obliga a preguntarse de dónde sale cada línea.
- **Cada certificación lleva `verifyUrl`** a su emisor. Ninguna es una captura.
- **Las cifras son las medidas, no las que favorecen.** Los tres proyectos
  destacados reportan el número que duele: 70,5 % de recall en phishing (no el
  99 % del benchmark con fugas), la ventaja de EPSS deshecha a 0,5–0,7× al
  medirla honestamente, 52,9 % de exactitud del modelo de trading contra una
  puerta del 55 % que no ha pasado.

## Desarrollo

```bash
pnpm install
pnpm dev              # http://localhost:3000 → redirige a /en
pnpm build
pnpm lint
pnpm test             # Playwright: unit + e2e (axe, cabeceras, i18n, contacto)
pnpm test:smoke
```

Variables de entorno en `.env.example`. El formulario de contacto necesita
`RESEND_API_KEY` y `CONTACT_EMAIL`; el rate limit, las de Upstash. Sin ellas el
sitio arranca igual, solo el envío queda inhabilitado.

## CV

El CV vive en [`cv/`](cv/) como fuente LaTeX y se compila con `make -C cv`, que
publica los dos PDF en `public/cv/`. Ver [`cv/README.md`](cv/README.md) para las
decisiones de formato (una sola columna, sin tablas, verificado con `pdftotext`).

## Seguridad

- CSP con nonce por petición, generada en `src/proxy.ts` (middleware) — ver
  `src/lib/csp.ts` y `docs/architecture/overview.md`.
- Cabeceras de seguridad verificadas por un test e2e (`tests/e2e/security-headers.spec.ts`).
- El formulario valida con Zod en servidor, aplica rate limit y **no almacena**
  los mensajes: solo los reenvía por email.

## Accesibilidad y rendimiento

Los tests e2e corren axe (WCAG 2.1 AA) sobre la home y comprueban que el elemento
LCP es texto, no el canvas del hero ni una imagen. `.lighthouserc.yml` fija los
presupuestos; `size-limit` vigila el bundle inicial y el chunk de Three.js.
