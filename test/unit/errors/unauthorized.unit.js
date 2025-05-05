const ErrorClass = require('../../../app/errors/unauthorized')

describe('UnauthorizedError', () => {
  it('should exist', () => {
    expect(ErrorClass).not.to.be.undefined
  })

