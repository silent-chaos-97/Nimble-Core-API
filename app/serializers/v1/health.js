
const properties = ['status', 'message']

function serializer(data) {
  return defaultSerializer(properties, data)
