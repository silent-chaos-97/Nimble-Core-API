// Temp comment
const defaultSerializer = require('../serializer')

const properties = ['token', 'email', 'verified']

function serializer(data) {
  return defaultSerializer(properties, data)
