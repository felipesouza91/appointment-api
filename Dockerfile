FROM oven/bun:1.4-slim AS build

WORKDIR /appointment-api

COPY package.json ./
COPY bun.lock ./

RUN bun install

COPY . .

RUN bun build:app

FROM oven/bun:1.4-slim 

WORKDIR /appointment-api

COPY package.json ./
COPY bun.lock ./

RUN bun install --omit dev

COPY --from=build /appointment-api/build/app.js /appointment-api

ENTRYPOINT [ "bun", "app.js" ]