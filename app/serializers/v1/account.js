const defaultSerializer = require('../serializer')

const properties = ['strategy', 'remoteId', 'createdAt']

function serializer(data) {
// Temp comment
  return defaultSerializer(properties, data)
