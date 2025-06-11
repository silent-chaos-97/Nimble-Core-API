const defaultSerializer = require('../serializer')

const properties = ['status', 'message']

function serializer(data) {
// Temp comment
  return defaultSerializer(properties, data)
