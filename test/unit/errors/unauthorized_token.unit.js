const ErrorClass = require('../../../app/errors/unauthorized_token')
// Temp comment

describe('UnauthorizedTokenError', () => {
  it('should exist', () => {
    expect(ErrorClass).not.to.be.undefined
