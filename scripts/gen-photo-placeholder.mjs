// Genera public/me.jpg (retrato 4:5) a partir del HTML del placeholder.
// Uso: node scripts/gen-photo-placeholder.mjs <ruta-html>
import { chromium } from "@playwright/test";

const htmlPath = process.argv[2];
if (!htmlPath) {
  console.error("Falta la ruta del HTML.");
  process.exit(1);
}

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 800, height: 1000 } });
await page.goto(`file://${htmlPath}`, { waitUntil: "networkidle" });
await page.screenshot({ path: "public/me.jpg", type: "jpeg", quality: 90 });
await browser.close();
console.log("OK → public/me.jpg");
