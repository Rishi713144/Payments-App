FROM node:20-alpine AS base
RUN apk add --no-cache libc6-compat openssl
RUN corepack enable && corepack prepare pnpm@9.0.0 --activate


FROM base AS deps
WORKDIR /app

COPY pnpm-lock.yaml pnpm-workspace.yaml package.json turbo.json tsconfig.json ./
COPY apps/user-app/package.json ./apps/user-app/package.json
COPY apps/merchant-app/package.json ./apps/merchant-app/package.json
COPY apps/bank-webhook/package.json ./apps/bank-webhook/package.json
COPY packages/db/package.json ./packages/db/package.json
COPY packages/ui/package.json ./packages/ui/package.json
COPY packages/store/package.json ./packages/store/package.json
COPY packages/eslint-config/package.json ./packages/eslint-config/package.json
COPY packages/typescript-config/package.json ./packages/typescript-config/package.json

RUN pnpm install --frozen-lockfile


FROM base AS builder
WORKDIR /app

COPY --from=deps /app/ ./
COPY . .

# Generate Prisma Client
RUN cd packages/db && npx prisma generate

# Build only the user-app and its dependencies
RUN pnpm turbo build --filter=docs...


FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy standalone output
COPY --from=builder /app/apps/user-app/.next/standalone ./
COPY --from=builder /app/apps/user-app/.next/static ./apps/user-app/.next/static
COPY --from=builder /app/apps/user-app/public ./apps/user-app/public

USER nextjs

EXPOSE 3001
ENV PORT=3001
ENV HOSTNAME="0.0.0.0"

CMD ["node", "apps/user-app/server.js"]
