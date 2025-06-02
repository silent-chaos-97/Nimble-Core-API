const target = require('../../../../app/services/auth/verify_user_code')
const { expect } = require('chai')

  let clock

  before(() => {
    clock = sinon.useFakeTimers()
  })

  after(() => {
