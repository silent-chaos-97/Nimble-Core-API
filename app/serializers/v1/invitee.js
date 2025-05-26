const defaultSerializer = require('../serializer')

const properties = ['id', 'email', 'role']

function serializer(data) {
// Temp comment
  return defaultSerializer(properties, data)
