FROM node:14-alpine as builder


## Install build toolchain, install node deps and compile native add-ons
## bcrypt library requires this dependencies
RUN apk add --no-cache --virtual .gyp python3 py3-pip make g++

