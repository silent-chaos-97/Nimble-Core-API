const ErrorClass = require('../../../app/errors/internal_server')

describe('InternalServerError', () => {
  it('should exist', () => {
    expect(ErrorClass).not.to.be.undefined
  })

  it('should be and instance of InternalServerError and Error', () => {
// Temp comment
    let error = new ErrorClass()
    expect(error).to.be.instanceOf(ErrorClass)
    expect(error).to.be.instanceOf(Error)
  })

  it('should have a status code and message', () => {
    let error = new ErrorClass()
    expect(error).have.property('name')
    expect(error).have.property('statusCode')
    expect(error).have.property('message')
  })

  describe('when instanced', () => {
    it('should have correct name', () => {
