import {
  ACCENT_TOKENS,
  NODE_KINDS,
  ROOT_ID,
  type FlatNode,
  type KnowledgeForest,
  type KnowledgeNode,
  type KnowledgeTreeInput,
  type Locale,
  type NodeKind,
  type NormalizeIssue,
  type NormalizeResult,
  type TreeIndex,
} from "./types";
import { hashString, loc, mulberry32 } from "./utils";

/* ------------------------------------------------------------------ */
/* Normalize                                                          */
/* ------------------------------------------------------------------ */

/** Infer a tier from nesting depth: 0 → domain, 1 → field, … */
function kindForDepth(depth: number): NodeKind {
  return NODE_KINDS[Math.min(depth, NODE_KINDS.length - 1)];
}

/**
 * Accept any authoring shape and return an ordered, id-keyed forest of
 * top-level domains with a synthetic root above them.
 *
 * Never throws: malformed input is reported through `issues` so a bad dataset
 * degrades gracefully instead of blanking the page.
 */
export function normalizeTree(input: KnowledgeTreeInput): NormalizeResult {
  const issues: NormalizeIssue[] = [];
  const forest = toForest(input, issues);
  const index = buildIndex(forest);
  return { forest, index, issues };
}

/**
 * Is this the flat `Record<id, KnowledgeNode>` authoring shape?
 *
 * A nested forest is an array; a flat map is an object keyed by id. The
 * presence of `id`/`name` distinguishes a flat map from a single bare node.
 */
function isFlatInput(input: KnowledgeTreeInput): input is Record<string, KnowledgeNode> {
  return (
    !Array.isArray(input) &&
    typeof input === "object" &&
    input !== null &&
    !("id" in input) &&
    !("name" in input)
  );
}

/** Reduce any accepted input shape to a top-level domain array. */
function toForest(input: KnowledgeTreeInput, issues: NormalizeIssue[]): KnowledgeForest {
  if (isFlatInput(input)) {
    const flat = input;
    const byId = new Map<string, KnowledgeNode>();
    for (const [key, node] of Object.entries(flat)) {
      if (!node || typeof node !== "object") continue;
      const id = node.id ?? key;
      if (byId.has(id)) {
        issues.push({ level: "error", id, message: "Duplicate id in flat tree" });
        continue;
      }
      // Normalize `children` onto the stored copy so that every node in the map
      // is the *same object* later re-parented and pushed into the forest.
      // Copying here and re-parenting the original would silently drop subtrees.
      byId.set(id, { ...node, id, children: node.children ?? [] });
    }

    const topLevel: KnowledgeNode[] = [];
    for (const node of byId.values()) {
      if (node.parentId == null) topLevel.push(node);
    }
    for (const node of byId.values()) {
      if (node.parentId == null) continue;
      const parent = byId.get(node.parentId);
      if (!parent) {
        issues.push({
          level: "warn",
          id: node.id,
          message: `Orphan: parent "${node.parentId}" not found — promoted to a top-level domain`,
        });
        topLevel.push(node);
        continue;
      }
      const siblings = parent.children ?? [];
      siblings.push(node);
      parent.children = siblings;
    }
    return sortChildren(topLevel);
  }

  const list: KnowledgeNode[] = Array.isArray(input) ? input : [input];
  if (list.length === 1 && list[0]?.id === ROOT_ID && list[0].children?.length) {
    return sortChildren(list[0].children ?? []);
  }
  return sortChildren(list.filter(Boolean));
}

/** Order siblings by numeric `meta.order`, then by declared order. */
function sortChildren(nodes: KnowledgeNode[]): KnowledgeNode[] {
  return nodes
    .map((node, i) => ({ node, i }))
    .sort((a, b) => {
      const ao = a.node.meta?.order;
      const bo = b.node.meta?.order;
      if (typeof ao === "number" && typeof bo === "number" && ao !== bo) return ao - bo;
      return a.i - b.i;
    })
    .map(({ node }) => {
      if (node.children?.length) {
        return { ...node, children: sortChildren(node.children) };
      }
      return node;
    });
}

/* ------------------------------------------------------------------ */
/* Index                                                              */
/* ------------------------------------------------------------------ */

/**
 * Flatten the forest into a lookup table with derived metrics:
 * depth, ancestry, subtree size / weight / height and leaf ids.
 */
export function buildIndex(forest: KnowledgeForest): TreeIndex {
  const nodes: Record<string, FlatNode> = {};
  const ids: string[] = [];
  const roots: string[] = [];
  const byKind: Record<NodeKind, string[]> = {
    domain: [], field: [], subfield: [], topic: [],
  };
  const byAccent: Record<string, string[]> = {};
  const depthSeen: number[] = [];

  forest.forEach((domain, i) => {
    walk(domain, {
      // Domains hang directly off the synthetic root, so ancestry is seeded
      // here rather than patched in afterwards — otherwise a domain's own
      // descendants would be missing ROOT_ID while the domain itself has it.
      parentId: ROOT_ID,
      depth: 0,
      order: i,
      ancestors: [ROOT_ID],
      trail: [],
      accent: domain.accent ?? ACCENT_TOKENS[i % ACCENT_TOKENS.length],
    });
  });

  // Synthetic root, so the 3D scene has a single origin to grow from.
  const syntheticChildren = roots.slice();
  const synthetic: FlatNode = {
    id: ROOT_ID,
    name: { en: "All Knowledge", fa: "تمام دانش" },
    kind: "domain",
    accent: "brass",
    childrenIds: syntheticChildren,
    parentId: null,
    depth: -1,
    order: 0,
    ancestors: [],
    subtreeSize: ids.length,
    subtreeWeight: ids.length + 1,
    subtreeHeight: depthSeen.length ? Math.max(...depthSeen) + 1 : 0,
    leaves: ids.filter((id) => nodes[id].childrenIds.length === 0),
    trail: [],
  };
  nodes[ROOT_ID] = synthetic;

  return { nodes, ids, roots, depth: depthSeen.length ? Math.max(...depthSeen) : 0, size: ids.length, byKind, byAccent };

  function walk(
    raw: KnowledgeNode,
    ctx: {
      parentId: string | null;
      depth: number;
      order: number;
      ancestors: string[];
      trail: string[];
      accent: FlatNode["accent"];
    },
  ): void {
    const id = raw.id;
    if (!id) {
      return;
    }
    if (nodes[id]) {
      return; // already visited — cycles are dropped
    }

    const kind = raw.kind ?? kindForDepth(ctx.depth);
    const accent = raw.accent ?? ctx.accent;
    const children = raw.children ?? [];
    const childrenIds = children.map((c) => c.id).filter(Boolean);
    const trail = [...ctx.trail, id];

    let subtreeSize = 0;
    let subtreeHeight = 0;
    const leaves: string[] = [];

    const node: FlatNode = {
      id,
      name: raw.name ?? { en: id, fa: id },
      short: raw.short,
      summary: raw.summary,
      description: raw.description,
      tags: raw.tags,
      meta: raw.meta,
      kind,
      accent,
      childrenIds,
      parentId: ctx.parentId,
      depth: ctx.depth,
      order: ctx.order,
      ancestors: ctx.ancestors,
      subtreeSize: 0,
      subtreeWeight: 0,
      subtreeHeight: 0,
      leaves,
      trail,
    };

    // Registered before recursion so a cycle terminates on the duplicate check.
    nodes[id] = node;
    ids.push(id);
    if (ctx.parentId === ROOT_ID) roots.push(id);
    (byKind[kind] ??= []).push(id);
    (byAccent[accent] ??= []).push(id);
    depthSeen.push(ctx.depth);

    children.forEach((child, i) => {
      walk(child, {
        parentId: id,
        depth: ctx.depth + 1,
        order: i,
        ancestors: [...ctx.ancestors, id],
        trail,
        accent,
      });
    });

    subtreeSize = childrenIds.reduce((sum, cid) => sum + (nodes[cid]?.subtreeSize ?? 0), 0) + childrenIds.length;
    subtreeHeight = childrenIds.reduce((max, cid) => Math.max(max, (nodes[cid]?.subtreeHeight ?? 0) + 1), 0);
    node.subtreeSize = subtreeSize;
    node.subtreeWeight = subtreeSize + 1;
    node.subtreeHeight = subtreeHeight;
    // Children are fully resolved by now (post-order), so this is bottom-up.
    node.leaves =
      childrenIds.length === 0
        ? [id]
        : childrenIds.flatMap((cid) => nodes[cid]?.leaves ?? []);
  }
}

/* ------------------------------------------------------------------ */
/* Traversal helpers                                                  */
/* ------------------------------------------------------------------ */

export function getNode(index: TreeIndex, id: string): FlatNode | undefined {
  return index.nodes[id];
}

export function childrenOf(index: TreeIndex, id: string): FlatNode[] {
  const node = index.nodes[id];
  if (!node) return [];
  return node.childrenIds
    .map((cid) => index.nodes[cid])
    .filter((n): n is FlatNode => Boolean(n));
}

/** Root-first ancestor chain, excluding the node itself. */
export function ancestorsOf(index: TreeIndex, id: string): FlatNode[] {
  const node = index.nodes[id];
  if (!node) return [];
  return node.ancestors.map((a) => index.nodes[a]).filter(Boolean);
}

/** Breadcrumb trail, root-first, including the node itself. */
export function trailOf(index: TreeIndex, id: string, locale: Locale): string[] {
  const node = index.nodes[id];
  if (!node) return [];
  return node.trail.map((tid) => loc(index.nodes[tid]?.name, locale) || tid);
}

/** Every descendant id, breadth-first, excluding the node itself. */
export function descendantIds(index: TreeIndex, id: string): string[] {
  const out: string[] = [];
  const queue = [...childrenOf(index, id).map((n) => n.id)];
  const seen = new Set<string>(queue);
  while (queue.length) {
    const current = queue.shift() as string;
    out.push(current);
    for (const child of childrenOf(index, current)) {
      if (seen.has(child.id)) continue;
      seen.add(child.id);
      queue.push(child.id);
    }
  }
  return out;
}

/** Every id in the subtree, including the node itself. */
export function subtreeIds(index: TreeIndex, id: string): string[] {
  const node = index.nodes[id];
  if (!node) return [];
  return [id, ...descendantIds(index, id)];
}

/** Ids of every node with no children. */
export function leafIds(index: TreeIndex): string[] {
  return index.ids.filter((id) => index.nodes[id]?.childrenIds.length === 0);
}

/** Ids that are direct children of the synthetic root. */
export function domainIds(index: TreeIndex): string[] {
  return index.roots;
}

/* ------------------------------------------------------------------ */
/* Search                                                             */
/* ------------------------------------------------------------------ */

export interface SearchHit {
  id: string;
  score: number;
  /** Character ranges in the matched label, for highlighting. */
  ranges: Array<[number, number]>;
}

function normalizeForSearch(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFKD")
    // Strip Arabic harakat / tatweel so "کتاب‌ها" matches "کتاب ها".
    .replace(/[\u064B-\u0652\u0670\u0640]/g, "")
    .replace(/[\u200C\s]+/g, " ")
    .trim();
}

function highlightRanges(
  haystack: string,
  needle: string,
): Array<[number, number]> {
  const ranges: Array<[number, number]> = [];
  if (!needle) return ranges;
  const h = normalizeForSearch(haystack);
  let from = 0;
  for (;;) {
    const at = h.indexOf(needle, from);
    if (at === -1) break;
    ranges.push([at, at + needle.length]);
    from = at + Math.max(needle.length, 1);
  }
  return ranges;
}

/**
 * Rank nodes against a free-text query. Matches on name, short label, tags and
 * id; a prefix match outranks a substring match, and an ancestor match
 * (searching a domain name) surfaces its children.
 */
export function searchNodes(
  index: TreeIndex,
  query: string,
  locale: Locale,
  limit = 40,
): SearchHit[] {
  const q = normalizeForSearch(query);
  if (!q) return [];

  const hits: SearchHit[] = [];
  for (const id of index.ids) {
    const node = index.nodes[id];
    if (!node) continue;

    let score = 0;
    let ranges: Array<[number, number]> = [];

    const name = loc(node.name, locale);
    const nameHits = highlightRanges(name, q);
    if (nameHits.length) {
      const prefix = normalizeForSearch(name).startsWith(q) ? 1.6 : 1;
      score += (node.depth === 0 ? 90 : node.depth === 1 ? 70 : 50) * prefix;
      score -= nameHits[0][0] * 0.6;
      ranges = nameHits;
    }

    const short = loc(node.short, locale);
    if (short) {
      const shortHits = highlightRanges(short, q);
      if (shortHits.length) {
        score += 40 * (normalizeForSearch(short).startsWith(q) ? 1.5 : 1);
        if (!ranges.length) ranges = shortHits;
      }
    }

    for (const tag of node.tags ?? []) {
      const label = loc(tag, locale);
      if (!label) continue;
      if (normalizeForSearch(label).includes(q)) score += 22;
    }

    if (normalizeForSearch(id).includes(q)) score += 14;
    if (normalizeForSearch(loc(node.summary, locale)).includes(q)) score += 8;

    if (score > 0) hits.push({ id, score, ranges });
  }

  return hits
    .sort((a, b) => b.score - a.score || a.id.localeCompare(b.id))
    .slice(0, limit);
}

/* ------------------------------------------------------------------ */
/* Stats — shown in the index rail and the colophon                    */
/* ------------------------------------------------------------------ */

export interface TreeStats {
  total: number;
  domains: number;
  fields: number;
  subfields: number;
  topics: number;
  leaves: number;
  depth: number;
  maxBranch: number;
}

export function computeStats(index: TreeIndex): TreeStats {
  let maxBranch = 0;
  for (const id of index.ids) {
    maxBranch = Math.max(maxBranch, index.nodes[id]?.childrenIds.length ?? 0);
  }
  return {
    total: index.size,
    domains: index.byKind.domain?.length ?? 0,
    fields: index.byKind.field?.length ?? 0,
    subfields: index.byKind.subfield?.length ?? 0,
    topics: index.byKind.topic?.length ?? 0,
    leaves: leafIds(index).length,
    depth: index.depth + 1,
    maxBranch,
  };
}

/* ------------------------------------------------------------------ */
/* Deterministic ordering helpers                                     */
/* ------------------------------------------------------------------ */

/** Stable pseudo-random unit value for a node id. */
export function nodeRandom(id: string): number {
  return mulberry32(hashString(id))();
}

/** Deep clone, used when a caller wants to mutate a dataset safely. */
export function cloneForest(forest: KnowledgeForest): KnowledgeForest {
  return forest.map((node) => ({
    ...node,
    name: { ...node.name },
    children: node.children ? cloneForest(node.children) : undefined,
  }));
}
