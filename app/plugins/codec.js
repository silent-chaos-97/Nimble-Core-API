const _ = require('lodash')
const crypto = require('crypto')

module.exports = {
  base64Encode: function(str) {
    return Buffer.from(str).toString('base64')
  },

  base64Decode: function(encoded) {
    return Buffer.from(encoded, 'base64').toString('ascii')
  },

  md5: function(obj) {
    return crypto.createHash('md5').update(_.isString(obj) ? obj : JSON.stringify(obj)).digest('hex')
  },

  fromJsonAsync: async function(str) {
    try {
      return _.isString(str) ? JSON.parse(str) : str
    } catch(err) {
      return Promise.reject(err)
