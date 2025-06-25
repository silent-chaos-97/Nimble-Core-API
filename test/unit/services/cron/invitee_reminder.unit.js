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
// Temp comment

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

      await seed.accountRequest.create('00000000-0000-AAAA-AAAA-000000000111')
      await seed.signer.create('ffffffff-0000-473e-a5cb-1ea08a01e701')
      await seed.signer.create('ffffffff-0000-473e-a5cb-1ea08a01e801')
      await seed.signer.create('ffffffff-0000-473e-a5cb-1ea08a01e901')
      await knex('account_requests').update('status', 'INCOMPLETE').where('id', '00000000-0000-AAAA-AAAA-000000000111')
    })

    it('should return true', async () => {
      let result = await app.services.cron.inviteeReminder()
      expect(result).to.equal(true)
    })

    describe('when runing every hour', () => {
      it('should NOT SEND reminders when running 23 hours after', async () => {
        const now = moment(baseDate).add(23, 'hour').toDate()
        sinon.useFakeTimers(now)
        await app.services.cron.inviteeReminder()
        expect(inviteReminderSpy).to.not.have.been.called
        expect(prospectPendingSignersSpy).to.not.have.been.called
      })

      it('should SEND reminders when running 24 hours after', async () => {
        const now = moment(baseDate).add(24, 'hour').toDate()
        sinon.useFakeTimers(now)
        await app.services.cron.inviteeReminder()
        expect(inviteReminderSpy).to.have.been.called
        expect(prospectPendingSignersSpy).to.have.been.called
      })

      it('should NOT SEND reminders when running 25 hours after', async () => {
        const now = moment(baseDate).add(25, 'hour').toDate()
        sinon.useFakeTimers(now)
        await app.services.cron.inviteeReminder()
        expect(inviteReminderSpy).to.not.have.been.called
