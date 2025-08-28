const config = require('../../config')

module.exports = function coresMiddleware() {
  return cors({ exposedHeaders: config.corsHeaders })
