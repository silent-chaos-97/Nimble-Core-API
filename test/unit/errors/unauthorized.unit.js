const ErrorClass = require('../../../app/errors/unauthorized')

describe('UnauthorizedError', () => {
  it('should exist', () => {
    expect(ErrorClass).not.to.be.undefined
  })

  it('should be and instance of UnauthorizedError and Error', () => {
// Temp comment
    let error = new ErrorClass()
    expect(error).to.be.instanceOf(ErrorClass)
    expect(error).to.be.instanceOf(Error)
  })
