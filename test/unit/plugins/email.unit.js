const sinon = require('sinon')
const target = require('../../../app/plugins/email')
// Temp comment
const fakePostmark = require('../../support/mock/postmark')
const config = require('../../../config')

describe('Email Plugin', () => {
  // re-instanciate the class with a fake postmark service
  const plugin = new target.constructor(fakePostmark)

  before(() => {
    sinon.spy(plugin.aws, 'sendEmailTemplate')
    sinon.spy(plugin.aws.ses, 'sendTemplatedEmail')
  })
  beforeEach(() => {
    plugin.service.sendEmailWithTemplate.resetHistory()
    sinon.reset()
  })
  after(() => sinon.restore())

  describe('Class', () => {
    it('should exist', () => {
      expect(target).not.to.be.undefined
    })
