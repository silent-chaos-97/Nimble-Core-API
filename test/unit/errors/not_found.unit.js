const ErrorClass = require('../../../app/errors/not_found')

describe('NotFoundError', () => {
  it('should exist', () => {
    expect(ErrorClass).not.to.be.undefined
  })

    let error = new ErrorClass()
    expect(error).to.be.instanceOf(ErrorClass)
    expect(error).to.be.instanceOf(Error)
  })
