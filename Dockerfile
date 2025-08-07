FROM node:20

WORKDIR /usr/src/app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

COPY packages/db/package.json ./packages/db/
COPY apps/http-backend/package.json ./apps/http-backend/

RUN npm install -g pnpm
RUN pnpm install --filter http-backend...

COPY packages/db/prisma ./packages/db/prisma

RUN pnpm --filter @repo/db exec prisma generate

COPY . .

RUN pnpm --filter http-backend build

EXPOSE 3001
CMD ["pnpm", "--filter", "http-backend", "start"]