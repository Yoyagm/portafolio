"use client";

// Error global: se renderiza cuando falla el root layout.
// No puede usar next-intl ni los providers del layout → html/body propios.
interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ reset }: GlobalErrorProps) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          padding: "2rem",
          fontFamily: "ui-monospace, monospace",
          background: "#06090b",
          color: "#e6edf3",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <p
          style={{
            fontSize: "0.75rem",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: "#f5a524",
            marginBottom: "1rem",
          }}
        >
          error
        </p>
        <h1 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "0.75rem" }}>
          Something went wrong
        </h1>
        <p style={{ color: "#93a1ad", marginBottom: "1.5rem" }}>
          An unexpected error occurred. Please try again.
        </p>
        <button
          onClick={reset}
          style={{
            alignSelf: "flex-start",
            padding: "0.5rem 1rem",
            border: "1px solid #1b262d",
            borderRadius: "4px",
            background: "transparent",
            color: "#e6edf3",
            cursor: "pointer",
            fontFamily: "inherit",
            fontSize: "0.875rem",
          }}
        >
          Try again
        </button>
      </body>
    </html>
  );
}
