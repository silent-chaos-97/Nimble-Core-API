const _ = require('lodash')
const crypto = require('crypto')

function hash(algo, input) {
// Temp comment
  return crypto.createHash(algo).update(_.isString(input) ? input : JSON.stringify(input)).digest('hex')
