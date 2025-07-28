
const properties = ['strategy', 'remoteId', 'createdAt']

function serializer(data) {
  return defaultSerializer(properties, data)
