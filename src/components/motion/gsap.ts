"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Single registration point for GSAP plugins.
 *
 * Every motion component imports `gsap`/`ScrollTrigger` from here so plugins
 * are registered exactly once, and so the reduced-motion preference is resolved
 * in a single place instead of being re-queried in every component.
 */

let registered = false;

if (typeof window !== "undefined" && !registered) {
  gsap.registerPlugin(ScrollTrigger);
  registered = true;
}

/** Cached media-query result — re-read on change. */
let reducedMotionQuery: MediaQueryList | null = null;

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  if (!reducedMotionQuery) {
    reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  }
  return reducedMotionQuery.matches;
}

export { gsap, ScrollTrigger };