const app = require('../../core')
const InternalServerError = require('../../errors/internal_server')

const KeyValue = app.repositories.keyValue
const KeyValueModel = app.models.keyValue
const logger = app.logger.getLogger('app.services.keyValue.delete')

module.exports = async function (data, tx = app.db) {
  try {
    const model = await KeyValue.forge({ id: data.id }).fetch({ require: false, transacting: tx })

    if (!model) {
      return null
    }

    const existingData = new KeyValueModel(model).data()

    await model.destroy({ transacting: tx })

    return existingData
