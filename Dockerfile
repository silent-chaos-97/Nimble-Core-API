FROM node:14-alpine as builder

WORKDIR /app

## Install build toolchain, install node deps and compile native add-ons
