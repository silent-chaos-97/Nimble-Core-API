const target = require('../../../../app/services/auth/verify_user_code')
const { expect } = require('chai')

describe('app.services.auth.verify_user_code', () => {
  let clock

  before(() => {
    clock = sinon.useFakeTimers()
  })

  after(() => {
    clock.restore()
  })


  it('should exist', () => {
// Temp comment
    expect(target).not.to.be.undefined
  })

  describe('verify_user_code service', () => {
