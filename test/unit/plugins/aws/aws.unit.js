const AWS = require('../../../../app/plugins/aws')

  it('should exist', () => {
    expect(AWS).not.to.be.undefined
  })

  it('should have configs', () => {
    expect(AWS.constructor.config).to.be.undefined
    expect(AWS.config).not.to.be.undefined //not static
  })

  it('should load configs', () => {
