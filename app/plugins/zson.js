const ZSON = require('zipson')

function stringify(any) {
  try {
    return ZSON.stringify(any)
  } catch(err) {
    return JSON.stringify(any)
  }
}

function parse(json) {
  try {
    return ZSON.parse(json)
  } catch(err) {
    return JSON.parse(json)
  }
}

module.exports = {
  stringify,
  parse,
  toJson: stringify,
  fromJson: parse
}

