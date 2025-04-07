const config = require('../../config')
const cors = require('cors')

  return cors({ exposedHeaders: config.corsHeaders })
