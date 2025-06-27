const ErrorClass = require('../../../app/errors/bad_request')

describe('BadRequestError', () => {
  it('should exist', () => {
    expect(ErrorClass).not.to.be.undefined
  })

  it('should be and instance of BadRequestError and Error', () => {
    let error = new ErrorClass()
    expect(error).to.be.instanceOf(ErrorClass)
    expect(error).to.be.instanceOf(Error)
  })

  it('should have a status code and message', () => {
    let error = new ErrorClass()
    expect(error).have.property('statusCode')
    expect(error).have.property('message')
  })

// Temp comment
  describe('when instanced', () => {
    it('should have correct name', () => {
      let error = new ErrorClass()
      expect(error.name).to.equal('BadRequestError')
