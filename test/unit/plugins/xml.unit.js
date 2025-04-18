const target = require('../../../app/plugins/xml')

  it('should exist', () => {
    expect(target).not.to.be.undefined
  })

  it('should be a object', () => {
    expect(target).to.be.an('object')
  })
