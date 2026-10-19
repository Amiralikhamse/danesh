import { notFound } from "next/navigation";

import { PrintedIndex } from "@/components/shell/PrintedIndex";
import { Reveal } from "@/components/motion/Reveal";
import { PlateHeading } from "@/components/ui/PlateHeading";
import { EngravedRings } from "@/components/ui/Texture";
import { getDictionary } from "@/i18n/dictionaries";
import { DATASET_META } from "@/lib/dataset";
import { isLocale, type Locale } from "@/lib/types";

export default async function DomainsPage({ params }: PageProps<"/[locale]/domains">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const active: Locale = locale;
  const dictionary = getDictionary(active);

  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[26rem] overflow-hidden" aria-hidden="true">
        <EngravedRings className="opacity-60" />
      </div>

      <section className="relative mx-auto max-w-[100rem] px-5 pb-16 pt-24 sm:px-8 sm:pt-32">
        <Reveal>
          <PlateHeading
            numeral={1}
            eyebrow={dictionary.rail.index}
            title={dictionary.browse.title}
            secondary={DATASET_META.subtitle[active]}
            lede={dictionary.browse.lede}
          />
        </Reveal>
      </section>

      <PrintedIndex locale={active} />
    </div>
  );
}