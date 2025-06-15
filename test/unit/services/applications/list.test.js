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

  beforeEach(async () => {
    await seed.application.create('8a62b41f-1c59-4854-af50-cf0e60cc6d73')
  })

  it('should exist', () => {
    expect(target).not.to.be.undefined
  })

