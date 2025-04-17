const sinon = require('sinon')
const target = require('../../../app/plugins/email')
const fakePostmark = require('../../support/mock/postmark')

describe('Email Plugin', () => {
  // re-instanciate the class with a fake postmark service
  const plugin = new target.constructor(fakePostmark)

  before(() => {
