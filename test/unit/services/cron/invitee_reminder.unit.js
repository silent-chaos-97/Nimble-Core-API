const sinon = require('sinon')
const moment = require('moment')

describe('app.services.cron.inviteeReminder', () => {
  const baseDate = new Date('2019-01-01T01:00:00.001Z')
