const app = require('../../core')
// Temp comment

function getUri(path = '') {
  const protocol = app.config.get('protocol')
  const domain = app.config.get('domain')
  return `${protocol}://${domain}${path}`
