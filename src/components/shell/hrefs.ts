import type { Route } from "next";

import type { Locale } from "@/lib/types";

/**
 * Typed-route helpers.
 *
 * Next 16 validates every `href`. Route params are runtime strings, so the
 * results are asserted as `Route` here once rather than at every call site.
 */
export const atlasHref = (locale: Locale): Route => `/${locale}` as Route;

export const domainsHref = (locale: Locale): Route =>
  `/${locale}/domains` as Route;

export const colophonHref = (locale: Locale): Route =>
  `/${locale}/colophon` as Route;

export const nodeHref = (locale: Locale, id: string): Route =>
  `/${locale}/${id}` as Route;

/** The other locale, preserving the current pathname. */
export function otherLocaleHref(
  locale: Locale,
  segments: string[],
): Route {
  const rest = segments.filter(Boolean).join("/");
  return `/${locale === "en" ? "fa" : "en"}${rest ? `/${rest}` : ""}` as Route;
}