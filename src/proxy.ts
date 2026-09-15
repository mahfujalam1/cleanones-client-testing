import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { DEFAULT_LOCALE, isSupportedLocale } from "@/utils/locales";

/**
 * Ensure the first path segment is a real language code.
 * Examples:
 *   /login          -> /en/login
 *   /login/login    -> /en/login
 *   /xx/schedule    -> /en/schedule
 *   /en/login       -> (unchanged)
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const segments = pathname.split("/").filter(Boolean);

  // "/" is handled by src/app/page.tsx -> /en
  if (segments.length === 0) {
    return NextResponse.next();
  }

  const [maybeLocale, ...rest] = segments;

  if (isSupportedLocale(maybeLocale)) {
    return NextResponse.next();
  }

  // Invalid locale in the first segment → force default `en`
  // Keep the remainder of the path (the real route).
  // If there is no remainder (e.g. "/login"), treat the invalid segment as the page.
  const nextPath =
    rest.length > 0
      ? `/${DEFAULT_LOCALE}/${rest.join("/")}`
      : `/${DEFAULT_LOCALE}/${maybeLocale}`;

  const url = request.nextUrl.clone();
  url.pathname = nextPath;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    /*
     * Match all paths except:
     * - api / proxy API
     * - Next internals
     * - static files with an extension
     */
    "/((?!api|_next/static|_next/image|_next/data|favicon.ico|icon.png|manifest.webmanifest|.*\\..*).*)",
  ],
};
