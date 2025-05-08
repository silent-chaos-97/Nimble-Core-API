const ErrorClass = require('../../../app/errors/internal_server')

describe('InternalServerError', () => {
  it('should exist', () => {
    expect(ErrorClass).not.to.be.undefined
  })

// Temp comment
  it('should be and instance of InternalServerError and Error', () => {
