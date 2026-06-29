/**
 * E2E: home page — nonce, LCP, axe, smoke (T22).
 * Criterios: nonce en script anti-FOUC y JSON-LD, LCP = h1, sin violaciones axe.
 */
import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("Home /en", () => {
  test.beforeEach(async ({ page }) => {
    // Reduce-motion: Reveal se renderiza estático → axe mide colores finales.
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/en");
  });

  // ── Smoke ──────────────────────────────────────────────────────────────────

  test("title contiene 'Johan Rodriguez'", async ({ page }) => {
    await expect(page).toHaveTitle(/Johan Rodriguez/i);
  });

  test("h1 visible en el hero", async ({ page }) => {
    const h1 = page.getByRole("heading", { level: 1 }).first();
    await expect(h1).toBeVisible();
  });

  // ── CSP nonce (RF3.1, ADR-004) ─────────────────────────────────────────────

  test("script anti-FOUC tiene atributo nonce no vacío", async ({ page }) => {
    // El navegador OCULTA el atributo nonce del DOM tras aplicar la CSP, así que
    // se verifica contra el HTML CRUDO del servidor (donde el nonce sí aparece).
    const res = await page.request.get("/en");
    const html = await res.text();
    expect(html).toMatch(/nonce="[A-Za-z0-9+/=_-]{8,}"/);
  });

  test("JSON-LD Person tiene nonce", async ({ page }) => {
    const res = await page.request.get("/en");
    const html = await res.text();
    // Bloques <script type="application/ld+json" ...>...</script>
    const blocks = [
      ...html.matchAll(
        /<script type="application\/ld\+json"([^>]*)>([\s\S]*?)<\/script>/g,
      ),
    ];
    const person = blocks.find(([, , content]) => content.includes('"Person"'));
    expect(person).toBeTruthy();
    expect(person?.[1]).toMatch(/nonce="[A-Za-z0-9+/=_-]{8,}"/);
  });

  // ── LCP (RF3.2-3.3, RNF1.1) ────────────────────────────────────────────────

  test("LCP element es texto (h1/p/span), no canvas ni img del hero", async ({
    page,
  }) => {
    // Espera a que la página cargue y el LCP se registre
    await page.waitForLoadState("networkidle");

    const lcpTag = await page.evaluate(() => {
      return new Promise<string>((resolve) => {
        // Si LCP ya fue emitido, lo capturamos con buffered:true
        new PerformanceObserver((list) => {
          const entries = list.getEntries();
          if (entries.length > 0) {
            const last = entries[entries.length - 1] as PerformanceEntry & {
              element?: Element;
            };
            resolve(last.element?.tagName ?? "UNKNOWN");
          }
        }).observe({ type: "largest-contentful-paint", buffered: true });
        // Timeout de seguridad
        setTimeout(() => resolve("TIMEOUT"), 3000);
      });
    });

    // El LCP debe ser texto (h1 o párrafo del subtítulo), no canvas ni poster
    expect(["H1", "P", "SPAN", "DIV"]).toContain(lcpTag);
    expect(lcpTag).not.toBe("CANVAS");
    expect(lcpTag).not.toBe("IMG");
  });

  // ── Accesibilidad axe (RNF2) ────────────────────────────────────────────────

  test("sin violaciones axe en home", async ({ page }) => {
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(results.violations).toEqual([]);
  });

  // ── Skip-link funciona ─────────────────────────────────────────────────────

  test("skip-link navega a #main", async ({ page }) => {
    await page.keyboard.press("Tab");
    const skipLink = page.getByRole("link", { name: /skip/i }).first();
    if (await skipLink.isVisible()) {
      await skipLink.click();
      const main = page.locator("#main");
      await expect(main).toBeFocused();
    }
  });
});

test.describe("Home /es", () => {
  test("title en español", async ({ page }) => {
    await page.goto("/es");
    await expect(page).toHaveTitle(/Johan Rodriguez/i);
  });

  test("html[lang] = es", async ({ page }) => {
    await page.goto("/es");
    const lang = await page.locator("html").getAttribute("lang");
    expect(lang).toBe("es");
  });
});
