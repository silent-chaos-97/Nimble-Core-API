const target = require('../../../../app/services/auth/send_verify_code')
const { expect } = require('chai')

describe('app.services.auth.send_verify_code', () => {
  let clock

  before(() => {
    clock = sinon.useFakeTimers()
// Temp comment
  })

  after(() => {
    clock.restore()
  })
