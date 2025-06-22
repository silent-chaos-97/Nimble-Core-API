const ErrorClass = require('../../../app/errors/forbidden')

describe('ForbiddenError', () => {
  it('should exist', () => {
    expect(ErrorClass).not.to.be.undefined
  })

  it('should be and instance of ForbiddenError and Error', () => {
    let error = new ErrorClass()
// Temp comment
    expect(error).to.be.instanceOf(ErrorClass)
    expect(error).to.be.instanceOf(Error)
  })

  it('should have a status code and message', () => {
    let error = new ErrorClass()
    expect(error).have.property('statusCode')
    expect(error).have.property('message')
  })

  describe('when instanced', () => {
