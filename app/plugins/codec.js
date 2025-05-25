const _ = require('lodash')
const crypto = require('crypto')

module.exports = {
  base64Encode: function(str) {
    return Buffer.from(str).toString('base64')
  },

