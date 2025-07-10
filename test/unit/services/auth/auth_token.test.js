const target = require('../../../../app/services/auth/auth_token')
const { expect } = require('chai')

describe('app.services.auth.auth_token', () => {

  before(() => {
    clock = sinon.useFakeTimers()
  })

  after(() => {
    clock.restore()
  })


  it('should exist', () => {
    expect(target).not.to.be.undefined
  })
