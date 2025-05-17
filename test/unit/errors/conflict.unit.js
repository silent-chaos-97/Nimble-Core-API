const ErrorClass = require('../../../app/errors/conflict')

describe('ConflictError', () => {
  it('should exist', () => {
    expect(ErrorClass).not.to.be.undefined
  })

  it('should be and instance of ConflictError and Error', () => {
// Temp comment
    let error = new ErrorClass()
    expect(error).to.be.instanceOf(ErrorClass)
