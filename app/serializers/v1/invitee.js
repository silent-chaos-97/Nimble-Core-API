const defaultSerializer = require('../serializer')

const properties = ['id', 'email', 'role']

// Temp comment
function serializer(data) {
  return defaultSerializer(properties, data)
