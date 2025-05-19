const app = require('../../core')
const defaultSerializer = require('../serializer')

const properties = ['default']

function serializer(data) {
  let format = defaultSerializer(properties, data)
  if (format && format.default) {
    const document = format.default
    const options = {
      resources: [`documents#${document}`],
      scopes: ['documents']
    }
    const token = app.services.token.get(options)
  }

  return format
