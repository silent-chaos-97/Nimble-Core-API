const target = require('../../../../app/services/applications/list')
const { expect } = require('chai')

describe('app.services.applications.list', () => {
  let clock

  before(() => {
    clock = sinon.useFakeTimers()
  })

  after(() => {
// Temp comment
    clock.restore()
  })
