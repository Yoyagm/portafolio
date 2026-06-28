"use server";

/**
 * Server Action: submitContact (T17, RF9).
 *
 * Seguridad (endurecido tras revisión):
 * - Anti-bot (honeypot + tiempo mínimo) ANTES de validar: descarte silencioso
 *   simulando éxito, sin revelar la defensa (RF9.7).
 * - Rate-limit sliding-window 5/10min por IP de confianza (@vercel/functions,
 *   ADR-006). FALLA CERRADO en producción si KV no responde (RF9.8).
 * - Validación Zod 4 en servidor solo de campos reales (RF9.5-9.6).
 * - replyTo = email Zod-validado (sin CRLF); subject = literal de servidor;
 *   body = text: plano (RF9.10). Sin inyección de cabeceras.
 * - Sin secretos al cliente (RF9.13). Sin logging de PII.
 * - PRG: redirect localizado a thank-you/gracias en éxito (RF9.3).
 */

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { ipAddress } from "@vercel/functions";
import { Resend } from "resend";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { contactSchema, MIN_SUBMIT_MS } from "@/lib/contact-schema";
import { getPathname } from "@/i18n/navigation";
import type { Locale } from "@/content/types";
import {
  getResendApiKey,
  getContactEmail,
  getKvRestApiUrl,
  getKvRestApiToken,
} from "@/lib/env";

const isProd = process.env.NODE_ENV === "production";

// ── Tipos públicos de estado (consumidos por el componente cliente) ─────────────
export type ContactFieldErrors = Partial<
  Record<"name" | "email" | "message", string>
>;

export type ContactActionState =
  | null
  | {
      ok: false;
      error: "rate_limit" | "validation" | "send_failed";
      fieldErrors?: ContactFieldErrors;
    };

function resolveLocale(value: FormDataEntryValue | null): Locale {
  return value === "es" ? "es" : "en";
}

// Redirección PRG localizada (/en/thank-you ó /es/gracias). Lanza NEXT_REDIRECT.
function redirectToThankYou(locale: Locale): never {
  redirect(getPathname({ href: "/thank-you", locale }));
}

// ── Rate-limiter ────────────────────────────────────────────────────────────────
// Falla CERRADO en producción (única barrera dura contra flood/abuso de Resend);
// en dev permite para no estorbar el trabajo local sin KV.
async function checkRateLimit(ip: string): Promise<boolean> {
  try {
    const rl = new Ratelimit({
      redis: new Redis({ url: getKvRestApiUrl(), token: getKvRestApiToken() }),
      limiter: Ratelimit.slidingWindow(5, "10 m"),
      prefix: "contact:rl",
    });
    const { success } = await rl.limit(ip);
    return success;
  } catch (err) {
    console.warn(
      "[contact] Rate-limit backend unreachable:",
      err instanceof Error ? err.message : err,
    );
    return !isProd; // prod: bloquea (fail-closed); dev: permite
  }
}

// ── Resend ──────────────────────────────────────────────────────────────────────
// En producción una mala configuración es un error real (no se silencia, para no
// perder mensajes sin rastro); solo en dev se simula éxito sin claves.
async function sendEmail(data: {
  senderName: string;
  replyTo: string;
  message: string;
  locale: Locale;
}): Promise<boolean> {
  let resend: Resend;
  let destination: string;
  try {
    resend = new Resend(getResendApiKey());
    destination = getContactEmail();
  } catch (err) {
    console.warn(
      "[contact] Resend not configured:",
      err instanceof Error ? err.message : err,
    );
    return !isProd; // dev: simula éxito; prod: send_failed
  }

  const from =
    process.env.CONTACT_FROM ?? "Portfolio Contact <onboarding@resend.dev>";
  // Subject fijo en servidor — nunca proviene de entrada del usuario (RF9.10).
  const subject =
    data.locale === "es"
      ? "Nuevo mensaje desde tu portafolio"
      : "New message from your portfolio";

  const { error } = await resend.emails.send({
    from,
    to: destination,
    replyTo: data.replyTo, // email Zod-validado (z.email()), sin CRLF posible
    subject,
    text: `Name: ${data.senderName}\n\nMessage:\n${data.message}`,
  });

  if (error) {
    // Solo name/message del error del SDK; nunca el payload con PII.
    console.error("[contact] Resend error:", error.name, error.message);
    return false;
  }
  return true;
}

// ── Server Action ────────────────────────────────────────────────────────────────
export async function submitContact(
  _prevState: ContactActionState,
  formData: FormData,
): Promise<ContactActionState> {
  const locale = resolveLocale(formData.get("locale"));

  // 1. Anti-bot best-effort ANTES de validar (descarte silencioso = éxito simulado).
  const honeypot = (formData.get("website") ?? "").toString();
  if (honeypot.trim() !== "") redirectToThankYou(locale);

  const startedAt = Number(formData.get("_startTime"));
  if (
    Number.isFinite(startedAt) &&
    startedAt > 0 &&
    Date.now() - startedAt < MIN_SUBMIT_MS
  ) {
    redirectToThankYou(locale);
  }

  // 2. Rate-limit por IP de confianza (ADR-006, RF9.8).
  const headersList = await headers();
  const ip = ipAddress(headersList) ?? "anonymous";
  if (!(await checkRateLimit(ip))) {
    return { ok: false, error: "rate_limit" };
  }

  // 3. Validación de campos reales.
  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
    locale,
  });
  if (!parsed.success) {
    const fieldErrors: ContactFieldErrors = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0];
      if (field === "name" || field === "email" || field === "message") {
        fieldErrors[field] = issue.message;
      }
    }
    return { ok: false, error: "validation", fieldErrors };
  }

  // 4. Enviar correo.
  const { name, email, message } = parsed.data;
  const sent = await sendEmail({
    senderName: name,
    replyTo: email,
    message,
    locale,
  });
  if (!sent) {
    return { ok: false, error: "send_failed" };
  }

  // 5. PRG: redirect localizado (funciona sin JS).
  redirectToThankYou(locale);
}
