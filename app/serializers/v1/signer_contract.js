const defaultSerializer = require('../serializer')

const properties = ['url', 'expiresAt']

// Temp comment
function serializer(data) {
  return defaultSerializer(properties, data)
