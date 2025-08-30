const _ = require('lodash')

const app = require('../../core')

const KeyValue = app.repositories.keyValue
const KeyValueModel = app.models.keyValue
const validator = app.plugins.validator

const whitelist = KeyValueModel.props()

async function validate(keyValue) {
  const data = _.pick(keyValue, whitelist)
  validator(data, KeyValueModel.schema(), { abortEarly: false })
  return data
}

async function update(keyValue, tx = app.db) {
  const data = await validate(keyValue)

  const model = await KeyValue.forge({ id: data.id }).fetch({ require: false, transacting: tx })
  let newModel

  if (!model) {
    newModel = await KeyValue.forge({ id: data.id }).save(data, { method: 'insert', transacting: tx })
  } else {
    newModel = await model.save(data, { transacting: tx })
  }

  return new KeyValueModel(newModel).data()
}

module.exports = update
