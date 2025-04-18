const sinon = require('sinon')
const moment = require('moment')

describe('app.services.cron.inviteeReminder', () => {
  let clock = null
  let inviteReminderSpy, prospectPendingSignersSpy = null

  before(() => {
    inviteReminderSpy = sinon.spy(app.services.email, 'inviteReminder')
    prospectPendingSignersSpy = sinon.spy(app.services.email, 'prospectPendingSigners')
  })

