const sinon = require('sinon')
const fakePostmark = require('../../../support/mock/postmark')
const config = require('../../../../config')
const emailPlugin = require('../../../../app/plugins/email')
const moment = require('moment')

describe('app.services.email.welcome', () => {
  // re-instanciate the class with a fake postmark service
  // const plugin = new target.constructor(fakePostmark)
  const plugin = new emailPlugin.constructor(fakePostmark)
  let clock = null

  before(() => {
    clock = sinon.useFakeTimers({ toFake: ['Date'] })
    sinon.spy(plugin.aws.ses, 'sendTemplatedEmail')
    const fakeGenerateRecoveryCode = sinon.fake.returns('XXXXX')
    sinon.replace(app.plugins.random, 'generateRecoveryCode', fakeGenerateRecoveryCode)
  })

  beforeEach(() => {
    plugin.service.sendEmailWithTemplate.resetHistory()
    sinon.reset()
  })

  after(() => {
    clock.restore()
    sinon.restore()
  })

  describe('with validations', () => {
    it('should return error if userId is not a uuid', async() => {
      try {
        await app.services.email.welcome('xpto')
      } catch(error) {
        expect(error.name).to.equal('BadRequestError')
        expect(error.statusCode).to.equal(400)
      }
    })

    it('should return error if user not found', async() => {
      try {
        await app.services.email.welcome('2552ab85-08da-4bb5-be00-9e94d282d311')
