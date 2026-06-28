/**
 * Esquema de validación del formulario de contacto (T17, RF9.5-9.6).
 *
 * Valida SOLO los campos reales del usuario (name/email/message) + locale.
 * El honeypot (`website`) y el tiempo mínimo (`_startTime`) NO viven aquí: se
 * evalúan en la Server Action ANTES de validar, para poder descartar bots de
 * forma silenciosa (éxito simulado) sin revelar la defensa con un error de
 * validación distinguible (hallazgo de la revisión de seguridad).
 */
import { z } from "zod";

export const LOCALES = ["en", "es"] as const;

export const contactSchema = z.object({
  name: z.string().trim().min(1).max(100),
  /** z.email() en Zod 4 — valida formato RFC y rechaza CRLF implícitamente. */
  email: z.email().max(254),
  message: z.string().trim().min(10).max(2000),
  /** locale de la UI; cae a "en" si falta o es inválido. */
  locale: z.enum(LOCALES).catch("en"),
});

export type ContactInput = z.infer<typeof contactSchema>;

/**
 * Mínimo de tiempo (ms) entre apertura y envío para no tratar como bot.
 * Best-effort: ningún humano completa 3 campos en menos de 1s. El rate-limit
 * por IP es la barrera dura; el timing solo filtra bots ingenuos.
 */
export const MIN_SUBMIT_MS = 1000;
