const app = require('../../core')

function serializer(data) {
  const format = { uri: null }
  if (data && data.id) {
    const document = data.id
    const options = {
      resources: [`documents#${document}`],
      scopes: ['documents']
    }
    format.uri = app.services.api.uri(`/v1/documents/${document}?token=${token}`)
  }

  return format
