import Link from "next/link";

import { getDictionary } from "@/i18n/dictionaries";
import { datasetIndex } from "@/lib/dataset";
import { childrenOf } from "@/lib/tree";
import { ROOT_ID } from "@/lib/types";
import { loc, plateNumeral } from "@/lib/utils";
import { nodeHref } from "./hrefs";
import type { Locale } from "@/lib/types";

/**
 * The printed index.
 *
 * Doubles as two things: the a11y equivalent of the constellation (the canvas is
 * unreadable to a screen reader, so every entry must exist as text), and the
 * fallback when WebGL is unavailable. Because it is plain server-rendered
 * markup it costs nothing when the canvas does work — it is simply below it.
 */
export function PrintedIndex({ locale }: { locale: Locale }) {
  const dictionary = getDictionary(locale);
  const domains = datasetIndex.roots.filter((id) => id !== ROOT_ID);

  return (
    <div className="mx-auto max-w-[100rem] px-5 py-16 sm:px-8 sm:py-24">
      <header className="mb-12 flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="plate-label mb-3 text-brass">{dictionary.browse.title}</p>
          <h2 className="font-display-xl text-[clamp(2rem,5vw,3.6rem)] text-bone">
            {dictionary.rail.index}
          </h2>
        </div>
        <p className="prose-atlas max-w-md text-sm">{dictionary.browse.lede}</p>
      </header>

      <ol className="grid gap-x-10 md:grid-cols-2">
        {domains.map((id, i) => {
          const domain = datasetIndex.nodes[id];
          if (!domain) return null;
          const fields = childrenOf(datasetIndex, id);

          return (
            <li
              key={id}
              className="border-t border-bone-faint/15 py-8"
            >
              <div className="flex items-baseline gap-4">
                <span className="plate-label shrink-0 text-brass">
                  {plateNumeral(i)}
                </span>
                <div className="min-w-0 flex-1">
                  <Link
                    href={nodeHref(locale, id)}
                    className="font-display text-2xl leading-tight text-bone transition-colors hover:text-brass"
                  >
                    {loc(domain.name, locale)}
                  </Link>
                  <p className="mt-1.5 text-[0.82rem] leading-relaxed text-bone-dim/75">
                    {loc(domain.summary, locale) || dictionary.node.noSummary}
                  </p>
                  <p className="plate-label mt-3">
                    {fields.length} {dictionary.browse.fieldCount}
                  </p>
                </div>
              </div>

              <ul className="mt-5 flex flex-col gap-1 border-s border-bone-faint/12 ps-5">
                {fields.map((field) => (
                  <li key={field.id} className="flex items-baseline gap-2.5">
                    <span
                      className="mt-1.5 h-1 w-1 shrink-0 rotate-45"
                      style={{ background: `var(--color-accent-${field.accent})` }}
                      aria-hidden="true"
                    />
                    <Link
                      href={nodeHref(locale, field.id)}
                      className="text-[0.8rem] text-bone-dim transition-colors hover:text-bone"
                    >
                      {loc(field.name, locale)}
                    </Link>
                    <span className="font-mono text-[0.58rem] tabular-nums text-bone-faint/70">
                      {field.childrenIds.length}
                    </span>
                  </li>
                ))}
              </ul>
            </li>
          );
        })}
      </ol>
    </div>
  );
}