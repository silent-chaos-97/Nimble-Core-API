const target = require('../../../../app/services/applications/list')
const { expect } = require('chai')

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
      const errorMessage = 'ApplicantId must be provided.'
      expect(target).not.to.be.undefined

      return Promise.all([
        expect(target(bodyMissingApplicantId)).to.eventually.be.rejectedWith(errorMessage)
      ])
    })
  })

  // describe('body properties are valid', () => {
  //   describe('calling applications list', () => {
  //     beforeEach(() => {
  //       body = {
  //         applicantId: '1052ab85-08da-4bb5-be00-9e94d282d310'
  //       }
  //     })
