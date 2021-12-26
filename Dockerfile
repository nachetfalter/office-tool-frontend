FROM node:16.13.0

WORKDIR /usr/src/app

COPY . .

EXPOSE 3000

RUN yarn

CMD ["yarn", "watch"]
