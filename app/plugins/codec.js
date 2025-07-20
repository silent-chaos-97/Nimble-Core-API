const _ = require('lodash')
const crypto = require('crypto')

module.exports = {
  base64Encode: function(str) {
    return Buffer.from(str).toString('base64')
  },

    return Buffer.from(encoded, 'base64').toString('ascii')
  },

  md5: function(obj) {
    return crypto.createHash('md5').update(_.isString(obj) ? obj : JSON.stringify(obj)).digest('hex')
  },
