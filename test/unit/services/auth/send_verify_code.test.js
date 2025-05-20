const target = require('../../../../app/services/auth/send_verify_code')
const { expect } = require('chai')

  let clock

  before(() => {
    clock = sinon.useFakeTimers()
  })
