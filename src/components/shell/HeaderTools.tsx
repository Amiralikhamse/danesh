"use client";

import Link from "next/link";

import { SearchPalette } from "./SearchPalette";
import { otherLocaleHref } from "./hrefs";
import { getDictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/lib/types";
import { useEffect, useState } from "react";

/**
 * The one client island in the masthead: the ⌘K trigger plus the language
 * switch. Keeping it isolated means the header itself can stay a server
 * component and the dictionary never crosses the wire.
 */
export function HeaderTools({
  locale,
  segments,
}: {
  locale: Locale;
  segments: string[];
}) {
  const dictionary = getDictionary(locale);
  const [searchOpen, setSearchOpen] = useState(false);

  // ⌘K / Ctrl+K, bound globally so search is reachable from anywhere.
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="ms-auto flex items-center gap-3">
      <button
        type="button"
        onClick={() => setSearchOpen(true)}
        aria-label={dictionary.nav.search}
        className="glass-pill plate-label group flex items-center gap-2.5 px-3.5 py-2 text-bone-dim transition-colors hover:text-brass"
      >
        <span aria-hidden="true">⌕</span>
        <span className="hidden sm:inline">{dictionary.nav.search}</span>
        <kbd className="hidden border border-bone-faint/25 px-1 py-0.5 text-[0.55rem] sm:inline">
          ⌘K
        </kbd>
      </button>

      <Link
        href={otherLocaleHref(locale, segments)}
        hrefLang={locale === "en" ? "fa" : "en"}
        className="glass-pill plate-label px-3.5 py-2 text-bone-dim transition-colors hover:text-brass"
      >
        {locale === "en" ? "فا" : "EN"}
      </Link>

      <SearchPalette open={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}