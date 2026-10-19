import Link from "next/link";

import { HeaderTools } from "./HeaderTools";
import { getDictionary } from "@/i18n/dictionaries";
import { datasetTitle } from "@/lib/dataset";
import { atlasHref, colophonHref, domainsHref } from "@/components/shell/hrefs";
import type { Locale } from "@/lib/types";

/**
 * The masthead.
 *
 * Deliberately not a rounded app bar: a hairline-ruled header with the wordmark
 * set in the display serif, nav in the engraved mono, and the Persian name
 * sitting quietly beneath the Latin one rather than swapping beside it.
 *
 * A server component — `HeaderTools` is the only client part.
 */
export function SiteHeader({
  locale,
  segments,
}: {
  locale: Locale;
  /** Current path segments after the locale, used to highlight the nav. */
  segments: string[];
}) {
  const dictionary = getDictionary(locale);
  const title = datasetTitle(locale);
  const current = segments[0];

  const links = [
    { href: atlasHref(locale), label: dictionary.nav.atlas, key: undefined },
    { href: domainsHref(locale), label: dictionary.nav.domains, key: "domains" },
    {
      href: colophonHref(locale),
      label: dictionary.nav.colophon,
      key: "colophon",
    },
  ];

  return (
    <header className="sticky top-3 z-50 flex justify-center px-4 pointer-events-none">
      <div className="glass glass-card glass-sheen pointer-events-auto mx-auto flex w-full max-w-[72rem] items-center gap-5 px-5 py-3 sm:px-7">
        <Link href={atlasHref(locale)} className="group flex items-baseline gap-2.5">
          <span
            className="font-display text-xl leading-none text-bone transition-colors group-hover:text-brass sm:text-2xl"
            style={{
              fontVariationSettings: '"SOFT" 24, "WONK" 1, "opsz" 90',
            }}
          >
            {title}
          </span>
          <span className="hidden font-mono text-[0.55rem] uppercase tracking-[0.2em] text-brass/60 sm:inline">
            {dictionary.nav.atlas}
          </span>
        </Link>

        <nav
          className="flex items-center gap-5 max-sm:hidden"
          aria-label={dictionary.nav.menu}
        >
          {links.map((link) => {
            const active = link.key !== undefined && current === link.key;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`plate-label relative rounded-full px-3 py-1.5 transition-all duration-300 ${
                active
                  ? "text-brass shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--color-brass)_38%,transparent),inset_0_1px_0_color-mix(in_oklab,var(--color-bone)_22%,transparent)] bg-brass/[0.08]"
                  : "hover:text-bone hover:bg-bone/[0.06] hover:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--color-bone)_12%,transparent)]"
              }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <HeaderTools locale={locale} segments={segments} />
      </div>
    </header>
  );
}