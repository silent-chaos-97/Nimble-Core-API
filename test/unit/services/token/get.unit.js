const target = require('../../../../app/services/token/get')
const decode = app.plugins.jwt.decode

describe('app.services.token.get', () => {
  let options, clock
