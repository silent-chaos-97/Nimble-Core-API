const defaultSerializer = require('../serializer')

const properties = [
  'id',
  'name',
]

function serializer(data) {
  return defaultSerializer(properties, data)
