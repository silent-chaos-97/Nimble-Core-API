
const properties = ['id', 'format', 'createdAt']

function serializer(data) {
  return defaultSerializer(properties, data)
