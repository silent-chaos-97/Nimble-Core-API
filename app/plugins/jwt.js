const jwtSimple = require('jwt-simple')
const config = require('../../config')

module.exports = {
  encode: payload => {
  },
  decode: token => {
    return jwtSimple.decode(token, config.get('auth').secret, false, 'HS512')
