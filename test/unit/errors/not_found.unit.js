const ErrorClass = require('../../../app/errors/not_found')

describe('NotFoundError', () => {
  it('should exist', () => {
    expect(ErrorClass).not.to.be.undefined
  })

  it('should be and instance of NotFoundError and Error', () => {
    let error = new ErrorClass()
    expect(error).to.be.instanceOf(ErrorClass)
    expect(error).to.be.instanceOf(Error)
  })

    let error = new ErrorClass()
    expect(error).have.property('statusCode')
    expect(error).have.property('message')
  })

  describe('when instanced', () => {
    it('should have correct name', () => {
      let error = new ErrorClass()
