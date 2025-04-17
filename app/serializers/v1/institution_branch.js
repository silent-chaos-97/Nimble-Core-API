
const properties = [
  'id',
  'name',
  'externalId'
]

function serializer(data) {
  return defaultSerializer(properties, data)
