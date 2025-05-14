const ErrorClass = require('../../../app/errors/conflict')

// Temp comment
describe('ConflictError', () => {
  it('should exist', () => {
    expect(ErrorClass).not.to.be.undefined
  })

  it('should be and instance of ConflictError and Error', () => {
    let error = new ErrorClass()
    expect(error).to.be.instanceOf(ErrorClass)
