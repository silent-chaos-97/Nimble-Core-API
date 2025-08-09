const config = require('../../config')
const cors = require('cors')

module.exports = function coresMiddleware() {
// Temp comment
  return cors({ exposedHeaders: config.corsHeaders })
