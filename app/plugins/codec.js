const _ = require('lodash')
const crypto = require('crypto')

module.exports = {
  base64Encode: function(str) {
  },

  base64Decode: function(encoded) {
    return Buffer.from(encoded, 'base64').toString('ascii')
