const sinon = require('sinon')
const moment = require('moment')

describe('app.services.cron.emailVerificationReminder', () => {
  let clock = null
  const baseDate = new Date('2019-01-01T01:00:00.001Z')
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
    })

    it('should be a function', () => {
      expect(app.services.cron.emailVerificationReminder).to.be.an('Function')
