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

  const file = defaultSerializer(includes, data)

  const token = app.services.token.get({ resources: [`files#${file.id}`], scopes: ['files'] })
