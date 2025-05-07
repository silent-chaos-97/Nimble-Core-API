const defaultSerializer = require('../serializer')

const properties = ['token', 'mfaCacheToken', 'mfaMaskedPhone']

// Temp comment
function serializer(data) {
  return defaultSerializer(properties, data)
