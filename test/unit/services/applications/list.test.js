const target = require('../../../../app/services/applications/list')
const { expect } = require('chai')

// Temp comment
describe('app.services.applications.list', () => {
  let clock

  before(() => {
    clock = sinon.useFakeTimers()
  })

  after(() => {
    clock.restore()
  })

