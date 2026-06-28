/**
 * OG Image dinámico (T19, RF11.6).
 * Ruta: /api/og?locale=en&title=...
 * Runtime edge para latencia mínima con @vercel/og.
 * Usa inline styles (Satori no soporta Tailwind completo).
 */
import { ImageResponse } from "@vercel/og";
import { siteConfig } from "@/lib/site";

export const runtime = "edge";

const WIDTH = 1200;
const HEIGHT = 630;

export function GET(request: Request): ImageResponse {
  const { searchParams } = new URL(request.url);
  const locale = searchParams.get("locale") === "es" ? "es" : "en";
  const customTitle = searchParams.get("title");

  const name = "Johan Rodriguez";
  const role =
    locale === "es"
      ? "Ingeniero de Seguridad y AppSec"
      : "Security & AppSec Engineer";
  const tagline =
    locale === "es"
      ? "Cadena de suministro · Detección de amenazas · Python · CI"
      : "Supply-chain · Threat detection · Python · CI";
  // `||` (no `??`): un ?title= vacío también cae al rol, no a un heading vacío.
  const displayTitle = customTitle || role;

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: WIDTH,
          height: HEIGHT,
          background: "#06090b",
          padding: "64px 72px",
          fontFamily: "monospace",
        }}
      >
        {/* Accent line superior */}
        <div
          style={{
            display: "flex",
            width: 64,
            height: 4,
            background: "#36d399",
            borderRadius: 2,
          }}
        />

        {/* Contenido central */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <p
            style={{
              fontSize: 18,
              color: "#36d399",
              margin: 0,
              fontFamily: "monospace",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            {name}
          </p>
          <h1
            style={{
              fontSize: customTitle ? 48 : 54,
              fontWeight: 700,
              color: "#e6edf3",
              margin: 0,
              lineHeight: 1.15,
              maxWidth: 900,
            }}
          >
            {displayTitle}
          </h1>
          <p
            style={{
              fontSize: 22,
              color: "#93a1ad",
              margin: 0,
              marginTop: 8,
            }}
          >
            {tagline}
          </p>
        </div>

        {/* Footer */}
        <p
          style={{
            fontSize: 16,
            color: "#1b262d",
            margin: 0,
            fontFamily: "monospace",
          }}
        >
          {new URL(siteConfig.url).hostname}
        </p>
      </div>
    ),
    {
      width: WIDTH,
      height: HEIGHT,
    },
  );
}
