import { ImageResponse } from "next/og";

// Icono para iOS (home screen): monograma con marco, mismo lenguaje visual.
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
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
          fontSize: 96,
          fontWeight: 700,
          fontFamily: "monospace",
          letterSpacing: "-4px",
          border: "6px solid #14241d",
          borderRadius: 36,
        }}
      >
        JR
      </div>
    ),
    { ...size },
  );
}
