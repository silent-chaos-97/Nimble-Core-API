const sinon = require('sinon')
const moment = require('moment')

describe('app.services.cron.inviteeReminder', () => {
  let clock = null
  const baseDate = new Date('2019-01-01T01:00:00.001Z')
  let inviteReminderSpy, prospectPendingSignersSpy = null

  before(() => {
    inviteReminderSpy = sinon.spy(app.services.email, 'inviteReminder')
    prospectPendingSignersSpy = sinon.spy(app.services.email, 'prospectPendingSigners')
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
      expect(app.services.cron.inviteeReminder).not.to.be.undefined
    })

    it('should be a function', () => {
      expect(app.services.cron.inviteeReminder).to.be.an('Function')
    })
  })

  describe('running the service', () => {
    beforeEach(async () => {
      await seed.institution.create('2552ab85-08da-4bb5-be00-9e94d282d312')
      await seed.document.create()

