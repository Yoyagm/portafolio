"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useReducedMotion } from "motion/react";
import { HeroPoster } from "./hero-poster";
import { WebGLBoundary } from "./webgl-boundary";

// Carga diferida de la escena: three/drei NO entran en el bundle inicial.
// ssr:false porque WebGL es exclusivo de cliente; el póster cubre el SSR/loading.
const Scene = dynamic(() => import("./scene"), {
  ssr: false,
  loading: () => <HeroPoster />,
});

type HeroMode = "poster" | "canvas";

// navigator.deviceMemory es no estándar: lo tipamos sin recurrir a `any`.
type NavigatorWithCapabilities = Navigator & {
  deviceMemory?: number;
};

// Soporte de WebGL: barato, sin red (CSP) y sin detect-gpu.
function supportsWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      canvas.getContext("webgl2") ?? canvas.getContext("webgl"),
    );
  } catch {
    return false;
  }
}

// Heurística de dispositivo débil: CPU con pocos hilos o RAM baja ⇒ póster.
// Conservadora a propósito: ante la duda, no arriesgar jank en el LCP.
function isLowEndDevice(): boolean {
  const nav = navigator as NavigatorWithCapabilities;
  const weakCpu =
    typeof nav.hardwareConcurrency === "number" && nav.hardwareConcurrency < 4;
  const weakMem =
    typeof nav.deviceMemory === "number" && nav.deviceMemory <= 4;
  return weakCpu || weakMem;
}

/**
 * Hero3D: orquesta póster ↔ canvas con todos los fallbacks.
 *
 * Contrato (lo consume el hero): contenedor `absolute inset-0` (el padre es
 * relative), decorativo (`aria-hidden`), sin texto expuesto. El color de acento
 * lo lee la escena del CSS var `--color-accent`.
 *
 * Política de degradación (ADR-002): reduced-motion / sin-WebGL / GPU débil ⇒
 * póster; FPS sostenido bajo (PerformanceMonitor) ⇒ póster; excepción en el loop
 * o pérdida de contexto ⇒ póster.
 */
export function Hero3D() {
  const reduced = useReducedMotion();
  // Arranca SIEMPRE en póster: el canvas solo se activa tras validar en cliente.
  const [mode, setMode] = useState<HeroMode>("poster");
  // Pausa fuera de viewport: desmonta la escena para liberar la GPU.
  const [visible, setVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  // La decisión de capacidad (WebGL/GPU) se toma una sola vez, perezosamente,
  // la primera vez que el hero se acerca al viewport.
  const decidedRef = useRef(false);

  // IntersectionObserver: (1) monta la escena solo cuando el hero está (casi) en
  // viewport; (2) decide modo en el CALLBACK (lugar sancionado para setState por
  // react-hooks, a diferencia del cuerpo de un effect) y solo prueba WebGL ahí.
  // Depende de `reduced`: si el usuario alterna reduced-motion, se re-observa y
  // se re-decide (re-montando o degradando según corresponda).
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    decidedRef.current = false;
    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        setVisible(entry.isIntersecting);
        if (entry.isIntersecting && !decidedRef.current) {
          decidedRef.current = true;
          const canRender3D =
            !reduced && supportsWebGL() && !isLowEndDevice();
          setMode(canRender3D ? "canvas" : "poster");
        }
      },
      { rootMargin: "300px 0px", threshold: 0 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduced]);

  const showCanvas = mode === "canvas" && visible;

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
    >
      {showCanvas ? (
        <WebGLBoundary
          fallback={<HeroPoster />}
          onError={() => setMode("poster")}
        >
          <Scene
            onDegrade={() => setMode("poster")}
            onError={() => setMode("poster")}
          />
        </WebGLBoundary>
      ) : (
        <HeroPoster />
      )}
    </div>
  );
}
