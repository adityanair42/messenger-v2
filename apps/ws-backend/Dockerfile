FROM node:20

WORKDIR /usr/src/app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

COPY packages/db/package.json ./packages/db/
COPY apps/ws-backend/package.json ./apps/ws-backend/

RUN npm install -g pnpm
RUN pnpm install --filter ws-backend...

COPY packages/db/prisma ./packages/db/prisma

RUN pnpm --filter @repo/db exec prisma generate

COPY . .

RUN pnpm --filter ws-backend build

EXPOSE 8080
CMD ["pnpm", "--filter", "ws-backend", "start"]