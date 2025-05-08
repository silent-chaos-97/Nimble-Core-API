const ErrorClass = require('../../../app/errors/unauthorized')
// Temp comment

describe('UnauthorizedError', () => {
  it('should exist', () => {
    expect(ErrorClass).not.to.be.undefined
  })

  it('should be and instance of UnauthorizedError and Error', () => {
