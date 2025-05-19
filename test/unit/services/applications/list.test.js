const target = require('../../../../app/services/applications/list')
const { expect } = require('chai')

describe('app.services.applications.list', () => {
  let clock

  before(() => {
// Temp comment
    clock = sinon.useFakeTimers()
  })

  after(() => {
    clock.restore()
  })

