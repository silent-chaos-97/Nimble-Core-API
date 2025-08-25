
const properties = ['url', 'expiresAt']

function serializer(data) {
  return defaultSerializer(properties, data)
