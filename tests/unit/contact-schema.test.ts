/**
 * Unit tests para contactSchema (T22, RF9.5-9.6).
 * Se ejecutan sin browser (proyecto "unit").
 *
 * Nota: el honeypot (`website`) y el tiempo mínimo (`_startTime`) ya NO viven en
 * el schema (se evalúan en la Server Action antes de validar, para descartar bots
 * de forma silenciosa). Aquí se prueba solo la validación de campos reales.
 */
import { test, expect } from "@playwright/test";
import { contactSchema, MIN_SUBMIT_MS } from "@/lib/contact-schema";

test.describe("contactSchema — validación Zod 4", () => {
  const validBase = {
    name: "Johan Rodriguez",
    email: "test@example.com",
    message: "Hello, this is a test message with enough length.",
    locale: "en",
  };

  test("datos válidos pasan", () => {
    expect(contactSchema.safeParse(validBase).success).toBe(true);
  });

  test("nombre vacío falla", () => {
    const result = contactSchema.safeParse({ ...validBase, name: "" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.some((i) => i.path[0] === "name")).toBe(true);
    }
  });

  test("nombre >100 chars falla", () => {
    const result = contactSchema.safeParse({
      ...validBase,
      name: "a".repeat(101),
    });
    expect(result.success).toBe(false);
  });

  test("email inválido falla", () => {
    const result = contactSchema.safeParse({
      ...validBase,
      email: "not-an-email",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.some((i) => i.path[0] === "email")).toBe(true);
    }
  });

  test("email con CRLF falla (protección anti-inyección de cabeceras)", () => {
    const result = contactSchema.safeParse({
      ...validBase,
      email: "user@example.com\r\nBcc: attacker@evil.com",
    });
    expect(result.success).toBe(false);
  });

  test("mensaje <10 chars falla", () => {
    const result = contactSchema.safeParse({ ...validBase, message: "short" });
    expect(result.success).toBe(false);
  });

  test("mensaje >2000 chars falla", () => {
    const result = contactSchema.safeParse({
      ...validBase,
      message: "a".repeat(2001),
    });
    expect(result.success).toBe(false);
  });

  test("name/email/message se recortan (trim)", () => {
    const result = contactSchema.safeParse({ ...validBase, name: "  Johan  " });
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.name).toBe("Johan");
  });

  test("locale inválido cae a 'en' (.catch)", () => {
    const result = contactSchema.safeParse({ ...validBase, locale: "fr" });
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.locale).toBe("en");
  });

  test("locale ausente cae a 'en'", () => {
    const { locale: _omit, ...noLocale } = validBase;
    void _omit;
    const result = contactSchema.safeParse(noLocale);
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.locale).toBe("en");
  });

  test("MIN_SUBMIT_MS es un número positivo", () => {
    expect(MIN_SUBMIT_MS).toBeGreaterThan(0);
  });
});
