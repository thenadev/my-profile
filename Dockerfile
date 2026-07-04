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
# Blog-Daten-Baseline; im Betrieb liegt ein Volume über /app/src/data,
# damit über die Admin-API angelegte Posts Redeploys überleben.
COPY --from=build --chown=node:node /app/src/data ./src/data

USER node
EXPOSE 3000
CMD ["node", "server.js"]
