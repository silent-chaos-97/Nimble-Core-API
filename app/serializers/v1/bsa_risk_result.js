const _ = require('lodash')
const defaultSerializer = require('../serializer')

const properties = ['position', 'questionId', 'answer', 'context']

function serializer(data = {}) {
  const marshalled = defaultSerializer(properties, data)

  marshalled.text = _.get(marshalled, 'context.text')
  marshalled.type = _.get(marshalled, 'context.type')
  marshalled.subtype = _.get(marshalled, 'context.subtype')
  marshalled.score = _.get(marshalled, `context.score.${marshalled.answer}`)

  delete marshalled.context
  return marshalled
