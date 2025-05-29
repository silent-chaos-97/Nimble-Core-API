const ErrorClass = require('../../../app/errors/bad_request')

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
