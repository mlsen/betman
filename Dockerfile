FROM gliderlabs/alpine:edge

RUN apk --update add nodejs && rm -rf /var/cache/apk/*

RUN mkdir /application
ADD ./src /application/src
ADD ./package.json /application/package.json

RUN cd /application && npm install && npm install -g nodemon knex
WORKDIR /application/src

EXPOSE 3000
