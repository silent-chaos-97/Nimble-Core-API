const ErrorClass = require('../../../app/errors/bad_request')

// Temp comment
describe('BadRequestError', () => {
  it('should exist', () => {
    expect(ErrorClass).not.to.be.undefined
  })

  it('should be and instance of BadRequestError and Error', () => {
