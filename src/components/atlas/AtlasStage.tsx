"use client";

import dynamic from "next/dynamic";
import { useEffect, useState, type ReactNode } from "react";

import { useAtlas } from "@/components/providers/AtlasProvider";
import { IndexRail } from "@/components/shell/IndexRail";
import { PrintedIndex } from "@/components/shell/PrintedIndex";
import { NodeDrawer } from "@/components/node/NodeDrawer";
import { Reticle } from "@/components/ui/Reticle";
import { CornerTicks, EngravedRings, Vignette } from "@/components/ui/Texture";

/**
 * The constellation must never reach the server: `<Canvas>` needs WebGL and a
 * real DOM. `ssr: false` is only legal inside a client component, which is why
 * this stage is one.
 */
const ConstellationCanvas = dynamic(() => import("./ConstellationCanvas"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 grid place-items-center">
      <span className="h-px w-28 animate-pulse-soft bg-brass/60" />
    </div>
  ),
});

/** True when the browser can give us a WebGL context. */
function detectWebgl(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext("webgl2") ?? canvas.getContext("webgl")),
    );
  } catch {
    return false;
  }
}

/**
 * The atlas stage.
 *
 * Owns the canvas, the index rail, the node drawer and the reticle, plus the
 * controls that only make sense while the graph is on screen. Everything here
 * is interactive; the editorial pages below it are plain server components.
 */
export function AtlasStage() {
  const {
    dictionary,
    locale,
    reducedMotion,
    webglSupported,
    setWebglSupported,
    hoveredId,
    index,
    select,
    requestCamera,
    showLabels,
    setShowLabels,
    autoRotate,
    setAutoRotate,
    stats,
  } = useAtlas();

  const [railOpen, setRailOpen] = useState(false);
  const [hovering, setHovering] = useState(false);

  // Detection runs after mount: the server has no idea whether WebGL exists,
  // and guessing would produce a hydration mismatch.
  useEffect(() => {
    setWebglSupported(detectWebgl());
  }, [setWebglSupported]);

  const hoveredLabel =
    hoveredId && index.nodes[hoveredId]
      ? (index.nodes[hoveredId].short ?? index.nodes[hoveredId].name)[locale]
      : null;

  return (
    <section
      className="relative isolate h-[min(88svh,60rem)] w-full overflow-hidden border-y border-bone-faint/15 bg-ink-900"
      aria-label={dictionary.a11y.graphSummary}
    >
      {/* Substrate */}
      <EngravedRings />
      <div
        className="animate-drift pointer-events-none absolute inset-0 opacity-70"
        aria-hidden="true"
      >
        <div className="absolute start-[12%] top-[18%] h-[36rem] w-[36rem] rounded-full bg-brass/[0.055] blur-[110px]" />
        <div className="absolute end-[8%] top-[42%] h-[30rem] w-[30rem] rounded-full bg-verdigris/[0.05] blur-[120px]" />
        <div className="absolute start-[46%] bottom-[6%] h-[26rem] w-[26rem] rounded-full bg-accent-azure/[0.05] blur-[130px]" />
      </div>

      {!webglSupported ? (
        <div className="absolute inset-0 overflow-y-auto">
          <p className="mx-auto mt-10 max-w-xl border-s border-brass/50 bg-ink-800/70 px-4 py-3 text-sm text-bone-dim">
            {dictionary.graph.webglMissing}
          </p>
          <PrintedIndex locale={locale} />
        </div>
      ) : (
        <>
          <div
            className="atlas-canvas absolute inset-0"
            onPointerEnter={() => setHovering(true)}
            onPointerLeave={() => setHovering(false)}
          >
            <ConstellationCanvas />
          </div>

          <Vignette />
          <CornerTicks size={22} tone="var(--color-brass)" className="z-20" />

          {/* Screen-reader equivalent of the canvas. */}
          <p className="sr-only">
            {dictionary.a11y.graphSummary} {stats.total}{" "}
            {dictionary.graph.nodeCount}.
          </p>

          <Reticle active={hovering && !reducedMotion} label={hoveredLabel} />

          <IndexRail open={railOpen} />
          <NodeDrawer />
          <StageControls
            railOpen={railOpen}
            onToggleRail={() => setRailOpen((v) => !v)}
            showLabels={showLabels}
            onToggleLabels={() => setShowLabels(!showLabels)}
            autoRotate={autoRotate}
            onToggleRotate={() => setAutoRotate(!autoRotate)}
            onReset={() => {
              select(null);
              requestCamera(null);
            }}
          />
        </>
      )}
    </section>
  );
}

function StageControls({
  railOpen,
  onToggleRail,
  showLabels,
  onToggleLabels,
  autoRotate,
  onToggleRotate,
  onReset,
}: {
  railOpen: boolean;
  onToggleRail: () => void;
  showLabels: boolean;
  onToggleLabels: () => void;
  autoRotate: boolean;
  onToggleRotate: () => void;
  onReset: () => void;
}) {
  const { dictionary } = useAtlas();

  return (
    <div className="absolute inset-x-0 bottom-0 z-30 flex items-center justify-between gap-3 p-4">
      <div className="flex flex-wrap items-center gap-2">
        <Control onClick={onToggleRail} active={railOpen}>
          {dictionary.rail.toggleRail}
        </Control>
        <Control onClick={onToggleLabels} active={showLabels}>
          {dictionary.graph.labels}
        </Control>
        <Control onClick={onToggleRotate} active={autoRotate}>
          {dictionary.graph.autoRotate}
        </Control>
        <Control onClick={onReset}>{dictionary.graph.resetView}</Control>
      </div>

      <p className="plate-label hidden text-bone-faint md:block">
        {dictionary.hero.dragHint}
      </p>
    </div>
  );
}

function Control({
  children,
  onClick,
  active,
}: {
  children: ReactNode;
  onClick: () => void;
  active?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`plate-label border px-3 py-2 backdrop-blur-sm transition-colors ${
        active
          ? "border-brass/60 bg-brass/10 text-brass"
          : "border-bone-faint/20 text-bone-dim hover:border-brass/45 hover:text-bone"
      }`}
    >
      {children}
    </button>
  );
}