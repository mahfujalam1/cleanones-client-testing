import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { DEFAULT_LOCALE, isSupportedLocale } from "@/utils/locales";


export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const segments = pathname.split("/").filter(Boolean);

  
  if (segments.length === 0) {
    return NextResponse.next();
  }

  const [maybeLocale, ...rest] = segments;

  if (isSupportedLocale(maybeLocale)) {
    return NextResponse.next();
  }

  
  
  
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
    
    "/((?!api|_next/static|_next/image|_next/data|favicon.ico|icon.png|manifest.webmanifest|socket\\.io|.*\\..*).*)",
  ],
};
