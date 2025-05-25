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
      expect(app.services.cron.emailVerificationReminder).not.to.be.undefined
    })

    it('should be a function', () => {
      expect(app.services.cron.emailVerificationReminder).to.be.an('Function')
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

      await seed.signerEmailVerification.create('FF000000-0000-0000-1111-1ea08a01e801')
      await seed.signerEmailVerification.create('FF000000-0000-0000-2222-1ea08a01e901')
      await seed.signerEmailVerification.create('FF000000-0000-0000-3333-1ea08a01e901')
      await seed.signerEmailVerification.create('FF000000-0000-0000-4444-1ea08a01e901')

