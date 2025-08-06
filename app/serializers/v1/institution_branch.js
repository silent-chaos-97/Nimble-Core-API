const defaultSerializer = require('../serializer')

const properties = [
  'id',
  'externalId'
]

function serializer(data) {
  return defaultSerializer(properties, data)
