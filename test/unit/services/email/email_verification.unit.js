const sinon = require('sinon')
const fakePostmark = require('../../../support/mock/postmark')
const emailPlugin = require('../../../../app/plugins/email')
const { v4: uuid } = require('uuid')
const config = require('../../../../config')

describe('app.services.email.emailVerification', () => {
  // re-instanciate the class with a fake postmark service
  // const plugin = new target.constructor(fakePostmark)
  const plugin = new emailPlugin.constructor(fakePostmark)
  let clock = null

  before(() => {
    clock = sinon.useFakeTimers({ toFake: ['Date'] })
    sinon.spy(plugin.aws, 'sendEmailTemplate')
    sinon.spy(plugin.aws.ses, 'sendTemplatedEmail')
    sinon.replace(app.services.token, 'get', () => 'xxxx')
  })

  beforeEach(() => {
    plugin.service.sendEmailWithTemplate.resetHistory()
    sinon.reset()
  })

    clock.restore()
    sinon.restore()
