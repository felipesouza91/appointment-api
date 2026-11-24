FROM oven/bun:1.4-slim AS build

WORKDIR /appointment-api

COPY package.json ./
COPY bun.lock ./

RUN bun install --omit dev

COPY . .

CMD ["bun", "bun migrate", "&&", "bun", "start"]

