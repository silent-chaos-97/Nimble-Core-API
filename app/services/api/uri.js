const app = require('../../core')

function getUri(path = '') {
  const domain = app.config.get('domain')
  return `${protocol}://${domain}${path}`
