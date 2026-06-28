# Arquitectura — Portafolio Johan Rodriguez (diagrama fuente)

Fuente versionable de los diagramas del diseño. Detalle completo en `specs/design.md` (privado, en .gitignore).

> Correcciones de la revisión adversarial reflejadas: nonce que llega al RSC (mutación in-situ de `request.headers` en `proxy.ts`), `<html>` único en `[locale]/layout` (raíz passthrough), `proxy.ts` en **Node.js runtime** (no edge), IP de confianza vía `@vercel/functions`, MDX compilado en servidor, `PerformanceMonitor` + try/catch del loop + listeners de contexto.

## Componentes / arquitectura

```mermaid
flowchart TD
  Client([Navegador])
  subgraph Boundary["Node.js runtime (boundary de red Vercel)"]
    Proxy["proxy.ts<br/>next-intl + nonce CSP<br/>muta request.headers ENTRANTES (x-nonce, CSP)"]
    Headers["next.config headers()<br/>HSTS/XFO/Permissions-Policy/Reporting-Endpoints v1"]
  end
  subgraph Server["Next.js App Router (RSC, dinámico-SSR bajo nonce)"]
    RootL["app/layout.tsx<br/>PASSTHROUGH (return children)"]
    LocL["[locale]/layout.tsx<br/>PROPIETARIO &lt;html lang&gt;+&lt;body&gt;<br/>setRequestLocale · nonce anti-FOUC · NextIntlProvider · RouteAnnouncer"]
    Home["[locale]/page.tsx (RSC)"]
    Work["work/[slug] · blog/* (RSC + MDX servidor)"]
    Meta["sitemap · robots · llms.txt · feed.xml · manifest.ts · opengraph-image (next/og)"]
    Action["submitContact (Server Action)"]
  end
  subgraph Islands["Client islands"]
    Hero3D["Hero3D (dynamic ssr:false)<br/>R3F demand · instancing ≤10 draw calls · AdaptiveDpr · PerformanceMonitor"]
    NavC["Nav · Theme · LanguageSwitcher (preserva hash)"]
    Form["ContactForm (progresivo)"]
  end
  subgraph Ext["Servicios"]
    KV[("KV/Upstash<br/>rate-limit efímero")]
    Resend["Resend API (server-side)"]
    VA["Vercel Analytics + Speed Insights (/_vercel/*)"]
  end
  Client --> Proxy --> Headers --> RootL --> LocL
  LocL --> Home & Work & Meta
  Home --> Hero3D & NavC & Form
  Form -->|POST| Action
  Action -->|ipAddress @vercel/functions| KV
  Action --> Resend
  Home -.-> VA
  i18n["src/i18n + messages/*.json"] --- LocL
  Content["src/content/*.ts (tipado)"] --- Home & Work & Meta
```

## Secuencia — Server Action de contacto

```mermaid
sequenceDiagram
  actor U as Visitante
  participant F as ContactForm
  participant A as submitContact (server)
  participant IP as client-ip (ipAddress)
  participant KV as KV/Upstash
  participant R as Resend
  participant VA as Analytics
  U->>F: submit (name,email,message,honeypot,startedAt)
  F->>A: FormData (con o sin JS)
  A->>IP: ipAddress(await headers()) (no XFF crudo)
  A->>KV: ratelimit sliding window rl:contact:<ip> (TTL 600s)
  alt > 5 en 10min
    KV-->>A: bloqueado
    A-->>F: {rate-limited, retryAfter} (429, aria-live)
  else dentro de límite
    A->>A: Zod safeParse + honeypot/tiempo + anti CR/LF
    alt inválido
      A-->>F: {error, fieldErrors, values} (aria-invalid)
    else válido
      A->>R: emails.send(react:ContactEmail, replyTo=email puro, subject fijo)
      alt error de envío
        R-->>A: {error}
        A-->>F: {error formError} + email directo
      else ok
        R-->>A: {data.id}
        A->>VA: track('contact_submitted') sin PII
        A-->>U: redirect 303 → /thank-you|/gracias (PRG)
      end
    end
  end
```

## Carga del Hero 3D con fallbacks

```mermaid
flowchart TD
  Start([Render home dinámico-SSR]) --> Text["Texto hero SSR (LCP) + HeroPoster background-image (no LCP)"]
  Text --> RM{prefers-reduced-motion? (gate cliente)}
  RM -- sí --> Poster["HeroPoster (sin Canvas)"]
  RM -- no --> GPU{WebGL ok && GPU tier>1? (detect-gpu dinámico)}
  GPU -- no --> Poster
  GPU -- sí --> IO{Hero en viewport?}
  IO -- no --> Wait["IntersectionObserver"] --> IO
  IO -- sí --> Load["dynamic import Scene (ssr:false, ≤160KB)"]
  Load --> Canvas["Canvas frameloop=demand · performance.min · instancing"]
  Canvas --> Run{Evento runtime}
  Run -- contextlost --> EB["listeners gl.domElement → HeroPoster"]
  Run -- error montaje/render --> EB2["WebGLBoundary → HeroPoster"]
  Run -- throw en useFrame --> EB3["try/catch en loop → eleva estado → HeroPoster"]
  Run -- fuera de viewport --> Pause["setFrameloop('never')"] --> IO
  Run -- FPS sostenido bajo --> PM["PerformanceMonitor onFallback → desmonta Canvas"] --> Poster
```
