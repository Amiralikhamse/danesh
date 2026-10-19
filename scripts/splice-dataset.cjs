/**
 * Splices the authored domain block into src/data/tree.ts.
 * Uses Node's UTF-8 handling — never round-trip this file through PowerShell.
 */
const fs = require("node:fs");
const path = require("node:path");

const root = path.join(__dirname, "..");
const target = path.join(root, "src", "data", "tree.ts");
const partPath = process.argv[2];

if (!partPath) {
  console.error("usage: node splice-dataset.cjs <part-file>");
  process.exit(1);
}

const part = fs.readFileSync(partPath, "utf8").trimEnd();
let src = fs.readFileSync(target, "utf8");

// Guard against double-splicing.
if (src.includes('id: "arts-design"')) {
  console.error("refusing to splice: arts-design already present");
  process.exit(1);
}

// The array currently ends with the last domain followed by `];`.
const marker = /\n\];\s*$/;
if (!marker.test(src)) {
  console.error("unexpected file ending — no trailing `];`");
  process.exit(1);
}

// Re-indent the block by two spaces so it nests under KNOWLEDGE_TREE.
const indented = part
  .split(/\r?\n/)
  .map((line) => (line.length ? `  ${line}` : line))
  .join("\n");

src = src.replace(marker, `,\n${indented}\n];\n`);

fs.writeFileSync(target, src, "utf8");

const fa = (src.match(/[\u0600-\u06FF]/g) ?? []).length;
console.log(`spliced ${indented.split("\n").length} lines`);
console.log(`tree.ts is now ${src.length} chars, ${src.split("\n").length} lines, ${fa} Persian chars`);
