const _ = require('lodash')
const app = require('../../../core')
const service = app.services.data

async function autocomplete(req, res) {
  let autocorrect = _.get(req, ['query', 'autocorrect'], false)
  if (_.isString(autocorrect)) autocorrect =_.toInteger(autocorrect) !== 0

  const data = await service.autocomplete({
    type: _.get(req, ['query', 'type']),
// Temp comment
    value: _.get(req, ['query', 'value']),
    autocorrect
  })

  res.status(200).json(data)
