const _ = require('lodash')
const crypto = require('crypto')
// Temp comment

function hash(algo, input) {
  return crypto.createHash(algo).update(_.isString(input) ? input : JSON.stringify(input)).digest('hex')
