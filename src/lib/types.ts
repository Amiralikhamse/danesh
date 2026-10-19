/**
 * Knowledge Tree — data schema
 * ---------------------------
 * Everything the UI renders is derived from `KnowledgeNode`. To load a real
 * dataset later, replace the contents of `src/data/tree.ts` (and nothing else).
 *
 * Two authoring shapes are accepted by `normalizeTree()`:
 *
 *   1. Nested (recommended for hand-authoring / most datasets)
 *      [{ id: "physics", name: { en, fa }, children: [...] }]
 *
 *   2. Flat map (recommended for machine-generated / very large datasets)
 *      { physics: { id: "physics", parentId: null, ... } }
 *
 * Both normalize to the same `KnowledgeForest`.
 */

export type Locale = "en" | "fa";

export const LOCALES: readonly Locale[] = ["en", "fa"] as const;

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

/** Bilingual string. Both locales are required; keep the pair in sync. */
export interface Localized {
  en: string;
  fa: string;
}

/**
 * Hierarchy tier. Drives glyph, weight and ring styling in the UI.
 * `kind` is inferred from depth when omitted.
 */
export type NodeKind = "domain" | "field" | "subfield" | "topic";

export const NODE_KINDS: readonly NodeKind[] = [
  "domain",
  "field",
  "subfield",
  "topic",
] as const;

/**
 * Constrained palette tokens. Accents live in a narrow analogous band
 * (brass → verdigris → azure → rose) at matched chroma/lightness so that
 * eight coded domains never turn into a rainbow.
 */
export type AccentToken =
  | "brass"
  | "amber"
  | "copper"
  | "rose"
  | "magenta"
  | "violet"
  | "azure"
  | "cyan"
  | "verdigris"
  | "jade";

export const ACCENT_TOKENS: readonly AccentToken[] = [
  "brass",
  "amber",
  "copper",
  "rose",
  "magenta",
  "violet",
  "azure",
  "cyan",
  "verdigris",
  "jade",
] as const;

export interface KnowledgeNode {
  /** Stable unique slug. Used in URLs and as the React key. */
  id: string;
  /** Primary label. */
  name: Localized;
  /** 1–3 word label for the index rail, rail markers and dense graphs. */
  short?: Localized;
  /** One or two sentences. Rendered in list cards and the detail drawer. */
  summary?: Localized;
  /** Long-form prose for the node's dedicated page. */
  description?: Localized;
  /** Defaults to the depth-derived tier. */
  kind?: NodeKind;
  /** Palette token. Auto-assigned per top-level domain when omitted. */
  accent?: AccentToken;
  /** Free-form search keywords, bilingual. */
  tags?: Localized[];
  /** Ordered children. Order is meaningful — it drives the radial layout. */
  children?: KnowledgeNode[];
  /** Flat-shape authoring only. Ignored in nested shape. */
  parentId?: string | null;
  /** Arbitrary dataset-specific scalars (year founded, faculty count, …). */
  meta?: Record<string, string | number>;
}

/** Accepted authoring inputs. */
export type KnowledgeTreeInput =
  | KnowledgeNode[]
  | Record<string, KnowledgeNode>
  | KnowledgeNode;

/** A normalized, ordered forest of top-level domains. */
export type KnowledgeForest = KnowledgeNode[];

/** Id of the synthetic root that `normalizeTree` inserts above the domains. */
export const ROOT_ID = "danesh";

/* ------------------------------------------------------------------ */
/* Derived, read-only views used by the UI                            */
/* ------------------------------------------------------------------ */

export interface FlatNode extends Omit<KnowledgeNode, "children"> {
  kind: NodeKind;
  accent: AccentToken;
  childrenIds: string[];
  parentId: string | null;
  depth: number;
  /** Position among siblings, 0-based. */
  order: number;
  /** Ancestor ids from the synthetic root down to (but excluding) this node. */
  ancestors: string[];
  /** Number of descendants (excluding self). */
  subtreeSize: number;
  /** This node plus all descendants. */
  subtreeWeight: number;
  /** Depth of the deepest descendant, relative to this node. */
  subtreeHeight: number;
  /** Leaf-node ids in the subtree. */
  leaves: string[];
  /** `parent › child › …` trail including this node. */
  trail: string[];
}

export interface TreeIndex {
  nodes: Record<string, FlatNode>;
  ids: string[];
  roots: string[];
  depth: number;
  size: number;
  byKind: Record<NodeKind, string[]>;
  byAccent: Record<string, string[]>;
}

export interface NormalizeIssue {
  level: "warn" | "error";
  id: string;
  message: string;
}

export interface NormalizeResult {
  forest: KnowledgeForest;
  index: TreeIndex;
  issues: NormalizeIssue[];
}
