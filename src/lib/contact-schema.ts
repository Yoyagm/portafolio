/**
 * Esquema de validación del formulario de contacto (T17, RF9.5-9.6).
 *
 * Valida SOLO los campos reales del usuario (name/email/message) + locale.
 * El honeypot (`website`) NO vive aquí: se evalúa en la Server Action antes de
 * validar, para descartar bots de forma silenciosa (éxito simulado) sin revelar
 * la defensa con un error de validación distinguible (revisión de seguridad).
 *
 * No usamos heurística de tiempo: comparar reloj-cliente (mount) contra
 * reloj-servidor (submit) es poco fiable por skew y arriesga descartar mensajes
 * legítimos. La barrera dura es el rate-limit por IP; el honeypot filtra bots
 * ingenuos sin falsos positivos.
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
