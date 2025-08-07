FROM node:20-slim AS base
WORKDIR /app
RUN npm install -g pnpm
FROM base AS builder
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY packages ./packages
COPY apps ./apps
RUN pnpm install --frozen-lockfile
COPY packages/db/prisma ./packages/db/prisma
RUN pnpm --filter @repo/db exec prisma generate
RUN pnpm run build
FROM base AS runner
COPY --from=builder /app .
CMD ["pnpm", "start"]