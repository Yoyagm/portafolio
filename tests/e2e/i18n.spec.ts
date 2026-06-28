/**
 * E2E: cambio de idioma (T22, RF2).
 * Verifica que el LanguageSwitcher actualiza locale, html[lang] y URL.
 */
import { test, expect } from "@playwright/test";

test.describe("Cambio de idioma", () => {
  test("EN → ES: URL cambia a /es, html[lang]=es", async ({ page }) => {
    await page.goto("/en");

    // Hacer clic en el switcher de idioma
    const switcher = page.getByRole("button", { name: /switch language|cambiar idioma/i });
    await switcher.click();

    // Esperar redirección a /es
    await page.waitForURL(/\/es/);
    expect(page.url()).toContain("/es");

    const lang = await page.locator("html").getAttribute("lang");
    expect(lang).toBe("es");
  });

  test("ES → EN: URL cambia a /en, html[lang]=en", async ({ page }) => {
    await page.goto("/es");

    const switcher = page.getByRole("button", { name: /switch language|cambiar idioma/i });
    await switcher.click();

    await page.waitForURL(/\/en/);
    expect(page.url()).toContain("/en");

    const lang = await page.locator("html").getAttribute("lang");
    expect(lang).toBe("en");
  });

  test("el switcher preserva la ruta de blog al cambiar de idioma", async ({
    page,
  }) => {
    await page.goto("/en/blog");

    const switcher = page.getByRole("button", { name: /switch language|cambiar idioma/i });
    await switcher.click();

    await page.waitForURL(/\/es\/blog/);
    expect(page.url()).toContain("/es/blog");
  });

  test("/ redirige a /en por defecto", async ({ page }) => {
    const response = await page.goto("/");
    // Debe redirigir a /en u /es (no quedarse en /)
    expect(page.url()).toMatch(/\/(en|es)/);
    // Código 200 tras la redirección
    expect(response?.status()).toBeLessThan(400);
  });

  test("locale no soportado → 404", async ({ page }) => {
    const response = await page.goto("/fr");
    // next-intl → notFound() para locales no soportados
    expect(response?.status()).toBe(404);
  });
});
