const sinon = require('sinon')
const moment = require('moment')

describe('app.services.cron.emailVerificationReminder', () => {
  let clock = null
  let emailVerificationEmailSpy

  before(() => {
    emailVerificationEmailSpy = sinon.spy(app.services.email, 'emailVerification')
  })

  beforeEach(() => {
    clock = sinon.useFakeTimers(baseDate)
    sinon.reset()
  })

  afterEach(() => {
    sinon.reset()
  })

  after(() => {
    clock.restore()
    sinon.restore()
  })

  describe('service method', () => {
    it('should exist', () => {
      expect(app.services.cron.emailVerificationReminder).not.to.be.undefined
    })

    it('should be a function', () => {
      expect(app.services.cron.emailVerificationReminder).to.be.an('Function')
    })
  })

