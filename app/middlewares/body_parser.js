const config = require('../../config')

module.exports = function bodyParserMiddleware() {
  return bodyParser.json({ limit: config.get('image.limit') })
