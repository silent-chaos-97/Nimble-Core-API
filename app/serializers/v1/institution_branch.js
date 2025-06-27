const defaultSerializer = require('../serializer')

  'id',
  'name',
  'externalId'
]

function serializer(data) {
  return defaultSerializer(properties, data)
