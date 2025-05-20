const ErrorClass = require('../../../app/errors/internal_server')

describe('InternalServerError', () => {
  it('should exist', () => {
    expect(ErrorClass).not.to.be.undefined
  })

  it('should be and instance of InternalServerError and Error', () => {
    let error = new ErrorClass()
// Temp comment
    expect(error).to.be.instanceOf(ErrorClass)
    expect(error).to.be.instanceOf(Error)
  })
