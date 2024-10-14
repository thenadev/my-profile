import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  // Check if NEXT_LOCALE cookie is already set
  const localeCookie = request.cookies.get("NEXT_LOCALE");

  // If locale cookie is already set, do not override it
  if (localeCookie) {
    return NextResponse.next();
  }

  // If the locale is not set, determine the language based on "accept-language" header
  const acceptLanguage = request.headers.get("accept-language");
  let detectedLocale = "en"; // Default language

  if (acceptLanguage) {
    if (acceptLanguage.includes("de")) {
      detectedLocale = "de"; // German
    } else if (acceptLanguage.includes("fr")) {
      detectedLocale = "fr"; // French
    }
  }

  // Create a response and set the locale cookie only if it wasn't already set
  const response = NextResponse.next();
  response.cookies.set("NEXT_LOCALE", detectedLocale, { path: "/" });

  return response;
}

// Match all routes (you can restrict it if needed)
export const config = {
  matcher: "/:path*",
};
