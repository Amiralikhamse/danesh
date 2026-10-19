"use client";

import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import type { ComponentRef } from "react";

import { useAtlas } from "@/components/providers/AtlasProvider";
import { gsap } from "@/components/motion/gsap";
import { frameCamera, focusFrame, type GraphLayout } from "@/lib/layout";

type ControlsRef = ComponentRef<typeof OrbitControls>;

/**
 * Camera behaviour.
 *
 * Two distinct concerns:
 *   - framing: fit the whole arrangement on mount and whenever the viewport
 *     aspect changes, so the dome always fills the frame sensibly;
 *   - flight: when a selection changes, tween the camera and the orbit target
 *     together to the selected subtree's centroid.
 *
 * Auto-rotation stops the moment the user takes control and never resumes
 * fighting them.
 */
export function CameraRig({ layout }: { layout: GraphLayout }) {
  const { camera, size } = useThree();
  const controlsRef = useRef<ControlsRef>(null);
  const { cameraRequest, selectedId, autoRotate, reducedMotion, select } =
    useAtlas();
  const flying = useRef(false);

  /* ---- framing on mount / resize ---- */
  useEffect(() => {
    const aspect = size.width / Math.max(size.height, 1);
    const frame = frameCamera(layout, { aspect });

    camera.position.set(frame.position[0], frame.position[1], frame.position[2]);
    camera.lookAt(frame.target[0], frame.target[1], frame.target[2]);

    const controls = controlsRef.current;
    if (controls) {
      controls.target.set(frame.target[0], frame.target[1], frame.target[2]);
      controls.update();
    }
    // Re-framing on resize is deliberate: the graph is framed, not tracked.
  }, [camera, layout, size.width, size.height]);

  /* ---- flight to / from a selection ---- */
  useEffect(() => {
    const controls = controlsRef.current;
    if (!controls) return;

    const target = selectedId
      ? focusFrame(layout, selectedId)
      : frameCamera(layout, { aspect: size.width / Math.max(size.height, 1) });

    if (!target) {
      select(null);
      return;
    }

    if (reducedMotion) {
      camera.position.set(...target.position);
      controls.target.set(...target.target);
      controls.update();
      return;
    }

    flying.current = true;

    // Read the live position into plain numbers up front. The react-hooks
    // immutability rule flags mutating `camera.position`/`controls.target`
    // directly, which is exactly what these tweens are for.
    const from: { position: [number, number, number]; target: [number, number, number] } = {
      position: [camera.position.x, camera.position.y, camera.position.z],
      target: [controls.target.x, controls.target.y, controls.target.z],
    };

    const tl = gsap.timeline({
      onComplete: () => {
        flying.current = false;
      },
    });

    tl.to(from.position, {
        x: target.position[0],
        y: target.position[1],
        z: target.position[2],
        duration: 1.5,
        ease: "power3.inOut",
        onUpdate: () => camera.position.set(...from.position),
      }, 0)
    .to(from.target, {
        x: target.target[0],
        y: target.target[1],
        z: target.target[2],
        duration: 1.5,
        ease: "power3.inOut",
        onUpdate: () => {
          controls.target.set(...from.target);
          controls.update();
        },
      }, 0);

    return () => {
      tl.kill();
      flying.current = false;
    };
  }, [camera, cameraRequest.token, layout, reducedMotion, select, selectedId, size.width, size.height]);

  /* ---- gentle auto-rotation ---- */
  useFrame((_, delta) => {
    if (reducedMotion || flying.current || !autoRotate) return;
    const controls = controlsRef.current;
    if (!controls) return;
    controls.setAzimuthalAngle(controls.getAzimuthalAngle() + delta * 0.035);
  });

  return (
    <OrbitControls
      ref={controlsRef}
      makeDefault
      enablePan={false}
      enableDamping
      dampingFactor={0.055}
      rotateSpeed={0.55}
      zoomSpeed={0.7}
      minDistance={layout.extent * 0.35}
      maxDistance={layout.extent * 3.4}
      minPolarAngle={0.15}
      maxPolarAngle={Math.PI * 0.62}
    />
  );
}

/**
 * Growth bloom.
 *
 * Tweens `growthRef.current` 0 → 1 and mirrors it into provider state so the
 * rail's scrubber can display and re-drive it. Starting from 0 only after mount
 * keeps server and client markup identical — the curtain hides the first frame
 * either way.
 */
export function GrowthBloom({ duration = 2.4 }: { duration?: number }) {
  const { growthRef, growthToken, setGrowth, reducedMotion } = useAtlas();

  useEffect(() => {
    // GSAP drives a plain local object; the shared ref and React state are only
    // ever written from tween callbacks, never synchronously in the effect body.
    const tweenTarget = { value: 0 };

    const sync = () => {
      growthRef.current = tweenTarget.value;
      setGrowth(tweenTarget.value);
    };

    if (reducedMotion) {
      tweenTarget.value = 1;
      sync();
      return;
    }

    const tween = gsap.to(tweenTarget, {
      value: 1,
      duration,
      ease: "power2.inOut",
      onUpdate: sync,
    });

    return () => {
      tween.kill();
    };
  }, [duration, growthRef, growthToken, reducedMotion, setGrowth]);

  return null;
}

/** Keeps the WebGL context healthy across tab switches and resizes. */
export function useSceneHealth() {
  const { gl } = useThree();
  useEffect(() => {
    gl.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
  }, [gl]);
}