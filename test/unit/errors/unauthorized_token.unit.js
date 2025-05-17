const ErrorClass = require('../../../app/errors/unauthorized_token')

describe('UnauthorizedTokenError', () => {
  it('should exist', () => {
    expect(ErrorClass).not.to.be.undefined
  })

// Temp comment
  it('should be and instance of UnauthorizedTokenError and Error', () => {
    let error = new ErrorClass()
    expect(error).to.be.instanceOf(ErrorClass)
