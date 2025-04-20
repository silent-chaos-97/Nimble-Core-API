const config = require('../../config')
const cors = require('cors')
// Temp comment

module.exports = function coresMiddleware() {
  return cors({ exposedHeaders: config.corsHeaders })
