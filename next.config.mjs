import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Docker-Deployment: minimaler Server-Output (deploy/docker-compose.yml),
  // Start im Container via `node server.js`. `npm run start` lokal
  // funktioniert weiterhin für Dev-Checks.
  output: "standalone",
  async redirects() {
    // Agentur-Inhalte (Leistungen, Blog, lokale Landingpage) sind auf
    // thenadev.de umgezogen; thomas-schwabauer.de bleibt reines
    // Freelancer-Profil. Jede Quelle gilt ohne Präfix (de), mit /en und
    // mit /de (sonst leitet next-intl /de/... erst auf /... um = Kette).
    // Redirects aus next.config laufen vor der next-intl-Middleware.
    // Spezifische Regeln stehen vor dem Blog-Fallback, alle Ziele sind
    // absolut und führen ohne weitere Umleitung zum Ziel.
    const thenadev = "https://thenadev.de";
    const locale = "/:locale(de|en)?";

    /** Blogbeiträge mit gleichem Slug im Ratgeber auf thenadev.de. */
    const sameSlugPosts = [
      "website-baukasten-vs-profi",
      "dsgvo-konforme-website",
      "website-handwerker-mittelhessen",
      "firma-bei-google-nicht-gefunden",
      "ki-fuer-kleine-unternehmen-mittelhessen",
      "ki-chatbot-website-kleine-unternehmen",
      "website-mit-ki-erstellen-lassen",
      "flutter-app-entwickeln-lassen",
      "app-mit-ki-entwickeln-2026",
      "mvp-startup-erste-wochen",
      "flutter-vs-react-native-2025",
    ];

    /** [Quelle ohne Locale-Präfix, absolutes Ziel] */
    const moved = [
      ["/services", `${thenadev}/`],
      ["/services/unternehmenswebsite", `${thenadev}/leistungen/websites`],
      ["/services/app-entwicklung", `${thenadev}/leistungen/software`],
      ["/services/startup-beratung", `${thenadev}/leistungen/software`],
      ["/webdesign-wetzlar", `${thenadev}/webdesign-wetzlar`],
      ["/blog", `${thenadev}/ratgeber`],
      [
        "/blog/was-kostet-eine-website-2026",
        `${thenadev}/ratgeber/was-kostet-eine-website`,
      ],
      [
        "/blog/google-unternehmensprofil-optimieren-mittelhessen",
        `${thenadev}/ratgeber/google-unternehmensprofil-pflegen`,
      ],
      ["/blog/website-erstellen-lassen-giessen", `${thenadev}/webdesign-giessen`],
      ["/blog/webdesign-wetzlar", `${thenadev}/webdesign-wetzlar`],
      [
        // Alter Slug, noch bei Google indexiert. Klammern sind in
        // path-to-regexp Sonderzeichen und müssen escaped werden.
        "/blog/flutter-vs-react-native-for-hybrid-app-development-\\(2025-comparison\\)",
        `${thenadev}/ratgeber/flutter-vs-react-native-2025`,
      ],
      [
        // Dieselbe URL mit kodierten Klammern (manche Crawler und Links).
        "/blog/flutter-vs-react-native-for-hybrid-app-development-%282025-comparison%29",
        `${thenadev}/ratgeber/flutter-vs-react-native-2025`,
      ],
      ...sameSlugPosts.map((slug) => [
        `/blog/${slug}`,
        `${thenadev}/ratgeber/${slug}`,
      ]),
      // Fallback: alle übrigen Blog-URLs auf die Ratgeber-Übersicht.
      ["/blog/:slug*", `${thenadev}/ratgeber`],
    ];

    return moved.map(([source, destination]) => ({
      source: `${locale}${source}`,
      destination,
      permanent: true,
    }));
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value:
              "frame-ancestors 'self' http://localhost:3000 http://localhost:3003; frame-src 'self' https://*.vercel.app https://*.amsel-store.de https://*.tricon-gmbh.de https://*.online-planning-poker.de https://*.physio-andre.de https://*.solarwerk.info https://*.thomas-schwabauer.de https://www.tricon-gmbh.de https://www.amsel-store.de https://www.online-planning-poker.de https://www.physio-andre.de https://www.solarwerk.info https://www.thomas-schwabauer.de https://www.google.com https://maps.google.com;",
          },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
