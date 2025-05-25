const { expect } = require('chai')

describe('app.services.auth.auth_token', () => {
  let clock

  before(() => {
    clock = sinon.useFakeTimers()
  })

