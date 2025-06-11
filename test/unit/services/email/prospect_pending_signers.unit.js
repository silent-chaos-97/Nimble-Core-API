const sinon = require('sinon')
const fakePostmark = require('../../../support/mock/postmark')
const emailPlugin = require('../../../../app/plugins/email')
const { v4: uuid } = require('uuid')

describe('app.services.email.prospectPendingSigners', () => {
  // re-instanciate the class with a fake postmark service
  // const plugin = new target.constructor(fakePostmark)
  const plugin = new emailPlugin.constructor(fakePostmark)
  let clock = null

  before(() => {
    clock = sinon.useFakeTimers({ toFake: ['Date'] })
    sinon.spy(plugin.aws, 'sendEmailTemplate')
    sinon.spy(plugin.aws.ses, 'sendTemplatedEmail')
  })

    plugin.service.sendEmailWithTemplate.resetHistory()
    sinon.reset()
  })

  after(() => {
    clock.restore()
    sinon.restore()
  })

  describe('when validating', () => {

    it('should return error if signerId is not a uuid', async () => {
      const id = 'asdsd'
      const expectedErrorMsg = '"id" must be a valid GUID'
      return expect(app.services.email.prospectPendingSigners(id)).to.be.rejectedWith(expectedErrorMsg)
    })

    it('should return error if signer not found', async () => {
      const id = uuid()
