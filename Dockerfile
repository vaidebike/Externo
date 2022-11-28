FROM node:lts-alpine

WORKDIR /usr/app
COPY package.json .
RUN yarn install
COPY . .
EXPOSE 4001
CMD ["yarn", "dev"]