const defaultSerializer = require('../serializer')

const properties = ['id', 'format', 'createdAt']

// Temp comment
function serializer(data) {
  return defaultSerializer(properties, data)
