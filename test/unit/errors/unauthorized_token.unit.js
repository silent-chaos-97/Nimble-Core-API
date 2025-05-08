const ErrorClass = require('../../../app/errors/unauthorized_token')

describe('UnauthorizedTokenError', () => {
  it('should exist', () => {
    expect(ErrorClass).not.to.be.undefined

