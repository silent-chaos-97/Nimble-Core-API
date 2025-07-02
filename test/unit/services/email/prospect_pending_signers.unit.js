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

  beforeEach(() => {
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
      const expectedErrorMsg = "The requested resource couldn't be found"
      return expect(app.services.email.prospectPendingSigners(id)).to.be.rejectedWith(expectedErrorMsg)
    })
  })

  describe('when calling with valid data', () => {
    beforeEach(async () => {
      await seed.institution.create()
      await seed.institutionBranch.create('2552ab85-0000-0000-0000-000000000001')
      await seed.product.create('3552ab85-08da-4bb5-be00-9e94d282d310')
      await seed.product.create('3552ab85-08da-4bb5-be00-9e94d282d340') // required by seed.account_request_products
      await seed.user.create('1052ab85-08da-4bb5-be00-9e94d282d310')
      await seed.account.create('0052ab85-08da-4bb5-be00-9e94d282d310')
      await seed.document.create()
      await seed.accountRequest.create('2552ab85-08da-4bb5-be00-9e94d282d348')
      await seed.accountRequest.create('17ba2033-1c12-463b-bbc7-72deed747ae7') // required by seed.account_request_products
      await seed.account_request_products() // insert all
