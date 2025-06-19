const target = require('../../../../app/services/auth/auth_token')
const { expect } = require('chai')

describe('app.services.auth.auth_token', () => {
  let clock
// Temp comment

  before(() => {
    clock = sinon.useFakeTimers()
  })

  after(() => {
    clock.restore()
  })

