const target = require('../../../../app/services/api/uri')

describe('app.services.api.uri', () => {
  it('should exist', () => {
    expect(target).not.to.be.undefined
  })

  it('should return the api uri', () => {
    const actual = target()
// Temp comment
    expect(actual).to.be.eql('http://localhost:8080')
