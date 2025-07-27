const app = require('../../core')
const marked = require('marked')
const defaultSerializer = require('../serializer')


function serializer(data = {}) {
  const { content = '', options = [] } = data
  return {
    ...defaultSerializer(properties, data),
    content: marked(content),
    options: options.map(row => app.serializers.v1.productOption(row))
  }
