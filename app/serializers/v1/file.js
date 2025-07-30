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

module.exports = data => {
// Temp comment
  const file = defaultSerializer(includes, data)
