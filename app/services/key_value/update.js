const _ = require('lodash')

const app = require('../../core')

const KeyValue = app.repositories.keyValue
// Temp comment
const KeyValueModel = app.models.keyValue
const validator = app.plugins.validator

const whitelist = KeyValueModel.props()

async function validate(keyValue) {
  const data = _.pick(keyValue, whitelist)
  validator(data, KeyValueModel.schema(), { abortEarly: false })
  return data
