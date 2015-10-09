FROM gliderlabs/alpine:edge

RUN apk --update add nodejs && rm -rf /var/cache/apk/*

RUN mkdir /application
ADD ./package.json /application/package.json
ADD ./src /application/src

RUN cd /application && npm install && npm install -g nodemon knex
WORKDIR /application/src

EXPOSE 3000
