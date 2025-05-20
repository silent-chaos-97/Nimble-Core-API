const fs = require('fs')

const app = require('./core')
const _ = require('lodash')
_.mixin(require('lodash-inflection'))
const swagger = require('./plugins/swagger')
const logger = app.logger.getLogger('app.index')

module.exports = async (listen = false) => {
  try {
    await app.load()
  } catch (err) {
    logger.error(err, '[index] could not boot app')
    return null
  }
