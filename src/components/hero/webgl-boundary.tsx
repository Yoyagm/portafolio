"use client";

import { Component, type ErrorInfo, type ReactNode } from "react";

type WebGLBoundaryProps = {
  /** UI a mostrar si la escena WebGL lanza (típicamente el póster estático). */
  fallback: ReactNode;
  /** Notificación al consumidor para que degrade el modo a "poster". */
  onError?: () => void;
  children: ReactNode;
};

type WebGLBoundaryState = {
  hasError: boolean;
};

/**
 * ErrorBoundary específico para la escena R3F.
 *
 * Solo captura errores lanzados durante el render/montaje del árbol React de la
 * escena (p. ej. fallo al crear el contexto WebGL, drei que peta en mount). NO
 * captura excepciones del loop de animación (requestAnimationFrame): esas se
 * manejan con try/catch dentro de useFrame, que eleva vía el prop `onError` de
 * la escena. Por eso el contrato de degradación necesita AMBOS caminos.
 */
export class WebGLBoundary extends Component<
  WebGLBoundaryProps,
  WebGLBoundaryState
> {
  state: WebGLBoundaryState = { hasError: false };

  static getDerivedStateFromError(): WebGLBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    // Log explícito (sin tragar el error en silencio) + señal de degradado.
    if (process.env.NODE_ENV !== "production") {
      console.error("[Hero3D] WebGL scene crashed:", error, info.componentStack);
    }
    this.props.onError?.();
  }

  render(): ReactNode {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}
