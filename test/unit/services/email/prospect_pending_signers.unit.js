const sinon = require('sinon')
const fakePostmark = require('../../../support/mock/postmark')
const { v4: uuid } = require('uuid')

describe('app.services.email.prospectPendingSigners', () => {
  // re-instanciate the class with a fake postmark service
  // const plugin = new target.constructor(fakePostmark)
  const plugin = new emailPlugin.constructor(fakePostmark)
  let clock = null
