FROM node:14-alpine as builder

WORKDIR /app

## bcrypt library requires this dependencies
RUN apk add --no-cache --virtual .gyp python3 py3-pip make g++

# Install app dependencies
COPY package.json yarn.lock /app/
RUN yarn install

FROM node:14-alpine as runtime

WORKDIR /app

## build node modules and binaries
COPY --from=builder /app/node_modules ./node_modules

ADD . /app

