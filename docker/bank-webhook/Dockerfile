FROM node:20-alpine AS base
RUN apk add --no-cache libc6-compat openssl
RUN corepack enable && corepack prepare pnpm@9.0.0 --activate

# ── Install dependencies ──────────────────────────────────────
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

# ── Build ──────────────────────────────────────────────────────
FROM base AS builder
WORKDIR /app

COPY --from=deps /app/ ./
COPY . .

RUN cd packages/db && npx prisma generate
RUN pnpm turbo build --filter=bank-webhook...

# ── Runner ─────────────────────────────────────────────────────
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

# Copy the bundled output
COPY --from=builder /app/apps/bank-webhook/dist ./dist

# Copy Prisma engine binaries needed at runtime
COPY --from=builder /app/node_modules/.pnpm/@prisma+client@*/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/.pnpm/@prisma+client@*/node_modules/@prisma ./node_modules/@prisma

EXPOSE 3003
ENV PORT=3003

CMD ["node", "dist/index.js"]
