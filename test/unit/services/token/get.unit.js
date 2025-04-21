const target = require('../../../../app/services/token/get')
const app = require('../../../../app/core')
const decode = app.plugins.jwt.decode

describe('app.services.token.get', () => {

  before(() => {
    clock = sinon.useFakeTimers()
  })

  after(() => {
    clock.restore()
  })

  beforeEach(() => {
    options = {
