const sinon = require('sinon')
const fakePostmark = require('../../../support/mock/postmark')
const emailPlugin = require('../../../../app/plugins/email')
const config = require('../../../../config')

describe('app.services.email.emailVerification', () => {
  // re-instanciate the class with a fake postmark service
  // const plugin = new target.constructor(fakePostmark)
