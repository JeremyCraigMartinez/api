FROM node:carbon-alpine

WORKDIR /app
COPY package.json /app
RUN npm i

