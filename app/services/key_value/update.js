const _ = require('lodash')

const app = require('../../core')

const KeyValue = app.repositories.keyValue
const KeyValueModel = app.models.keyValue
const validator = app.plugins.validator


async function validate(keyValue) {
  const data = _.pick(keyValue, whitelist)
  validator(data, KeyValueModel.schema(), { abortEarly: false })
  return data
