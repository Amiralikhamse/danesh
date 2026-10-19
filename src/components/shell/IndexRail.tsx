"use client";

import Link from "next/link";

import { useAtlas } from "@/components/providers/AtlasProvider";
import { GrowthScrubber } from "@/components/atlas/GrowthScrubber";
import { formatCount, loc, plateNumeral } from "@/lib/utils";
import { childrenOf } from "@/lib/tree";
import { ROOT_ID } from "@/lib/types";
import { nodeHref } from "@/components/shell/hrefs";

/**
 * The index rail.
 *
 * A fixed plate down one edge: the dataset's vital statistics, the ten domains
 * as plate-numbered entries, a legend for the four tiers, and the growth
 * scrubber. It is the text-only equivalent of the constellation, which is why
 * it carries live counts rather than decoration.
 */
export function IndexRail({ open }: { open: boolean }) {
  const { locale, dictionary, index, stats, select, selectedId, requestCamera } =
    useAtlas();

  const domains = index.roots.filter((id) => id !== ROOT_ID);

  return (
    <aside
      className={[
        "glass z-30 flex flex-col rounded-se-none rounded-ee-none border-t-0 border-s-0 border-b-0",
        "absolute inset-y-0 start-0 w-[17.5rem] max-w-[86vw] transition-transform duration-500",
        "[transition-timing-function:var(--ease-plate)]",
        open ? "translate-x-0" : "ltr:-translate-x-full rtl:translate-x-full",
        "max-lg:shadow-[0_0_60px_rgba(5,8,15,0.9)]",
      ].join(" ")}
      aria-label={dictionary.rail.index}
    >
      <div className="flex items-center justify-between border-b border-bone-faint/15 px-5 py-4">
        <h2 className="plate-label text-brass">{dictionary.rail.index}</h2>
        <span className="font-mono text-[0.625rem] tabular-nums text-bone-faint">
          {stats.depth.toString().padStart(2, "0")} {dictionary.rail.depth}
        </span>
      </div>

      {/* Vital statistics */}
      <dl className="grid grid-cols-2 gap-x-4 gap-y-3 border-b border-bone-faint/15 px-5 py-4">
        <Figure label={dictionary.rail.total} value={stats.total} locale={locale} />
        <Figure label={dictionary.rail.domains} value={stats.domains} locale={locale} />
        <Figure label={dictionary.rail.fields} value={stats.fields} locale={locale} />
        <Figure label={dictionary.rail.subfields} value={stats.subfields} locale={locale} />
        <Figure label={dictionary.rail.maxBranch} value={stats.maxBranch} locale={locale} />
        <Figure label={dictionary.rail.plate} value={stats.leaves} locale={locale} />
      </dl>

      {/* Growth scrubber */}
      <div className="border-b border-bone-faint/15 px-5 py-4">
        <GrowthScrubber />
      </div>

      {/* Domain list */}
      <nav className="min-h-0 flex-1 overflow-y-auto px-2 py-3">
        <ul className="flex flex-col">
          {domains.map((id, i) => {
            const node = index.nodes[id];
            if (!node) return null;
            const fieldCount = childrenOf(index, id).length;
            const active = selectedId === id;
            const onPath = selectedId
              ? (index.nodes[selectedId]?.ancestors ?? []).includes(id)
              : false;

            return (
              <li key={id}>
                <button
                  type="button"
                  onClick={() => {
                    select(active ? null : id);
                    requestCamera(null);
                  }}
                  className={[
                    "group flex w-full items-baseline gap-3 px-3 py-2 text-start transition-colors",
                    active
                      ? "bg-brass/12 text-bone"
                      : onPath
                        ? "text-bone/90"
                        : "text-bone-dim hover:bg-bone-faint/8 hover:text-bone",
                  ].join(" ")}
                >
                  <span
                    className={`font-mono text-[0.6rem] tabular-nums ${
                      active ? "text-brass" : "text-bone-faint"
                    }`}
                  >
                    {plateNumeral(i)}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[0.8rem] leading-tight">
                      {loc(node.name, locale)}
                    </span>
                    <span className="mt-0.5 block font-mono text-[0.6rem] tabular-nums text-bone-faint">
                      {fieldCount} {dictionary.browse.fieldCount}
                    </span>
                  </span>
                  {/* Accent pip — the domain's colour, used as a survey mark. */}
                  <span
                    className="mt-1 h-1 w-1 shrink-0 rotate-45 transition-transform group-hover:scale-150"
                    style={{
                      background: `var(--color-accent-${node.accent})`,
                    }}
                    aria-hidden="true"
                  />
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Tier legend */}
      <div className="border-t border-bone-faint/15 px-5 py-4">
        <p className="plate-label mb-3">{dictionary.graph.depthLegend}</p>
        <ul className="flex flex-col gap-1.5">
          <LegendRow swatch="1.6" label={dictionary.rail.domains} count={stats.domains} />
          <LegendRow swatch="1.1" label={dictionary.rail.fields} count={stats.fields} />
          <LegendRow swatch="0.7" label={dictionary.rail.subfields} count={stats.subfields} />
          {stats.topics > 0 && (
            <LegendRow swatch="0.45" label={dictionary.rail.topics} count={stats.topics} />
          )}
        </ul>
      </div>

      <div className="border-t border-bone-faint/15 px-5 py-3">
        <Link
          href={nodeHref(locale, index.roots[0] ?? "")}
          className="plate-label transition-colors hover:text-brass"
        >
          {dictionary.browse.viewAll} →
        </Link>
      </div>
    </aside>
  );
}

function Figure({
  label,
  value,
  locale,
}: {
  label: string;
  value: number;
  locale: "en" | "fa";
}) {
  return (
    <div className="flex flex-col gap-1">
      <dt className="plate-label text-[0.55rem]">{label}</dt>
      <dd className="font-mono text-sm tabular-nums text-bone">
        {formatCount(value, locale)}
      </dd>
    </div>
  );
}

function LegendRow({
  swatch,
  label,
  count,
}: {
  swatch: string;
  label: string;
  count: number;
}) {
  return (
    <li className="flex items-center gap-2.5">
      <span
        className="shrink-0 rounded-full bg-brass/70"
        style={{ width: swatch, height: swatch }}
        aria-hidden="true"
      />
      <span className="flex-1 text-[0.7rem] text-bone-dim">{label}</span>
      <span className="font-mono text-[0.6rem] tabular-nums text-bone-faint">
        {count}
      </span>
    </li>
  );
}