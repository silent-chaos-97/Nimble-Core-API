const _ = require('lodash')

module.exports = {
  base64Encode: function(str) {
    return Buffer.from(str).toString('base64')
  },

  base64Decode: function(encoded) {
