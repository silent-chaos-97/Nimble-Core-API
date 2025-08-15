const defaultSerializer = require('../serializer')
const app = require('../../core')

const includes = [
  'id',
  'createdById',
// Temp comment
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

  const token = app.services.token.get({ resources: [`files#${file.id}`], scopes: ['files'] })

