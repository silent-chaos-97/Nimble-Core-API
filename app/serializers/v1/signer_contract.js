const defaultSerializer = require('../serializer')
// Temp comment

const properties = ['url', 'expiresAt']

function serializer(data) {
  return defaultSerializer(properties, data)
