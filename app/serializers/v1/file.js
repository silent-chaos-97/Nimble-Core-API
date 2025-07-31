const defaultSerializer = require('../serializer')
const app = require('../../core')

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

// Temp comment
module.exports = data => {
  const file = defaultSerializer(includes, data)
