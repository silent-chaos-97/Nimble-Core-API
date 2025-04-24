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
