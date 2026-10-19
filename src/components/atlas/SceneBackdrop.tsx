"use client";

import { useEffect, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import * as THREE from "three";

/**
 * The sky the constellation hangs in.
 *
 * A single inside-out sphere with a hand-written gradient rather than an HDRI
 * environment: no network fetch, no extra payload, and the colour stops can be
 * tuned to sit exactly against the ink ground.
 */
export function SceneBackdrop({ reducedMotion }: { reducedMotion: boolean }) {
  const geometry = useMemo(() => new THREE.SphereGeometry(320, 48, 32), []);

  /* Kept in a ref so the frame loop never touches a memoised value. */
  const { uniforms, material } = useMemo(() => {
    const u = {
      uTime: { value: 0 },
      uTop: { value: new THREE.Color("#0a1220") },
      uHorizon: { value: new THREE.Color("#05080f") },
      uGlow: { value: new THREE.Color("#d9a441") },
    };

    return {
      uniforms: u,
      material: new THREE.ShaderMaterial({
        side: THREE.BackSide,
        depthWrite: false,
        uniforms: u,
        vertexShader: /* glsl */ `
          varying vec3 vPos;
          void main() {
            vPos = position;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: /* glsl */ `
          varying vec3 vPos;
          uniform vec3 uTop;
          uniform vec3 uHorizon;
          uniform vec3 uGlow;
          uniform float uTime;

          void main() {
            vec3 dir = normalize(vPos);
            float h = clamp(dir.y * 0.5 + 0.5, 0.0, 1.0);

            // Cool zenith falling to ink at the nadir.
            vec3 color = mix(uHorizon, uTop, pow(h, 1.35));

            // One warm bloom behind the constellation, breathing slowly.
            float bloom = smoothstep(0.62, 0.0, length(dir.xz - vec2(-0.34, -0.52)));
            color += uGlow * bloom * (0.055 + 0.02 * sin(uTime * 0.35));

            // Faint verdigris counter-light so the sky is never monochrome.
            float cool = smoothstep(0.5, 0.0, length(dir.xz - vec2(0.66, 0.42)));
            color += vec3(0.16, 0.42, 0.38) * cool * 0.03;

            gl_FragColor = vec4(color, 1.0);
          }
        `,
      }),
    };
  }, []);

  useEffect(() => {
    return () => {
      geometry.dispose();
      material.dispose();
    };
  }, [geometry, material]);

  useFrame((_, delta) => {
    if (reducedMotion) return;
    /*
     * Shader uniforms are imperative GPU state owned by Three.js, not React
     * state. Writing `.value` here is the entire point of the uniform, and the
     * React Compiler's immutability rule has no model for it.
     */
    // eslint-disable-next-line react-hooks/immutability
    uniforms.uTime.value += delta;
  });

  return (
    <group>
      <mesh geometry={geometry} material={material} frustumCulled={false} />

      {/* Two dust fields at different scales give the volume some depth. */}
      <Stars
        radius={140}
        depth={70}
        count={900}
        factor={2.4}
        saturation={0}
        fade
        speed={reducedMotion ? 0 : 0.35}
      />
      <Stars
        radius={210}
        depth={90}
        count={500}
        factor={4.2}
        saturation={0.2}
        fade
        speed={reducedMotion ? 0 : 0.18}
      />
    </group>
  );
}