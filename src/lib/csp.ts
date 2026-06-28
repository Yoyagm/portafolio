/**
 * Content-Security-Policy estricta basada en nonce (RNF3.1, ADR-004).
 * - El nonce va SOLO en script-src (con 'strict-dynamic'); style-src usa
 *   'self' 'unsafe-inline' porque R3F/Motion serializan style="" inline y, por
 *   CSP3, un nonce en style-src haría que 'unsafe-inline' se ignore.
 * - Sin 'unsafe-eval'/'unsafe-inline' en script-src (prod). En dev se relaja.
 */

export function generateNonce(): string {
  return Buffer.from(crypto.randomUUID()).toString("base64");
}

export function buildCsp(nonce: string, isDev: boolean): string {
  const scriptSrc = isDev
    ? `'self' 'nonce-${nonce}' 'strict-dynamic' 'unsafe-eval'`
    : `'self' 'nonce-${nonce}' 'strict-dynamic'`;

  // En dev, Next usa WebSocket para HMR.
  const connectSrc = isDev ? `'self' ws: wss:` : `'self'`;

  return [
    `default-src 'self'`,
    `script-src ${scriptSrc}`,
    `style-src 'self' 'unsafe-inline'`,
    `img-src 'self' data: blob:`,
    `font-src 'self'`,
    `connect-src ${connectSrc}`,
    `worker-src 'self' blob:`,
    `manifest-src 'self'`,
    `object-src 'none'`,
    `base-uri 'none'`,
    `frame-ancestors 'none'`,
    `form-action 'self'`,
    `upgrade-insecure-requests`,
    `report-uri /api/csp-report`,
    `report-to csp`,
  ].join("; ");
}
