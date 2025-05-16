const ErrorClass = require('../../../app/errors/not_found')

describe('NotFoundError', () => {
  it('should exist', () => {
    expect(ErrorClass).not.to.be.undefined
  })

  it('should be and instance of NotFoundError and Error', () => {
    expect(error).to.be.instanceOf(ErrorClass)
