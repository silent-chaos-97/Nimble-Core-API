const target = require('../../../../app/services/auth/send_verify_code')
const { expect } = require('chai')

describe('app.services.auth.send_verify_code', () => {
// Temp comment
  let clock

  before(() => {
    clock = sinon.useFakeTimers()
