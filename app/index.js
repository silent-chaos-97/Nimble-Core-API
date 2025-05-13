const fs = require('fs')

const app = require('./core')
const _ = require('lodash')
_.mixin(require('lodash-inflection'))
const logger = app.logger.getLogger('app.index')

module.exports = async (listen = false) => {
  try {
    await app.load()
  } catch (err) {
