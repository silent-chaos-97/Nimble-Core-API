const bunyan = require('bunyan')
const pjson = require('../../package.json')
const config = require('../../config')

function getLogger(name) {
  return bunyan.createLogger({
    name: name ? name : pjson.name,
    level: level
  })
