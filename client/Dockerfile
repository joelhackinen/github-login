FROM node:18.18.1-bullseye-slim

WORKDIR /usr/src/app

COPY package*.json .

RUN npm ci

COPY . .

CMD ["npm", "run", "dev"]