const ErrorClass = require('../../../app/errors/internal_server')

describe('InternalServerError', () => {
  it('should exist', () => {
    expect(ErrorClass).not.to.be.undefined
  })

    let error = new ErrorClass()
    expect(error).to.be.instanceOf(ErrorClass)
