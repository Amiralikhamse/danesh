import Link from "next/link";
import { notFound } from "next/navigation";

import { AtlasStage } from "@/components/atlas/AtlasStage";
import { Reveal } from "@/components/motion/Reveal";
import { IntroTrigger } from "@/components/motion/IntroTrigger";
import { Marquee, type MarqueeItem } from "@/components/motion/Marquee";
import { PlateHeading, StatBlock } from "@/components/ui/PlateHeading";
import { CornerTicks, DoubleRule, Hairline } from "@/components/ui/Texture";
import { colophonHref, domainsHref, nodeHref } from "@/components/shell/hrefs";
import { getDictionary } from "@/i18n/dictionaries";
import { DATASET_META, datasetIndex, datasetStats } from "@/lib/dataset";
import { childrenOf } from "@/lib/tree";
import { isLocale, ROOT_ID } from "@/lib/types";
import { formatCount, loc, plateNumeral } from "@/lib/utils";
import type { Locale } from "@/lib/types";

export default async function AtlasHome({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const active: Locale = locale;
  const dictionary = getDictionary(active);
  const stats = datasetStats;
  const domains = datasetIndex.roots.filter((id) => id !== ROOT_ID);

  const marquee: MarqueeItem[] = domains.map((id) => ({
    en: datasetIndex.nodes[id].name.en,
    fa: datasetIndex.nodes[id].name.fa,
  }));

  return (
    <>
      {/* ---------------------------------------------------------------- */}
      {/* Hero                                                             */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative flex min-h-[calc(100svh-4.5rem)] flex-col overflow-hidden">
        {/* Fires the page-load sequence once the fonts have settled. */}
        <IntroTrigger />

        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="engraved-rings absolute inset-0 opacity-80" />
        </div>

        <div className="relative mx-auto flex w-full max-w-[100rem] flex-1 flex-col justify-center px-5 py-20 sm:px-8 sm:py-28">
          <div className="max-w-5xl">
            {/* Eyebrow */}
            <div className="mb-8 flex items-center gap-4" data-intro="rule">
              <span className="h-px w-16 bg-brass/60" aria-hidden="true" />
              <span className="plate-label text-brass/85" data-intro="eyebrow">
                {dictionary.hero.eyebrow}
              </span>
              <span className="plate-label text-bone-faint">
                {DATASET_META.edition}
              </span>
            </div>

            {/* Display title — deliberately over-sized and bleeding right. */}
            <h1 className="font-display-xl text-[clamp(3.2rem,13vw,11rem)] text-bone">
              <span className="block overflow-hidden pb-[0.06em]">
                <span className="block" data-intro="title">
                  {DATASET_META.title[active]}
                </span>
              </span>
            </h1>

            <div className="mt-10 grid gap-10 lg:grid-cols-[1.25fr_1fr] lg:gap-16">
              <div>
                <p
                  className="prose-atlas text-[clamp(1rem,1.5vw,1.15rem)]"
                  data-intro="lede"
                >
                  {DATASET_META.description[active]}
                </p>

                <div
                  className="mt-9 flex flex-wrap items-center gap-4"
                  data-intro="cta"
                >
                  <Link
                    href={domainsHref(active)}
                    className="glass-pill glass-sheen plate-label group flex items-center gap-3 border-brass/40 px-6 py-3.5 text-brass-bright transition-colors"
                  >
                    {dictionary.hero.explore}
                    <span
                      className="transition-transform group-hover:translate-x-1"
                      aria-hidden="true"
                    >
                      →
                    </span>
                  </Link>
                  <span className="plate-label flex items-center gap-2 text-bone-faint">
                    <span
                      className="h-1 w-1 animate-pulse-soft rounded-full bg-verdigris"
                      aria-hidden="true"
                    />
                    {dictionary.hero.liveStats}
                  </span>
                </div>
              </div>

              {/* Live statistics */}
              <dl className="grid grid-cols-2 gap-x-8 gap-y-7 self-start">
                {[
                  { value: stats.total, label: dictionary.rail.total },
                  { value: stats.domains, label: dictionary.rail.domains },
                  { value: stats.fields, label: dictionary.rail.fields },
                  { value: stats.leaves, label: dictionary.rail.subfields },
                ].map((stat) => (
                  <div key={stat.label} data-intro="stat">
                    <StatBlock
                      value={formatCount(stat.value, active)}
                      label={stat.label}
                    />
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>

        {/* Domain marquee along the hero's lower edge */}
        <div className="relative" data-intro="marquee">
          <Marquee
            items={marquee}
            locale={active}
            label={dictionary.rail.domains}
          />
        </div>

        {/* Scroll cue */}
        <div className="pointer-events-none absolute bottom-24 end-6 hidden flex-col items-center gap-2.5 lg:flex">
          <span className="plate-label [writing-mode:vertical-rl]">
            {dictionary.hero.scroll}
          </span>
          <span className="h-10 w-px bg-gradient-to-b from-brass/70 to-transparent" />
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* The constellation                                                */}
      {/* ---------------------------------------------------------------- */}
      <section id="constellation" className="relative">
        <div className="mx-auto max-w-[100rem] px-5 pt-16 sm:px-8 sm:pt-24">
          <PlateHeading
            numeral={1}
            eyebrow={dictionary.graph.depthLegend}
            title={dictionary.nav.atlas}
            secondary={DATASET_META.subtitle[active]}
            lede={dictionary.browse.lede}
          />
        </div>

        <div className="mx-auto mt-12 max-w-[100rem] px-5 sm:px-8">
          <AtlasStage />
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Aperture — the editorial spread                                  */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative mx-auto max-w-[100rem] px-5 py-24 sm:px-8 sm:py-36">
        <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24">
          <Reveal>
            <PlateHeading
              numeral={2}
              eyebrow={dictionary.colophon.layoutNote.slice(0, 30) + "…"}
              title={
                <>
                  {DATASET_META.subtitle[active]}{" "}
                  <em className="not-italic text-brass">—</em>
                </>
              }
              lede={dictionary.colophon.layoutNote}
            />
          </Reveal>

          <Reveal stagger={0.08} className="flex flex-col gap-px">
            {domains.slice(0, 5).map((id) => {
              const node = datasetIndex.nodes[id];
              return (
            <Link
              key={id}
              href={nodeHref(active, id)}
              className="group flex items-baseline gap-5 border-b border-bone-faint/12 py-5 transition-colors hover:bg-bone-faint/[0.04]"
            >
                  <span
                    className="h-2 w-2 shrink-0 rotate-45 transition-transform group-hover:scale-150"
                    style={{ background: `var(--color-accent-${node.accent})` }}
                    aria-hidden="true"
                  />
                  <span className="flex-1">
                    <span className="block font-display text-xl text-bone transition-colors group-hover:text-brass">
                      {loc(node.name, active)}
                    </span>
                    <span className="mt-1 block text-[0.8rem] leading-relaxed text-bone-dim/70">
                      {loc(node.summary, active)}
                    </span>
                  </span>
                  <span className="plate-label shrink-0 text-bone-faint">
                    {childrenOf(datasetIndex, id).length}
                  </span>
                </Link>
              );
            })}
            <Link
              href={domainsHref(active)}
              className="plate-label mt-6 inline-flex items-center gap-3 text-brass transition-colors hover:text-brass-bright"
            >
              {dictionary.browse.viewAll}
              <span aria-hidden="true">→</span>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Plates — one per domain                                          */}
      {/* ---------------------------------------------------------------- */}
      <section className="border-t border-bone-faint/12 bg-ink-800/40">
        <div className="mx-auto max-w-[100rem] px-5 py-20 sm:px-8 sm:py-28">
          <PlateHeading
            numeral={3}
            eyebrow={dictionary.rail.domains}
            title={dictionary.browse.title}
            lede={dictionary.browse.lede}
            className="mb-16"
          />

          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {domains.map((id, i) => (
              <DomainPlate
                key={id}
                id={id}
                numeral={i}
                locale={active}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Colophon teaser                                                  */}
      {/* ---------------------------------------------------------------- */}
      <section className="mx-auto max-w-[100rem] px-5 py-24 sm:px-8 sm:py-32">
        <Reveal className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <PlateHeading
              numeral={4}
              eyebrow={dictionary.colophon.edition}
              title={dictionary.colophon.title}
              lede={dictionary.colophon.lede}
            />
          </div>

          <div className="paper-panel relative p-8 sm:p-10">
            <CornerTicks size={16} />
            <DoubleRule className="mb-8" />
            <dl className="flex flex-col gap-5">
              <Row label={dictionary.colophon.nodeCount} value={formatCount(stats.total, active)} />
              <Row label={dictionary.colophon.schema} value="{ id, name, summary, children }" />
              <Row label={dictionary.colophon.edition} value={DATASET_META.edition} />
              <Row label={dictionary.colophon.builtWith} value="Next.js · React · Three.js" />
            </dl>
            <Hairline className="my-8" />
            <p className="prose-atlas text-sm">{dictionary.colophon.replaceNote}</p>
            <Link
              href={colophonHref(active)}
              className="plate-label mt-8 inline-flex items-center gap-3 text-brass transition-colors hover:text-brass-bright"
            >
              {dictionary.nav.colophon}
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}

/** One domain, rendered as a plate. */
function DomainPlate({
  id,
  numeral,
  locale,
}: {
  id: string;
  numeral: number;
  locale: Locale;
}) {
  const dictionary = getDictionary(locale);
  const node = datasetIndex.nodes[id];
  const fields = childrenOf(datasetIndex, id);
  const accent = `var(--color-accent-${node.accent})`;

  return (
    <Reveal className="h-full" stagger={0.05}>
      <Link
        href={nodeHref(locale, id)}
        className="glass glass-card glass-sheen group relative flex h-full flex-col p-7 [&:hover]:bg-transparent"
      >
        <CornerTicks size={11} tone={accent} />

        <div className="mb-6 flex items-start justify-between gap-4">
          <span className="plate-label" style={{ color: accent }}>
            {plateNumeral(numeral)}
          </span>
          <span className="font-mono text-[0.6rem] tabular-nums text-bone-faint">
            {fields.length} {dictionary.browse.fieldCount}
          </span>
        </div>

        <h3 className="font-display text-[1.6rem] leading-tight text-bone transition-colors group-hover:text-brass">
          {loc(node.name, locale)}
        </h3>

        <p className="mt-3 flex-1 text-[0.82rem] leading-relaxed text-bone-dim/75">
          {loc(node.summary, locale) || dictionary.node.noSummary}
        </p>

        <div
          className="mt-7 h-px w-full transition-all group-hover:h-[2px]"
          style={{ background: accent, opacity: 0.28 }}
        />

        <ul className="mt-4 flex flex-wrap gap-x-3 gap-y-1.5">
          {fields.slice(0, 4).map((field) => (
            <li
              key={field.id}
              className="text-[0.7rem] text-bone-faint transition-colors group-hover:text-bone-dim"
            >
              {loc(field.short ?? field.name, locale)}
            </li>
          ))}
          {fields.length > 4 && (
            <li className="font-mono text-[0.62rem] text-bone-faint/70">
              +{fields.length - 4}
            </li>
          )}
        </ul>
      </Link>
    </Reveal>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-6 border-b border-bone-faint/10 pb-3">
      <dt className="plate-label shrink-0">{label}</dt>
      <dd className="truncate font-mono text-[0.7rem] text-bone-dim">{value}</dd>
    </div>
  );
}