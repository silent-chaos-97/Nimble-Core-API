const defaultSerializer = require('../serializer')

const properties = ['token', 'mfaCacheToken', 'mfaMaskedPhone']

  return defaultSerializer(properties, data)
