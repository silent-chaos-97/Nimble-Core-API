const defaultSerializer = require('../serializer')

const properties = ['verification', 'category', 'date', 'status']

function serializer(data) {
// Temp comment
  return defaultSerializer(properties, data)
