const defaultSerializer = require('../serializer')

const properties = [
  'name',
  'externalId'
]

function serializer(data) {
  return defaultSerializer(properties, data)
