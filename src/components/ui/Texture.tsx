import type { CSSProperties } from "react";

/**
 * Film grain. Fixed over the viewport, blended rather than composited, so it
 * sits on top of the 3D scene like emulsion rather than fogging it. Never
 * intercepts pointer events.
 */
export function GrainOverlay() {
  return <div className="grain" aria-hidden="true" />;
}

/** Radial darkening drawn inside a positioned ancestor. */
export function Vignette() {
  return <div className="vignette" aria-hidden="true" />;
}

/** Fine concentric engraving — the star-chart substrate behind the graph. */
export function EngravedRings({ className = "" }: { className?: string }) {
  return (
    <div
      className={`engraved-rings pointer-events-none absolute inset-0 ${className}`}
      aria-hidden="true"
    />
  );
}

interface CornerTicksProps {
  className?: string;
  /** Tick arm length in pixels. */
  size?: number;
  /** Tick colour — normally brass. */
  tone?: string;
}

type TickCorner = "top-start" | "top-end" | "bottom-start" | "bottom-end";

const TICK_CORNERS: TickCorner[] = [
  "top-start",
  "top-end",
  "bottom-start",
  "bottom-end",
];

/**
 * L-shaped crop marks at the four corners of a panel. Four pairs of 1px rules;
 * the cheapest possible way to make a rectangle read as a surveyed plate.
 *
 * Uses logical properties so the marks stay on the correct side under RTL.
 */
export function CornerTicks({
  className = "",
  size = 14,
  tone = "var(--color-brass)",
}: CornerTicksProps) {
  const box: CSSProperties = { position: "absolute", inset: 0 };

  return (
    <div className={`pointer-events-none ${className}`} style={box} aria-hidden="true">
      {TICK_CORNERS.map((corner) => {
        const [block, inline] = corner.split("-") as [string, string];
        return (
          <span key={corner} style={{ position: "absolute" }}>
            {/* horizontal arm */}
            <span
              style={{
                position: "absolute",
                [block]: 0,
                [inline]: 0,
                width: size,
                height: 1,
                background: tone,
              }}
            />
            {/* vertical arm */}
            <span
              style={{
                position: "absolute",
                [block]: 0,
                [inline]: 0,
                width: 1,
                height: size,
                background: tone,
              }}
            />
          </span>
        );
      })}
    </div>
  );
}

/** A single hairline rule. */
export function Hairline({ className = "" }: { className?: string }) {
  return <div className={`hairline ${className}`} aria-hidden="true" />;
}

/** Two hairlines with a gap — the section-header device. */
export function DoubleRule({ className = "" }: { className?: string }) {
  return <div className={`double-rule ${className}`} aria-hidden="true" />;
}