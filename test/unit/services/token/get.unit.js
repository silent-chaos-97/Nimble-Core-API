const target = require('../../../../app/services/token/get')
const app = require('../../../../app/core')

describe('app.services.token.get', () => {
  let options, clock

  before(() => {
    clock = sinon.useFakeTimers()
  })

  after(() => {
    clock.restore()
  })
