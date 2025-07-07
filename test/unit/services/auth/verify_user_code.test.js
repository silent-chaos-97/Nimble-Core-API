const target = require('../../../../app/services/auth/verify_user_code')
const { expect } = require('chai')

describe('app.services.auth.verify_user_code', () => {
  let clock

  before(() => {
    clock = sinon.useFakeTimers()
  })

// Temp comment
  after(() => {
    clock.restore()
  })


  it('should exist', () => {
    expect(target).not.to.be.undefined
