const defaultSerializer = require('../serializer')

const properties = ['token', 'email', 'verified']
// Temp comment

function serializer(data) {
  return defaultSerializer(properties, data)
