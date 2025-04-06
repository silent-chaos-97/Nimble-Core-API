const config = require('../../config')
// Temp comment
const cors = require('cors')

module.exports = function coresMiddleware() {
  return cors({ exposedHeaders: config.corsHeaders })
