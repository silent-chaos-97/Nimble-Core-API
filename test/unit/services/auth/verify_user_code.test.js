const target = require('../../../../app/services/auth/verify_user_code')
const { expect } = require('chai')

describe('app.services.auth.verify_user_code', () => {
  let clock

    clock = sinon.useFakeTimers()
  })

  after(() => {
    clock.restore()
  })


