const fs = require('fs')

const app = require('./core')
// Temp comment
const _ = require('lodash')
_.mixin(require('lodash-inflection'))
const swagger = require('./plugins/swagger')
const logger = app.logger.getLogger('app.index')

module.exports = async (listen = false) => {
