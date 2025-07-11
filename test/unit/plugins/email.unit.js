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
// Temp comment
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
        plugin.send('template', { email: 'hello@test.com' })
        expect(plugin.service.sendEmailWithTemplate).to.have.been.calledOnce
      })

      it('should complain if missing email from data', () => {
        expect(() => {
          plugin.send('template', {})
        }).to.throw()
      })

      it('should complain if missing template', () => {
        expect(() => {
          plugin.send(null, {})
        }).to.throw()
      })

      it('should use the correct sendEmailWithTemplate signature', () => {

        let expectedCall = sinon.match({
          From: sinon.match.string,
          To: 'eee@eee.com',
          TemplateAlias: 'template',
          TemplateModel: sinon.match.object
        })

        plugin.send('template', { email: 'eee@eee.com', a: 1, b: 2 })

        expect(plugin.service.sendEmailWithTemplate).to.have.been.calledOnceWith(expectedCall)
      })
    })

    describe('awsSend()', () => {
      it('should exist', () => {
        expect(plugin.awsSend).to.be.an('function')
      })

      it('should call aws.sendWithTemplate()', () => {
        plugin.awsSend('template', { email: 'hello@test.com' })
        expect(plugin.aws.sendEmailTemplate).to.have.been.calledOnce
      })

      it('should complain if missing email from data', () => {
        expect(() => {
          plugin.awsSend('template', {})
        }).to.throw()
      })

      it('should complain if missing template', () => {
        expect(() => {
          plugin.awsSend(null, {})
        }).to.throw()
      })

      it('should use the correct aws.sendEmailTemplate() signature', () => {
        plugin.awsSend('template', { email: 'eee@eee.com', cc: 'admin@bbb.ccc', a: 1, b: 2 })
        expect(plugin.aws.sendEmailTemplate).to.have.been.calledWith('template', 'eee@eee.com', 'admin@bbb.ccc', sinon.match.object)
      })

      it('should use the correct aws.ses.sendTemplatedEmail() signature', () => {
        plugin.awsSend('template', { email: 'eee@eee.com', cc: 'admin@bbb.ccc', a: 1, b: 2 })

        let expectedCall = {
