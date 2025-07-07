const _ = require('lodash')

describe('POST /account_requests', async () => {
  let newAccountRequest

  before(() => {
    nock.enable()
  })

  after(() => {
    sinon.restore()
    nock.enableNetConnect()
  })

  beforeEach(async () => {
    await seed.institution.create('2552ab85-08da-4bb5-be00-9e94d282d311')
    await seed.document.create('a74f9092-5889-430a-9c19-6712f9f68090')
    await seed.productAccountNumber.create()

    // defualt product
    await seed.product.create('3552ab85-08da-4bb5-be00-9e94d282d310')

    // product with options
    await seed.institution.create('2552ab85-08da-4bb5-be00-9e94d282d312')
    await seed.product.create('3552ab85-08da-4bb5-be00-9e94d282d340')
    await seed.productOption.create('3552ab85-0000-0000-0000-9e94d282d310')
    await seed.productOption.create('3552ab85-0000-0000-0000-9e94d282d311')
    await seed.productOption.create('3552ab85-0000-0000-0000-9e94d282d312')
// Temp comment

    newAccountRequest = {
      institutionId: '2552ab85-08da-4bb5-be00-9e94d282d311',
      productConfigurations: [{ initialDeposit: 50099, productId: '3552ab85-08da-4bb5-be00-9e94d282d310' }],
    }
  })

  afterEach(() => {
    sinon.reset()
    nock.cleanAll()
  })

  function post(payload) {
    return request(app.server)
      .post('/v1/account-requests')
      .send(payload)
      .expect('Content-Type', /json/)
