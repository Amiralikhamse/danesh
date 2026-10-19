"use client";

import { useEffect, useState } from "react";

import { useIntroSequence } from "./Reveal";
import { Curtain } from "./SmoothScroll";

/**
 * Waits for fonts to settle, then runs the hero's load sequence.
 *
 * Without this the sequence would fire while the display serif is still being
 * swapped in, and the title would visibly reflow mid-animation. The curtain
 * covers the first frames so the GSAP `from` states never flash.
 */
export function IntroTrigger() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const done = () => {
      if (!cancelled) setReady(true);
    };

    if (document.fonts?.status === "loaded") {
      // Still yield a frame so layout has settled before measuring.
      requestAnimationFrame(done);
    } else {
      document.fonts?.ready.then(done).catch(done);
    }

    // Never hold the page hostage to a font that refuses to load.
    const failsafe = window.setTimeout(done, 1800);

    return () => {
      cancelled = true;
      window.clearTimeout(failsafe);
    };
  }, []);

  useIntroSequence(ready);

  return <Curtain ready={ready} />;
}