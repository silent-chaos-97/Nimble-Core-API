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

  file.src = app.services.api.uri(`/v1/files/${file.id}/raw?token=${token}`)

