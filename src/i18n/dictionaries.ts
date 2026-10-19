import type { Locale } from "@/lib/types";

/**
 * UI chrome strings. Dataset text lives in `src/data/tree.ts` — this file only
 * covers the interface around it.
 */
export interface Dictionary {
  meta: {
    title: string;
    description: string;
  };
  nav: {
    atlas: string;
    domains: string;
    colophon: string;
    search: string;
    searchPlaceholder: string;
    searchHint: string;
    toggleLocale: string;
    menu: string;
    close: string;
  };
  hero: {
    eyebrow: string;
    scroll: string;
    explore: string;
    dragHint: string;
    liveStats: string;
  };
  rail: {
    index: string;
    plate: string;
    domains: string;
    fields: string;
    subfields: string;
    topics: string;
    total: string;
    depth: string;
    maxBranch: string;
    growth: string;
    growthHint: string;
    reset: string;
    toggleRail: string;
  };
  graph: {
    loading: string;
    empty: string;
    resetView: string;
    topDown: string;
    orbit: string;
    autoRotate: string;
    labels: string;
    edges: string;
    nodeCount: string;
    depthLegend: string;
    focusBreadcrumb: string;
    clearFocus: string;
    reducedMotion: string;
    webglMissing: string;
  };
  node: {
    children: string;
    leaf: string;
    subtotal: string;
    parent: string;
    openPage: string;
    related: string;
    inThisBranch: string;
    tags: string;
    noSummary: string;
    expand: string;
    collapse: string;
  };
  browse: {
    title: string;
    lede: string;
    fieldCount: string;
    viewAll: string;
    viewBranch: string;
    collapseAll: string;
    expandAll: string;
    backToAtlas: string;
  };
  colophon: {
    title: string;
    lede: string;
    dataset: string;
    edition: string;
    nodeCount: string;
    schema: string;
    schemaNote: string;
    replaceNote: string;
    builtWith: string;
    layoutNote: string;
  };
  footer: {
    sign: string;
    rights: string;
  };
  a11y: {
    skipToContent: string;
    graphSummary: string;
    nodeSelected: string;
    closePanel: string;
    loading: string;
  };
  notFound: {
    title: string;
    lede: string;
    cta: string;
  };
}

const en: Dictionary = {
  meta: {
    title: "The Tree of Knowledge — An Atlas of Fields & Sub-Disciplines",
    description:
      "A navigable atlas of every field of human knowledge — 10 domains, hundreds of fields and sub-disciplines, rendered as a living constellation.",
  },
  nav: {
    atlas: "Atlas",
    domains: "Domains",
    colophon: "Colophon",
    search: "Search",
    searchPlaceholder: "Search a field, discipline or keyword…",
    searchHint: "Start typing to search 250+ entries",
    toggleLocale: "Switch to Persian",
    menu: "Menu",
    close: "Close",
  },
  hero: {
    eyebrow: "Plate I — The Constellation",
    scroll: "Scroll to descend",
    explore: "Explore the tree",
    dragHint: "Drag to orbit · scroll to zoom · click any node",
    liveStats: "live",
  },
  rail: {
    index: "Index",
    plate: "Plate",
    domains: "Domains",
    fields: "Fields",
    subfields: "Subfields",
    topics: "Topics",
    total: "Entries",
    depth: "Tiers",
    maxBranch: "Widest branch",
    growth: "Growth",
    growthHint: "Replays the tree's growth from the root",
    reset: "Reset view",
    toggleRail: "Toggle index",
  },
  graph: {
    loading: "Casting the constellation",
    empty: "No dataset loaded",
    resetView: "Reset view",
    topDown: "Plan view",
    orbit: "Orbit",
    autoRotate: "Auto-rotate",
    labels: "Labels",
    edges: "Branches",
    nodeCount: "Nodes",
    depthLegend: "Tiers",
    focusBreadcrumb: "You are inside",
    clearFocus: "Back to the whole tree",
    reducedMotion: "Motion reduced",
    webglMissing: "WebGL unavailable — showing the printed index instead",
  },
  node: {
    children: "Sub-disciplines",
    leaf: "Leaf entry",
    subtotal: "entries in branch",
    parent: "Part of",
    openPage: "Open full entry",
    related: "Also indexed under",
    inThisBranch: "In this branch",
    tags: "Keywords",
    noSummary: "No description recorded.",
    expand: "Expand",
    collapse: "Collapse",
  },
  browse: {
    title: "The Printed Index",
    lede:
      "Every domain as a printed plate. Each opens into its fields; each field into its sub-disciplines.",
    fieldCount: "fields",
    viewAll: "View all",
    viewBranch: "View branch",
    collapseAll: "Collapse all",
    expandAll: "Expand all",
    backToAtlas: "Back to the atlas",
  },
  colophon: {
    title: "Colophon",
    lede: "How this atlas is built, and how to pour your own taxonomy into it.",
    dataset: "Dataset",
    edition: "Edition",
    nodeCount: "Indexed entries",
    schema: "Schema",
    schemaNote:
      "Every node is { id, name, short, summary, description, kind, accent, tags, children }. Depth, ancestry, subtree size and leaf counts are all derived at load time — nothing in the data file is computed by hand.",
    replaceNote:
      "Replace src/data/tree.ts with your own taxonomy. Nested arrays and flat parentId maps are both accepted; no UI code changes.",
    builtWith: "Next.js · React · Tailwind · GSAP · Three.js",
    layoutNote:
      "The constellation is laid out in polar space, then lifted into three dimensions: radius by tier, a rising dome, and a per-domain fan tilt.",
  },
  footer: {
    sign: "Danesh",
    rights: "An open atlas.",
  },
  a11y: {
    skipToContent: "Skip to the printed index",
    graphSummary:
      "Interactive three-dimensional constellation of the knowledge tree. Use the printed index below for a text-only equivalent.",
    nodeSelected: "Selected",
    closePanel: "Close panel",
    loading: "Loading",
  },
  notFound: {
    title: "Uncharted",
    lede: "That entry is not on any plate of this atlas.",
    cta: "Return to the atlas",
  },
};

const fa: Dictionary = {
  meta: {
    title: "درخت دانش — اطلس رشته‌ها و زیرشاخه‌ها",
    description:
      "اطلسی از تمام رشته‌های دانش بشر — ده حوزه، صدها رشته و زیرشاخه، در هیئت یک صورت‌فلک زنده.",
  },
  nav: {
    atlas: "اطلس",
    domains: "حوزه‌ها",
    colophon: "شناسنامه",
    search: "جست‌وجو",
    searchPlaceholder: "جست‌وجوی رشته، شاخه یا کلیدواژه…",
    searchHint: "برای جست‌وجو در بیش از ۲۵۰ مدخل، شروع به تایپ کنید",
    toggleLocale: "تغییر به انگلیسی",
    menu: "منو",
    close: "بستن",
  },
  hero: {
    eyebrow: "لوح یکم — صورت‌فلک",
    scroll: "برای فرود، پیمایش کنید",
    explore: "کاوش درخت",
    dragHint: "برای چرخش بکشید · برای بزرگ‌نمایی بچرخید · روی هر گره کلیک کنید",
    liveStats: "زنده",
  },
  rail: {
    index: "نمایه",
    plate: "لوح",
    domains: "حوزه‌ها",
    fields: "رشته‌ها",
    subfields: "زیرشاخه‌ها",
    topics: "موضوعات",
    total: "مدخل",
    depth: "طبقات",
    maxBranch: "پهن‌ترین شاخه",
    growth: "رشد",
    growthHint: "رشد درخت را از ریشه بازپخش می‌کند",
    reset: "بازنشانی نما",
    toggleRail: "نمایش/پنهان کردن نمایه",
  },
  graph: {
    loading: "در حال ترسیم صورت‌فلک",
    empty: "هیچ داده‌ای بارگذاری نشده",
    resetView: "بازنشانی نما",
    topDown: "نمای از بالا",
    orbit: "چرخشی",
    autoRotate: "چرخش خودکار",
    labels: "برچسب‌ها",
    edges: "شاخه‌ها",
    nodeCount: "گره",
    depthLegend: "طبقات",
    focusBreadcrumb: "شما اینجایید",
    clearFocus: "بازگشت به کل درخت",
    reducedMotion: "حرکت کاهش یافته",
    webglMissing: "WebGL در دسترس نیست — به‌جای آن نمایهٔ چاپی نمایش داده می‌شود",
  },
  node: {
    children: "زیرشاخه‌ها",
    leaf: "مدخل برگ",
    subtotal: "مدخل در این شاخه",
    parent: "زیرمجموعهٔ",
    openPage: "گشودن مدخل کامل",
    related: "هم‌نشان‌ها",
    inThisBranch: "در این شاخه",
    tags: "کلیدواژه‌ها",
    noSummary: "توضیحی ثبت نشده است.",
    expand: "گشودن",
    collapse: "بستن",
  },
  browse: {
    title: "نمایهٔ چاپی",
    lede:
      "هر حوزه به‌صورت یک لوح چاپی. هر لوح به رشته‌هایش گشوده می‌شود و هر رشته به زیرشاخه‌هایش.",
    fieldCount: "رشته",
    viewAll: "مشاهدهٔ همه",
    viewBranch: "مشاهدهٔ شاخه",
    collapseAll: "بستن همه",
    expandAll: "گشودن همه",
    backToAtlas: "بازگشت به اطلس",
  },
  colophon: {
    title: "شناسنامه",
    lede: "این اطلس چگونه ساخته شده و چگونه طبقه‌بندی خود را در آن بریزید.",
    dataset: "داده",
    edition: "ویرایش",
    nodeCount: "مدخل‌های نمایه‌شده",
    schema: "ساختار داده",
    schemaNote:
      "هر گره شامل { id, name, short, summary, description, kind, accent, tags, children } است. عمق، نیاکان، اندازهٔ زیردرخت و شمار برگ‌ها همگی هنگام بارگذاری محاسبه می‌شوند — هیچ‌چیز در فایل داده دستی محاسبه نشده است.",
    replaceNote:
      "فایل src/data/tree.ts را با طبقه‌بندی خود جایگزین کنید. هم آرایه‌های تودرتو و هم نقشه‌های تخت با parentId پذیرفته می‌شوند؛ نیازی به تغییر کد رابط کاربری نیست.",
    builtWith: "Next.js · React · Tailwind · GSAP · Three.js",
    layoutNote:
      "صورت‌فلک نخست در فضای قطبی چیده می‌شود و سپس به سه‌بعد برده می‌شود: شعاع بر پایهٔ طبقه، گنبدی صعودی، و خم‌شدگی هر حوزه در راستای بخش خودش.",
  },
  footer: {
    sign: "دانش",
    rights: "اطلسی گشوده.",
  },
  a11y: {
    skipToContent: "پرش به نمایهٔ چاپی",
    graphSummary:
      "صورت‌فلک سه‌بعدی تعاملی از درخت دانش. برای معادل متنی، نمایهٔ چاپی پایین صفحه را ببینید.",
    nodeSelected: "انتخاب‌شده",
    closePanel: "بستن پنل",
    loading: "در حال بارگذاری",
  },
  notFound: {
    title: "ناشناخته",
    lede: "این مدخل بر هیچ لوحی از این اطلس نیست.",
    cta: "بازگشت به اطلس",
  },
};

const DICTIONARIES: Record<Locale, Dictionary> = { en, fa };

export function getDictionary(locale: Locale): Dictionary {
  return DICTIONARIES[locale] ?? DICTIONARIES.en;
}
