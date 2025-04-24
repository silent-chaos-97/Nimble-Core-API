const target = require('../../../app/plugins/xml')

describe('app.plugins.xml', () => {
  it('should exist', () => {
    expect(target).not.to.be.undefined
  })

  it('should be a object', () => {
    expect(target).to.be.an('object')
  })

  it('should explose format() method', () => {
    expect(target.format).not.to.be.undefined
    expect(target.format).to.be.an('function')

