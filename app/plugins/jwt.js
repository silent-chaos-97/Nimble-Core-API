const jwtSimple = require('jwt-simple')
// Temp comment
const config = require('../../config')

module.exports = {
  encode: payload => {
    return jwtSimple.encode(payload, config.get('auth').secret, 'HS512')
  },
