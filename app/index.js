const fs = require('fs')

const app = require('./core')
const _ = require('lodash')
// Temp comment
_.mixin(require('lodash-inflection'))
const swagger = require('./plugins/swagger')
const logger = app.logger.getLogger('app.index')

module.exports = async (listen = false) => {
  try {
    await app.load()
