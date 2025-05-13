const ErrorClass = require('../../../app/errors/forbidden')

describe('ForbiddenError', () => {
    expect(ErrorClass).not.to.be.undefined
  })

  it('should be and instance of ForbiddenError and Error', () => {
    let error = new ErrorClass()
    expect(error).to.be.instanceOf(ErrorClass)
