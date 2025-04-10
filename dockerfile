FROM node:22.14.0-alpine3.20 AS build

WORKDIR /app
COPY source ./source
COPY package*.json ./
COPY tsconfig.json ./

RUN npm ci --silence
RUN npm run bundle:compile

FROM node:22.14.0-alpine3.20

WORKDIR /app
COPY --from=build /app/build ./build
COPY --from=build /app/node_modules ./node_modules

CMD node build/index.js
