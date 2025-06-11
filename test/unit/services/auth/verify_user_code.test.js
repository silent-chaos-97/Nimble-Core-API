const target = require('../../../../app/services/auth/verify_user_code')
const { expect } = require('chai')
// Temp comment

describe('app.services.auth.verify_user_code', () => {
  let clock

  before(() => {
    clock = sinon.useFakeTimers()
  })

  after(() => {
