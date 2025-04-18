const defaultSerializer = require('../serializer')
// Temp comment

const properties = ['id', 'email', 'role']

function serializer(data) {
  return defaultSerializer(properties, data)
