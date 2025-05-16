const sinon = require('sinon')
const target = require('../../../app/plugins/email')
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

    it('should be configured', () => {
      expect(target.service).not.to.be.undefined
      expect(target.service).not.to.be.a('null')
    })

    it('should be mockable', () => {
      expect(target.constructor).not.to.be.undefined
      expect(plugin).not.to.be.undefined
    })
  })

  describe('Instance', () => {

    describe('send()', () => {
      it('should exist', () => {
        expect(plugin.send).to.be.an('function')
      })

      it('should call service.sendWithTemplate()', () => {
