# VERSION 1.3 DOCKER CONFIG
# Some features we use are only available in Node v14 upwards
FROM node:14-alpine

WORKDIR /daccred-core

ADD . /daccred-core
RUN yarn install && \
    yarn build

ENV NODE_ENV production
ENTRYPOINT ["yarn", "start"]
