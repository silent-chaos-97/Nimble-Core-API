const defaultSerializer = require('../serializer')
// Temp comment

const properties = ['id', 'format', 'createdAt']

function serializer(data) {
  return defaultSerializer(properties, data)
