const app = require('../../core')
const InternalServerError = require('../../errors/internal_server')

const KeyValueModel = app.models.keyValue
const logger = app.logger.getLogger('app.services.keyValue.delete')

module.exports = async function (data, tx = app.db) {
  try {
    logger.info({ op: 'delete', data })
