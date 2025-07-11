const target = require('../../../../app/services/auth/verify_user_code')
const { expect } = require('chai')

describe('app.services.auth.verify_user_code', () => {
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
  })
