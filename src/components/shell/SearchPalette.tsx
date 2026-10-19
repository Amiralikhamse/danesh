"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";

import { useAtlas } from "@/components/providers/AtlasProvider";
import { nodeHref } from "@/components/shell/hrefs";
import { searchNodes, type SearchHit } from "@/lib/tree";
import { loc, plateNumeral } from "@/lib/utils";

/**
 * ⌘K / Ctrl+K search over every entry in the dataset.
 *
 * Fully keyboard driven: ↑↓ to move, Enter to open, Esc to close. Matching
 * ranges come straight from the engine's normalizer, so a query that matches
 * with Arabic diacritics stripped still highlights correctly.
 *
 * Controlled — the trigger lives in `HeaderTools`.
 */
export function SearchPalette({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { locale, dictionary, index, select } = useAtlas();
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [cursor, setCursor] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const hits = useMemo(
    () => (query.trim() ? searchNodes(index, query, locale, 40) : []),
    [index, locale, query],
  );

  /*
   * Reset on open. This is a state adjustment during render rather than an
   * effect: it must happen in the same commit that shows the palette, otherwise
   * the previous session's query flashes on screen for a frame.
   */
  const [wasOpen, setWasOpen] = useState(open);
  if (open !== wasOpen) {
    setWasOpen(open);
    if (open) {
      setQuery("");
      setCursor(0);
    }
  }

  /* ---- move focus into the field once the dialog is on screen ---- */
  useEffect(() => {
    if (!open) return;
    const id = window.setTimeout(() => inputRef.current?.focus(), 40);
    return () => window.clearTimeout(id);
  }, [open]);

  /* ---- scroll the active row into view ---- */
  useEffect(() => {
    if (!open) return;
    const list = listRef.current;
    const row = list?.children[cursor] as HTMLElement | undefined;
    row?.scrollIntoView({ block: "nearest" });
  }, [cursor, open]);

  const go = useCallback(
    (id: string) => {
      onClose();
      select(null);
      router.push(nodeHref(locale, id));
    },
    [locale, onClose, router, select],
  );

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Escape") {
      event.preventDefault();
      onClose();
      return;
    }
    if (!hits.length) return;
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setCursor((c) => (c + 1) % hits.length);
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      setCursor((c) => (c - 1 + hits.length) % hits.length);
    }
    if (event.key === "Enter") {
      event.preventDefault();
      const hit = hits[cursor];
      if (hit) go(hit.id);
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[80] flex items-start justify-center px-4 pt-[12vh] sm:pt-[16vh]"
      role="dialog"
      aria-modal="true"
      aria-label={dictionary.nav.search}
    >
      <button
        type="button"
        aria-label={dictionary.nav.close}
        onClick={onClose}
        className="absolute inset-0 bg-ink-900/55 backdrop-blur-md"
      />

      <div
        className="glass glass-card glass-sheen relative w-full max-w-2xl p-2 shadow-[0_40px_110px_-20px_rgba(0,0,0,0.8),0_0_80px_-30px_color-mix(in_oklab,var(--color-brass)_45%,transparent)]"
        onKeyDown={onKeyDown}
      >
        <div className="glass-well flex items-center gap-3 px-4 py-3.5">
          <span className="text-brass/70" aria-hidden="true">
            ⌕
          </span>
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => {
              // New query means the old cursor index is meaningless.
              setQuery(event.target.value);
              setCursor(0);
            }}
            placeholder={dictionary.nav.searchPlaceholder}
            aria-label={dictionary.nav.searchPlaceholder}
            autoComplete="off"
            spellCheck={false}
            className="flex-1 bg-transparent text-base text-bone outline-none placeholder:text-bone-faint/60"
          />
          <kbd className="glass-pill plate-label px-2.5 py-1.5 text-bone-faint">Esc</kbd>
        </div>

        {query.trim() === "" ? (
          <p className="px-5 py-6 text-sm text-bone-faint">
            {dictionary.nav.searchHint}
          </p>
        ) : hits.length === 0 ? (
          <p className="px-5 py-6 text-sm text-bone-faint">
            {dictionary.graph.empty}
          </p>
        ) : (
          <ul
            ref={listRef}
            className="max-h-[52vh] overflow-y-auto py-1"
            role="listbox"
            aria-label={dictionary.nav.search}
          >
            {hits.map((hit, i) => (
              <ResultRow
                key={hit.id}
                hit={hit}
                active={i === cursor}
                onSelect={() => go(hit.id)}
                onHover={() => setCursor(i)}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function ResultRow({
  hit,
  active,
  onSelect,
  onHover,
}: {
  hit: SearchHit;
  active: boolean;
  onSelect: () => void;
  onHover: () => void;
}) {
  const { locale, index, dictionary } = useAtlas();
  const node = index.nodes[hit.id];
  if (!node) return null;

  const label = loc(node.name, locale);

  return (
    <li
      role="option"
      aria-selected={active}
      onMouseEnter={onHover}
      className={`mx-1.5 flex cursor-pointer items-center gap-3 rounded-xl px-3.5 py-2.5 transition-colors ${
        active
          ? "bg-brass/[0.14] shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--color-brass)_28%,transparent),inset_0_1px_0_color-mix(in_oklab,var(--color-bone)_16%,transparent)]"
          : ""
      }`}
    >
      <span
        className="h-1.5 w-1.5 shrink-0 rotate-45"
        style={{ background: `var(--color-accent-${node.accent})` }}
        aria-hidden="true"
      />
      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm text-bone">
          <Highlight text={label} ranges={hit.ranges} />
        </span>
        <span className="mt-0.5 block truncate text-[0.7rem] text-bone-faint">
          {node.trail
            .slice(1, -1)
            .map((id) => loc(index.nodes[id]?.name, locale))
            .join(" › ")}
        </span>
      </span>
      <span className="plate-label shrink-0 text-bone-faint">
        {node.kind === "domain"
          ? plateNumeral(index.roots.indexOf(node.id))
          : node.kind}
      </span>
      <button
        type="button"
        onClick={onSelect}
        className="sr-only focus:not-sr-only focus:text-brass"
        aria-label={`${dictionary.node.openPage}: ${label}`}
      >
        Open
      </button>
    </li>
  );
}

/** Renders matched ranges as <mark>, everything else as plain text. */
function Highlight({ text, ranges }: { text: string; ranges: Array<[number, number]> }) {
  if (!ranges.length) return <>{text}</>;

  const parts: ReactNode[] = [];
  let cursor = 0;
  ranges.forEach(([from, to], i) => {
    if (from > cursor) parts.push(text.slice(cursor, from));
    parts.push(
      <mark key={i} className="bg-transparent text-brass">
        {text.slice(from, to)}
      </mark>,
    );
    cursor = to;
  });
  if (cursor < text.length) parts.push(text.slice(cursor));

  return <>{parts}</>;
}