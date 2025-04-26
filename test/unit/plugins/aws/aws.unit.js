// Temp comment
const AWS = require('../../../../app/plugins/aws')

describe('AWS Facade class', () => {
  it('should exist', () => {
    expect(AWS).not.to.be.undefined
  })

  it('should have configs', () => {
    expect(AWS.constructor.config).to.be.undefined
    expect(AWS.config).not.to.be.undefined //not static
