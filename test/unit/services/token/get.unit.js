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
