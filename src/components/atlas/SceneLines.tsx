"use client";

import { useEffect, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

import type { GraphLayout } from "@/lib/layout";
import { pathTo } from "@/lib/layout";

/**
 * The branch pass.
 *
 * One `LineSegments` draw call for the whole tree. Two custom attributes carry
 * everything the fragment stage needs:
 *
 *   `aDepth` — the child's tier, so the growth bloom can reveal outward from
 *              the root entirely on the GPU with no per-frame CPU work;
 *   `aPath`  — 1 when both endpoints lie on the selected root→node chain, which
 *              is what ignites the brass thread through the tree.
 *
 * Additive blending plus `depthWrite: false` makes the lines read as light
 * rather than as geometry, so overlapping branches build up density instead of
 * z-fighting.
 */
export function SceneLines({
  layout,
  growthRef,
  pathIds,
  opacity = 1,
}: {
  layout: GraphLayout;
  growthRef: { current: number };
  /** Root-first id chain of the current selection, or null. */
  pathIds: string[] | null;
  opacity?: number;
}) {
  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const edgeCount = layout.edges.length;

    const positions = new Float32Array(edgeCount * 6);
    const aDepth = new Float32Array(edgeCount * 2);
    const aPath = new Float32Array(edgeCount * 2);

    layout.edges.forEach((edge, i) => {
      const f = edge.from * 3;
      const t = edge.to * 3;
      const o = i * 6;

      positions[o + 0] = layout.positions[f + 0];
      positions[o + 1] = layout.positions[f + 1];
      positions[o + 2] = layout.positions[f + 2];
      positions[o + 3] = layout.positions[t + 0];
      positions[o + 4] = layout.positions[t + 1];
      positions[o + 5] = layout.positions[t + 2];

      aDepth[i * 2 + 0] = edge.depth;
      aDepth[i * 2 + 1] = edge.depth;
    });

    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    g.setAttribute("aDepth", new THREE.BufferAttribute(aDepth, 1));
    g.setAttribute("aPath", new THREE.BufferAttribute(aPath, 1));
    g.setAttribute(
      "aColor",
      new THREE.BufferAttribute(new Float32Array(layout.edgeColors), 3),
    );

    return g;
  }, [layout]);

  const { uniforms, material } = useMemo(() => {
    const u = {
      uGrowth: { value: 0 },
      uRevealDepth: { value: layout.maxDepth + 1 },
      uSelect: { value: 0 },
      uOpacity: { value: opacity },
    };

    return {
      uniforms: u,
      material: new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        uniforms: u,
        vertexShader: /* glsl */ `
          attribute float aDepth;
          attribute float aPath;
          attribute vec3 aColor;

          uniform float uGrowth;
          uniform float uRevealDepth;
          uniform float uSelect;

          varying float vAlpha;
          varying vec3 vColor;

          void main() {
            // Reveal outward from the root, one tier at a time.
            float reveal = uGrowth * uRevealDepth;
            float grow = 1.0 - smoothstep(reveal - 0.7, reveal, aDepth);

            // With a selection active, the chain stays hot and everything else
            // recedes to a cold dim — the single most important read in the UI.
            float sel = mix(1.0, mix(0.13, 1.45, aPath), uSelect);

            vAlpha = grow * sel;
            vColor = aColor * mix(1.0, 1.35, aPath * uSelect);

            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: /* glsl */ `
          varying float vAlpha;
          varying vec3 vColor;
          uniform float uOpacity;

          void main() {
            gl_FragColor = vec4(vColor, vAlpha * uOpacity);
          }
        `,
      }),
    };
  }, [layout.maxDepth, opacity]);

  useEffect(() => {
    return () => {
      geometry.dispose();
      material.dispose();
    };
  }, [geometry, material]);

  // Recompute which edges belong to the selected chain.
  useEffect(() => {
    const attribute = geometry.getAttribute("aPath") as THREE.BufferAttribute;
    const values = attribute.array as Float32Array;
    values.fill(0);
    if (pathIds) {
      const onPath = new Set(pathIds);
      layout.edges.forEach((edge, i) => {
        if (
          onPath.has(layout.nodes[edge.from]?.id) &&
          onPath.has(layout.nodes[edge.to]?.id)
        ) {
          values[i * 2 + 0] = 1;
          values[i * 2 + 1] = 1;
        }
      });
    }
    attribute.needsUpdate = true;
    // Shader uniforms are imperative GPU state owned by Three.js.
    // eslint-disable-next-line react-hooks/immutability
    uniforms.uSelect.value = pathIds ? 1 : 0;
  }, [geometry, layout, uniforms, pathIds]);

  /*
   * Reading `growthRef` (a ref owned by the provider) is the sanctioned escape
   * hatch here: per-frame uniform writes cannot live in React state without
   * forcing 60 re-renders a second, and the ref is explicitly mutable.
   */
  // eslint-disable-next-line react-hooks/immutability -- Three.js owns this value.
  useFrame(() => {
    // eslint-disable-next-line react-hooks/immutability -- GPU uniform write.
    uniforms.uGrowth.value = growthRef.current;
  });

  return (
    <lineSegments geometry={geometry} frustumCulled={false} renderOrder={1}>
      <primitive object={material} attach="material" />
    </lineSegments>
  );
}

/** Convenience: derive the path array the line pass wants from a selection. */
export function usePathIds(
  layout: GraphLayout,
  selectedId: string | null,
): string[] | null {
  return useMemo(
    () => (selectedId ? pathTo(layout, selectedId) : null),
    [layout, selectedId],
  );
}