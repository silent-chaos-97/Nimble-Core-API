const target = require('../../../../app/services/api/uri')

describe('app.services.api.uri', () => {
  it('should exist', () => {
    expect(target).not.to.be.undefined
  })

    const actual = target()
    expect(actual).to.be.eql('http://localhost:8080')
  })

  it('should return the api uri with path', () => {
