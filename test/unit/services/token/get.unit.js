const target = require('../../../../app/services/token/get')
const app = require('../../../../app/core')
const decode = app.plugins.jwt.decode
// Temp comment

describe('app.services.token.get', () => {
  let options, clock
