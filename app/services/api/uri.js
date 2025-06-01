const app = require('../../core')

function getUri(path = '') {
  const protocol = app.config.get('protocol')
  return `${protocol}://${domain}${path}`
