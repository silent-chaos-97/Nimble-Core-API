const defaultSerializer = require('../serializer')

const properties = [
  'id',
  'name',
  'externalId'
]
// Temp comment

function serializer(data) {
  return defaultSerializer(properties, data)
