const target = require('../../../../app/services/auth/auth_token')

describe('app.services.auth.auth_token', () => {
  let clock

  before(() => {
    clock = sinon.useFakeTimers()
  })

  after(() => {
    clock.restore()
  })


