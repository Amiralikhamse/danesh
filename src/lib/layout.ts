import { hierarchy, tree, type HierarchyPointNode } from "d3-hierarchy";
import {
  ROOT_ID,
  type AccentToken,
  type FlatNode,
  type Locale,
  type NodeKind,
  type TreeIndex,
} from "./types";
import { loc, mulberry32, hashString, mapRange, clamp } from "./utils";

/* ------------------------------------------------------------------ */
/* Types                                                              */
/* ------------------------------------------------------------------ */

export interface LayoutNode {
  /** Index into `GraphLayout.nodes`; also the key for `nodes[id]`. */
  i: number;
  id: string;
  /** 3D position in world units. Root sits at the origin. */
  x: number;
  y: number;
  z: number;
  depth: number;
  kind: NodeKind;
  accent: AccentToken;
  /** Bilingual short label used by the sprite atlas. */
  short: string;
  label: string;
  /** Render weight, 0–1. Derived from leaf count so big branches read bigger. */
  weight: number;
  /** Index of the parent node, or -1 for the root. */
  parent: number;
  /** Index of the top-level domain this node belongs to (-1 for the root). */
  domain: number;
  /** Ancestor ids, root-first — used to highlight a path. */
  ancestors: string[];
}

export interface LayoutEdge {
  i: number;
  from: number;
  to: number;
  depth: number;
  accent: AccentToken;
  /** Midpoint of the edge, useful for arc control points and labels. */
  mx: number;
  my: number;
  mz: number;
}

export interface GraphLayout {
  nodes: LayoutNode[];
  /** id → node, for O(1) lookup. */
  nodesById: Record<string, LayoutNode>;
  edges: LayoutEdge[];
  /** Flat `[x,y,z, x,y,z, …]` — ready for a `BufferAttribute`. */
  positions: Float32Array;
  /** Node radius per node, for point sprites / instanced spheres. */
  radii: Float32Array;
  /** Per-vertex RGB for the line pass. */
  edgeColors: Float32Array;
  /** `[fromIdx, toIdx, …]` pairs for `LineSegments`. */
  edgeIndices: Float32Array;
  maxDepth: number;
  /** World-space radius of the outermost ring. */
  extent: number;
  /** Node index → domain index, for per-domain coloring. */
  domainCount: number;
  /** Ids dropped because `maxNodes` was exceeded. */
  truncated: string[];
}

export interface LayoutOptions {
  /** World radius of the outermost ring. */
  radius?: number;
  /** How far the outermost ring rises above the origin. */
  domeHeight?: number;
  /** Per-domain fan tilt, so domains read as distinct petals. */
  fanTilt?: number;
  /** Organic positional jitter, in world units. */
  jitter?: number;
  /** PRNG seed. Same seed ⇒ identical layout on server and client. */
  seed?: number;
  /** Rotate the whole arrangement, radians. */
  angleOffset?: number;
  /** Layout only this subtree instead of the whole forest. */
  focusId?: string;
  /** Performance guard. Defaults to 6000. */
  maxNodes?: number;
  /** Include the synthetic root as node 0. */
  includeRoot?: boolean;
}

const DEFAULTS: Required<Omit<LayoutOptions, "focusId">> = {
  radius: 26,
  domeHeight: 9.5,
  fanTilt: 2.6,
  jitter: 0.42,
  seed: 0x5eed,
  angleOffset: 0,
  maxNodes: 6000,
  includeRoot: true,
};

/** `LayoutOptions` with every optional field resolved to a concrete value. */
type ResolvedLayoutOptions = Required<Omit<LayoutOptions, "focusId">> &
  Pick<LayoutOptions, "focusId">;

/* ------------------------------------------------------------------ */
/* Layout                                                             */
/* ------------------------------------------------------------------ */

interface Datum {
  id: string;
  depth: number;
  kind: NodeKind;
  accent: AccentToken;
  short: string;
  label: string;
  weight: number;
  domain: number;
  ancestors: string[];
  children?: Datum[];
}

/**
 * Compute a 3D "orrery" constellation for the tree.
 *
 * Geometry: `d3.tree()` lays the hierarchy out in polar space — one full turn
 * for the angular axis, depth for the radial axis — separating children by leaf
 * count so every tip of the tree gets the same amount of sky. That polar
 * layout is then lifted into 3D:
 *
 *   - radial position comes straight from d3 (radius by depth)
 *   - height follows a rising dome, so the tree opens upward like an armillary
 *   - each top-level domain is tilted along its own sector, so the branches
 *     read as distinct petals rather than one flat fan
 *   - a seeded jitter keeps it organic *and* hydration-safe
 *
 * Pure and deterministic: identical input ⇒ identical output.
 */
export function computeLayout(
  index: TreeIndex,
  locale: Locale,
  options: LayoutOptions = {},
): GraphLayout {
  const opts = { ...DEFAULTS, ...options } as ResolvedLayoutOptions;
  const empty = emptyLayout();
  if (!index || index.ids.length === 0) return empty;

  /* ---- 1. Assemble the nested datum we hand to d3 ---- */
  if (opts.focusId && !index.nodes[opts.focusId]) return empty;

  const domainRoots: string[] = opts.focusId
    ? [opts.focusId]
    : index.roots.filter((id) => id !== ROOT_ID);
  if (domainRoots.length === 0) return empty;

  const truncated: string[] = [];
  let budget = opts.maxNodes;
  const built: Datum[] = [];

  domainRoots.forEach((rootId, domainIndex) => {
    const datum = buildDatum(index, rootId, locale, domainIndex, () => {
      if (budget <= 0) {
        truncated.push(rootId);
        return false;
      }
      budget -= 1;
      return true;
    });
    if (datum) built.push(datum);
  });

  if (built.length === 0) return empty;

  // `d3.hierarchy` takes a single root datum, so the domains are always wrapped
  // — otherwise every sibling after the first would be dropped. The wrapper is
  // the synthetic root and is emitted only when the caller wants it; a focused
  // subtree uses the focused node itself as the d3 root instead.
  const isFocus = Boolean(opts.focusId);
  const emitRoot = opts.includeRoot && !isFocus;
  const d3RootDatum: Datum = isFocus
    ? built[0]
    : {
        id: ROOT_ID,
        depth: 0,
        kind: "domain",
        accent: "brass",
        short: "",
        label: "",
        weight: 1,
        domain: -1,
        ancestors: [],
        children: built,
      };

  /* ---- 2. Polar layout via d3 ---- */
  const root = hierarchy<Datum>(d3RootDatum, (d) => d.children);
  // A single leaf still deserves a full turn; guard against divide-by-zero.
  const outerRadius = root.height > 0 ? opts.radius : 0;
  // `tree()` mutates the hierarchy in place, assigning numeric x (angle) and
  // y (radius); the cast reflects that post-`tree()` type.
  const rootDatum = tree<Datum>().size([Math.PI * 2, outerRadius])(
    root,
  ) as HierarchyPointNode<Datum>;
  const maxDepth = rootDatum.height;

  /* ---- 3. Polar → 3D ---- */
  const nodes: LayoutNode[] = [];
  const nodesById: Record<string, LayoutNode> = {};
  const domainSectorCenters: number[] = [];

  // Each domain's angular centre, so the fan tilt can point outward from it.
  for (const domainRoot of rootDatum.descendants()) {
    if (domainRoot.depth === 1 || (opts.focusId && domainRoot.depth === 0)) {
      domainSectorCenters[domainRoot.data.domain] = domainRoot.x;
    }
  }

  const maxWeight = Math.max(
    1,
    ...rootDatum.descendants().map((d) => d.data.weight),
  );

  for (const d of rootDatum.descendants()) {
    // Depth 0 is the layout's anchor in both modes — the synthetic root for the
    // full tree, the focused node for a subtree. The growth bloom and the camera
    // both key off the origin, so it is never displaced.
    const isAnchor = d.depth === 0;
    // Only the synthetic wrapper is droppable; a focused root must survive.
    if (!emitRoot && !isFocus && isAnchor) continue;

    const theta = d.x + opts.angleOffset;
    const radial = d.y;
    const t = outerRadius > 0 ? radial / outerRadius : 0;

    // Rising dome: the rim sits above the origin.
    let height = Math.pow(t, 1.28) * opts.domeHeight;

    // Per-domain fan: bulge each domain along its own sector centre.
    if (d.data.domain >= 0) {
      const centre = domainSectorCenters[d.data.domain] ?? d.x;
      height += Math.cos(theta - (centre + opts.angleOffset)) * opts.fanTilt * t;
    }

    // Seeded organic jitter, damped toward the core.
    let r = radial;
    if (!isAnchor) {
      const jitterAmp = opts.jitter * (0.25 + 0.75 * t);
      const jr = mulberry32(hashString(d.data.id) ^ opts.seed);
      height += (jr() - 0.5) * jitterAmp;
      // Keep the jitter from pushing a node outside the declared ring.
      r = clamp(radial + (jr() - 0.5) * jitterAmp * 0.6, 0, outerRadius);
    }

    const node: LayoutNode = {
      i: nodes.length,
      id: d.data.id,
      x: Math.cos(theta) * r,
      y: isAnchor ? 0 : height,
      z: Math.sin(theta) * r,
      depth: d.depth,
      kind: d.data.kind,
      accent: d.data.accent,
      short: d.data.short,
      label: d.data.label,
      weight: mapRange(d.data.weight, 1, maxWeight, 0.14, 1),
      parent: -1,
      domain: d.data.domain,
      ancestors: d.data.ancestors,
    };
    nodes.push(node);
    nodesById[node.id] = node;
  }

  /* ---- 4. Edges ---- */
  const edges: LayoutEdge[] = [];
  const edgeIndices: number[] = [];
  const edgeColors: number[] = [];
  for (const d of rootDatum.descendants()) {
    const to = nodesById[d.data.id];
    if (!to) continue;
    for (const childDatum of d.children ?? []) {
      const from = nodesById[childDatum.data.id];
      if (!from) continue;
      from.parent = to.i;
      edges.push({
        i: edges.length,
        from: to.i,
        to: from.i,
        depth: from.depth,
        accent: from.accent,
        mx: (to.x + from.x) / 2,
        my: (to.y + from.y) / 2,
        mz: (to.z + from.z) / 2,
      });
      edgeIndices.push(to.i, from.i);
    }
  }

  /* ---- 5. Typed arrays ---- */
  const positions = new Float32Array(nodes.length * 3);
  const radii = new Float32Array(nodes.length);
  for (const n of nodes) {
    positions[n.i * 3] = n.x;
    positions[n.i * 3 + 1] = n.y;
    positions[n.i * 3 + 2] = n.z;
    // Bigger branches get bigger nodes, with a floor so twigs stay clickable.
    radii[n.i] = n.depth === 0 ? 1 : 0.34 + n.weight * 0.72;
  }
  for (const edge of edges) {
    const tint = ACCENT_RGB[edge.accent] ?? ACCENT_RGB.brass;
    // Twigs are dimmer than branches → the structure reads without labels.
    const intensity = edge.depth <= 1 ? 1 : edge.depth === 2 ? 0.62 : 0.34;
    // Two vertices per edge — one per endpoint.
    for (let v = 0; v < 2; v += 1) {
      edgeColors.push(tint[0] * intensity, tint[1] * intensity, tint[2] * intensity);
    }
  }

  return {
    nodes,
    nodesById,
    edges,
    positions,
    radii,
    edgeColors: new Float32Array(edgeColors),
    edgeIndices: new Float32Array(edgeIndices),
    maxDepth,
    extent: outerRadius + opts.domeHeight + opts.jitter,
    domainCount: built.length,
    truncated,
  };
}

/** Recursively convert `FlatNode`s into layout datums, respecting the budget. */
function buildDatum(
  index: TreeIndex,
  id: string,
  locale: Locale,
  domain: number,
  take: () => boolean,
): Datum | null {
  const node: FlatNode | undefined = index.nodes[id];
  if (!node) return null;
  if (!take()) return null;

  const name = loc(node.name, locale) || id;
  const short = loc(node.short, locale) || name;
  const datum: Datum = {
    id,
    depth: node.depth,
    kind: node.kind,
    accent: node.accent,
    short: short.length > 22 ? `${short.slice(0, 21)}…` : short,
    label: name,
    weight: node.subtreeWeight,
    domain,
    // Keeps ROOT_ID so `pathTo()` can light the full chain from the origin.
    ancestors: node.ancestors,
  };

  const children: Datum[] = [];
  for (const cid of node.childrenIds) {
    const child = buildDatum(index, cid, locale, domain, take);
    if (child) children.push(child);
  }
  if (children.length) datum.children = children;
  return datum;
}

function emptyLayout(maxDepth = 0): GraphLayout {
  return {
    nodes: [],
    nodesById: {},
    edges: [],
    positions: new Float32Array(0),
    radii: new Float32Array(0),
    edgeColors: new Float32Array(0),
    edgeIndices: new Float32Array(0),
    maxDepth,
    extent: 0,
    domainCount: 0,
    truncated: [],
  };
}

/* ------------------------------------------------------------------ */
/* Accent → linear RGB, for vertex colors on the line pass            */
/* ------------------------------------------------------------------ */

/**
 * Matches the CSS accent tokens in `globals.css` (`--accent-*`).
 * Kept in sync by hand; a mismatch is only a slight hue drift.
 */
export const ACCENT_RGB: Record<AccentToken, [number, number, number]> = {
  brass: [0.851, 0.643, 0.255],
  amber: [0.925, 0.729, 0.353],
  copper: [0.878, 0.541, 0.353],
  rose: [0.878, 0.478, 0.541],
  magenta: [0.769, 0.478, 0.678],
  violet: [0.596, 0.522, 0.831],
  azure: [0.463, 0.604, 0.855],
  cyan: [0.396, 0.729, 0.827],
  verdigris: [0.373, 0.769, 0.678],
  jade: [0.545, 0.784, 0.51],
};

/** Convert `#rrggbb` to linear-ish RGB floats. */
export function hexToRgb(hex: string): [number, number, number] {
  const clean = hex.replace("#", "");
  const full =
    clean.length === 3
      ? clean.split("").map((c) => c + c).join("")
      : clean.padEnd(6, "0");
  const n = parseInt(full.slice(0, 6), 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}

/* ------------------------------------------------------------------ */
/* Camera framing                                                     */
/* ------------------------------------------------------------------ */

export interface CameraFrame {
  /** Where the camera should sit to frame the whole graph. */
  position: [number, number, number];
  target: [number, number, number];
  /** Distance from `target` to `position`. */
  distance: number;
}

/** Fit the camera to a layout, honouring the viewport aspect ratio. */
export function frameCamera(
  layout: GraphLayout,
  opts: { fov?: number; aspect?: number; tilt?: number; padding?: number } = {},
): CameraFrame {
  const { fov = 42, aspect = 1.6, tilt = 0.42, padding = 1.34 } = opts;
  const extent = Math.max(layout.extent, 1);
  const vFov = (fov * Math.PI) / 180;
  const hFov = 2 * Math.atan(Math.tan(vFov / 2) * Math.max(aspect, 0.4));
  const distance = Math.max(
    (extent * padding) / Math.tan(vFov / 2),
    (extent * padding) / Math.tan(hFov / 2),
  );

  // Sit above the equator so the dome reads as a dome.
  const y = Math.sin(tilt) * distance;
  const horizontal = Math.cos(tilt) * distance;

  return {
    position: [0, y, horizontal],
    target: [0, layout.extent * 0.16, 0],
    distance,
  };
}

/** Center point + radius of the subtree around `id`, for focus transitions. */
export function focusFrame(layout: GraphLayout, id: string): CameraFrame | null {
  const node = layout.nodesById[id];
  if (!node) return null;

  let cx = 0;
  let cy = 0;
  let cz = 0;
  let count = 0;
  let maxDist = 0;
  for (const n of layout.nodes) {
    if (n.id !== id && !n.ancestors.includes(id)) continue;
    cx += n.x;
    cy += n.y;
    cz += n.z;
    count += 1;
  }
  if (!count) return null;
  cx /= count;
  cy /= count;
  cz /= count;
  for (const n of layout.nodes) {
    if (n.id !== id && !n.ancestors.includes(id)) continue;
    const d = Math.hypot(n.x - cx, n.y - cy, n.z - cz);
    maxDist = Math.max(maxDist, d);
  }

  const radius = Math.max(maxDist + 4, 6);
  const distance = clamp(radius * 2.5, 10, layout.extent * 4);
  return {
    position: [cx + distance * 0.36, cy + distance * 0.42, cz + distance * 0.82],
    target: [cx, cy, cz],
    distance,
  };
}

/** Path ids from the layout root down to `id`, inclusive — for path glow. */
export function pathTo(layout: GraphLayout, id: string): string[] {
  const node = layout.nodesById[id];
  if (!node) return [];
  return [...node.ancestors, node.id];
}
