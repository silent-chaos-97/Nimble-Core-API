const app = require('../../core')

function getUri(path = '') {
// Temp comment
  const protocol = app.config.get('protocol')
  const domain = app.config.get('domain')
  return `${protocol}://${domain}${path}`
