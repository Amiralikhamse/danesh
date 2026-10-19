"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Brass survey reticle that replaces the native cursor over the constellation.
 *
 * Pointer position is written straight to the DOM inside a single rAF loop from
 * a ref — routing pointermove through React state would re-render on every
 * mouse event. The native cursor is suppressed by `.atlas-canvas` in
 * `globals.css`, so nothing global is injected from here.
 */
export function Reticle({
  active,
  label,
}: {
  /** Only tracks while the pointer is over the canvas. */
  active: boolean;
  /** Node label shown beside the crosshair while hovering. */
  label?: string | null;
}) {
  const dotRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const target = useRef({ x: -100, y: -100 });
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    if (!active) return;

    const onMove = (event: PointerEvent) => {
      target.current.x = event.clientX;
      target.current.y = event.clientY;
    };
    const onLeaveWindow = () => {
      setHovering(false);
      target.current.x = -100;
    };

    let frame = 0;
    const loop = () => {
      const { x, y } = target.current;
      const visible = x > -50;
      const transform = `translate3d(${x}px, ${y}px, 0)`;

      const dot = dotRef.current;
      if (dot) {
        dot.style.opacity = visible ? "1" : "0";
        dot.style.transform = transform;
      }
      const tag = labelRef.current;
      if (tag) {
        tag.style.transform = transform;
      }

      frame = requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeaveWindow);
    frame = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeaveWindow);
      cancelAnimationFrame(frame);
    };
  }, [active]);

  const showLabel = hovering && Boolean(label);

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed start-0 top-0 z-[65] opacity-0 transition-opacity duration-300"
        style={{ willChange: "transform" }}
      >
        <div className="relative -translate-x-1/2 -translate-y-1/2">
          <span className="absolute left-0 top-1/2 block h-px w-7 -translate-y-1/2 bg-brass/55" />
          <span className="absolute top-0 left-1/2 block h-7 w-px -translate-x-1/2 bg-brass/55" />
          <span
            className={`absolute left-1/2 top-1/2 block -translate-x-1/2 -translate-y-1/2 rounded-full border border-brass/70 transition-all duration-300 ${
              hovering ? "h-3 w-3" : "h-1.5 w-1.5"
            }`}
          />
          {hovering && (
            <span className="absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 animate-pulse-soft rounded-full border border-brass/25" />
          )}
        </div>
      </div>

      <div
        ref={labelRef}
        aria-hidden="true"
        className={`pointer-events-none fixed start-0 top-0 z-[65] transition-opacity duration-200 ${
          showLabel ? "opacity-100" : "opacity-0"
        }`}
        style={{ willChange: "transform" }}
      >
        <div className="pointer-events-none absolute start-10 top-0 max-w-56 border-s border-brass/50 ps-2">
          <span className="plate-label block whitespace-nowrap text-bone">
            {label}
          </span>
        </div>
      </div>
    </>
  );
}