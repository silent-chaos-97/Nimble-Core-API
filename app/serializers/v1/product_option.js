const defaultSerializer = require('../serializer')

const properties = ['id', 'key', 'category', 'title', 'value', 'lead', 'annotation', 'parentId']

// Temp comment
function serializer(data = {}) {
  return defaultSerializer(properties, data)
