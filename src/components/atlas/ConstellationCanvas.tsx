"use client";

import { useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { Html, Preload } from "@react-three/drei";

import { useAtlas } from "@/components/providers/AtlasProvider";
import { usePathIds, SceneLines } from "./SceneLines";
import { SceneNodes } from "./SceneNodes";
import { SceneBackdrop } from "./SceneBackdrop";
import { CameraRig, GrowthBloom } from "./CameraRig";
import { computeLayout, type GraphLayout, type LayoutNode } from "@/lib/layout";
import { plateNumeral } from "@/lib/utils";

/**
 * The constellation.
 *
 * `computeLayout` is pure and deterministic, so running it here in `useMemo`
 * produces byte-identical geometry on the server and the client — there is no
 * hydration risk from the 3D pass, and the real dataset can be swapped in
 * without touching this file.
 */
export default function ConstellationCanvas() {
  const {
    locale,
    index,
    reducedMotion,
    selectedId,
    growthRef,
    showLabels,
  } = useAtlas();

  const layout: GraphLayout = useMemo(
    () => computeLayout(index, locale),
    [index, locale],
  );

  const pathIds = usePathIds(layout, selectedId);

  const labelNodes = useMemo(
    () => pickLabels(layout, selectedId, showLabels),
    [layout, selectedId, showLabels],
  );

  return (
    <Canvas
      dpr={[1, 1.75]}
      gl={{
        antialias: true,
        alpha: false,
        powerPreference: "high-performance",
      }}
      camera={{ fov: 42, near: 0.1, far: 900, position: [0, 40, 90] }}
      onCreated={({ gl }) => {
        gl.toneMappingExposure = 1.05;
      }}
    >
      <color attach="background" args={["#05080f"]} />

      <SceneBackdrop reducedMotion={reducedMotion} />
      <SceneLines
        layout={layout}
        growthRef={growthRef}
        pathIds={pathIds}
      />
      <SceneNodes layout={layout} growthRef={growthRef} pathIds={pathIds} />

      {/* Domain and field names, kept sparse so the sky stays legible. */}
      {labelNodes.map((node, i) => (
        <Html
          key={node.id}
          position={[node.x, node.y, node.z]}
          center
          zIndexRange={[8, 0]}
          style={{ pointerEvents: "none" }}
        >
          <span
            className={`plate-label whitespace-nowrap transition-opacity duration-500 ${
              node.depth === 0 ? "text-bone" : "text-bone-dim/70"
            }`}
            style={{ opacity: pathIds && !pathIds.includes(node.id) ? 0.22 : 0.95 }}
          >
            {node.depth === 0 ? (
              <>
                <span className="me-1.5 text-brass/70">{plateNumeral(i)}</span>
                {node.label}
              </>
            ) : (
              node.short
            )}
          </span>
        </Html>
      ))}

      <CameraRig layout={layout} />
      <GrowthBloom duration={reducedMotion ? 0 : 2.4} />
      <Preload all />
    </Canvas>
  );
}

/**
 * Labels are deliberately scarce. All ten domains are always named; field names
 * only appear inside the selected branch, so the constellation never turns into
 * an unreadable thicket of type.
 */
function pickLabels(
  layout: GraphLayout,
  selectedId: string | null,
  showLabels: boolean,
): LayoutNode[] {
  if (!showLabels) return [];

  const domains = layout.nodes.filter((n) => n.depth === 0 && n.label);
  if (!selectedId) return domains;

  const selected = layout.nodesById[selectedId];
  if (!selected) return domains;

  const children = layout.nodes.filter((n) => n.parent === selected.i && n.short);
  return [...domains, ...children];
}

/** Screen-reader text for the canvas region. */
export function GraphSummary() {
  const { stats, dictionary } = useAtlas();
  return (
    <p className="sr-only">
      {dictionary.a11y.graphSummary} {stats.total} {dictionary.graph.nodeCount}.
    </p>
  );
}