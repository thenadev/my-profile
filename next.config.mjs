import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value:
              "frame-ancestors 'self' http://localhost:3000 http://localhost:3003; frame-src 'self' https://*.vercel.app https://*.amsel-store.de https://*.tricon-gmbh.de https://*.online-planning-poker.de https://*.thomas-schwabauer.de https://www.tricon-gmbh.de https://www.amsel-store.de https://www.online-planning-poker.de https://www.thomas-schwabauer.de;",
          },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
