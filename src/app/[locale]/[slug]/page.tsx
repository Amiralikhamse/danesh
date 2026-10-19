import Link from "next/link";
import { notFound } from "next/navigation";

import { Reveal } from "@/components/motion/Reveal";
import { DoubleRule, Hairline } from "@/components/ui/Texture";
import { CornerTicks } from "@/components/ui/Texture";
import { atlasHref, domainsHref, nodeHref } from "@/components/shell/hrefs";
import { getDictionary } from "@/i18n/dictionaries";
import { datasetIndex, datasetStats } from "@/lib/dataset";
import { ancestorsOf, childrenOf, subtreeIds } from "@/lib/tree";
import { isLocale, ROOT_ID, type Locale } from "@/lib/types";
import { formatCount, loc, plateNumeral, toPersianDigits } from "@/lib/utils";

/**
 * Every entry gets a static page.
 *
 * `domains` and `colophon` are excluded because they are real routes that would
 * otherwise collide with a node slug.
 */
const RESERVED = new Set(["domains", "colophon"]);

export function generateStaticParams() {
  return (["en", "fa"] as const).flatMap((locale) =>
    datasetIndex.ids
      .filter((id) => id !== ROOT_ID && !RESERVED.has(id))
      .map((id) => ({ locale, slug: id })),
  );
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/[slug]">) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const node = datasetIndex.nodes[slug];
  if (!node) return {};

  const dictionary = getDictionary(locale);
  const name = loc(node.name, locale);

  return {
    title: name,
    description:
      loc(node.summary, locale) || loc(node.description, locale) || dictionary.meta.description,
  };
}

export default async function NodePage({
  params,
}: PageProps<"/[locale]/[slug]">) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();

  const node = datasetIndex.nodes[slug];
  if (!node || slug === ROOT_ID || RESERVED.has(slug)) notFound();

  const active: Locale = locale;
  const dictionary = getDictionary(active);
  const children = childrenOf(datasetIndex, node.id);
  const ancestors = ancestorsOf(datasetIndex, node.id);
  const siblings = node.parentId
    ? childrenOf(datasetIndex, node.parentId).filter((s) => s.id !== node.id)
    : [];
  const branchSize = subtreeIds(datasetIndex, node.id).length;
  const accent = `var(--color-accent-${node.accent})`;
  const num = active === "fa" ? toPersianDigits(dictionary.rail.plate) : dictionary.rail.plate;

  return (
    <article className="mx-auto max-w-[100rem] px-5 py-16 sm:px-8 sm:py-24">
      {/* Breadcrumb */}
      <nav aria-label={dictionary.graph.focusBreadcrumb} className="mb-12">
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link
              href={atlasHref(active)}
              className="plate-label transition-colors hover:text-brass"
            >
              {dictionary.nav.atlas}
            </Link>
          </li>
          {ancestors.map((ancestor) => (
            <li key={ancestor.id} className="flex items-center gap-2">
              <span className="text-bone-faint" aria-hidden="true">
                ›
              </span>
              <Link
                href={nodeHref(active, ancestor.id)}
                className="text-[0.78rem] text-bone-dim transition-colors hover:text-brass"
              >
                {loc(ancestor.name, active)}
              </Link>
            </li>
          ))}
          <li className="flex items-center gap-2">
            <span className="text-bone-faint" aria-hidden="true">
              ›
            </span>
            <span className="text-[0.78rem] text-bone">{loc(node.name, active)}</span>
          </li>
        </ol>
      </nav>

      <div className="grid gap-14 lg:grid-cols-[1.35fr_0.65fr] lg:gap-20">
        {/* Main column */}
        <div>
          <Reveal>
            <div className="mb-6 flex items-center gap-4">
              <span
                className="h-2 w-2 rotate-45"
                style={{ background: accent }}
                aria-hidden="true"
              />
              <span className="plate-label" style={{ color: accent }}>
                {node.kind}
              </span>
              <span className="h-px flex-1" style={{ background: accent, opacity: 0.3 }} />
            </div>

            <h1 className="font-display-xl text-[clamp(2.4rem,7vw,5rem)] text-bone">
              {loc(node.name, active)}
            </h1>

            {node.summary && (
              <p className="mt-6 font-display text-[clamp(1.2rem,2.4vw,1.7rem)] leading-snug text-bone-dim/80">
                {loc(node.summary, active)}
              </p>
            )}

            <DoubleRule className="mt-10" />
          </Reveal>

          {/* Long-form prose */}
          {node.description && (
            <Reveal className="mt-10">
              <p className="prose-atlas text-[1.02rem] leading-relaxed">
                {loc(node.description, active)}
              </p>
            </Reveal>
          )}

          {/* Children */}
          {children.length > 0 && (
            <section className="mt-16">
              <Reveal>
                <h2 className="plate-label mb-6 flex items-center gap-4">
                  <span>{dictionary.node.children}</span>
                  <span className="h-px flex-1 bg-bone-faint/20" />
                  <span className="font-mono tabular-nums">
                    {formatCount(children.length, active)}
                  </span>
                </h2>
              </Reveal>

              <ul className="grid gap-px sm:grid-cols-2">
                {children.map((child, i) => (
                  <Reveal key={child.id} as="li" stagger={0.04}>
                    <Link
                      href={nodeHref(active, child.id)}
                      className="group flex h-full flex-col gap-2 border border-bone-faint/12 p-5 transition-colors hover:border-brass/40 hover:bg-bone-faint/[0.04]"
                    >
                      <div className="flex items-baseline gap-3">
                        <span className="font-mono text-[0.6rem] tabular-nums text-bone-faint">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="font-display text-lg leading-tight text-bone transition-colors group-hover:text-brass">
                          {loc(child.name, active)}
                        </span>
                      </div>
                      {child.summary && (
                        <p className="text-[0.76rem] leading-relaxed text-bone-dim/70">
                          {loc(child.summary, active)}
                        </p>
                      )}
                      <span className="plate-label mt-auto pt-2">
                        {child.childrenIds.length} {dictionary.node.children}
                      </span>
                    </Link>
                  </Reveal>
                ))}
              </ul>
            </section>
          )}

          {/* Tags */}
          {node.tags && node.tags.length > 0 && (
            <section className="mt-14">
              <Reveal>
                <h2 className="plate-label mb-5">{dictionary.node.tags}</h2>
                <ul className="flex flex-wrap gap-2">
                  {node.tags.map((tag, i) => (
                    <li
                      key={`${tag.en}-${i}`}
                      className="border border-bone-faint/20 px-3 py-1 text-[0.72rem] text-bone-dim"
                    >
                      {loc(tag, active)}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </section>
          )}
        </div>

        {/* Margin column */}
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <Reveal className="paper-panel relative p-7">
            <CornerTicks size={13} tone={accent} />
            <h2 className="plate-label mb-6">{num}</h2>
            <Hairline className="mb-6" />

            <dl className="flex flex-col gap-5">
              <Fact
                label={dictionary.rail.depth}
                value={`${node.depth} / ${datasetStats.depth}`}
              />
              <Fact
                label={dictionary.node.subtotal}
                value={formatCount(branchSize, active)}
              />
              <Fact
                label={dictionary.node.children}
                value={formatCount(children.length, active)}
              />
              <Fact label={dictionary.node.leaf} value={formatCount(node.leaves.length, active)} />
            </dl>

            {node.parentId && node.parentId !== ROOT_ID && (
              <>
                <Hairline className="my-7" />
                <p className="plate-label mb-3">{dictionary.node.parent}</p>
                <Link
                  href={nodeHref(active, node.parentId)}
                  className="block font-display text-lg text-bone transition-colors hover:text-brass"
                >
                  {loc(datasetIndex.nodes[node.parentId]?.name, active)}
                </Link>
              </>
            )}
          </Reveal>

          {/* Siblings */}
          {siblings.length > 0 && (
            <Reveal className="mt-8">
              <h2 className="plate-label mb-4">{dictionary.node.inThisBranch}</h2>
              <ul className="flex flex-col">
                {siblings.map((sibling, i) => (
                  <li key={sibling.id}>
                    <Link
                      href={nodeHref(active, sibling.id)}
                      className="group flex items-baseline gap-2.5 border-b border-bone-faint/12 py-2.5"
                    >
                      <span className="font-mono text-[0.58rem] tabular-nums text-bone-faint">
                        {plateNumeral(i)}
                      </span>
                      <span className="text-[0.8rem] text-bone-dim transition-colors group-hover:text-bone">
                        {loc(sibling.name, active)}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>
          )}

          <Reveal className="mt-8">
            <Link
              href={domainsHref(active)}
              className="plate-label flex items-center justify-between gap-3 border border-bone-faint/20 px-4 py-3 transition-colors hover:border-brass/50 hover:text-brass"
            >
              {dictionary.browse.backToAtlas}
              <span aria-hidden="true">→</span>
            </Link>
          </Reveal>
        </aside>
      </div>
    </article>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-bone-faint/10 pb-3">
      <dt className="plate-label text-[0.55rem]">{label}</dt>
      <dd className="font-mono text-[0.72rem] tabular-nums text-bone">{value}</dd>
    </div>
  );
}