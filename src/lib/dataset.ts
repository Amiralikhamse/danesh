import { KNOWLEDGE_TREE, DATASET_META } from "@/data/tree";
import { computeStats, normalizeTree, type TreeStats } from "./tree";
import type { KnowledgeForest, NormalizeResult, TreeIndex } from "./types";

/**
 * Single normalized view of the dataset.
 *
 * Normalization is pure and deterministic, so doing it once at module scope is
 * safe — the server and the browser produce byte-identical layouts from the
 * same input.
 */

const result: NormalizeResult = normalizeTree(KNOWLEDGE_TREE);

export const datasetIndex: TreeIndex = result.index;
export const datasetForest: KnowledgeForest = result.forest;
export const datasetIssues = result.issues;
export const datasetStats: TreeStats = computeStats(datasetIndex);
export { DATASET_META };

/** Localized dataset title, resolved for a locale. */
export function datasetTitle(locale: "en" | "fa"): string {
  return DATASET_META.title[locale] || DATASET_META.title.en;
}
