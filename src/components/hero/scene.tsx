"use client";

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { AdaptiveDpr, PerformanceMonitor } from "@react-three/drei";
import * as THREE from "three";

// ----------------------------------------------------------------------------
// Presupuesto y parámetros (ver ADR-002).
// ----------------------------------------------------------------------------
const NODE_COUNT = 480; // dentro del rango 300-600; 1 solo InstancedMesh.
const IMPOSTOR_RATIO = 0.06; // ~6% de "impostores" (slopsquatting).
const SEED = 0x9e3779b9; // semilla FIJA → disposición determinista (no Math.random a nivel módulo).

const FIELD_X = 4.6;
const FIELD_Y = 2.6;
const FIELD_Z = 3.0;

const NODE_RADIUS = 0.07;

// Ráfagas del wavefront.
const BURST_DURATION_MS = 1600;
const FIRST_BURST_DELAY_MS = 700;
const BURST_INTERVAL_MS = 5500;
const WAVE_Z_START = -FIELD_Z - 1.2;
const WAVE_Z_END = FIELD_Z + 1.2;
const WAVE_SIGMA = 0.7; // ancho de influencia del frente.

// Parallax por puntero.
const PARALLAX_MAX = 0.14; // rad máximos de inclinación del grupo.
const PARALLAX_EASE = 0.12; // factor de suavizado por frame.
const PARALLAX_EPSILON = 0.0008; // umbral para "asentado" → deja de pedir frames.

// Fallbacks de color si el CSS var no está disponible.
const FALLBACK_ACCENT = "#36d399";
const FALLBACK_ALERT = "#f5a524";

type SceneProps = {
  /** Degradación "suave": FPS sostenido bajo (PerformanceMonitor) → póster. */
  onDegrade: () => void;
  /** Degradación "dura": excepción en el loop / contexto perdido → póster. */
  onError: () => void;
};

// PRNG determinista (mulberry32). Sin estado a nivel módulo: se instancia con
// la semilla fija dentro del componente, garantizando SSR/CSR consistentes.
function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Lee un color desde un CSS custom property; degrada a fallback ante cualquier
// valor inválido o entorno sin DOM.
function readColor(varName: string, fallback: string): THREE.Color {
  if (typeof window === "undefined") return new THREE.Color(fallback);
  try {
    const raw = getComputedStyle(document.documentElement)
      .getPropertyValue(varName)
      .trim();
    return new THREE.Color(raw || fallback);
  } catch {
    return new THREE.Color(fallback);
  }
}

const lerp = (a: number, b: number, t: number): number => a + (b - a) * t;

type FieldData = {
  positions: Float32Array; // xyz por nodo.
  impostor: Uint8Array; // 1 = impostor.
  lineGeometry: THREE.BufferGeometry;
};

// Construye, una sola vez y de forma determinista, posiciones de nodos, flags de
// impostor y la geometría de aristas (vecino más cercano) en UNA BufferGeometry.
function buildField(): FieldData {
  const rand = mulberry32(SEED);
  const positions = new Float32Array(NODE_COUNT * 3);
  const impostor = new Uint8Array(NODE_COUNT);

  for (let i = 0; i < NODE_COUNT; i++) {
    positions[i * 3 + 0] = (rand() * 2 - 1) * FIELD_X;
    positions[i * 3 + 1] = (rand() * 2 - 1) * FIELD_Y;
    positions[i * 3 + 2] = (rand() * 2 - 1) * FIELD_Z;
    impostor[i] = rand() < IMPOSTOR_RATIO ? 1 : 0;
  }

  // Aristas: cada nodo se une a su vecino más cercano (grafo disperso). O(n^2)
  // una única vez en build (~230k iteraciones a 480 nodos) → coste despreciable.
  const segments: number[] = [];
  const seen = new Set<number>();
  for (let i = 0; i < NODE_COUNT; i++) {
    let best = -1;
    let bestDist = Infinity;
    const ix = positions[i * 3];
    const iy = positions[i * 3 + 1];
    const iz = positions[i * 3 + 2];
    for (let j = 0; j < NODE_COUNT; j++) {
      if (j === i) continue;
      const dx = ix - positions[j * 3];
      const dy = iy - positions[j * 3 + 1];
      const dz = iz - positions[j * 3 + 2];
      const d = dx * dx + dy * dy + dz * dz;
      if (d < bestDist) {
        bestDist = d;
        best = j;
      }
    }
    if (best < 0) continue;
    const key = i < best ? i * NODE_COUNT + best : best * NODE_COUNT + i;
    if (seen.has(key)) continue;
    seen.add(key);
    segments.push(
      ix,
      iy,
      iz,
      positions[best * 3],
      positions[best * 3 + 1],
      positions[best * 3 + 2],
    );
  }

  const lineGeometry = new THREE.BufferGeometry();
  lineGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(new Float32Array(segments), 3),
  );

  return { positions, impostor, lineGeometry };
}

/**
 * Field: contiene TODOS los hooks de R3F (deben vivir dentro de <Canvas>).
 * Maneja instancing, wavefront, parallax, y la robustez del loop.
 */
function Field({ onError }: { onError: () => void }) {
  const invalidate = useThree((s) => s.invalidate);
  const gl = useThree((s) => s.gl);

  const meshRef = useRef<THREE.InstancedMesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const waveRef = useRef<THREE.Mesh>(null);

  // Datos deterministas del campo (1 sola vez).
  const field = useMemo(() => buildField(), []);

  // Estado por impostor: una vez "revelado" por el frente, queda en cuarentena.
  // Contenedor mutable en un ref (NO useMemo): los valores creados en render no
  // deben mutarse tras el commit (regla react-hooks / React Compiler).
  const revealedRef = useRef<Uint8Array>(new Uint8Array(NODE_COUNT));

  // Objetos de trabajo reutilizables (sin asignaciones por frame).
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const tmpColor = useMemo(() => new THREE.Color(), []);

  // Paleta derivada de los tokens (acento/alerta) leídos del DOM al montar.
  const palette = useMemo(() => {
    const accent = readColor("--color-accent", FALLBACK_ACCENT);
    const alert = readColor("--color-alert", FALLBACK_ALERT);
    return {
      idle: accent.clone().multiplyScalar(0.42), // verde tenue (íntegro en reposo).
      bright: accent.clone(), // verde pleno (pulso al pasar el frente).
      alertBright: alert.clone(), // ámbar pleno (flash de impostor).
      quarantine: alert.clone().multiplyScalar(0.3), // ámbar atenuado (cuarentena).
      line: accent.clone().multiplyScalar(0.5),
    };
  }, []);

  // Geometría y material de los nodos (unlit: color por instancia 100% fiable
  // sobre negro, sin luces ni shader-patching → menos modos de fallo).
  const nodeGeometry = useMemo(
    () => new THREE.OctahedronGeometry(NODE_RADIUS, 0),
    [],
  );
  const nodeMaterial = useMemo(
    () => new THREE.MeshBasicMaterial({ transparent: true, toneMapped: false }),
    [],
  );

  // Material del frente: lo declaramos en JSX (R3F lo crea y lo dispone solo);
  // solo mutamos su opacidad en el loop a través de este ref (no es valor de render).
  const waveMatRef = useRef<THREE.MeshBasicMaterial>(null);
  const lineMaterial = useMemo(
    () =>
      new THREE.LineBasicMaterial({
        color: palette.line,
        transparent: true,
        opacity: 0.09,
        depthWrite: false,
        toneMapped: false,
      }),
    [palette],
  );

  // Estado mutable del loop (refs → sin re-render).
  const burst = useRef({ active: false, start: 0 });
  const parallaxTarget = useRef({ x: 0, y: 0 });
  const parallaxCurrent = useRef({ x: 0, y: 0 });

  // Escribe matrices + colores de todas las instancias para un Z de frente dado.
  // active=false ⇒ "asentado" (frente lejos): íntegros en reposo, impostores en
  // cuarentena si fueron revelados.
  const writeInstances = useCallback(
    (waveZ: number, active: boolean) => {
      const mesh = meshRef.current;
      if (!mesh) return;
      const { positions, impostor } = field;
      const { idle, bright, alertBright, quarantine } = palette;
      const revealed = revealedRef.current;
      const sigma2 = 2 * WAVE_SIGMA * WAVE_SIGMA;

      for (let i = 0; i < NODE_COUNT; i++) {
        const px = positions[i * 3];
        const py = positions[i * 3 + 1];
        const pz = positions[i * 3 + 2];

        // Proximidad gaussiana al frente (0..1).
        const dz = pz - waveZ;
        const prox = active ? Math.exp(-(dz * dz) / sigma2) : 0;

        let scale: number;
        if (impostor[i]) {
          if (active && prox > 0.55) revealed[i] = 1; // latch de cuarentena.
          const base = revealed[i] ? quarantine : idle;
          tmpColor.copy(base).lerp(alertBright, prox); // flash ámbar al paso.
          const settled = revealed[i] ? 0.5 : 1; // cuarentena = encoge.
          scale = lerp(settled, 1.4, prox);
        } else {
          tmpColor.copy(idle).lerp(bright, prox); // pulso verde íntegro.
          scale = lerp(1, 1.6, prox);
        }

        dummy.position.set(px, py, pz);
        dummy.scale.setScalar(scale);
        dummy.updateMatrix();
        mesh.setMatrixAt(i, dummy.matrix);
        mesh.setColorAt(i, tmpColor);
      }

      mesh.instanceMatrix.needsUpdate = true;
      if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    },
    [field, palette, dummy, tmpColor],
  );

  // Inicialización antes del primer paint: evita el flash de octaedros apilados
  // en el origen (matrices identidad) durante el render inicial de R3F.
  useLayoutEffect(() => {
    writeInstances(WAVE_Z_END + 100, false);
    if (waveRef.current) waveRef.current.visible = false;
    invalidate();
  }, [writeInstances, invalidate]);

  // Arranca una ráfaga: resetea el latch para re-animar y "patea" el loop.
  const startBurst = useCallback(() => {
    revealedRef.current.fill(0);
    burst.current.active = true;
    burst.current.start = performance.now();
    if (waveRef.current) waveRef.current.visible = true;
    invalidate(); // un frame ⇒ useFrame se auto-sostiene mientras dure.
  }, [invalidate]);

  // Scheduler de ráfagas. Respeta visibilidad de pestaña (setTimeout sigue
  // disparando oculto, pero rAF no pinta: evitamos trabajo inútil).
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    let cancelled = false;
    const run = () => {
      if (cancelled) return;
      if (document.visibilityState === "visible") startBurst();
      timer = setTimeout(run, BURST_INTERVAL_MS);
    };
    timer = setTimeout(run, FIRST_BURST_DELAY_MS);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [startBurst]);

  // Parallax dirigido por puntero. Se escucha en window (no en el canvas) para
  // NO bloquear clics del hero: el canvas permanece pointer-events-none. Solo
  // invalida; el suavizado vive en useFrame y se detiene al asentarse.
  useEffect(() => {
    const onPointerMove = (e: PointerEvent) => {
      const rect = gl.domElement.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      // Ignora punteros muy lejos del hero (no reaccionar a toda la página).
      if (nx < -1.6 || nx > 1.6 || ny < -1.6 || ny > 1.6) return;
      parallaxTarget.current.x = THREE.MathUtils.clamp(nx, -1, 1) * PARALLAX_MAX;
      parallaxTarget.current.y = THREE.MathUtils.clamp(ny, -1, 1) * PARALLAX_MAX;
      invalidate();
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", onPointerMove);
  }, [gl, invalidate]);

  // Context loss: prevenir el comportamiento por defecto permitiría restaurar,
  // pero por robustez (correctness > espectáculo) degradamos al póster.
  useEffect(() => {
    const canvas = gl.domElement;
    const onLost = (e: Event) => {
      e.preventDefault();
      onError();
    };
    canvas.addEventListener("webglcontextlost", onLost);
    return () => canvas.removeEventListener("webglcontextlost", onLost);
  }, [gl, onError]);

  // Loop bajo demanda: solo pide más frames si hay ráfaga activa o parallax sin
  // asentar. try/catch porque el ErrorBoundary NO captura excepciones de rAF.
  useFrame(() => {
    try {
      let needMore = false;

      // --- Wavefront ---
      const b = burst.current;
      if (b.active) {
        const t = (performance.now() - b.start) / BURST_DURATION_MS;
        if (t >= 1) {
          b.active = false;
          writeInstances(WAVE_Z_END + 100, false); // frame final asentado.
          if (waveRef.current) waveRef.current.visible = false;
        } else {
          const waveZ = lerp(WAVE_Z_START, WAVE_Z_END, t);
          if (waveRef.current) waveRef.current.position.z = waveZ;
          // Opacidad en campana (fade in/out) durante la ráfaga.
          if (waveMatRef.current) {
            waveMatRef.current.opacity = Math.sin(Math.PI * t) * 0.14;
          }
          writeInstances(waveZ, true);
          needMore = true;
        }
      }

      // --- Parallax (suavizado por evento, nunca en idle) ---
      const group = groupRef.current;
      if (group) {
        const cur = parallaxCurrent.current;
        const tgt = parallaxTarget.current;
        cur.x += (tgt.x - cur.x) * PARALLAX_EASE;
        cur.y += (tgt.y - cur.y) * PARALLAX_EASE;
        group.rotation.y = cur.x;
        group.rotation.x = cur.y;
        if (
          Math.abs(tgt.x - cur.x) > PARALLAX_EPSILON ||
          Math.abs(tgt.y - cur.y) > PARALLAX_EPSILON
        ) {
          needMore = true;
        }
      }

      if (needMore) invalidate();
    } catch (err) {
      if (process.env.NODE_ENV !== "production") {
        console.error("[Hero3D] useFrame error:", err);
      }
      onError(); // eleva al consumidor para degradar a póster.
    }
  });

  // Liberación explícita de recursos GPU creados imperativamente al desmontar.
  // (El material del frente es declarativo: R3F lo dispone automáticamente.)
  useEffect(() => {
    return () => {
      nodeGeometry.dispose();
      nodeMaterial.dispose();
      lineMaterial.dispose();
      field.lineGeometry.dispose();
    };
  }, [nodeGeometry, nodeMaterial, lineMaterial, field]);

  return (
    <group ref={groupRef}>
      {/* Nodos-paquete: 1 InstancedMesh = 1 draw call. */}
      <instancedMesh
        ref={meshRef}
        args={[nodeGeometry, nodeMaterial, NODE_COUNT]}
        frustumCulled={false}
      />

      {/* Aristas del grafo: 1 LineSegments = 1 draw call. */}
      <lineSegments geometry={field.lineGeometry} material={lineMaterial} />

      {/* Wavefront: plano translúcido que barre en Z durante la ráfaga.
          Aditivo sobre negro = glow; sin depthWrite para no romper el orden de
          transparencias del campo. */}
      <mesh ref={waveRef} renderOrder={1}>
        <planeGeometry args={[FIELD_X * 2.6, FIELD_Y * 2.6]} />
        <meshBasicMaterial
          ref={waveMatRef}
          color={palette.bright}
          transparent
          opacity={0}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

/**
 * Escena R3F. frameloop="demand" + invalidate ⇒ no se pinta en idle.
 * Export default para permitir el code-splitting vía next/dynamic.
 */
export default function Scene({ onDegrade, onError }: SceneProps) {
  return (
    <Canvas
      frameloop="demand"
      dpr={[1, 2]}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 6], fov: 50 }}
      // Fondo transparente: el hero aporta su propio bg casi-negro.
      style={{ background: "transparent" }}
    >
      {/* FPS sostenido bajo ⇒ degradar a póster (desmonta el Canvas). */}
      <PerformanceMonitor onFallback={() => onDegrade()} />
      <Field onError={onError} />
      {/* Baja el DPR bajo carga; pixelated evita reflow de tamaño. */}
      <AdaptiveDpr pixelated />
    </Canvas>
  );
}
