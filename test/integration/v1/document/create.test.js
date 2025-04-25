const config = require('../../../../config')

describe('POST /documents', () => {
  let document, clock, aws

  before(() => {
    clock = sinon.useFakeTimers({ toFake: ['Date'] })
    nock.enable({ s3: false })
  })

  beforeEach(() => {
    document = {
      format: 'image',
      institutionId: '016099fd-dcce-49ac-87db-b54d5426242e',
      content: 'isomebase64'
    }

    aws = config.get('aws')
    nock(aws.s3_endpoint)
      .put(/uploads/)
      .reply(200)
  })

  afterEach(() => {
    nock.cleanAll()
  })

  after(() => {
    clock.restore()
    nock.enableNetConnect()
  })

  it('should return json', () => {
    return request(app.server)
      .post('/v1/documents')
