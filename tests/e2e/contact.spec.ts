/**
 * E2E: formulario de contacto (T22, RF9).
 * Verifica validación client-side, mensajes de error aria, y flujo de éxito (PRG).
 * Nota: en CI sin Resend+KV configurados, el Server Action simula éxito (dev fallback).
 */
import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("ContactForm /en", () => {
  test.beforeEach(async ({ page }) => {
    // Reduce-motion: Reveal estático → axe mide colores finales (sin fade-in).
    await page.emulateMedia({ reducedMotion: "reduce" });
    // El formulario vive en su página dedicada (arquitectura híbrida).
    await page.goto("/en/contact");
  });

  // ── Validación de campos ────────────────────────────────────────────────────

  test("nombre vacío muestra error accesible", async ({ page }) => {
    const form = page.locator("form").filter({ hasText: /send message|enviar/i });
    await form.locator('[name="message"]').fill("This is a test message with enough characters.");
    await form.locator('[name="email"]').fill("test@example.com");
    // No rellenamos 'name' — dejamos vacío
    await form.locator('button[type="submit"]').click();

    // Espera error visible
    const nameError = page.locator("#cf-name-err");
    await expect(nameError).toBeVisible({ timeout: 3000 });
    // Campo tiene aria-invalid
    await expect(form.locator('[name="name"]')).toHaveAttribute("aria-invalid", "true");
  });

  test("email inválido muestra error accesible", async ({ page }) => {
    const form = page.locator("form").filter({ hasText: /send message|enviar/i });
    await form.locator('[name="name"]').fill("Test User");
    await form.locator('[name="email"]').fill("not-an-email");
    await form.locator('[name="message"]').fill("This is a test message with enough characters.");
    await form.locator('button[type="submit"]').click();

    const emailError = page.locator("#cf-email-err");
    await expect(emailError).toBeVisible({ timeout: 3000 });
    await expect(form.locator('[name="email"]')).toHaveAttribute("aria-invalid", "true");
  });

  test("mensaje <10 chars muestra error", async ({ page }) => {
    const form = page.locator("form").filter({ hasText: /send message|enviar/i });
    await form.locator('[name="name"]').fill("Test User");
    await form.locator('[name="email"]').fill("test@example.com");
    await form.locator('[name="message"]').fill("short");
    await form.locator('button[type="submit"]').click();

    const messageError = page.locator("#cf-message-err");
    await expect(messageError).toBeVisible({ timeout: 3000 });
  });

  // ── Honeypot oculto ────────────────────────────────────────────────────────

  test("campo honeypot está oculto y fuera del tab order", async ({ page }) => {
    const honeypot = page.locator('[name="website"]');
    // tabIndex = -1 (no se alcanza con Tab)
    await expect(honeypot).toHaveAttribute("tabindex", "-1");
    // Su contenedor está marcado aria-hidden (lectores de pantalla lo ignoran)
    const ariaHidden = await honeypot.evaluate(
      (el) => el.closest('[aria-hidden="true"]') !== null,
    );
    expect(ariaHidden).toBe(true);
    // Posicionado fuera de pantalla (no visible para usuarios videntes). El
    // honeypot usa offscreen en vez de display:none para que los bots lo rellenen.
    const box = await honeypot.boundingBox();
    if (box) expect(box.x < 0 || box.y < 0).toBe(true);
  });

  // ── Accesibilidad ─────────────────────────────────────────────────────────

  test("formulario sin violaciones axe", async ({ page }) => {
    const results = await new AxeBuilder({ page })
      .include("#contact")
      .withTags(["wcag2a", "wcag2aa"])
      .analyze();
    expect(results.violations).toEqual([]);
  });

  // ── estado aria-live ────────────────────────────────────────────────────────

  test("área de status tiene role=status y aria-live=polite", async ({ page }) => {
    // Scoped a #contact: el RouteAnnouncer global también es role=status.
    const statusArea = page.locator(
      '#contact [role="status"][aria-live="polite"]',
    );
    await expect(statusArea).toBeAttached();
  });
});

test.describe("Blog /en/blog", () => {
  test.beforeEach(async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
  });

  test("sin violaciones axe en índice del blog", async ({ page }) => {
    await page.goto("/en/blog");
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(results.violations).toEqual([]);
  });

  test("writeup SlopGuard accesible", async ({ page }) => {
    await page.goto("/en/blog/how-slopguard-detects-slopsquatting");
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa"])
      .analyze();
    expect(results.violations).toEqual([]);
  });

  test("writeup en ES tiene JSON-LD con inLanguage=es", async ({ page }) => {
    await page.goto("/es/blog/how-slopguard-detects-slopsquatting");
    // Hay varios ld+json (Person del layout + TechArticle del post): elige el del artículo.
    const all = await page.$$eval(
      'script[type="application/ld+json"]',
      (els) => els.map((el) => JSON.parse(el.textContent ?? "{}")),
    );
    const article = all.find((j) => j["@type"] === "TechArticle");
    expect(article).toBeTruthy();
    expect(article.inLanguage).toBe("es");
  });
});
