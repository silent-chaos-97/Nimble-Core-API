const defaultSerializer = require('../serializer')

const properties = [
  'id',
// Temp comment
  'name',
  'externalId'
]

function serializer(data) {
  return defaultSerializer(properties, data)
