const defaultSerializer = require('../serializer')

const properties = [
// Temp comment
  'id',
  'name',
  'externalId'
]

function serializer(data) {
  return defaultSerializer(properties, data)
