"use client";

import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";

export interface MarqueeItem {
  en: string;
  fa: string;
}

/**
 * Slow infinite marquee. The track is duplicated and translated by exactly
 * -50%, so the loop point is invisible.
 *
 * Both locales are shown paired regardless of the active locale — a bilingual
 * atlas should never hide one of its two languages, even in the ornament.
 */
export function Marquee({
  items,
  locale,
  label,
}: {
  items: MarqueeItem[];
  locale: "en" | "fa";
  label: string;
}) {
  const reduced = usePrefersReducedMotion();

  const cells = items.map((item, i) => (
    <span
      key={`${item.en}-${i}`}
      className="flex shrink-0 items-center gap-4 px-6 sm:px-9"
    >
      <span className="plate-label whitespace-nowrap text-bone-dim/85">
        {locale === "en" ? item.en : item.fa}
      </span>
      <span className="text-[0.5rem] text-brass/70" aria-hidden="true">
        ◆
      </span>
      <span className="plate-label whitespace-nowrap text-bone-dim/45">
        {locale === "en" ? item.fa : item.en}
      </span>
      <span className="text-[0.5rem] text-brass/40" aria-hidden="true">
        ◆
      </span>
    </span>
  ));

  return (
    <div
      className="relative w-full overflow-hidden border-y border-bone-faint/15 bg-ink-900/40 py-2.5 backdrop-blur-sm"
      role="marquee"
      aria-label={label}
    >
      <div
        className={`flex w-max ${reduced ? "" : "animate-marquee"}`}
        style={{ animationDirection: locale === "fa" ? "reverse" : "normal" }}
      >
        {/* Two identical tracks so -50% translation is seamless. */}
        <span className="flex shrink-0">{cells}</span>
        <span className="flex shrink-0" aria-hidden="true">
          {cells}
        </span>
      </div>

      {/* Feather the edges so the text enters and leaves rather than snapping. */}
      <div
        className="pointer-events-none absolute inset-y-0 start-0 w-16 bg-gradient-to-e from-ink-900 to-transparent sm:w-28"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-y-0 end-0 w-16 bg-gradient-to-s from-ink-900 to-transparent sm:w-28"
        aria-hidden="true"
      />
    </div>
  );
}