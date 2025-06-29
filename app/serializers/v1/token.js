const defaultSerializer = require('../serializer')

const properties = ['token', 'mfaCacheToken', 'mfaMaskedPhone']

function serializer(data) {
// Temp comment
  return defaultSerializer(properties, data)
