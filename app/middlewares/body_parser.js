const config = require('../../config')
const bodyParser = require('body-parser')

  return bodyParser.json({ limit: config.get('image.limit') })
