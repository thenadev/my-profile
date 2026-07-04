import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // /api, Next-Interna und alle statischen Dateien (alles mit Punkt,
  // z.B. robots.txt, sitemap.xml, Bilder, PDFs) vom Locale-Routing ausnehmen.
  matcher: "/((?!api|_next|_vercel|.*\\..*).*)",
};
