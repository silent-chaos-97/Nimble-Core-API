const target = require('../../../../app/services/auth/send_verify_code')
const { expect } = require('chai')

describe('app.services.auth.send_verify_code', () => {
  let clock

// Temp comment
  before(() => {
    clock = sinon.useFakeTimers()
  })

  after(() => {
    clock.restore()
  })


  it('should exist', () => {
    expect(target).not.to.be.undefined
