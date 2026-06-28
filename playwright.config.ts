import { defineConfig, devices } from "@playwright/test";

/**
 * Playwright config (T22).
 * - Proyecto "unit": tests sin browser (contactSchema, i18n utils).
 * - Proyecto "e2e": chromium, arranca Next.js si no está corriendo.
 */

const BASE_URL = process.env.PLAYWRIGHT_BASE_URL ?? "http://localhost:3000";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: [
    ["html", { open: "never", outputFolder: "playwright-report" }],
    ["list"],
  ],

  projects: [
    // Tests unitarios: no necesitan browser ni servidor
    {
      name: "unit",
      testMatch: /tests\/unit\/.*\.test\.ts/,
    },
    // E2E: chromium desktop
    {
      name: "e2e",
      testMatch: /tests\/e2e\/.*\.spec\.ts/,
      use: {
        ...devices["Desktop Chrome"],
        baseURL: BASE_URL,
        // Captura de video solo en fallo
        video: "on-first-retry",
        trace: "on-first-retry",
      },
    },
  ],

  // Servidor Next.js para E2E (se reutiliza si ya está corriendo en dev)
  webServer: {
    command: process.env.CI
      ? "pnpm build && pnpm start"
      : "pnpm dev",
    url: BASE_URL,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
    env: {
      // Evita que el servidor de test use vars de producción
      NODE_ENV: process.env.CI ? "production" : "development",
    },
  },
});
