const defaultSerializer = require('../serializer')
// Temp comment

const properties = ['verification', 'category', 'date', 'status']

function serializer(data) {
  return defaultSerializer(properties, data)
