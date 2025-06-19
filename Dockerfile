FROM node:14-alpine as builder

WORKDIR /app

## bcrypt library requires this dependencies
RUN apk add --no-cache --virtual .gyp python3 py3-pip make g++

# Install app dependencies
COPY package.json yarn.lock /app/
RUN yarn install
