import LycorisSpecimen from "@/components/ui/lycoris-specimen";

/**
 * Type specimen route — the scroll-scrubbed Lycoris piece, dressed in the
 * NI1 AI brand: the wordmark as the cover type, the studio credit, and the
 * footer bar pointing back at the brand's own channels.
 *
 * `w-full` is load-bearing: a flex/grid child left at width:auto shrinks to
 * fit its contents even when the child asks for 100%.
 */
export default function SpecimenPage() {
  return (
    <div className="w-full">
      <LycorisSpecimen
        name="NI1 AI"
        studio="NI1 AI"
        year="2026"
        description="NI1 AI is a precise, modern display voice — engineered curves with a human finish. Built for products that ship fast, it carries the brand across launches, decks and editorial surfaces."
        specs={[
          "Contains 192 glyphs",
          "OTF / TTF / WOFF2",
          "Uppercase & Lowercase",
          "3 ligatures in 1 OpenType feature",
          "Multilingual support",
        ]}
        tagline={[
          { text: "NI1" },
          { text: "type", small: true },
          { text: "that thinks" },
          { text: "faster than ink", small: true },
        ]}
        multilingual="Múl·tî·lĺn·güål"
        ligatureWord="Affluent"
        ink="#001524"
        bone="#F6F9FC"
        crimson="#FF5A1F"
        links={[
          { label: "NI1 AI", href: "/" },
          { label: "GITHUB", href: "https://github.com" },
        ]}
      />
    </div>
  );
}
