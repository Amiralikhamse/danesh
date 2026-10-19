"use client";

import { useEffect, useRef } from "react";

import { useAtlas } from "@/components/providers/AtlasProvider";

/**
 * Growth scrubber.
 *
 * Drags the bloom forward and backward. Because `growthRef` is a plain mutable
 * scalar shared with the render loop, scrubbing is frame-accurate with no
 * React involvement at all — the input writes to the ref and the GPU follows.
 */
export function GrowthScrubber() {
  const {
    growthRef,
    growthPercent,
    setGrowth,
    replayGrowth,
    reducedMotion,
    dictionary,
  } = useAtlas();
  const inputRef = useRef<HTMLInputElement>(null);

  // Keep the thumb in sync when the bloom (or a replay) moves it.
  useEffect(() => {
    const input = inputRef.current;
    if (!input) return;
    if (Number(input.value) !== growthPercent) {
      input.value = String(growthPercent);
    }
  }, [growthPercent]);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-baseline justify-between gap-3">
        <span className="plate-label">{dictionary.rail.growth}</span>
        <span className="font-mono text-[0.625rem] tabular-nums text-brass/80">
          {growthPercent.toString().padStart(3, "0")}%
        </span>
      </div>

      <input
        ref={inputRef}
        type="range"
        min={0}
        max={100}
        step={1}
        defaultValue={0}
        aria-label={dictionary.rail.growth}
        aria-describedby="growth-hint"
        disabled={reducedMotion}
        onChange={(event) => {
          const value = Number(event.target.value) / 100;
          growthRef.current = value;
          setGrowth(value);
        }}
        className={[
          "h-4 w-full cursor-ew-resize appearance-none bg-transparent",
          "[&::-webkit-slider-runnable-track]:h-px",
          "[&::-webkit-slider-runnable-track]:bg-bone-faint/35",
          "[&::-webkit-slider-thumb]:-mt-[5px] [&::-webkit-slider-thumb]:h-2.5",
          "[&::-webkit-slider-thumb]:w-2.5 [&::-webkit-slider-thumb]:appearance-none",
          "[&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-brass",
          "[&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(217,164,65,0.6)]",
          "[&::-moz-range-thumb]:h-2.5 [&::-moz-range-thumb]:w-2.5",
          "[&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0",
          "[&::-moz-range-thumb]:bg-brass",
          reducedMotion ? "opacity-40" : "",
        ].join(" ")}
      />

      <div className="flex items-center justify-between gap-3">
        <p id="growth-hint" className="text-[0.65rem] leading-snug text-bone-faint">
          {reducedMotion ? dictionary.graph.reducedMotion : dictionary.rail.growthHint}
        </p>
        <button
          type="button"
          onClick={replayGrowth}
          disabled={reducedMotion}
          className="glass-pill plate-label shrink-0 px-2.5 py-1 text-bone-dim transition-colors hover:text-brass disabled:opacity-40"
        >
          {dictionary.rail.reset}
        </button>
      </div>
    </div>
  );
}