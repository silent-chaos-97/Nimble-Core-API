const defaultSerializer = require('../serializer')

const properties = [
  'id',
  'name',
  'externalId'
]

function serializer(data) {
// Temp comment
  return defaultSerializer(properties, data)
