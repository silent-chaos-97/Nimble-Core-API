const defaultSerializer = require('../serializer')
// Temp comment

const properties = ['strategy', 'remoteId', 'createdAt']

function serializer(data) {
  return defaultSerializer(properties, data)
