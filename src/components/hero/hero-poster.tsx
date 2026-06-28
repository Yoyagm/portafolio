/**
 * Fallback estático DECORATIVO del hero.
 *
 * Restricciones de performance (ver ADR-002):
 * - NO debe ser candidato a LCP: nada de <next/image priority> ni preload.
 *   Solo gradientes CSS + un patrón SVG inline (puntos + líneas evocando un
 *   grafo de paquetes), todo barato y sin descargas de red.
 * - `absolute inset-0` + `pointer-events-none`: vive detrás del texto del hero
 *   (que es el verdadero nodo LCP) y nunca intercepta clics.
 *
 * Es un componente de presentación puro (sin hooks de cliente) para que pueda
 * renderizarse también en servidor y servir de `loading` del import dinámico.
 */

// id único del <pattern> para evitar colisiones si el SVG se monta más de una vez.
const DOT_PATTERN_ID = "hero-poster-dots";

// Coordenadas FIJAS (sin Math.random a nivel módulo) de un pequeño grafo
// ilustrativo: nodos íntegros (acento) conectados, más un par de "impostores".
const GRAPH_NODES: ReadonlyArray<readonly [number, number]> = [
  [120, 90],
  [240, 150],
  [360, 70],
  [470, 180],
  [180, 250],
  [320, 300],
  [430, 260],
  [90, 200],
  [260, 60],
  [400, 360],
];

const GRAPH_EDGES: ReadonlyArray<readonly [number, number]> = [
  [0, 1],
  [1, 2],
  [2, 3],
  [0, 4],
  [4, 5],
  [5, 6],
  [1, 8],
  [4, 7],
  [5, 9],
  [3, 6],
];

// Índices marcados como "impostores" (se pintan en color de alerta).
const IMPOSTOR_NODES: ReadonlySet<number> = new Set([3, 9]);

export function HeroPoster() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
    >
      {/* Glow sutil de acento sobre fondo casi-negro transparente (el hero
          aporta su propio bg). color-mix mantiene el tinte ligado al token. */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_-10%,color-mix(in_oklab,var(--color-accent)_12%,transparent),transparent_55%)]" />

      <svg
        className="absolute inset-0 h-full w-full text-accent"
        viewBox="0 0 560 420"
        preserveAspectRatio="xMidYMid slice"
        role="presentation"
        focusable="false"
      >
        <defs>
          {/* Trama de puntos tenue que cubre todo el lienzo (campo de nodos). */}
          <pattern
            id={DOT_PATTERN_ID}
            x="0"
            y="0"
            width="28"
            height="28"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="2" cy="2" r="1.1" fill="currentColor" opacity="0.16" />
          </pattern>
        </defs>

        <rect width="560" height="420" fill={`url(#${DOT_PATTERN_ID})`} />

        {/* Aristas del grafo (líneas finas de bajo contraste). */}
        <g stroke="currentColor" strokeWidth="1" opacity="0.18">
          {GRAPH_EDGES.map(([a, b], i) => {
            const [x1, y1] = GRAPH_NODES[a];
            const [x2, y2] = GRAPH_NODES[b];
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />;
          })}
        </g>

        {/* Nodos íntegros (acento) e impostores (alerta/ámbar). */}
        {GRAPH_NODES.map(([cx, cy], i) => {
          const impostor = IMPOSTOR_NODES.has(i);
          return (
            <circle
              key={i}
              cx={cx}
              cy={cy}
              r={impostor ? 4.5 : 3.5}
              fill="currentColor"
              opacity={impostor ? 0.55 : 0.35}
              style={impostor ? { color: "var(--color-alert)" } : undefined}
            />
          );
        })}
      </svg>
    </div>
  );
}
