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
