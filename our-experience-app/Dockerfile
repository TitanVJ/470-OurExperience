FROM node:latest as base

WORKDIR /home/node/app

COPY package*.json ./

COPY patches ./patches

RUN npm ci

COPY . .

RUN chmod +x wait.sh

FROM base as production

ENV NODE_PATH=./build

RUN npm run build