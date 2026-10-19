"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

import { useAtlas } from "@/components/providers/AtlasProvider";
import { ACCENT_RGB, type GraphLayout } from "@/lib/layout";
import { ROOT_ID, type AccentToken } from "@/lib/types";

const BRASS = new THREE.Color(...ACCENT_RGB.brass);
const COLD = new THREE.Color(0.28, 0.34, 0.46);

/**
 * The node pass.
 *
 * Every non-root node is one instance in a single `InstancedMesh`. Matrices are
 * only rewritten when something actually changes (growth ticking, hover moving),
 * tracked with a dirty flag, so an idle graph costs no CPU work.
 *
 * Colour is the other half of the selection read: the selected chain goes hot
 * brass, everything else collapses toward a cold blue-grey.
 */
export function SceneNodes({
  layout,
  growthRef,
  pathIds,
}: {
  layout: GraphLayout;
  growthRef: { current: number };
  pathIds: string[] | null;
}) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const { hoveredId, selectedId, setHovered, select, dictionary } = useAtlas();

  // The synthetic root gets its own brass sun below.
  const nodes = useMemo(
    () => layout.nodes.filter((n) => n.id !== ROOT_ID),
    [layout],
  );

  const onPath = useMemo(() => new Set(pathIds ?? []), [pathIds]);
  const hoveredIndex = useMemo(
    () => nodes.findIndex((n) => n.id === hoveredId),
    [hoveredId, nodes],
  );

  const dummy = useMemo(() => new THREE.Object3D(), []);
  const tint = useMemo(() => new THREE.Color(), []);
  const lastGrowth = useRef(-1);
  const lastHover = useRef(-1);

  /* ---- per-instance colour: only on selection change ---- */
  useEffect(() => {
    const mesh = meshRef.current;
    if (!mesh) return;

    nodes.forEach((node, i) => {
      const base = ACCENT_RGB[node.accent as AccentToken] ?? ACCENT_RGB.brass;
      tint.setRGB(base[0], base[1], base[2]);

      if (onPath.has(node.id)) {
        // The chain itself burns brass, whatever its domain accent was.
        tint.lerp(BRASS, 0.72);
      } else if (pathIds) {
        tint.lerp(COLD, 0.82);
      }

      if (node.id === selectedId) tint.multiplyScalar(1.9);
      else if (node.id === hoveredId) tint.multiplyScalar(1.55);

      mesh.setColorAt(i, tint);
    });

    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  }, [nodes, onPath, pathIds, selectedId, hoveredId, tint]);

  /* ---- instance matrices: on growth tick or hover move ---- */
  useFrame(() => {
    const mesh = meshRef.current;
    if (!mesh) return;

    const growth = growthRef.current;
    const hover = hoveredIndex;
    if (
      Math.abs(growth - lastGrowth.current) < 0.0005 &&
      hover === lastHover.current
    ) {
      return;
    }
    lastGrowth.current = growth;
    lastHover.current = hover;

    const revealDepth = layout.maxDepth + 1;
    const reach = growth * revealDepth;

    nodes.forEach((node, i) => {
      // Soft pop: each tier swells in over the last 40% of its reveal window.
      const window = reach - node.depth;
      const appear = THREE.MathUtils.clamp(window / 0.9, 0, 1);
      const eased = appear * appear * (3 - 2 * appear);

      const isHover = i === hover;
      const base = layout.radii[node.i] * 0.62;
      const scale = eased * base * (isHover ? 1.85 : 1);

      dummy.position.set(node.x, node.y, node.z);
      dummy.scale.setScalar(scale);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    });

    mesh.instanceMatrix.needsUpdate = true;
  });

  const handleMove = (event: { instanceId?: number }) => {
    if (event.instanceId === undefined) return;
    const node = nodes[event.instanceId];
    if (node) setHovered(node.id);
  };

  const handleClick = (event: { instanceId?: number }) => {
    if (event.instanceId === undefined) return;
    const node = nodes[event.instanceId];
    if (!node) return;
    // Clicking the selected node again clears the selection.
    select(node.id === selectedId ? null : node.id);
  };

  return (
    <>
      <instancedMesh
        ref={meshRef}
        args={[undefined, undefined, nodes.length]}
        frustumCulled={false}
        renderOrder={2}
        onPointerMove={handleMove}
        onPointerOut={() => setHovered(null)}
        onClick={handleClick}
      >
        <sphereGeometry args={[1, 10, 8]} />
        <meshBasicMaterial
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          opacity={0.95}
        />
      </instancedMesh>

<RootSun growthRef={growthRef} label={dictionary.meta.title} />
    </>
  );
}

/**
 * The root: a slowly turning faceted brass core with a halo. Rendered separately
 * from the instance pass because it should not be pickable — clicking it clears
 * the view rather than selecting an entry.
 */
function RootSun({
  growthRef,
  label,
}: {
  growthRef: { current: number };
  label: string;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const haloRef = useRef<THREE.Mesh>(null);
  const { reducedMotion, select } = useAtlas();

  useFrame((_, delta) => {
    const group = groupRef.current;
    if (!group) return;

    // `growth` is a ref, so visibility cannot be derived during render.
    group.visible = growthRef.current > 0.01;

    if (reducedMotion) return;
    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.22;
      coreRef.current.rotation.x += delta * 0.08;
    }
    if (haloRef.current) {
      const pulse = 1 + Math.sin(performance.now() * 0.0012) * 0.09;
      haloRef.current.scale.setScalar(
        3.1 * pulse * Math.max(growthRef.current, 0.001),
      );
    }
  });

  return (
    <group
      ref={groupRef}
      visible={false}
      onClick={() => select(null)}
      userData={{ rootLabel: label }}
    >
      <mesh ref={coreRef} renderOrder={3}>
        <icosahedronGeometry args={[1.05, 1]} />
        <meshStandardMaterial
          color={BRASS}
          emissive={BRASS}
          emissiveIntensity={0.85}
          roughness={0.28}
          metalness={0.9}
          flatShading
          toneMapped={false}
        />
      </mesh>

      <mesh ref={haloRef} renderOrder={2}>
        <sphereGeometry args={[1, 16, 12]} />
        <meshBasicMaterial
          color={BRASS}
          transparent
          opacity={0.11}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      <pointLight color={BRASS} intensity={26} distance={22} decay={2} />
    </group>
  );
}