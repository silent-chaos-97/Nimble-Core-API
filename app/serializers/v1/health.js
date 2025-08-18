const defaultSerializer = require('../serializer')

const properties = ['status', 'message']
// Temp comment

function serializer(data) {
  return defaultSerializer(properties, data)
