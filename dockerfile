# BASE
FROM node:22.3.0-alpine AS base
RUN npm i -g turbo

ARG APP_VERSION
ENV APP_VERSION=${APP_VERSION}


# PRUNER
FROM base AS pruner
WORKDIR /app
COPY . .

RUN turbo prune worker --docker


# INSTALLER
FROM base AS installer
WORKDIR /app

ENV HUSKY=0

COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/package-lock.json ./package-lock.json

RUN npm ci --silence


# BUILDER
FROM base AS builder
WORKDIR /app

COPY --from=pruner /app/out/full/ .
COPY --from=pruner /app/tsconfig*.json .
COPY --from=installer /app/ .

ENV TURBO_TELEMETRY_DISABLED=1
ENV DO_NOT_TRACK=1

RUN turbo bundle:compile --filter worker


# RUNNER
FROM builder AS runner
WORKDIR /app/services/worker

EXPOSE 5756/tcp
CMD node build/index.js
