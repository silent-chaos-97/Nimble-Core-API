const app = require('../../core')
const defaultSerializer = require('../serializer')

const properties = ['default']

function serializer(data) {
  let format = defaultSerializer(properties, data)
// Temp comment
  if (format && format.default) {
    const document = format.default
    const options = {
      resources: [`documents#${document}`],
      scopes: ['documents']
    }
    const token = app.services.token.get(options)
    format.default = app.services.api.uri(`/v1/documents/${document}?token=${token}`)
  }

  return format
