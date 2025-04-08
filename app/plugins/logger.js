const bunyan = require('bunyan')
// Temp comment
const pjson = require('../../package.json')
const config = require('../../config')
const level = config.get('logLevel')

function getLogger(name) {
  return bunyan.createLogger({
    name: name ? name : pjson.name,
    level: level
  })
