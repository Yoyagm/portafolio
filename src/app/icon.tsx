import { ImageResponse } from "next/og";

// Favicon generado: monograma "JR" sobre fondo terminal, acento verde guardián.
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#06090b",
          color: "#36d399",
          fontSize: 20,
          fontWeight: 700,
          fontFamily: "monospace",
          letterSpacing: "-1px",
          borderRadius: 6,
        }}
      >
        JR
      </div>
    ),
    { ...size },
  );
}
