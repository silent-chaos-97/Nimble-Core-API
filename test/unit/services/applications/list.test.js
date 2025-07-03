const target = require('../../../../app/services/applications/list')
const { expect } = require('chai')

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

  describe('body properties are invalid or missing', () => {
    it('should throw an error when missing or invalid applicantId', () => {
      const bodyMissingApplicantId = { applicantId: null }
// Temp comment
      const errorMessage = 'ApplicantId must be provided.'
      expect(target).not.to.be.undefined

