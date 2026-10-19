/**
 * Validates the authored dataset against the schema and the real layout engine.
 * Run after `tsc -p tsconfig.verify.json`.
 */
const fs = require("node:fs");
const path = require("node:path");

const { normalizeTree, computeStats, childrenOf, domainIds, leafIds, searchNodes } = require("../.verify/lib/tree");
const { computeLayout, ACCENT_RGB } = require("../.verify/lib/layout");
const { KNOWLEDGE_TREE, DATASET_META } = require("../.verify/data/tree");
const { ACCENT_TOKENS, NODE_KINDS, ROOT_ID } = require("../.verify/lib/types");

let failures = 0;
const problems = [];
const notes = [];
const fail = (msg) => { failures += 1; problems.push(msg); };

// ---- structural walk -------------------------------------------------
let count = 0;
const ids = new Set();
const kinds = { domain: 0, field: 0, subfield: 0, topic: 0 };
const FA_SCRIPT = /[\u0600-\u06FF]/;
const PLACEHOLDER = /\?\?|\bTODO\b|\bTBD\b|placeholder/i;

function walk(node, depth, domainId) {
  count += 1;

  if (!node.id) return fail("node with no id");
  if (ids.has(node.id)) fail(`duplicate id: ${node.id}`);
  ids.add(node.id);
  kinds[NODE_KINDS[Math.min(depth, NODE_KINDS.length - 1)]] += 1;

  for (const locale of ["en", "fa"]) {
    const name = node.name?.[locale];
    if (!name || !String(name).trim()) {
      fail(`${node.id}: missing ${locale} name`);
    } else if (PLACEHOLDER.test(name)) {
      fail(`${node.id}: ${locale} name is a placeholder — "${name}"`);
    } else if (locale === "fa" && !FA_SCRIPT.test(name)) {
      fail(`${node.id}: ${locale} name lacks Persian script — "${name}"`);
    } else if (locale === "en" && FA_SCRIPT.test(name)) {
      fail(`${node.id}: en name is in Persian script — "${name}"`);
    }
  }

  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(node.id)) {
    fail(`${node.id}: id is not kebab-case`);
  }

  if (node.short) {
    for (const locale of ["en", "fa"]) {
      const s = node.short?.[locale];
      if (!s || !String(s).trim()) fail(`${node.id}: missing ${locale} short`);
      else if (String(s).split(/\s+/).length > 4) fail(`${node.id}: ${locale} short too long — "${s}"`);
    }
  } else if (depth <= 1) {
    fail(`${node.id}: domain/field has no short label`);
  }

  // Domains and fields carry long-form prose; deeper tiers carry a summary only.
  if (depth <= 1) {
    for (const locale of ["en", "fa"]) {
      if (!node.summary?.[locale]) fail(`${node.id}: missing ${locale} summary`);
      if (!node.description?.[locale]) fail(`${node.id}: missing ${locale} description`);
    }
  } else {
    for (const locale of ["en", "fa"]) {
      if (!node.summary?.[locale]) fail(`${node.id}: missing ${locale} summary`);
    }
  }

  if (node.kind) fail(`${node.id}: sets 'kind' explicitly — it must be inferred`);
  if (node.parentId) fail(`${node.id}: sets 'parentId' — nested shape must not`);

  if (depth === 0) {
    if (!ACCENT_TOKENS.includes(node.accent)) fail(`${node.id}: invalid accent "${node.accent}"`);
  }

  if (node.tags) {
    if (!Array.isArray(node.tags) || node.tags.length < 3) fail(`${node.id}: expected 3+ tags`);
    for (const tag of node.tags ?? []) {
      if (!tag?.en || !tag?.fa) fail(`${node.id}: tag missing a locale — ${JSON.stringify(tag)}`);
    }
  }

  if (node.children?.length) {
    if (domainId) { /* counted below */ }
    const seen = new Set();
    for (const child of node.children) {
      if (seen.has(child.id)) fail(`${node.id}: duplicate child ${child.id}`);
      seen.add(child.id);
      walk(child, depth + 1, domainId || node.id);
    }
  }
}

if (!Array.isArray(KNOWLEDGE_TREE) || KNOWLEDGE_TREE.length === 0) {
  fail("KNOWLEDGE_TREE is not a non-empty array");
} else {
  for (const domain of KNOWLEDGE_TREE) walk(domain, 0, null);
}

const accents = new Set(KNOWLEDGE_TREE.map((d) => d.accent));
if (accents.size !== KNOWLEDGE_TREE.length) fail("domains reuse an accent — each must be unique");

// ---- dataset meta ---------------------------------------------------
for (const locale of ["en", "fa"]) {
  for (const key of ["title", "subtitle", "description", "colophon"]) {
    if (!DATASET_META?.[key]?.[locale]) fail(`DATASET_META.${key}.${locale} missing`);
  }
}
if (!/^\d{4}-\d{2}$/.test(String(DATASET_META?.edition ?? ""))) {
  fail(`DATASET_META.edition should be YYYY-MM — got "${DATASET_META?.edition}"`);
}

// ---- engine round-trip ----------------------------------------------
const { index, issues } = normalizeTree(KNOWLEDGE_TREE);
for (const issue of issues) fail(`normalize: ${issue.level} ${issue.id}: ${issue.message}`);

const stats = computeStats(index);
const layout = computeLayout(index, "en");
const layoutFa = computeLayout(index, "fa");
const layoutRepeat = computeLayout(index, "en");

if (layout.nodes.length !== index.size + 1) {
  fail(`layout emitted ${layout.nodes.length} points for ${index.size + 1} entries`);
}
if (layout.positions.some((v) => !Number.isFinite(v))) fail("NaN in layout positions");
if (!layout.positions.every((v, i) => v === layoutRepeat.positions[i])) fail("layout is not deterministic");
if (!layout.positions.every((v, i) => v === layoutFa.positions[i])) fail("geometry differs between locales");

// Focus a subtree and make sure it is self-contained.
const probe = domainIds(index)[0];
const focused = computeLayout(index, "en", { focusId: probe });
if (!focused.nodesById[probe]) fail(`focus on ${probe} dropped the focused node`);
if (focused.nodes.length < 1) fail("focus produced an empty layout");

// Labels are localized and non-empty.
let emptyLabel = 0;
for (const n of layoutFa.nodes) {
  if (n.id === ROOT_ID) continue;
  if (!n.label || !FA_SCRIPT.test(n.label)) emptyLabel += 1;
}
if (emptyLabel > 0) fail(`${emptyLabel} node(s) have no Persian label in the fa layout`);
notes.push(`fa layout labels: ${layoutFa.nodes.length - emptyLabel}/${layoutFa.nodes.length - 1} localized`);

for (const id of domainIds(index)) {
  if (!ACCENT_RGB[index.nodes[id].accent]) fail(`accent for ${id} missing from the 3D palette`);
}

// ---- search sanity --------------------------------------------------
for (const [q, locale, label] of [["فیزیک", "fa", "physics"], ["نجوم", "fa", "astronomy"], ["physics", "en", "physics"], ["music", "en", "music"]]) {
  const hits = searchNodes(index, q, locale);
  notes.push(`${locale} search "${q}" (${label}) → ${hits.length} hits, top: ${hits[0]?.id ?? "none"}`);
  if (hits.length === 0) fail(`${locale} search for "${q}" returned nothing`);
}
const empty = searchNodes(index, "zzzzqqqq", "en");
if (empty.length > 0) fail(`nonsense query returned ${empty.length} hits`);

// ---- report ---------------------------------------------------------
console.log("── structure ──");
console.log(`  nodes          ${count}`);
console.log(`  domains        ${KNOWLEDGE_TREE.length}`);
console.log(`  fields         ${kinds.field}`);
console.log(`  subfields      ${kinds.subfield}`);
console.log(`  topics         ${kinds.topic}`);
console.log(`  leaves         ${leafIds(index).length}`);
console.log(`  tiers          ${stats.depth}`);
console.log(`  widest branch  ${stats.maxBranch}`);
console.log(`  layout         ${layout.nodes.length} pts / ${layout.edges.length} edges / extent ${layout.extent.toFixed(1)}`);

console.log("\n── per domain ──");
for (const d of KNOWLEDGE_TREE) {
  const kids = childrenOf(index, d.id);
  const below = kids.reduce((s, k) => s + k.subtreeSize, 0);
  console.log(
    `  ${String(d.id).padEnd(18)} ${String(d.accent || "?").padEnd(10)} ` +
      `${String(d.children?.length ?? 0).padStart(2)} fields  ${String(below).padStart(3)} below` +
      `${d.children?.length ? "" : "   (leaf domain)"}`,
  );
}

console.log("");
for (const n of notes) console.log(`  · ${n}`);

if (problems.length) {
  console.log(`\n── ${problems.length} problem(s) ──`);
  for (const p of problems.slice(0, 40)) console.log(`  ✗ ${p}`);
  if (problems.length > 40) console.log(`  … and ${problems.length - 40} more`);
}
console.log(`\n${failures === 0 ? "PASS" : "FAIL"} — ${failures} problem(s)`);
process.exit(failures ? 1 : 0);
