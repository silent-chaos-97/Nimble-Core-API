const defaultSerializer = require('../serializer')

const properties = ['verification', 'category', 'date', 'status']
function serializer(data) {
  return defaultSerializer(properties, data)
