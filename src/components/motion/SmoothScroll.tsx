"use client";

import { useEffect, useRef, type ReactNode } from "react";

import { gsap, prefersReducedMotion, ScrollTrigger } from "./gsap";

/**
 * Lenis smooth scroll, driven by GSAP's ticker so there is exactly one rAF loop
 * in the app and ScrollTrigger never lags a frame behind the scroll position.
 *
 * Disabled entirely under reduced motion — the browser's native scroll is
 * already the accessible choice there.
 */
export function SmoothScroll({ children }: { children?: ReactNode }) {
  const lenisRef = useRef<import("lenis").default | null>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    let cancelled = false;
    let cleanup: (() => void) | undefined;

    // Imported lazily so reduced-motion visitors never download the bundle.
    void import("lenis").then(({ default: Lenis }) => {
      if (cancelled) return;

      const lenis = new Lenis({
        duration: 1.15,
        // Exponential ease-out: quick to respond, unhurried at rest.
        easing: (t: number) => Math.min(1, 1.001 - 2 ** (-10 * t)),
        wheelMultiplier: 1,
        touchMultiplier: 1.6,
        smoothWheel: true,
      });
      lenisRef.current = lenis;

      lenis.on("scroll", ScrollTrigger.update);

      const tick = (time: number) => {
        lenis.raf(time * 1000);
      };
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);

      cleanup = () => {
        gsap.ticker.remove(tick);
        lenis.destroy();
        lenisRef.current = null;
      };
    });

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  return <>{children}</>;
}

/**
 * Page-load curtain. Two brass hairlines wipe away once the font and layout
 * have settled — the plate being "developed", not a spinner.
 */
export function Curtain({ ready }: { ready: boolean }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ready) return;
    const element = ref.current;
    if (!element) return;

    if (prefersReducedMotion()) {
      element.style.display = "none";
      return;
    }

    const context = gsap.context(() => {
      gsap.to(element, {
        opacity: 0,
        duration: 0.9,
        delay: 0.15,
        ease: "power2.inOut",
        onComplete: () => {
          element.style.display = "none";
        },
      });
    }, element);

    return () => context.revert();
  }, [ready]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[70] flex items-center justify-center bg-ink-900"
    >
      <div className="flex flex-col items-center gap-3">
        <span className="h-px w-24 animate-pulse-soft bg-brass/70" />
        <span className="plate-label">Danesh</span>
        <span className="h-px w-24 bg-bone-faint/25" />
      </div>
    </div>
  );
}