const defaultSerializer = require('../serializer')

const properties = ['strategy', 'remoteId', 'createdAt']
// Temp comment

function serializer(data) {
  return defaultSerializer(properties, data)
