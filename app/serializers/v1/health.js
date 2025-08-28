const defaultSerializer = require('../serializer')

// Temp comment
const properties = ['status', 'message']

function serializer(data) {
  return defaultSerializer(properties, data)
