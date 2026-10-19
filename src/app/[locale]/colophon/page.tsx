import { notFound } from "next/navigation";
import type { ReactNode } from "react";

import { Reveal } from "@/components/motion/Reveal";
import { PlateHeading, StatBlock } from "@/components/ui/PlateHeading";
import { CornerTicks, DoubleRule, Hairline } from "@/components/ui/Texture";
import { getDictionary } from "@/i18n/dictionaries";
import { DATASET_META, datasetIndex, datasetIssues, datasetStats } from "@/lib/dataset";
import { domainIds } from "@/lib/tree";
import { isLocale, ROOT_ID, type Locale } from "@/lib/types";
import { formatCount } from "@/lib/utils";

export default async function ColophonPage({
  params,
}: PageProps<"/[locale]/colophon">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const active: Locale = locale;
  const dictionary = getDictionary(active);
  const stats = datasetStats;

  return (
    <div className="mx-auto max-w-[100rem] px-5 py-24 sm:px-8 sm:py-32">
      <Reveal>
        <PlateHeading
          numeral={1}
          eyebrow={DATASET_META.edition}
          title={dictionary.colophon.title}
          secondary={DATASET_META.title[active]}
          lede={dictionary.colophon.lede}
        />
      </Reveal>

      {/* Vital statistics */}
      <Reveal className="mt-16">
        <dl className="grid gap-x-8 gap-y-9 border-y border-bone-faint/15 py-10 sm:grid-cols-2 lg:grid-cols-4">
          <StatBlock value={formatCount(stats.total, active)} label={dictionary.rail.total} />
          <StatBlock value={formatCount(stats.domains, active)} label={dictionary.rail.domains} accent="var(--color-verdigris)" />
          <StatBlock value={formatCount(stats.fields, active)} label={dictionary.rail.fields} accent="var(--color-accent-azure)" />
          <StatBlock value={formatCount(stats.leaves, active)} label={dictionary.rail.subfields} accent="var(--color-accent-copper)" />
        </dl>
      </Reveal>

      <div className="mt-16 grid gap-10 lg:grid-cols-2 lg:gap-16">
        {/* Dataset */}
        <Reveal className="paper-panel relative p-8 sm:p-10">
          <CornerTicks size={16} />
          <DoubleRule className="mb-8" />
          <h2 className="font-display text-3xl text-bone">
            {dictionary.colophon.dataset}
          </h2>
          <Hairline className="my-6" />
          <dl className="flex flex-col gap-4">
            <Row label={dictionary.colophon.edition} value={DATASET_META.edition} />
            <Row label={dictionary.colophon.nodeCount} value={formatCount(stats.total, active)} />
            <Row
              label={dictionary.rail.domains}
              value={formatCount(domainIds(datasetIndex).filter((id) => id !== ROOT_ID).length, active)}
            />
            <Row
              label={dictionary.graph.depthLegend}
              value={formatCount(stats.depth, active)}
            />
            <Row
              label={dictionary.rail.maxBranch}
              value={formatCount(stats.maxBranch, active)}
            />
          </dl>
          <p className="prose-atlas mt-8 text-sm">
            {DATASET_META.colophon[active]}
          </p>
        </Reveal>

        {/* Schema */}
        <Reveal className="paper-panel relative p-8 sm:p-10">
          <CornerTicks size={16} tone="var(--color-verdigris)" />
          <DoubleRule className="mb-8" />
          <h2 className="font-display text-3xl text-bone">
            {dictionary.colophon.schema}
          </h2>
          <Hairline className="my-6" />

          <pre className="overflow-x-auto border border-bone-faint/12 bg-ink-900/60 p-4 font-mono text-[0.68rem] leading-relaxed text-bone-dim">
{`KnowledgeNode {
  id: string
  name: { en, fa }
  short?: { en, fa }
  summary?: { en, fa }
  description?: { en, fa }
  kind?: "domain" | "field" | "subfield" | "topic"
  accent?: AccentToken
  tags?: { en, fa }[]
  children?: KnowledgeNode[]
}`}
          </pre>

          <p className="prose-atlas mt-6 text-sm">
            {dictionary.colophon.schemaNote}
          </p>
          <p className="prose-atlas mt-4 text-sm text-brass/85">
            {dictionary.colophon.replaceNote}
          </p>
        </Reveal>
      </div>

      {/* Construction notes */}
      <Reveal className="mt-16 grid gap-10 md:grid-cols-3">
        <Note title={dictionary.colophon.layoutNote.slice(0, 28) + "…"} accent="var(--color-brass)">
          {dictionary.colophon.layoutNote}
        </Note>
        <Note title={dictionary.colophon.builtWith} accent="var(--color-verdigris)">
          {dictionary.graph.nodeCount}: {formatCount(stats.total, active)} ·{" "}
          {dictionary.graph.depthLegend}: {stats.depth} ·{" "}
          {dictionary.rail.maxBranch}: {stats.maxBranch}
        </Note>
        <Note title={dictionary.footer.rights} accent="var(--color-accent-rose)">
          {datasetIssues.length === 0
            ? dictionary.browse.lede
            : `${datasetIssues.length} normalization warnings`}
        </Note>
      </Reveal>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-6 border-b border-bone-faint/10 pb-3">
      <dt className="plate-label shrink-0">{label}</dt>
      <dd className="font-mono text-[0.72rem] tabular-nums text-bone-dim">{value}</dd>
    </div>
  );
}

function Note({
  title,
  accent,
  children,
}: {
  title: string;
  accent: string;
  children: ReactNode;
}) {
  return (
    <div className="border-t pt-5" style={{ borderColor: accent }}>
      <h3 className="plate-label" style={{ color: accent }}>
        {title}
      </h3>
      <p className="mt-3 text-[0.8rem] leading-relaxed text-bone-dim/75">
        {children}
      </p>
    </div>
  );
}