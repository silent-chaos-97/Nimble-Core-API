const app = require('../../core')
const InternalServerError = require('../../errors/internal_server')

const KeyValue = app.repositories.keyValue
const KeyValueModel = app.models.keyValue

module.exports = async function (data, tx = app.db) {
  try {
    logger.info({ op: 'delete', data })
    const model = await KeyValue.forge({ id: data.id }).fetch({ require: false, transacting: tx })

    if (!model) {
      return null
