// Endpoint de reportes CSP (RNF3.1). Parsea v1 (application/reports+json, array)
// y el legacy (application/csp-report). Loguea sin PII (sin IP, sin query strings).
export const runtime = "nodejs";

type CspReportBody = unknown;

function summarize(body: CspReportBody): string {
  try {
    return JSON.stringify(body).slice(0, 1500);
  } catch {
    return "[unserializable csp-report]";
  }
}

export async function POST(request: Request): Promise<Response> {
  try {
    const body = (await request.json()) as CspReportBody;
    if (body) {
      console.warn("[csp-report]", summarize(body));
    }
  } catch {
    // Cuerpo inválido o vacío: se ignora silenciosamente.
  }
  return new Response(null, { status: 204 });
}
