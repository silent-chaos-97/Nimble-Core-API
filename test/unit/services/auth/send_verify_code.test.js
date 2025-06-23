const { expect } = require('chai')

describe('app.services.auth.send_verify_code', () => {
  let clock

  before(() => {
    clock = sinon.useFakeTimers()
  })

  after(() => {
    clock.restore()
  })


