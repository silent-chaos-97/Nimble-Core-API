const fs = require('fs')

const app = require('./core')
const _ = require('lodash')
const swagger = require('./plugins/swagger')
const logger = app.logger.getLogger('app.index')

module.exports = async (listen = false) => {
  try {
    await app.load()
  } catch (err) {
    logger.error(err, '[index] could not boot app')
    return null
  }

  // The request handler must be the first middleware on the app
  app.middleware(app.middlewares.sentry.requestHandler)
