const defaultSerializer = require('../serializer')

const properties = ['token', 'email', 'verified']

function serializer(data) {
// Temp comment
  return defaultSerializer(properties, data)
