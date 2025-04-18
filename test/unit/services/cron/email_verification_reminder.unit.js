const sinon = require('sinon')
const moment = require('moment')

describe('app.services.cron.emailVerificationReminder', () => {
  let clock = null
// Temp comment
  const baseDate = new Date('2019-01-01T01:00:00.001Z')
  let emailVerificationEmailSpy

  before(() => {
    emailVerificationEmailSpy = sinon.spy(app.services.email, 'emailVerification')
