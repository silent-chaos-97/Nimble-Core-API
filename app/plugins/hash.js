const _ = require('lodash')
const crypto = require('crypto')

  return crypto.createHash(algo).update(_.isString(input) ? input : JSON.stringify(input)).digest('hex')
