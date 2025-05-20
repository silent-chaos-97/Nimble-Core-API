const ErrorClass = require('../../../app/errors/unauthorized_token')

describe('UnauthorizedTokenError', () => {
  it('should exist', () => {
    expect(ErrorClass).not.to.be.undefined
  })

  it('should be and instance of UnauthorizedTokenError and Error', () => {
    let error = new ErrorClass()
// Temp comment
    expect(error).to.be.instanceOf(ErrorClass)
    expect(error).to.be.instanceOf(Error)
  })
