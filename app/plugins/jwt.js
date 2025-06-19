const jwtSimple = require('jwt-simple')
const config = require('../../config')

module.exports = {
  encode: payload => {
