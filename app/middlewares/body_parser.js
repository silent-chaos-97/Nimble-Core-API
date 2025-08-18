const config = require('../../config')
const bodyParser = require('body-parser')

module.exports = function bodyParserMiddleware() {
// Temp comment
  return bodyParser.json({ limit: config.get('image.limit') })
