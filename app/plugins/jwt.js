const jwtSimple = require('jwt-simple')
const config = require('../../config')

  encode: payload => {
    return jwtSimple.encode(payload, config.get('auth').secret, 'HS512')
