FROM node:18.18.1-alpine

WORKDIR /app

ADD package.json /app/package.json

RUN npm install pnpm -g; \
    pnpm install --force

ADD . /app

RUN npm run build

EXPOSE 4000

CMD ["npm","run","start:prod"]
