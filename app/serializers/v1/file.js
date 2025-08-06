const defaultSerializer = require('../serializer')
const app = require('../../core')

const includes = [
  'id',
  'createdById',
  'createdByRole',
  'createdAt',
  'updatedAt',
  'mimetype',
  'name',
  'version'
]

module.exports = data => {
  const file = defaultSerializer(includes, data)

