"use client";

import { useEffect, useRef, type ReactNode } from "react";
import Link from "next/link";
import { gsap } from "gsap";

import { useAtlas } from "@/components/providers/AtlasProvider";
import { nodeHref } from "@/components/shell/hrefs";
import { CornerTicks } from "@/components/ui/Texture";
import { ancestorsOf, childrenOf } from "@/lib/tree";
import { loc, plateNumeral } from "@/lib/utils";

/**
 * The node drawer.
 *
 * Slides in from the inline-end edge when a node is selected. Slides with GSAP
 * rather than a CSS transition so it can be coordinated with the camera flight
 * — one timeline, two targets, and they read as a single gesture.
 */
export function NodeDrawer() {
  const {
    locale,
    dictionary,
    index,
    selectedId,
    select,
    requestCamera,
    reducedMotion,
  } = useAtlas();

  const panelRef = useRef<HTMLDivElement>(null);
  const selected = selectedId ? index.nodes[selectedId] : null;

  // Escape closes the drawer from anywhere.
  useEffect(() => {
    if (!selected) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        select(null);
        requestCamera(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [requestCamera, select, selected]);

  /*
   * Slide in / out.
   *
   * Keyed on `selectedId` rather than the `selected` object so that selecting a
   * different node re-runs the tween, but re-rendering for an unrelated reason
   * does not. `context.revert()` restores the pre-tween inline styles, so the
   * `fromTo` baseline is always reapplied cleanly.
   */
  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;

    const isOpen = selectedId !== null;

    if (reducedMotion) {
      gsap.set(panel, isOpen ? { xPercent: 0, autoAlpha: 1 } : { autoAlpha: 0 });
      return;
    }

    const context = gsap.context(() => {
      if (isOpen) {
        gsap.fromTo(
          panel,
          { xPercent: 108, autoAlpha: 0 },
          { xPercent: 0, autoAlpha: 1, duration: 0.85, ease: "power3.out" },
        );
      } else {
        gsap.to(panel, {
          xPercent: 108,
          autoAlpha: 0,
          duration: 0.5,
          ease: "power2.in",
        });
      }
    }, panel);

    return () => context.revert();
  }, [reducedMotion, selectedId]);

  const children = selected ? childrenOf(index, selected.id) : [];
  const ancestors = selected ? ancestorsOf(index, selected.id) : [];
  const accent = selected
    ? `var(--color-accent-${selected.accent})`
    : "var(--color-brass)";

  // The panel stays mounted when nothing is selected so it can animate out.
  return (
    <div
      ref={panelRef}
      className="glass absolute inset-y-0 end-0 z-30 flex w-[22rem] max-w-[88vw] flex-col rounded-ss-none rounded-es-none border-t-0 border-e-0 border-b-0 opacity-0 backdrop-blur-2xl"
      style={{ visibility: selected ? "visible" : "hidden" }}
      role="dialog"
      aria-hidden={!selected}
      aria-label={selected ? loc(selected.name, locale) : undefined}
    >
      {selected && (
        <>
          <CornerTicks size={12} tone={accent} />

          {/* Header */}
          <header className="flex items-start justify-between gap-3 border-b border-bone-faint/15 px-5 py-4">
            <div className="min-w-0">
              <div className="mb-2 flex items-center gap-2.5">
                <span
                  className="h-1.5 w-1.5 rotate-45"
                  style={{ background: accent }}
                  aria-hidden="true"
                />
                <span className="plate-label" style={{ color: accent }}>
                  {selected.kind}
                </span>
                <span className="plate-label text-bone-faint">
                  {dictionary.rail.plate} {plateNumeral(children.length)}
                </span>
              </div>
              <h3 className="font-display text-2xl leading-tight text-bone">
                {loc(selected.name, locale)}
              </h3>
              <p
                className="mt-1.5 text-sm text-bone-dim/70"
                dir={locale === "fa" ? "rtl" : "ltr"}
              >
                {loc(selected.summary, locale) || dictionary.node.noSummary}
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                select(null);
                requestCamera(null);
              }}
              aria-label={dictionary.a11y.closePanel}
              className="glass-pill plate-label shrink-0 px-3 py-1.5 text-bone-dim transition-colors hover:text-alert"
            >
              ✕
            </button>
          </header>

          <div className="min-h-0 flex-1 overflow-y-auto px-5 py-4">
            {/* Breadcrumb */}
            {ancestors.length > 0 && (
              <Section label={dictionary.node.parent}>
                <nav aria-label={dictionary.graph.focusBreadcrumb}>
                  <ol className="flex flex-wrap items-center gap-1.5">
                    {ancestors.map((ancestor, i) => (
                      <li key={ancestor.id} className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => select(ancestor.id)}
                          className="text-[0.75rem] text-bone-dim underline decoration-bone-faint/30 underline-offset-4 transition-colors hover:text-brass"
                        >
                          {loc(ancestor.name, locale)}
                        </button>
                        {i < ancestors.length - 1 && (
                          <span
                            className="text-[0.6rem] text-bone-faint"
                            aria-hidden="true"
                          >
                            ›
                          </span>
                        )}
                      </li>
                    ))}
                  </ol>
                </nav>
              </Section>
            )}

            {/* Prose */}
            {selected.description && (
              <Section label={dictionary.node.expand}>
                <p className="prose-atlas text-[0.82rem]">
                  {loc(selected.description, locale)}
                </p>
              </Section>
            )}

            {/* Children */}
            {children.length > 0 ? (
              <Section
                label={`${children.length} ${dictionary.node.children}`}
              >
                <ul className="flex flex-col gap-px">
                  {children.map((child, i) => (
                    <li key={child.id}>
                      <button
                        type="button"
                        onClick={() => select(child.id)}
                        className="group flex w-full items-center gap-2.5 py-1.5 text-start"
                      >
                        <span className="font-mono text-[0.58rem] tabular-nums text-bone-faint">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="flex-1 text-[0.8rem] text-bone-dim transition-colors group-hover:text-bone">
                          {loc(child.name, locale)}
                        </span>
                        <span
                          className="h-1 w-1 rotate-45 opacity-0 transition-opacity group-hover:opacity-100"
                          style={{
                            background: `var(--color-accent-${child.accent})`,
                          }}
                          aria-hidden="true"
                        />
                      </button>
                    </li>
                  ))}
                </ul>
              </Section>
            ) : (
              <Section label={dictionary.node.leaf}>
                <p className="text-[0.75rem] text-bone-faint">
                  {dictionary.node.noSummary}
                </p>
              </Section>
            )}

            {/* Keywords */}
            {selected.tags && selected.tags.length > 0 && (
              <Section label={dictionary.node.tags}>
                <ul className="flex flex-wrap gap-1.5">
                  {selected.tags.map((tag, i) => (
                    <li
                      key={`${tag.en}-${i}`}
                      className="rounded-full border border-bone-faint/25 bg-bone/[0.06] px-2.5 py-1 text-[0.68rem] text-bone-dim"
                    >
                      {loc(tag, locale)}
                    </li>
                  ))}
                </ul>
              </Section>
            )}

            <Section label={dictionary.rail.total}>
              <p className="font-mono text-xs tabular-nums text-bone-dim">
                {selected.subtreeSize} {dictionary.node.subtotal}
              </p>
            </Section>
          </div>

          <footer className="border-t border-bone-faint/15 px-5 py-4">
            <Link
              href={nodeHref(locale, selected.id)}
              className="plate-label flex items-center justify-between gap-3 text-brass transition-colors hover:text-brass-bright"
            >
              {dictionary.node.openPage}
              <span aria-hidden="true">→</span>
            </Link>
          </footer>
        </>
      )}
    </div>
  );
}

function Section({ label, children }: { label: string; children: ReactNode }) {
  return (
    <section className="mb-5 last:mb-0">
      <h4 className="plate-label mb-2.5 border-b border-bone-faint/12 pb-1.5">
        {label}
      </h4>
      {children}
    </section>
  );
}