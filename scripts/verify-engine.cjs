/**
 * Standalone verification harness for the data + layout engine.
 * Compiled to CommonJS and run under plain node — no test framework needed.
 */
const { normalizeTree, computeStats, searchNodes, trailOf, childrenOf, domainIds, leafIds } = require("../.verify/lib/tree");
const { computeLayout, frameCamera, focusFrame, pathTo, ACCENT_RGB } = require("../.verify/lib/layout");
const { isLocale, ROOT_ID } = require("../.verify/lib/types");
const { loc, mulberry32, hashString, mapRange, clamp, plateNumeral } = require("../.verify/lib/utils");

let failures = 0;
const checks = [];

function check(name, fn) {
  try {
    const detail = fn();
    checks.push({ name, ok: true, detail: detail ?? "" });
  } catch (err) {
    failures += 1;
    checks.push({ name, ok: false, detail: err.message });
  }
}

function assert(cond, message) {
  if (!cond) throw new Error(message);
}

function approx(a, b, eps = 1e-6) {
  return Math.abs(a - b) < eps;
}

/* ---------- synthetic dataset ----------
 * Explicit so depths and subtree shapes are unambiguous:
 *
 *   lonely            depth 0  (leaf domain)
 *   art               depth 0  -> 6 field children, all leaves   (maxBranch 6)
 *   math              depth 0  -> m1..m5
 *   math/m1           depth 1  -> m1a, m1b, m1c
 *   math/m1/m1a       depth 2  -> m1a1, m1a2
 *   math/m1/m1a/m1a1  depth 3  (deepest)
 *   physics           depth 0  -> p1..p4
 *   physics/p1        depth 1  -> p1a..p1c (leaves)
 */

function L(en, fa) {
  return { en, fa };
}

function node(id, en, fa, children) {
  const n = {
    id,
    name: L(en, fa),
    short: L(en, fa),
    summary: L(`Summary for ${en}`, `خلاصهٔ ${fa}`),
    tags: [L("alpha", "آلفا"), L("beta", "بتا")],
  };
  if (children && children.length) n.children = children;
  return n;
}

const ART_CHILDREN = Array.from({ length: 6 }, (_, i) =>
  node(`art-${i}`, `Art ${i}`, `هنر ${i}`),
);

const MATH_CHILDREN = Array.from({ length: 5 }, (_, i) =>
  i === 0
    ? node("m1", "Math 1", "ریاضی ۱", [
        node("m1a", "Math 1a", "ریاضی ۱الف", [
          node("m1a1", "Math 1a1", "ریاضی ۱الف۱"),
          node("m1a2", "Math 1a2", "ریاضی ۱الف۲"),
        ]),
        node("m1b", "Math 1b", "ریاضی ۱ب"),
        node("m1c", "Math 1c", "ریاضی ۱ج"),
      ])
    : node(`m${i + 1}`, `Math ${i + 1}`, `ریاضی ${i + 1}`),
);

const PHYSICS_CHILDREN = Array.from({ length: 4 }, (_, i) =>
  i === 0
    ? node("p1", "Physics 1", "فیزیک ۱", [
        node("p1a", "Physics 1a", "فیزیک ۱الف"),
        node("p1b", "Physics 1b", "فیزیک ۱ب"),
        node("p1c", "Physics 1c", "فیزیک ۱ج"),
      ])
    : node(`p${i + 1}`, `Physics ${i + 1}`, `فیزیک ${i + 1}`),
);

const FOREST = [
  node("math", "Mathematics", "ریاضیات", MATH_CHILDREN),
  node("physics", "Physics", "فیزیک", PHYSICS_CHILDREN),
  node("art", "Art", "هنر", ART_CHILDREN),
  node("lonely", "Lonely Field", "شاخهٔ تنها"),
];

const { forest, index, issues } = normalizeTree(FOREST);

/* ---------- normalization ---------- */

check("normalize produces no errors", () => {
  assert(issues.filter((i) => i.level === "error").length === 0, JSON.stringify(issues));
  return `${issues.length} issue(s)`;
});

check("sibling order preserved", () => {
  assert(forest.map((n) => n.id).join(",") === "math,physics,art,lonely", "order drifted");
  const physicsChildren = childrenOf(index, "physics").map((n) => n.id);
  assert(physicsChildren.join(",") === "p1,p2,p3,p4", `physics children: ${physicsChildren}`);
  const mathChildren = childrenOf(index, "math").map((n) => n.id);
  assert(mathChildren.join(",") === "m1,m2,m3,m4,m5", `math children: ${mathChildren}`);
  return "ok";
});

check("synthetic root registered", () => {
  assert(index.nodes[ROOT_ID], "no synthetic root");
  assert(index.nodes[ROOT_ID].depth === -1, "root depth should be -1");
  assert(
    index.nodes[ROOT_ID].childrenIds.join(",") === "math,physics,art,lonely",
    "root children wrong",
  );
  assert(index.nodes.math.parentId === ROOT_ID, "domain parentId should be the synthetic root");
  assert(index.nodes.m1.parentId === "math", "field parentId wrong");
  return "ok";
});

check("depth inferred from nesting", () => {
  assert(index.nodes.math.depth === 0, `math depth ${index.nodes.math.depth}`);
  assert(index.nodes.m1.depth === 1, `m1 depth ${index.nodes.m1.depth}`);
  assert(index.nodes.m1a.depth === 2, `m1a depth ${index.nodes.m1a.depth}`);
  assert(index.nodes.m1a1.depth === 3, `m1a1 depth ${index.nodes.m1a1.depth}`);
  assert(index.nodes.math.kind === "domain", "math should be a domain");
  assert(index.nodes.m1.kind === "field", "m1 should be a field");
  assert(index.nodes.m1a.kind === "subfield", "m1a should be a subfield");
  assert(index.nodes.m1a1.kind === "topic", "m1a1 should be a topic");
  assert(index.depth === 3, `index.depth ${index.depth}`);
  return `max depth ${index.depth}`;
});

check("ancestors + trail correct", () => {
  const deep = index.nodes.m1a1;
  assert(
    deep.ancestors.join(">") === [ROOT_ID, "math", "m1", "m1a"].join(">"),
    `ancestors: ${deep.ancestors}`,
  );
  // trail excludes the synthetic root — breadcrumbs stay readable.
  assert(
    trailOf(index, "m1a1", "en").join(" > ") === "Mathematics > Math 1 > Math 1a > Math 1a1",
    `trail: ${trailOf(index, "m1a1", "en")}`,
  );
  assert(trailOf(index, "p1", "fa")[0] === "فیزیک", "fa trail wrong");
  // Every descendant must carry ROOT_ID too, not just the domain.
  assert(index.nodes.m1a1.ancestors[0] === ROOT_ID, "descendant missing ROOT_ID");
  return "ok";
});

check("subtree metrics correct", () => {
  const physics = index.nodes.physics;
  // physics -> p1 -> 3 leaves. Real leaves under physics = 3 + 3 = 6.
  assert(physics.leaves.length === 6, `physics leaves ${physics.leaves.length}`);
  assert(physics.leaves.every((id) => index.nodes[id].childrenIds.length === 0), "non-leaf in leaves");
  assert(physics.subtreeHeight === 2, `physics subtreeHeight ${physics.subtreeHeight}`);
  assert(physics.subtreeWeight === physics.subtreeSize + 1, "weight should be size+1");
  // physics subtree: 4 children + (3 grandchildren) = 7
  assert(physics.subtreeSize === 7, `physics subtreeSize ${physics.subtreeSize}`);

  const m1 = index.nodes.m1;
  assert(m1.subtreeSize === 5, `m1 subtreeSize ${m1.subtreeSize} (3 children + 2 grandchildren)`);
  assert(m1.subtreeHeight === 2, `m1 subtreeHeight ${m1.subtreeHeight}`);

  const lonely = index.nodes.lonely;
  assert(lonely.subtreeSize === 0, "leaf subtreeSize should be 0");
  assert(lonely.subtreeHeight === 0, "leaf subtreeHeight should be 0");
  assert(lonely.leaves.length === 1 && lonely.leaves[0] === "lonely", "leaf leaves should be itself");

  const root = index.nodes[ROOT_ID];
  assert(root.subtreeSize === index.size, "root subtreeSize should cover the tree");
  assert(root.leaves.length === leafIds(index).length, "root leaves mismatch");
  return "ok";
});

check("stats computed", () => {
  const stats = computeStats(index);
  assert(stats.domains === 4, `domains ${stats.domains}`);
  assert(stats.maxBranch === 6, `maxBranch ${stats.maxBranch}`);
  assert(stats.total === index.size, "total mismatch");
  return JSON.stringify(stats);
});

check("bylocale resolution", () => {
  assert(loc(index.nodes.math.name, "fa") === "ریاضیات", "fa name");
  assert(loc(index.nodes.math.name, "en") === "Mathematics", "en name");
  assert(loc(undefined, "en") === "", "missing localized should be empty string");
  return "ok";
});

check("flat input shape works", () => {
  const flat = {
    a: { id: "a", name: L("A", "الف"), parentId: null },
    b: { id: "b", name: L("B", "ب"), parentId: "a" },
    c: { id: "c", name: L("C", "ج"), parentId: "b" },
  };
  const r = normalizeTree(flat);
  assert(r.index.nodes.c.depth === 2, `flat depth ${r.index.nodes.c.depth}`);
  assert(r.index.nodes.a.childrenIds.join(",") === "b", "flat children");
  assert(r.index.nodes.c.ancestors.join(">") === [ROOT_ID, "a", "b"].join(">"), "flat ancestors");
  return "ok";
});

check("orphan flat node is promoted + warned", () => {
  const r = normalizeTree({
    x: { id: "x", name: L("X", "ایکس"), parentId: "ghost" },
  });
  assert(r.issues.some((i) => i.level === "warn" && i.id === "x"), "expected orphan warning");
  assert(r.index.roots.includes("x"), "orphan should be promoted to a domain");
  return "ok";
});

check("cycle terminates", () => {
  const cyclic = { id: "c", name: L("C", "ج"), parentId: "d", children: [] };
  const d = { id: "d", name: L("D", "د"), parentId: "c", children: [] };
  const r = normalizeTree([cyclic, d]);
  assert(r.index.size === 2, `cycle produced ${r.index.size} nodes, expected 2`);
  return "ok";
});

check("duplicate ids do not duplicate nodes", () => {
  const r = normalizeTree([
    { id: "dup", name: L("One", "یک") },
    { id: "dup", name: L("Two", "دو") },
  ]);
  assert(r.index.size === 1, `expected 1 node, got ${r.index.size}`);
  return "ok";
});

/* ---------- search ---------- */

check("search ranks prefix above substring", () => {
  const hits = searchNodes(index, "mat", "en");
  assert(hits.length > 0, "no hits for 'mat'");
  assert(hits[0].id === "math", `top hit was ${hits[0].id}`);
  return `${hits.length} hits`;
});

check("search works in persian", () => {
  const hits = searchNodes(index, "ریاضی", "fa");
  assert(hits[0]?.id === "math", `fa top hit was ${hits[0]?.id}`);
  return "ok";
});

check("search highlights ranges", () => {
  const hits = searchNodes(index, "math", "en");
  const hit = hits.find((h) => h.id === "math");
  assert(hit.ranges.length > 0, "no highlight ranges");
  assert(hit.ranges[0][0] === 0 && hit.ranges[0][1] === 4, `range ${JSON.stringify(hit.ranges)}`);
  return JSON.stringify(hit.ranges);
});

check("search matches tags", () => {
  const hits = searchNodes(index, "alpha", "en");
  assert(hits.length > 0, "tag search returned nothing");
  return `${hits.length} tag hits`;
});

check("empty query returns nothing", () => {
  assert(searchNodes(index, "   ", "en").length === 0, "whitespace query should not match");
  return "ok";
});

/* ---------- layout ---------- */

const layout = computeLayout(index, "en");
const layoutFa = computeLayout(index, "fa");
const layoutAgain = computeLayout(index, "en");

check("layout produced geometry for every node", () => {
  assert(layout.nodes.length === index.size + 1, `${layout.nodes.length} vs ${index.size + 1}`);
  assert(layout.positions.length === layout.nodes.length * 3, "positions length mismatch");
  assert(layout.radii.length === layout.nodes.length, "radii length mismatch");
  return `${layout.nodes.length} nodes, ${layout.edges.length} edges`;
});

check("no NaN or Infinity anywhere", () => {
  for (let i = 0; i < layout.positions.length; i += 1) {
    const v = layout.positions[i];
    assert(Number.isFinite(v), `position[${i}] = ${v}`);
  }
  for (const r of layout.radii) assert(Number.isFinite(r) && r > 0, `radius ${r}`);
  for (const e of layout.edges) {
    assert(Number.isFinite(e.mx) && Number.isFinite(e.my) && Number.isFinite(e.mz), "edge mid NaN");
  }
  return "ok";
});

check("root sits at the origin", () => {
  const root = layout.nodesById[ROOT_ID];
  assert(approx(root.x, 0) && approx(root.y, 0) && approx(root.z, 0), `root at ${root.x},${root.y},${root.z}`);
  assert(root.i === 0, "root should be node 0");
  assert(layout.radii[0] === 1, "root radius should be 1");
  return "ok";
});

check("layout is deterministic (SSR-safe)", () => {
  assert(
    layout.positions.every((v, i) => v === layoutAgain.positions[i]),
    "positions differ between runs — hydration would break",
  );
  assert(layout.nodes.length === layoutAgain.nodes.length, "node count differs");
  return "identical across two runs";
});

check("locale only changes labels, not geometry", () => {
  assert(
    layout.positions.every((v, i) => v === layoutFa.positions[i]),
    "geometry changed with locale",
  );
  const physics = layoutFa.nodesById.physics;
  assert(physics.label === "فیزیک", `fa label: ${physics.label}`);
  return "ok";
});

check("radial distance increases with depth", () => {
  const byDepth = new Map();
  for (const n of layout.nodes) {
    if (n.id === ROOT_ID) continue;
    const r = Math.hypot(n.x, n.z);
    const prev = byDepth.get(n.depth);
    if (prev === undefined || r < prev) byDepth.set(n.depth, r);
  }
  const depths = [...byDepth.keys()].sort((a, b) => a - b);
  for (let i = 1; i < depths.length; i += 1) {
    const a = byDepth.get(depths[i - 1]);
    const b = byDepth.get(depths[i]);
    assert(b > a, `depth ${depths[i]} radius ${b.toFixed(2)} not beyond depth ${depths[i - 1]} ${a.toFixed(2)}`);
  }
  return [...byDepth.entries()]
    .sort((x, y) => x[0] - y[0])
    .map(([d, r]) => `d${d}:${r.toFixed(1)}`)
    .join(" ");
});

check("outer ring reaches the configured radius", () => {
  const maxR = Math.max(
    ...layout.nodes.filter((n) => n.id !== ROOT_ID).map((n) => Math.hypot(n.x, n.z)),
  );
  assert(maxR > 20 && maxR <= 26.01, `outer radius ${maxR.toFixed(2)}`);
  return `outer radius ${maxR.toFixed(2)} of 26`;
});

check("dome lifts the rim above the origin", () => {
  const rim = layout.nodes.filter((n) => n.depth >= 1);
  const avgY = rim.reduce((s, n) => s + n.y, 0) / rim.length;
  assert(avgY > 1, `average rim height ${avgY.toFixed(2)} — dome not rising`);
  return `average rim y = ${avgY.toFixed(2)}`;
});

check("parents resolved and edges valid", () => {
  for (const n of layout.nodes) {
    if (n.id === ROOT_ID) continue;
    assert(n.parent >= 0, `${n.id} has no parent index`);
    assert(
      layout.nodes[n.parent].id === n.ancestors[n.ancestors.length - 1],
      `${n.id} parent ${layout.nodes[n.parent].id} != ancestor tail ${n.ancestors[n.ancestors.length - 1]}`,
    );
    // Ancestry must start at the synthetic root for every node, not just domains.
    assert(n.ancestors[0] === ROOT_ID, `${n.id} ancestry does not start at the root`);
  }
  assert(layout.edgeIndices.length === layout.edges.length * 2, "edge index count mismatch");
  for (let i = 0; i < layout.edgeIndices.length; i += 1) {
    const v = layout.edgeIndices[i];
    assert(v >= 0 && v < layout.nodes.length, `edge index ${v} out of range`);
  }
  assert(layout.edgeColors.length === layout.edgeIndices.length * 3, "edge colors length mismatch");
  return "ok";
});

check("twigs dimmer than branches", () => {
  const lum = (i) => layout.edgeColors[i * 3] + layout.edgeColors[i * 3 + 1] + layout.edgeColors[i * 3 + 2];
  let branchLum = 0, branchN = 0, twigLum = 0, twigN = 0;
  for (const e of layout.edges) {
    if (e.depth <= 1) { branchLum += lum(e.i); branchN += 1; }
    else { twigLum += lum(e.i); twigN += 1; }
  }
  assert(branchN > 0 && twigN > 0, "need both branches and twigs");
  assert(branchLum / branchN > twigLum / twigN, "twigs not dimmer");
  return `branch ${(branchLum / branchN).toFixed(2)} > twig ${(twigLum / twigN).toFixed(2)}`;
});

check("node weight scales with branch size", () => {
  const art = layout.nodesById.art;
  const lonely = layout.nodesById.lonely;
  assert(art.weight > lonely.weight, `art ${art.weight} should exceed lonely ${lonely.weight}`);
  assert(lonely.weight >= 0.14 && lonely.weight <= 1, `weight out of range: ${lonely.weight}`);
  return `art ${art.weight.toFixed(2)} > lonely ${lonely.weight.toFixed(2)}`;
});

check("accents assigned per domain and known to the palette", () => {
  const accents = domainIds(index).map((id) => layout.nodesById[id].accent);
  assert(new Set(accents).size === accents.length, `duplicate accents: ${accents}`);
  for (const a of accents) assert(ACCENT_RGB[a], `accent ${a} missing from ACCENT_RGB`);
  return accents.join(" ");
});

check("includeRoot:false keeps every domain", () => {
  const headless = computeLayout(index, "en", { includeRoot: false });
  assert(!headless.nodesById[ROOT_ID], "root should be omitted");
  assert(headless.nodes.length === index.size, `${headless.nodes.length} vs ${index.size} — domains lost`);
  for (const id of domainIds(index)) {
    assert(headless.nodesById[id], `domain ${id} missing when includeRoot is false`);
  }
  return `${headless.nodes.length} nodes across ${headless.domainCount} domains`;
});

check("pathTo returns root-first chain", () => {
  const path = pathTo(layout, "m1a1");
  assert(path[0] === ROOT_ID, `path starts at ${path[0]}`);
  assert(path[path.length - 1] === "m1a1", "path should end at target");
  assert(
    path.join(",") === [ROOT_ID, "math", "m1", "m1a", "m1a1"].join(","),
    path.join(","),
  );
  return path.join(" › ");
});

check("focus layout contains only the subtree", () => {
  const focused = computeLayout(index, "en", { focusId: "physics" });
  assert(!focused.nodesById[ROOT_ID], "focus should drop the synthetic root");
  const ids = focused.nodes.map((n) => n.id);
  assert(ids.includes("physics") && ids.includes("p1"), `subtree nodes missing: ${ids.join(",")}`);
  assert(!ids.includes("math") && !ids.includes("art"), "leaked nodes from other domains");
  assert(focused.domainCount === 1, `domainCount ${focused.domainCount}`);
  // The focused root must still sit at the origin.
  const fRoot = focused.nodesById.physics;
  assert(approx(fRoot.x, 0) && approx(fRoot.y, 0) && approx(fRoot.z, 0), "focused root off-origin");
  return `${focused.nodes.length} nodes`;
});

check("maxNodes truncates instead of hanging", () => {
  const capped = computeLayout(index, "en", { maxNodes: 10 });
  assert(capped.nodes.length <= 11, `produced ${capped.nodes.length}`);
  assert(capped.truncated.length > 0, "truncation not reported");
  return `${capped.nodes.length} nodes, ${capped.truncated.length} truncated`;
});

check("unknown focusId degrades to empty", () => {
  const bad = computeLayout(index, "en", { focusId: "does-not-exist" });
  assert(bad.nodes.length === 0, "should be empty");
  return "ok";
});

check("angleOffset rotates without moving radius", () => {
  const rotated = computeLayout(index, "en", { angleOffset: Math.PI / 3 });
  const a = layout.nodesById.art;
  const b = rotated.nodesById.art;
  assert(
    approx(Math.hypot(a.x, a.z), Math.hypot(b.x, b.z), 0.5),
    "radius changed under rotation",
  );
  assert(!approx(a.x, b.x, 1e-3), "position did not rotate");
  return "ok";
});

check("empty forest degrades to empty layout", () => {
  const empty = computeLayout(normalizeTree([]).index, "en");
  assert(empty.nodes.length === 0 && empty.extent === 0, "empty layout not empty");
  return "ok";
});

/* ---------- camera ---------- */

check("frameCamera fits and looks down at the dome", () => {
  const frame = frameCamera(layout, { aspect: 1.777 });
  assert(frame.distance > layout.extent, "camera too close");
  assert(frame.position[1] > 0, "camera should be above the equator");
  assert(Math.hypot(...frame.position) > 0, "camera at origin");
  // Widening the viewport relaxes the *horizontal* constraint; the vertical one
  // is unchanged, so the framing distance must never shrink as aspect grows.
  const wide = frameCamera(layout, { aspect: 3.2 });
  assert(wide.distance >= frame.distance - 1e-6, "ultrawide pulled the camera closer");
  // Narrowing it tightens the horizontal constraint and pushes the camera back.
  const tall = frameCamera(layout, { aspect: 0.5 });
  assert(tall.distance > frame.distance, "portrait should pull back further");
  const ultraTall = frameCamera(layout, { aspect: 0.25 });
  assert(ultraTall.distance > tall.distance, "narrower portrait should pull back further still");
  return `dist ${frame.distance.toFixed(1)} (16:9) / ${tall.distance.toFixed(1)} (portrait)`;
});

check("focusFrame targets the subtree centroid", () => {
  const frame = focusFrame(layout, "physics");
  assert(frame, "no frame returned");
  // Centroid of {physics, p1..p4, p1a..p1c} must sit on the physics sector.
  const members = layout.nodes.filter((n) => n.id === "physics" || n.ancestors.includes("physics"));
  const cx = members.reduce((s, n) => s + n.x, 0) / members.length;
  const cy = members.reduce((s, n) => s + n.y, 0) / members.length;
  const cz = members.reduce((s, n) => s + n.z, 0) / members.length;
  assert(Math.hypot(frame.target[0] - cx, frame.target[1] - cy, frame.target[2] - cz) < 1e-6,
    `target ${frame.target} vs centroid ${[cx, cy, cz]}`);
  const ph = layout.nodesById.p1;
  assert(Math.hypot(ph.x - frame.target[0], ph.z - frame.target[2]) < layout.extent, "target far from subtree");
  return `${members.length} members, target ${frame.target.map((v) => v.toFixed(1)).join(",")}`;
});

check("focusFrame returns null for unknown id", () => {
  assert(focusFrame(layout, "nope") === null, "should be null");
  return "ok";
});

/* ---------- utils ---------- */

check("mulberry32 is deterministic and in range", () => {
  const a = mulberry32(42);
  const b = mulberry32(42);
  for (let i = 0; i < 500; i += 1) {
    const v = a();
    assert(v === b(), "sequence diverged");
    assert(v >= 0 && v < 1, `out of range: ${v}`);
  }
  return "ok";
});

check("hashString is stable across calls", () => {
  assert(hashString("physics") === hashString("physics"), "hash unstable");
  assert(hashString("physics") !== hashString("physic"), "hash collision on near-identical strings");
  return "ok";
});

check("clamp / mapRange / loc behave", () => {
  assert(clamp(5, 0, 3) === 3, "clamp high");
  assert(clamp(-5, 0, 3) === 0, "clamp low");
  assert(clamp(2, 0, 3) === 2, "clamp passthrough");
  assert(mapRange(5, 0, 10, 0, 100) === 50, "mapRange mid");
  assert(mapRange(50, 0, 10, 0, 100) === 100, "mapRange should clamp high");
  assert(mapRange(3, 3, 3, 7, 9) === 7, "mapRange degenerate range");
  assert(plateNumeral(0) === "I" && plateNumeral(9) === "X", "plate numerals");
  assert(plateNumeral(99) === "100", "plate numeral overflow");
  return "ok";
});

check("isLocale guards routing", () => {
  assert(isLocale("en") && isLocale("fa"), "locales rejected");
  assert(!isLocale("de") && !isLocale("") && !isLocale("../etc"), "bad locales accepted");
  return "ok";
});

/* ---------- report ---------- */

for (const c of checks) {
  console.log(`${c.ok ? "  ok  " : " FAIL "} ${c.name}${c.detail ? `  — ${c.detail}` : ""}`);
}
console.log(`\n${checks.length - failures}/${checks.length} checks passed`);
process.exit(failures > 0 ? 1 : 0);
