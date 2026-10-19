"use client";

import {
  useEffect,
  useRef,
  type ComponentType,
  type ElementType,
  type ReactNode,
  type Ref,
} from "react";

import { gsap, prefersReducedMotion, ScrollTrigger } from "./gsap";

interface RevealProps {
  children: ReactNode;
  /** Element to render. Defaults to `div`. */
  as?: ElementType;
  /** Seconds to wait before the tween starts. */
  delay?: number;
  /** Travel distance in pixels. */
  distance?: number;
  /** Seconds. */
  duration?: number;
  /** Stagger children by this many seconds instead of animating the wrapper. */
  stagger?: number;
  className?: string;
  /** Animation trigger. `view` scrolls it into view, `load` fires immediately. */
  trigger?: "view" | "load";
}

/**
 * Scroll reveal.
 *
 * Under reduced motion nothing moves and the content is simply present — the
 * wrapper must never be left invisible if the tween does not run.
 */
export function Reveal({
  children,
  as = "div",
  delay = 0,
  distance = 26,
  duration = 1.1,
  stagger,
  className = "",
  trigger = "view",
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (prefersReducedMotion()) {
      gsap.set(element, { clearProps: "all" });
      return;
    }

    const targets =
      stagger && element.children.length > 0
        ? Array.from(element.children)
        : [element];

    const context = gsap.context(() => {
      gsap.from(targets, {
        opacity: 0,
        y: stagger ? 0 : distance,
        duration,
        delay,
        ease: "power3.out",
        stagger: stagger ?? 0,
        scrollTrigger:
          trigger === "view"
            ? {
                trigger: element,
                start: "top 88%",
                once: true,
              }
            : undefined,
        // Elements must never be left invisible if the trigger never fires.
        onInterrupt: () => gsap.set(targets, { opacity: 1, y: 0 }),
      });
    }, element);

    return () => context.revert();
  }, [delay, distance, duration, stagger, trigger]);

  const Tag = as as ComponentType<{
    className?: string;
    children?: ReactNode;
    ref?: Ref<HTMLElement>;
  }>;

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}

/**
 * Line-by-line clip reveal for display type. Each line slides up from behind its
 * own mask — the mechanic that makes the hero feel engraved rather than faded.
 */
export function LineReveal({
  lines,
  className = "",
  lineClassName = "",
  delay = 0,
}: {
  lines: string[];
  className?: string;
  lineClassName?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    if (prefersReducedMotion()) {
      gsap.set(root.querySelectorAll("[data-line]"), { yPercent: 0, opacity: 1 });
      return;
    }

    const context = gsap.context(() => {
      gsap.from("[data-line]", {
        yPercent: 116,
        opacity: 0,
        duration: 1.5,
        delay,
        ease: "expo.out",
        stagger: 0.085,
      });
    }, root);

    return () => context.revert();
  }, [lines, delay]);

  return (
    <div ref={ref} className={className}>
      {lines.map((line, i) => (
        <span key={`${line}-${i}`} className="block overflow-hidden pb-[0.08em]">
          <span data-line className={`block will-change-transform ${lineClassName}`}>
            {line}
          </span>
        </span>
      ))}
    </div>
  );
}

/**
 * Page-load sequence for the hero. Kept separate from `Reveal` because it must
 * run on mount rather than on scroll, and because it staggers across several
 * unrelated elements in one coordinated timeline.
 */
export function useIntroSequence(ready: boolean) {
  const played = useRef(false);

  useEffect(() => {
    if (!ready || played.current) return;
    played.current = true;

    const reduce = prefersReducedMotion();
    const elements = gsap.utils.toArray<HTMLElement>("[data-intro]");

    if (reduce) {
      gsap.set(elements, { opacity: 1, y: 0, scaleX: 1 });
      document.documentElement.dataset.intro = "done";
      return;
    }

    const context = gsap.context(() => {
      const timeline = gsap.timeline({
        defaults: { ease: "expo.out" },
        onComplete: () => {
          document.documentElement.dataset.intro = "done";
        },
      });

      timeline
        .from("[data-intro='rule']", {
          scaleX: 0,
          transformOrigin: "left center",
          duration: 1.2,
        })
        .from(
          "[data-intro='eyebrow']",
          { opacity: 0, x: -14, duration: 0.9 },
          0.15,
        )
        .from(
          "[data-intro='title']",
          { opacity: 0, yPercent: 108, duration: 1.6, stagger: 0.09 },
          0.2,
        )
        .from(
          "[data-intro='lede']",
          { opacity: 0, y: 18, duration: 1.1 },
          0.72,
        )
        .from(
          "[data-intro='stat']",
          { opacity: 0, y: 12, duration: 0.8, stagger: 0.06 },
          0.9,
        )
        .from(
          "[data-intro='cta']",
          { opacity: 0, y: 14, duration: 0.9 },
          1.05,
        )
        .from(
          "[data-intro='marquee']",
          { opacity: 0, duration: 1 },
          1.2,
        );
    });

    return () => context.revert();
  }, [ready]);
}

/** Refresh ScrollTrigger after the canvas resizes the page height. */
export function useScrollRefresh(deps: unknown[] = []) {
  useEffect(() => {
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 220);
    return () => window.clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}