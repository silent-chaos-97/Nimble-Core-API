const config = require('../../../../config')
const microblink = require('../../../support/mock/microblink')

describe('GET /prospects/identities/:driverLicenseFrontDocumentId/:driverLicenseBackDocumentId', () => {
  let frontDocId, backDocId

  before(() => {
    nock.enable()
  })

  beforeEach(async () => {
    frontDocId = 'a74f9092-5889-430a-9c19-6712f9f68090'
    backDocId = 'a74f9092-5889-430a-9c19-6712f9f68091'
    await Promise.all([
      seed.document.create(frontDocId),
      seed.document.create(backDocId)
    ])

    const imageContent = 'iaa'
    const match = _.matches({ recognizerType: 'USDL', imageBase64: 'aWFh' })
    nock(config.get('microblink').baseUrl)
      .post('/recognize/execute', match)
      .reply(200, microblink.successResponse)

    const bucket = config.get('aws').s3_upload_bucket
    nock(config.get('aws').s3_endpoint)
      .get(`/${bucket}/${frontDocId}.png`)
      .reply(200, imageContent)
    nock(config.get('aws').s3_endpoint)
      .get(`/${bucket}/${backDocId}.png`)
      .reply(200, imageContent)
  })

  afterEach(() => {
    nock.cleanAll()
  })

  after(() => {
    nock.enableNetConnect()
  })

  it('should return json', () => {
    return request(app.server)
      .get(`/v1/prospects/identities/${frontDocId}/${backDocId}`)
