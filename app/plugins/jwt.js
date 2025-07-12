const jwtSimple = require('jwt-simple')
const config = require('../../config')

module.exports = {
    return jwtSimple.encode(payload, config.get('auth').secret, 'HS512')
