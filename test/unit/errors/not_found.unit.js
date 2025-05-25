const ErrorClass = require('../../../app/errors/not_found')

describe('NotFoundError', () => {
  it('should exist', () => {
  })

  it('should be and instance of NotFoundError and Error', () => {
    let error = new ErrorClass()
    expect(error).to.be.instanceOf(ErrorClass)
    expect(error).to.be.instanceOf(Error)
  })

  it('should have a status code and message', () => {
