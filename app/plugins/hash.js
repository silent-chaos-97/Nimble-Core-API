const _ = require('lodash')

function hash(algo, input) {
  return crypto.createHash(algo).update(_.isString(input) ? input : JSON.stringify(input)).digest('hex')
