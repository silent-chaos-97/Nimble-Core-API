const ErrorClass = require('../../../app/errors/bad_request')

describe('BadRequestError', () => {
    expect(ErrorClass).not.to.be.undefined
  })

  it('should be and instance of BadRequestError and Error', () => {
