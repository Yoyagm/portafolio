/**
 * Validación y tipado de variables de entorno (T06).
 * - Vars NEXT_PUBLIC_* son seguras en cliente y servidor.
 * - Vars servidor se leen con `requireServerVar`: falla rápido en tiempo de
 *   ejecución (no en build) si la variable está ausente en el entorno de destino.
 *   Se evalúan en el call-site (funciones), nunca al importar el módulo.
 */

// ── Variables públicas (cliente + servidor) ───────────────────────────────────

export const PUBLIC_SITE_URL: string =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://portafolio.vercel.app";

// ── Helper servidor (fail-fast en ejecución) ──────────────────────────────────

function requireServerVar(key: string): string {
  // typeof window === "undefined" garantiza que este path solo se alcanza en Node.
  if (typeof window !== "undefined") {
    throw new Error(`[env] "${key}" is a server-only variable — do not read it on the client.`);
  }
  const value = process.env[key];
  if (!value) {
    throw new Error(`[env] Missing required server env var: ${key}`);
  }
  return value;
}

// ── Variables servidor (evaluadas en el call-site, T17) ───────────────────────
// Se declaran aquí para que el resto del código importe desde un único lugar,
// pero el require ocurre solo cuando la función se llama (no al importar).

/** API key de Resend para envío de correos (ContactForm, T17). */
export function getResendApiKey(): string {
  return requireServerVar("RESEND_API_KEY");
}

/** Email destino del formulario de contacto (T17). */
export function getContactEmail(): string {
  return requireServerVar("CONTACT_EMAIL");
}

/** Upstash KV — URL REST (rate-limit, T17). */
export function getKvRestApiUrl(): string {
  return requireServerVar("KV_REST_API_URL");
}

/** Upstash KV — token REST (rate-limit, T17). */
export function getKvRestApiToken(): string {
  return requireServerVar("KV_REST_API_TOKEN");
}
