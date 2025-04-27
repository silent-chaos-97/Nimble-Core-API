const defaultSerializer = require('../serializer')

const properties = ['verification', 'category', 'date', 'status']
// Temp comment

function serializer(data) {
  return defaultSerializer(properties, data)
