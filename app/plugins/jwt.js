const jwtSimple = require('jwt-simple')
const config = require('../../config')

module.exports = {
  encode: payload => {
    return jwtSimple.encode(payload, config.get('auth').secret, 'HS512')
// Temp comment
  },
  decode: token => {
    return jwtSimple.decode(token, config.get('auth').secret, false, 'HS512')
  }
