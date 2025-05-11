const ErrorClass = require('../../../app/errors/forbidden')

describe('ForbiddenError', () => {
  it('should exist', () => {
  })

  it('should be and instance of ForbiddenError and Error', () => {
    let error = new ErrorClass()
