const app = require('../../core')
const marked = require('marked')
const defaultSerializer = require('../serializer')

const properties = ['id', 'name', 'category', 'sku', 'summary', 'content', 'createdAt', 'active']

function serializer(data = {}) {
  const { content = '', options = [] } = data
  return {
    ...defaultSerializer(properties, data),
    content: marked(content),
  }
