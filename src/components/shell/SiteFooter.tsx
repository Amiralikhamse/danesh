import Link from "next/link";
import type { ReactNode } from "react";

import { getDictionary } from "@/i18n/dictionaries";
import { DATASET_META, datasetStats } from "@/lib/dataset";
import { atlasHref, colophonHref, domainsHref } from "@/components/shell/hrefs";
import type { Locale } from "@/lib/types";
import { Hairline } from "@/components/ui/Texture";

/**
 * Colophon footer — the last plate.
 *
 * Carries the dataset's own provenance line, so the claim "this is seed data,
 * replace it" is visible on every page rather than hidden on /colophon.
 */
export function SiteFooter({ locale }: { locale: Locale }) {
  const dictionary = getDictionary(locale);
  const year = new Date().getFullYear();

  return (
    <footer className="glass mt-auto rounded-b-none rounded-t-[var(--radius-liquid-lg)] border-x-0 border-b-0">
      <div className="mx-auto max-w-[100rem] px-5 py-12 sm:px-8 sm:py-16">
        <Hairline className="mb-10" />

        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p
              className="font-display text-2xl text-bone"
              style={{ fontVariationSettings: '"SOFT" 24, "WONK" 1, "opsz" 72' }}
            >
              {DATASET_META.title[locale]}
            </p>
            <p className="mt-1.5 text-sm text-bone-dim/70">
              {DATASET_META.subtitle[locale]}
            </p>
            <p className="prose-atlas mt-5 text-sm text-bone-faint">
              {DATASET_META.colophon[locale]}
            </p>
          </div>

          <nav aria-label={dictionary.nav.menu} className="flex flex-col gap-3">
            <p className="plate-label mb-1">{dictionary.rail.index}</p>
            <FooterLink href={atlasHref(locale)}>
              {dictionary.nav.atlas}
            </FooterLink>
            <FooterLink href={domainsHref(locale)}>
              {dictionary.browse.title}
            </FooterLink>
            <FooterLink href={colophonHref(locale)}>
              {dictionary.nav.colophon}
            </FooterLink>
          </nav>

          <dl className="flex flex-col gap-3">
            <p className="plate-label mb-1">{dictionary.colophon.edition}</p>
            <Row label={dictionary.rail.total} value={datasetStats.total} />
            <Row label={dictionary.rail.domains} value={datasetStats.domains} />
            <Row label={DATASET_META.edition} value={null} />
            <Row label={dictionary.footer.rights} value={null} />
          </dl>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-bone-faint/12 pt-6">
          <p className="plate-label">
            © {year} · {dictionary.footer.sign}
          </p>
          <p className="plate-label text-bone-faint">
            {dictionary.colophon.builtWith}
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: ReturnType<typeof atlasHref>;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className="text-sm text-bone-dim transition-colors hover:text-brass"
    >
      {children}
    </Link>
  );
}

function Row({ label, value }: { label: string; value: number | null }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-bone-faint/10 pb-2">
      <dt className="text-[0.72rem] text-bone-faint">{label}</dt>
      <dd className="font-mono text-[0.72rem] tabular-nums text-bone-dim">
        {value ?? ""}
      </dd>
    </div>
  );
}