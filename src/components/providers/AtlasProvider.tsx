"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

import { datasetIndex, datasetStats } from "@/lib/dataset";
import { getDictionary } from "@/i18n/dictionaries";
import type { CameraFrame } from "@/lib/layout";
import type { TreeStats } from "@/lib/tree";
import type { Locale, TreeIndex } from "@/lib/types";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";

/**
 * Interaction state for the constellation.
 *
 * `growth` is a mutable ref rather than React state on purpose: the renderer
 * reads it 60 times a second inside `useFrame`, and routing that through state
 * would re-render the whole provider tree on every animation tick. A mirrored
 * `growthPercent` state exists only for the scrubber's label.
 */
interface AtlasContextValue {
  locale: Locale;
  dictionary: ReturnType<typeof getDictionary>;
  index: TreeIndex;
  stats: TreeStats;
  reducedMotion: boolean;

  selectedId: string | null;
  hoveredId: string | null;
  showLabels: boolean;
  autoRotate: boolean;
  webglSupported: boolean;

  /** Live growth scalar, 0–1. Read inside the render loop; never set state. */
  growthRef: { current: number };
  /** Bumped to replay the growth bloom from the root. */
  growthToken: number;
  growthPercent: number;

  /** Camera destination pushed by selection / reset, consumed by CameraRig. */
  cameraRequest: { frame: CameraFrame | null; token: number };

  select: (id: string | null) => void;
  setHovered: (id: string | null) => void;
  setShowLabels: (value: boolean) => void;
  setAutoRotate: (value: boolean) => void;
  setWebglSupported: (value: boolean) => void;
  requestCamera: (frame: CameraFrame | null) => void;
  replayGrowth: () => void;
  setGrowth: (value: number) => void;
}

const AtlasContext = createContext<AtlasContextValue | null>(null);

export function AtlasProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: ReactNode;
}) {
  const dictionary = useMemo(() => getDictionary(locale), [locale]);
  const reducedMotion = usePrefersReducedMotion();

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [showLabels, setShowLabels] = useState(true);
  const [autoRotate, setAutoRotate] = useState(true);
  const [webglSupported, setWebglSupported] = useState(true);

  const growthRef = useRef(0);
  const [growthPercent, setGrowthPercent] = useState(0);
  const [growthToken, setGrowthToken] = useState(0);
  const [cameraRequest, setCameraRequest] = useState<{
    frame: CameraFrame | null;
    token: number;
  }>({ frame: null, token: 0 });

  const select = useCallback((id: string | null) => {
    setSelectedId(id);
  }, []);

  const setHovered = useCallback((id: string | null) => {
    setHoveredId(id);
  }, []);

  const setGrowth = useCallback((value: number) => {
    growthRef.current = value;
    setGrowthPercent(Math.round(value * 100));
  }, []);

  const replayGrowth = useCallback(() => {
    growthRef.current = 0;
    setGrowthPercent(0);
    setGrowthToken((token) => token + 1);
  }, []);

  const requestCamera = useCallback((frame: CameraFrame | null) => {
    setCameraRequest((prev) => ({ frame, token: prev.token + 1 }));
  }, []);

  const value = useMemo<AtlasContextValue>(
    () => ({
      locale,
      dictionary,
      index: datasetIndex,
      stats: datasetStats,
      reducedMotion,
      selectedId,
      hoveredId,
      showLabels,
      autoRotate,
      webglSupported,
      growthRef,
      growthToken,
      growthPercent,
      cameraRequest,
      select,
      setHovered,
      setShowLabels,
      setAutoRotate,
      setWebglSupported,
      requestCamera,
      replayGrowth,
      setGrowth,
    }),
    [
      locale,
      dictionary,
      reducedMotion,
      selectedId,
      hoveredId,
      showLabels,
      autoRotate,
      webglSupported,
      growthToken,
      growthPercent,
      cameraRequest,
      select,
      setHovered,
      setShowLabels,
      setAutoRotate,
      setWebglSupported,
      requestCamera,
      replayGrowth,
      setGrowth,
    ],
  );

  return <AtlasContext.Provider value={value}>{children}</AtlasContext.Provider>;
}

export function useAtlas(): AtlasContextValue {
  const context = useContext(AtlasContext);
  if (!context) {
    throw new Error("useAtlas must be used inside <AtlasProvider>");
  }
  return context;
}