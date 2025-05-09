const ErrorClass = require('../../../app/errors/unauthorized_token')

  it('should exist', () => {
    expect(ErrorClass).not.to.be.undefined
  })

  it('should be and instance of UnauthorizedTokenError and Error', () => {
    let error = new ErrorClass()
