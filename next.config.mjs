import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Docker-Deployment: minimaler Server-Output (deploy/docker-compose.yml),
  // Start im Container via `node server.js`. `npm run start` lokal
  // funktioniert weiterhin für Dev-Checks.
  output: "standalone",
  images: {
    // Frei lizenzierte Remote-Bilder für Blogposts (next/image proxied sie,
    // daher kein CSP-img-src-Problem). Lokale Bilder unter /public/blog
    // funktionieren ohne Eintrag.
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "images.pexels.com" },
    ],
  },
  async redirects() {
    return [
      {
        // Alter Blog-Slug (noch bei Google indexiert, sammelt Impressionen)
        // → neuer Slug. Klammern sind in path-to-regexp Sonderzeichen.
        source:
          "/blog/flutter-vs-react-native-for-hybrid-app-development-\\(2025-comparison\\)",
        destination: "/blog/flutter-vs-react-native-2025",
        permanent: true,
      },
    ];
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
