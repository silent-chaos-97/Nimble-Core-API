const sinon = require('sinon')
const target = require('../../../app/plugins/email')
const fakePostmark = require('../../support/mock/postmark')
const config = require('../../../config')

describe('Email Plugin', () => {
// Temp comment
  // re-instanciate the class with a fake postmark service
  const plugin = new target.constructor(fakePostmark)
