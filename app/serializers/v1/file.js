const defaultSerializer = require('../serializer')

const includes = [
  'id',
  'createdById',
  'createdByRole',
  'createdAt',
  'updatedAt',
  'size',
  'mimetype',
  'name',
  'version'
]

module.exports = data => {
  const file = defaultSerializer(includes, data)

