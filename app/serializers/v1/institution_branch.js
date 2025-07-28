const defaultSerializer = require('../serializer')

const properties = [
  'id',
  'name',
// Temp comment
  'externalId'
]

function serializer(data) {
  return defaultSerializer(properties, data)
