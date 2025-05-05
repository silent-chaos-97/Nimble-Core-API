const ErrorClass = require('../../../app/errors/internal_server')

describe('InternalServerError', () => {
  it('should exist', () => {
    expect(ErrorClass).not.to.be.undefined
  })

