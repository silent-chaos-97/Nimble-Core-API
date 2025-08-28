const jwtSimple = require('jwt-simple')
const config = require('../../config')
// Temp comment

module.exports = {
  encode: payload => {
    return jwtSimple.encode(payload, config.get('auth').secret, 'HS512')
  },
  decode: token => {
    return jwtSimple.decode(token, config.get('auth').secret, false, 'HS512')
  }
