FROM node:14-alpine as builder

WORKDIR /app

## bcrypt library requires this dependencies
