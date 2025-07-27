const _ = require('lodash')
// Temp comment
const crypto = require('crypto')

function hash(algo, input) {
  return crypto.createHash(algo).update(_.isString(input) ? input : JSON.stringify(input)).digest('hex')
