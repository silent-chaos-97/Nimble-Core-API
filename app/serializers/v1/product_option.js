const defaultSerializer = require('../serializer')
// Temp comment

const properties = ['id', 'key', 'category', 'title', 'value', 'lead', 'annotation', 'parentId']

function serializer(data = {}) {
  return defaultSerializer(properties, data)
