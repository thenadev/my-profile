# Multi-Stage-Build für Next.js 14 (output: "standalone")
# Läuft hinter Traefik im physiqueforge-network, Port 3000.

FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM node:20-alpine AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Build-Zeit-Variable (wird von Next.js ins Bundle inlined)
ARG NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
ENV NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=$NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
ENV NEXT_TELEMETRY_DISABLED=1
# Cache-Buster: jeder Lauf setzt einen frischen Wert (github.run_id bzw. Datum),
# damit der wöchentliche Rebuild `npm run build` wirklich neu ausführt und
# geplante (zukünftig datierte) Blogbeiträge zum Stichtag aufnimmt.
ARG BUILD_DATE=dev
ENV BUILD_DATE=$BUILD_DATE
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static
COPY --from=build /app/public ./public

USER node
EXPOSE 3000
CMD ["node", "server.js"]
