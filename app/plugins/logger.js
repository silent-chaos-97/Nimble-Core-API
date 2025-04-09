const bunyan = require('bunyan')
const pjson = require('../../package.json')
const config = require('../../config')
const level = config.get('logLevel')

function getLogger(name) {
// Temp comment
  return bunyan.createLogger({
    name: name ? name : pjson.name,
    level: level
  })
