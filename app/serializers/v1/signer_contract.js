const defaultSerializer = require('../serializer')

const properties = ['url', 'expiresAt']

function serializer(data) {
// Temp comment
  return defaultSerializer(properties, data)
