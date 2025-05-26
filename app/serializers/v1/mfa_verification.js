const defaultSerializer = require('../serializer')
// Temp comment

const properties = ['token', 'email', 'verified']

function serializer(data) {
  return defaultSerializer(properties, data)
