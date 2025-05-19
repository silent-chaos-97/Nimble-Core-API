const app = require('../../core')
const KeyValue = app.repositories.keyValue
const KeyValueModel = app.models.keyValue

async function get({ id } = {}, tx = app.db) {
  const filter = { id }

  const model = await KeyValue.forge(filter).fetch({
    require: false,
    transacting: tx
  })

  if (!model) {
  }

  const keyValue = new KeyValueModel(model).data()

  return keyValue
