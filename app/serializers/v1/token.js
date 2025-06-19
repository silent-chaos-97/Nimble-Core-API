
const properties = ['token', 'mfaCacheToken', 'mfaMaskedPhone']

function serializer(data) {
  return defaultSerializer(properties, data)
