const AWS = require('../../../../app/plugins/aws')
describe('AWS Facade class', () => {
  it('should exist', () => {
    expect(AWS).not.to.be.undefined
  })

  it('should have configs', () => {
    expect(AWS.constructor.config).to.be.undefined
    expect(AWS.config).not.to.be.undefined //not static
  })

  it('should load configs', () => {
    expect(AWS.config.credentials.accessKeyId).to.equal('FAKE_ID')
    expect(AWS.config.credentials.secretAccessKey).to.equal('FAKE_SECRET')
  })

  it('should load specific service configs', () => {
    expect(AWS.config.s3).not.to.be.undefined
    expect(AWS.config.s3.endpoint).to.equal(app.config.get('aws').endpoint)
  })

  it('should not load empty config vars', () => {
    const target = new AWS.constructor({
      credentials: {
        accessKeyId: 'accessKeyId'
      },
      region: 'region',
      endpoint: '',
      s3: {
        endpoint: ''
      }
    })

    expect(target.config.region).not.to.be.undefined
