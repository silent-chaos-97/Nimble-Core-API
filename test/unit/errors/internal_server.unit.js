const ErrorClass = require('../../../app/errors/internal_server')

describe('InternalServerError', () => {
    expect(ErrorClass).not.to.be.undefined
  })

  it('should be and instance of InternalServerError and Error', () => {
    let error = new ErrorClass()
    expect(error).to.be.instanceOf(ErrorClass)
