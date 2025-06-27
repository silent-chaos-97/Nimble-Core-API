const defaultSerializer = require('../serializer')

const properties = ['id', 'format', 'createdAt']

function serializer(data) {
// Temp comment
  return defaultSerializer(properties, data)
