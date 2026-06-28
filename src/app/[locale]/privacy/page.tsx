import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Container } from "@/components/ui/container";
import { getPathname } from "@/i18n/navigation";
import { siteConfig } from "@/lib/site";
import type { Locale } from "@/content/types";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === "es" ? "Política de Privacidad" : "Privacy Policy",
    // canonical/hreflang propios (rutas localizadas /privacy ↔ /privacidad).
    alternates: {
      canonical: getPathname({ href: "/privacy", locale: locale as Locale }),
      languages: {
        en: getPathname({ href: "/privacy", locale: "en" }),
        es: getPathname({ href: "/privacy", locale: "es" }),
        "x-default": getPathname({ href: "/privacy", locale: "en" }),
      },
    },
  };
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isEs = locale === "es";

  return (
    <main id="main" className="py-20 sm:py-28">
      <Container className="max-w-3xl">
        {isEs ? <PrivacyEs /> : <PrivacyEn />}
      </Container>
    </main>
  );
}

// ── Contenido EN (RF15.1) ──────────────────────────────────────────────────────

function PrivacyEn() {
  return (
    <article className="space-y-8 text-fg">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">Privacy Policy</h1>
        <p className="mt-2 text-sm text-muted">Last updated: January 2026</p>
      </header>

      <section aria-labelledby="privacy-overview">
        <h2 id="privacy-overview" className="mb-3 text-xl font-semibold">
          Overview
        </h2>
        <p className="leading-7 text-muted">
          This portfolio site ({siteConfig.url}) collects minimal data. No
          advertising trackers, no third-party cookies, and no persistent user
          profiles are created.
        </p>
      </section>

      <section aria-labelledby="privacy-contact">
        <h2 id="privacy-contact" className="mb-3 text-xl font-semibold">
          Contact Form
        </h2>
        <ul className="space-y-3 text-muted">
          <li>
            <strong className="text-fg">Data collected:</strong> name, email
            address, and message content submitted via the contact form.
          </li>
          <li>
            <strong className="text-fg">Purpose:</strong> responding to your
            enquiry only.
          </li>
          <li>
            <strong className="text-fg">Processor:</strong>{" "}
            <a
              href="https://resend.com/legal/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent underline underline-offset-2 hover:opacity-80"
            >
              Resend
            </a>{" "}
            (email delivery service). Resend processes the data solely to
            deliver your message.
          </li>
          <li>
            <strong className="text-fg">International transfer:</strong>{" "}
            Resend&apos;s infrastructure may process data in the United States.
            Transfers are governed by Resend&apos;s Standard Contractual
            Clauses.
          </li>
          <li>
            <strong className="text-fg">Retention:</strong> your message is
            retained only for the duration of email delivery. No copy is stored
            in a database by this site.
          </li>
          <li>
            <strong className="text-fg">IP address:</strong> used ephemerally
            to enforce the rate-limit (5 requests per 10 minutes). It is not
            stored or logged after the request completes.
          </li>
        </ul>
      </section>

      <section aria-labelledby="privacy-analytics">
        <h2 id="privacy-analytics" className="mb-3 text-xl font-semibold">
          Analytics
        </h2>
        <p className="leading-7 text-muted">
          This site uses{" "}
          <a
            href="https://vercel.com/docs/analytics/privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent underline underline-offset-2 hover:opacity-80"
          >
            Vercel Analytics
          </a>{" "}
          and{" "}
          <a
            href="https://vercel.com/docs/speed-insights"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent underline underline-offset-2 hover:opacity-80"
          >
            Speed Insights
          </a>
          . These tools collect anonymised performance metrics and page-view
          counts. <strong className="text-fg">No cookies are set</strong> and
          no personal data is linked to page views.
        </p>
      </section>

      <section aria-labelledby="privacy-rights">
        <h2 id="privacy-rights" className="mb-3 text-xl font-semibold">
          Your Rights
        </h2>
        <p className="leading-7 text-muted">
          To exercise any data rights (access, erasure, portability), contact{" "}
          <a
            href={`mailto:${siteConfig.email}`}
            className="text-accent underline underline-offset-2 hover:opacity-80"
          >
            {siteConfig.email}
          </a>
          .
        </p>
      </section>
    </article>
  );
}

// ── Contenido ES (RF15.1) ──────────────────────────────────────────────────────

function PrivacyEs() {
  return (
    <article className="space-y-8 text-fg">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">
          Política de Privacidad
        </h1>
        <p className="mt-2 text-sm text-muted">Actualizado: enero de 2026</p>
      </header>

      <section aria-labelledby="privacy-overview-es">
        <h2 id="privacy-overview-es" className="mb-3 text-xl font-semibold">
          Resumen
        </h2>
        <p className="leading-7 text-muted">
          Este portafolio ({siteConfig.url}) recopila datos mínimos. No hay
          rastreadores publicitarios, cookies de terceros ni perfiles de usuario
          persistentes.
        </p>
      </section>

      <section aria-labelledby="privacy-contact-es">
        <h2 id="privacy-contact-es" className="mb-3 text-xl font-semibold">
          Formulario de Contacto
        </h2>
        <ul className="space-y-3 text-muted">
          <li>
            <strong className="text-fg">Datos recopilados:</strong> nombre,
            correo electrónico y mensaje enviado mediante el formulario de
            contacto.
          </li>
          <li>
            <strong className="text-fg">Finalidad:</strong> responder a tu
            consulta únicamente.
          </li>
          <li>
            <strong className="text-fg">Encargado del tratamiento:</strong>{" "}
            <a
              href="https://resend.com/legal/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent underline underline-offset-2 hover:opacity-80"
            >
              Resend
            </a>{" "}
            (servicio de envío de correo). Resend procesa los datos únicamente
            para entregar tu mensaje.
          </li>
          <li>
            <strong className="text-fg">Transferencia internacional:</strong>{" "}
            La infraestructura de Resend puede procesar datos en Estados Unidos.
            Las transferencias se rigen por las Cláusulas Contractuales Estándar
            de Resend.
          </li>
          <li>
            <strong className="text-fg">Retención:</strong> tu mensaje se
            conserva únicamente durante la entrega del correo. Este sitio no
            almacena ninguna copia en base de datos.
          </li>
          <li>
            <strong className="text-fg">Dirección IP:</strong> se usa de forma
            efímera para aplicar el límite de tasa (5 solicitudes cada 10
            minutos). No se almacena ni se registra tras completar la solicitud.
          </li>
        </ul>
      </section>

      <section aria-labelledby="privacy-analytics-es">
        <h2 id="privacy-analytics-es" className="mb-3 text-xl font-semibold">
          Analítica
        </h2>
        <p className="leading-7 text-muted">
          Este sitio utiliza{" "}
          <a
            href="https://vercel.com/docs/analytics/privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent underline underline-offset-2 hover:opacity-80"
          >
            Vercel Analytics
          </a>{" "}
          y{" "}
          <a
            href="https://vercel.com/docs/speed-insights"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent underline underline-offset-2 hover:opacity-80"
          >
            Speed Insights
          </a>
          . Estas herramientas recopilan métricas de rendimiento anonimizadas y
          recuentos de páginas vistas.{" "}
          <strong className="text-fg">No se establecen cookies</strong> y
          ningún dato personal se vincula a las visitas de página.
        </p>
      </section>

      <section aria-labelledby="privacy-rights-es">
        <h2 id="privacy-rights-es" className="mb-3 text-xl font-semibold">
          Tus Derechos
        </h2>
        <p className="leading-7 text-muted">
          Para ejercer cualquier derecho sobre tus datos (acceso, supresión,
          portabilidad), contáctame en{" "}
          <a
            href={`mailto:${siteConfig.email}`}
            className="text-accent underline underline-offset-2 hover:opacity-80"
          >
            {siteConfig.email}
          </a>
          .
        </p>
      </section>
    </article>
  );
}
