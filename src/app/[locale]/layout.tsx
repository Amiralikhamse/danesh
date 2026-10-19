import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Archivo, Fraunces, JetBrains_Mono, Vazirmatn } from "next/font/google";

import "../globals.css";

import { SiteHeader } from "@/components/shell/SiteHeader";
import { SiteFooter } from "@/components/shell/SiteFooter";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { AtlasProvider } from "@/components/providers/AtlasProvider";
import { GrainOverlay } from "@/components/ui/Texture";
import { getDictionary } from "@/i18n/dictionaries";
import { DATASET_META } from "@/lib/dataset";
import { isLocale, LOCALES, type Locale } from "@/lib/types";

/**
 * Atlas Cœlestis type stack.
 *
 * Fraunces carries the display voice — its SOFT/WONK/opsz axes are what separate
 * this from a generic serif hero. JetBrains Mono is the "engraved plate" voice.
 * Vazirmatn must cover Persian at every size, including display.
 */
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["SOFT", "WONK"],
  display: "swap",
});

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

const vazirmatn = Vazirmatn({
  variable: "--font-vazirmatn",
  subsets: ["arabic"],
  display: "swap",
});

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: "#05080F",
  colorScheme: "dark",
};

export async function generateMetadata({
  params,
}: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dictionary = getDictionary(locale);
  return {
    title: {
      default: dictionary.meta.title,
      template: `%s · ${DATASET_META.title[locale]}`,
    },
    description: dictionary.meta.description,
    applicationName: "Danesh",
  };
}

/**
 * The single root layout.
 *
 * `<html>`/`<body>` live here rather than in `app/layout.tsx` because the
 * document's `lang` and `dir` depend on the locale, and a child layout cannot
 * own them. `src/proxy.ts` guarantees every request arrives with a locale
 * prefix, so this layout is always the topmost one.
 */
export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const active: Locale = locale;
  const dictionary = getDictionary(active);

  return (
    <html
      lang={active}
      dir={active === "fa" ? "rtl" : "ltr"}
      suppressHydrationWarning
      className={`${fraunces.variable} ${archivo.variable} ${jetbrains.variable} ${vazirmatn.variable} h-full`}
    >
      <body className="flex min-h-svh flex-col">
        {/*
          The provider wraps the whole document, not just the canvas: the
          masthead's search palette and the index rail both read the same
          selection/growth state as the constellation.
        */}
        <AtlasProvider locale={active}>
          <a
            href="#atlas"
            className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[90] focus:border focus:border-brass focus:bg-ink-800 focus:px-4 focus:py-2 focus:text-sm focus:text-brass"
          >
            {dictionary.a11y.skipToContent}
          </a>

          <SmoothScroll />
          <GrainOverlay />
          <SiteHeader locale={active} segments={[]} />

          <main id="atlas" className="flex-1">
            {children}
          </main>

          <SiteFooter locale={active} />
        </AtlasProvider>
      </body>
    </html>
  );
}