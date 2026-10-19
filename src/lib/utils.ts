import type { Locale } from "./types";

/** Join class names, dropping falsy values. */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

/** Clamp `n` into the inclusive range `[min, max]`. */
export function clamp(n: number, min: number, max: number): number {
  return n < min ? min : n > max ? max : n;
}

/** Linear interpolation. */
export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

/** Map `n` from one range to another, clamped to the destination range. */
export function mapRange(
  n: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number,
): number {
  if (inMax === inMin) return outMin;
  const t = clamp((n - inMin) / (inMax - inMin), 0, 1);
  return lerp(outMin, outMax, t);
}

/**
 * Deterministic 32-bit PRNG (mulberry32).
 *
 * The 3D layout adds a small organic jitter to every node so the constellation
 * does not read as a mechanical grid. It *must* be seeded and identical on the
 * server and the client, otherwise React hydration mismatches.
 */
export function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return function next(): number {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Stable 32-bit string hash — turns a node id into a PRNG seed. */
export function hashString(value: string): number {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < value.length; i += 1) {
    h ^= value.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/** Read the active locale string out of a `Localized` record. */
export function loc(value: { en: string; fa: string } | undefined, locale: Locale): string {
  if (!value) return "";
  return value[locale] || value.en || "";
}

/** Roman-ish plate numerals: I, II, III, IV … (used in the index rail). */
const PLATE_NUMERALS = [
  "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X",
  "XI", "XII", "XIII", "XIV", "XV", "XVI", "XVII", "XVIII", "XIX", "XX",
];

export function plateNumeral(index: number): string {
  return PLATE_NUMERALS[index] ?? String(index + 1);
}

/** Convert a Western integer to Persian digits. */
export function toPersianDigits(input: string | number): string {
  const digits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return String(input).replace(/\d/g, (d) => digits[Number(d)]);
}

/** Locale-aware integer formatting (adds Persian thousands separators). */
export function formatCount(n: number, locale: Locale): string {
  const formatted = new Intl.NumberFormat(locale === "fa" ? "fa-IR" : "en-US").format(n);
  return locale === "fa" ? formatted : formatted;
}
