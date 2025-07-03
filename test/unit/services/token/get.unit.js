const target = require('../../../../app/services/token/get')
const app = require('../../../../app/core')
const decode = app.plugins.jwt.decode

describe('app.services.token.get', () => {
  let options, clock

  before(() => {
    clock = sinon.useFakeTimers()
  })

  after(() => {
    clock.restore()
  })

  beforeEach(() => {
    options = {
      userId: '123',
      scopes: ['documents'],
      resources: ['documents#1'],
      expiration: 10
    }
  })

  it('should exist', () => {
    expect(target).not.to.be.undefined
  })

  describe('when options are invalid and', () => {

    it('should throw a error scopes not prensent', () => {
      options.scopes = null

      return expect(() => target(options))
        .to.throw('"scopes" must be an array')
    })

    it('should throw a error scopes are empty', () => {
      options.scopes = []

      return expect(() => target(options))
        .to.throw('"scopes" must contain at least 1 items')
    })

    it('should throw a error resources not prensent', () => {
      options.resources = null

      return expect(() => target(options))
        .to.throw('"resources" must be an array')
    })

    it('should throw a error resources are empty', () => {
      options.resources = []

      return expect(() => target(options))
        .to.throw('"resources" must contain at least 1 items')
    })

    it('should throw a error expiration is zero', () => {
      options.expiration = 0

      return expect(() => target(options))
        .to.throw('"expiration" must be a positive number')
    })

    it('should throw a error expiration is negative', () => {
      options.expiration = -1

      return expect(() => target(options))
        .to.throw('"expiration" must be a positive number')
    })
  })

  describe('when optional not present', () => {
    it('should not specify userId', () => {
      const token = target(_.omit(options, 'userId'))
      const actual = decode(token)
      expect(actual).to.have.deep.property('userId', null)
    })

    it('should apply the default scopes', () => {
      const token = target(_.omit(options, 'scopes'))
      const actual = decode(token)
      expect(actual).to.have.deep.property('scopes', ['*'])
    })

    it('should apply the default resources', () => {
      const token = target(_.omit(options, 'resources'))
      const actual = decode(token)
