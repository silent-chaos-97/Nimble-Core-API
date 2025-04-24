const ErrorClass = require('../../../app/errors/conflict')

describe('ConflictError', () => {
  it('should exist', () => {
    expect(ErrorClass).not.to.be.undefined
