import type { ReactNode } from "react";

import { plateNumeral } from "@/lib/utils";

/**
 * Plate heading — the section-header device used across the whole atlas.
 *
 * A plate numeral, a hairline, the title in the display serif, an optional
 * Persian secondary line, and a short accented rule. Everything after the
 * numeral is optional so the same component serves every tier of section.
 */
export function PlateHeading({
  numeral,
  eyebrow,
  title,
  secondary,
  lede,
  accent = "var(--color-brass)",
  align = "start",
  className = "",
}: {
  /** Zero-based index; omit for unnumbered sections. */
  numeral?: number;
  eyebrow?: string;
  title: ReactNode;
  /** Usually the other language's rendering of the title. */
  secondary?: string;
  lede?: ReactNode;
  accent?: string;
  align?: "start" | "center";
  className?: string;
}) {
  return (
    <div
      className={`${align === "center" ? "text-center" : ""} ${className}`}
    >
      {(numeral !== undefined || eyebrow) && (
        <div
          className={`mb-5 flex items-center gap-4 ${
            align === "center" ? "justify-center" : ""
          }`}
        >
          {numeral !== undefined && (
            <span className="plate-label text-brass/80">
              {plateNumeral(numeral)}
            </span>
          )}
          {eyebrow && <span className="plate-label">{eyebrow}</span>}
          <span
            className="h-px flex-1 origin-left"
            style={{ background: accent, opacity: 0.5 }}
          />
        </div>
      )}

      <h2 className="font-display-xl text-balance text-[clamp(2.4rem,7vw,5.4rem)] text-bone">
        {title}
      </h2>

      {secondary && (
        <p className="mt-3 font-display text-[clamp(1.1rem,2.4vw,1.7rem)] text-bone-dim/75">
          {secondary}
        </p>
      )}

      {lede && <p className="prose-atlas mt-7">{lede}</p>}
    </div>
  );
}

/**
 * Stat block — one number, its label, and a hairline. Numbers use the mono face
 * so the column of figures lines up like a plate table.
 */
export function StatBlock({
  value,
  label,
  accent = "var(--color-brass)",
}: {
  value: string | number;
  label: string;
  accent?: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <span
        className="font-mono text-[clamp(1.5rem,3.2vw,2.3rem)] leading-none tabular-nums"
        style={{ color: accent }}
      >
        {value}
      </span>
      <span className="plate-label">{label}</span>
      <span
        className="mt-1 h-px w-full"
        style={{
          background: accent,
          opacity: 0.22,
        }}
      />
    </div>
  );
}