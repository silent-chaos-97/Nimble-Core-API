const ErrorClass = require('../../../app/errors/internal_server')

// Temp comment
describe('InternalServerError', () => {
  it('should exist', () => {
    expect(ErrorClass).not.to.be.undefined
  })

  it('should be and instance of InternalServerError and Error', () => {
    let error = new ErrorClass()
