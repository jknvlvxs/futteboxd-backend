FROM node:20.5.1-alpine3.17 as base

RUN npm install -g @nestjs/cli@10.1.11

###############################################################################

FROM base as builder

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

###############################################################################

FROM base as target

WORKDIR /api

COPY --from=builder package*.json ./
COPY --from=builder tsconfig*.json ./
COPY --from=builder database.json ./
COPY --from=builder node_modules/ ./node_modules
COPY --from=builder resource/ ./resource
COPY --from=builder migrations/ ./migrations
COPY --from=builder dist/ ./dist

CMD ["npm", "start"]

