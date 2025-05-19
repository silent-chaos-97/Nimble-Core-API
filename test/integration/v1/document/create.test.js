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
      .send(document)
      .expect('Content-Type', /json/)
  })

  it('should return 201', () => {
    return request(app.server)
      .post('/v1/documents')
      .send(document)
      .expect(201)
  })

  it('should return a document', () => {
    const expected = blueprints.document.get('1')
    return request(app.server)
      .post('/v1/documents')
      .send(document)
      .expect(res => {
        expected.id = _.get(res, 'body.id')
        expect(res.body).to.deep.eq(expected)
      })
  })

  it('should return a document model', () => {
    return request(app.server)
      .post('/v1/documents')
      .send(document)
      .expect(res => {
        ['id', 'format', 'createdAt'].forEach(prop => {
          expect(res.body).to.have.own.property(prop)
        })

