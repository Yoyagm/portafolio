/**
 * Smoke test de cabeceras de seguridad en producción (T24, RNF3.1-3.3).
 * Se ejecuta contra SMOKE_URL (URL del deploy real), NO contra localhost.
 *
 * Uso:
 *   SMOKE_URL=https://portafolio.vercel.app pnpm run test:smoke
 *
 * En CI post-deploy: se pasa SMOKE_URL como variable de entorno del step.
 */

import { test, expect, request as apiRequest } from "@playwright/test";

const SMOKE_URL = process.env.SMOKE_URL ?? "";

// Guarda: salta todo el archivo si no se proporciona SMOKE_URL
test.beforeAll(() => {
  if (!SMOKE_URL) {
    console.warn("SMOKE_URL no definida — saltando smoke tests de cabeceras.");
  }
});

test.describe("Security headers smoke test", () => {
  test.skip(!SMOKE_URL, "Requiere SMOKE_URL en el entorno");

  let headers: Record<string, string>;

  test.beforeAll(async () => {
    // Usamos la API de request sin browser para obtener solo las cabeceras.
    const ctx = await apiRequest.newContext({ baseURL: SMOKE_URL });
    const response = await ctx.get("/en");
    const raw = response.headers();
    // Las cabeceras HTTP vienen en minúsculas en Playwright
    headers = Object.fromEntries(
      Object.entries(raw).map(([k, v]) => [k.toLowerCase(), v]),
    );
    await ctx.dispose();
  });

  test("Strict-Transport-Security presente y con includeSubDomains", () => {
    const hsts = headers["strict-transport-security"] ?? "";
    expect(hsts).toContain("max-age=");
    expect(hsts).toContain("includeSubDomains");
  });

  test("X-Frame-Options = DENY", () => {
    expect(headers["x-frame-options"]).toBe("DENY");
  });

  test("X-Content-Type-Options = nosniff", () => {
    expect(headers["x-content-type-options"]).toBe("nosniff");
  });

  test("Referrer-Policy es strict-origin-when-cross-origin", () => {
    expect(headers["referrer-policy"]).toBe("strict-origin-when-cross-origin");
  });

  test("Content-Security-Policy incluye nonce y strict-dynamic", async () => {
    // La CSP se emite en la cabecera (no en meta tag); viene de proxy.ts
    const csp = headers["content-security-policy"] ?? "";
    expect(csp).toContain("strict-dynamic");
    expect(csp).toMatch(/nonce-[A-Za-z0-9+/=]+/);
    // No debe haber unsafe-eval en script-src
    expect(csp).not.toContain("unsafe-eval");
    // unsafe-inline solo permitido en style-src, no en script-src
    // (Con strict-dynamic, 'unsafe-inline' en script-src es ignorado pero no queremos que esté)
    const scriptSrc =
      csp
        .split(";")
        .find((d) => d.trim().startsWith("script-src"))
        ?.trim() ?? "";
    if (scriptSrc) {
      expect(scriptSrc).not.toContain("'unsafe-inline'");
    }
  });

  test("Permissions-Policy está presente", () => {
    const pp = headers["permissions-policy"] ?? "";
    expect(pp).toContain("camera=()");
    expect(pp).toContain("microphone=()");
  });

  test("El HTML renderizado incluye nonce en el script anti-FOUC", async () => {
    const ctx = await apiRequest.newContext({ baseURL: SMOKE_URL });
    const response = await ctx.get("/en");
    const html = await response.text();
    await ctx.dispose();

    expect(html).toMatch(/nonce="[A-Za-z0-9+/=]+"/);
    // JSON-LD Person con nonce (CSP compliance)
    expect(html).toContain('"@type":"Person"');
  });

  test("robots.txt accesible y válido", async () => {
    const ctx = await apiRequest.newContext({ baseURL: SMOKE_URL });
    const response = await ctx.get("/robots.txt");
    const text = await response.text();
    await ctx.dispose();

    expect(response.status()).toBe(200);
    // Next emite "User-Agent:" (mayúscula); comparamos sin distinguir caso.
    expect(text.toLowerCase()).toContain("user-agent:");
    expect(text.toLowerCase()).toContain("sitemap:");
  });

  test("sitemap.xml accesible", async () => {
    const ctx = await apiRequest.newContext({ baseURL: SMOKE_URL });
    const response = await ctx.get("/sitemap.xml");
    await ctx.dispose();

    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toContain("xml");
  });
});
