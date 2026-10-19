import Link from "next/link";

import { PlateHeading } from "@/components/ui/PlateHeading";
import { DoubleRule } from "@/components/ui/Texture";
import { getDictionary } from "@/i18n/dictionaries";
import { atlasHref, domainsHref } from "@/components/shell/hrefs";
import { LOCALES } from "@/lib/types";

/**
 * Rendered by `notFound()` from inside the locale layout, so it already has the
 * correct `lang`/`dir` and the masthead. Both locales are offered so a visitor
 * who followed a bad link is never stranded.
 */
export default function NotFound() {
  const en = getDictionary("en");

  return (
    <div className="mx-auto flex min-h-[70svh] max-w-[100rem] flex-col justify-center px-5 py-24 sm:px-8">
      <PlateHeading
        numeral={0}
        eyebrow="404"
        title={en.notFound.title}
        lede={en.notFound.lede}
        accent="var(--color-alert)"
      />

      <DoubleRule className="mt-12 max-w-md" />

      <div className="mt-8 flex flex-wrap gap-4">
        {LOCALES.map((locale) => {
          const dictionary = getDictionary(locale);
          return (
            <Link
              key={locale}
              href={atlasHref(locale)}
              className="plate-label border border-bone-faint/25 px-5 py-3 transition-colors hover:border-brass/55 hover:text-brass"
            >
              {dictionary.notFound.cta}
            </Link>
          );
        })}
        <Link
          href={domainsHref("en")}
          className="plate-label border border-bone-faint/25 px-5 py-3 text-bone-dim transition-colors hover:border-brass/55 hover:text-brass"
        >
          {en.browse.title}
        </Link>
      </div>
    </div>
  );
}