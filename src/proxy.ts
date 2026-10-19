import { NextResponse, type NextRequest } from "next/server";
import { isLocale } from "@/lib/types";

const DEFAULT_LOCALE = "en";
const COOKIE = "danesh_locale";

/**
 * Locale routing. Prefixed paths (`/en/…`, `/fa/…`) are canonical; anything
 * unprefixed is redirected using, in order: the cookie, `Accept-Language`,
 * then the default locale.
 */
export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const segment = pathname.split("/")[1];
  if (isLocale(segment)) {
    const response = NextResponse.next();
    response.cookies.set(COOKIE, segment, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
    });
    return response;
  }

  const locale = detect(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

function detect(request: NextRequest): "en" | "fa" {
  const cookie = request.cookies.get(COOKIE)?.value;
  if (cookie && isLocale(cookie)) return cookie;

  const header = request.headers.get("accept-language") ?? "";
  const ranked = header
    .split(",")
    .map((part) => {
      const [tag, q] = part.trim().split(";q=");
      return { tag: (tag ?? "").toLowerCase(), q: q ? Number(q) : 1 };
    })
    .filter((r) => r.tag)
    .sort((a, b) => b.q - a.q);

  for (const { tag } of ranked) {
    if (tag.startsWith("fa")) return "fa";
    if (tag.startsWith("en")) return "en";
  }
  return DEFAULT_LOCALE;
}

export const config = {
  // Skip API routes, Next internals and anything with a file extension.
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
