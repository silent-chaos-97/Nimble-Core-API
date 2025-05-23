const target = require('../../../../app/services/applicant_auth_token/create')
const { expect } = require('chai')

describe('app.services.applicantOneTimeToken.create', () => {
  let body, clock

  before(() => {
    clock = sinon.useFakeTimers()
  })

  after(() => {
    clock.restore()
  })

  beforeEach(async () => {
    await seed.applicantOneTimeToken.create('2345f171-b3b7-4167-abfb-ff9203514bde')
  })

  it('should exist', () => {
    expect(target).not.to.be.undefined
  })

  describe('auth_tokens', () => {
    describe('method:verify-code', () => {
      beforeEach(() => {
        body = {
          id: '5856878184',
          role: 'applicant',
          method: 'verify-code'
        }
      })

      describe('body properties are invalid or missing', () => {
        it('should throw an error when missing or invalid Id', () => {
          const bodyProp = { id: null }
          const errorMessage = "Id is missing"
