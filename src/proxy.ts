import createMiddleware from "next-intl/middleware";
import { NextRequest } from "next/server";
import { routing } from "@/i18n/routing";
import { buildCsp, generateNonce } from "@/lib/csp";

// Next 16: middleware.ts → proxy.ts (runtime Node.js). Compone CSP por-nonce + i18n.
const handleI18n = createMiddleware(routing);
const isDev = process.env.NODE_ENV !== "production";

export function proxy(request: NextRequest) {
  const nonce = generateNonce();
  const csp = buildCsp(nonce, isDev);

  // Las cabeceras del NextRequest entrante son inmutables, así que reconstruimos
  // el request con las cabeceras aumentadas. next-intl clona internamente
  // `new Headers(request.headers)` y las propaga al RSC vía
  // NextResponse.next/rewrite({ request: { headers } }); así `(await headers())
  // .get("x-nonce")` y la CSP (de la que Next extrae el nonce para SUS scripts)
  // llegan al render. Patrón oficial de CSP de Next + composición de next-intl.
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);
  requestHeaders.set("content-security-policy", csp);

  const response = handleI18n(
    new NextRequest(request, { headers: requestHeaders }),
  );
  // CSP también en la RESPUESTA (la que recibe el navegador).
  response.headers.set("content-security-policy", csp);
  return response;
}

export const config = {
  // Excluye api, internos de Next, ingesta de Vercel (_vercel), archivos con
  // extensión (sitemap.xml, robots.txt, manifest.webmanifest, *.png…) y las
  // rutas de metadatos generadas SIN extensión (opengraph-image, icon,
  // apple-icon): si pasaran por el middleware i18n las redirigiría a
  // /en/opengraph-image y romperían los <meta> y el favicon.
  matcher: [
    "/",
    "/((?!api|_next|_vercel|opengraph-image|twitter-image|icon|apple-icon|.*\\..*).*)",
  ],
};
