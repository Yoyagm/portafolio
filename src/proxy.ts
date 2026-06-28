import createMiddleware from "next-intl/middleware";
import type { NextRequest } from "next/server";
import { routing } from "@/i18n/routing";

// Next 16: middleware.ts → proxy.ts (runtime Node.js). La CSP por-nonce se compone
// aquí en T05 (mutando las cabeceras del request entrante antes de next-intl).
const handleI18n = createMiddleware(routing);

export function proxy(request: NextRequest) {
  return handleI18n(request);
}

export const config = {
  // Excluye api, internos de Next, ingesta de Vercel (_vercel) y archivos con extensión.
  matcher: ["/", "/((?!api|_next|_vercel|.*\\..*).*)"],
};
