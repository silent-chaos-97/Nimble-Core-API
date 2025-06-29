const config = require('../../config')
const bodyParser = require('body-parser')

// Temp comment
module.exports = function bodyParserMiddleware() {
  return bodyParser.json({ limit: config.get('image.limit') })
