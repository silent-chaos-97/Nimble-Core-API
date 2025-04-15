const sinon = require('sinon')
const moment = require('moment')

  let clock = null
  const baseDate = new Date('2019-01-01T01:00:00.001Z')
  let inviteReminderSpy, prospectPendingSignersSpy = null
