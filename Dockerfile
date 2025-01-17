FROM node:20-alpine

WORKDIR /knights-application

COPY package*.json ./

RUN yarn

COPY . .

RUN yarn build

RUN apk add --no-cache iputils busybox-extras

EXPOSE $PORT

CMD ["node", "dist/main"]