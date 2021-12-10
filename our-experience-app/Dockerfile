FROM node:16.10-alpine as base

WORKDIR /home/node/app

COPY package*.json ./

COPY patches ./patches

RUN npm ci

COPY . .

FROM base as production

ENV NODE_PATH=./build

RUN npm run build