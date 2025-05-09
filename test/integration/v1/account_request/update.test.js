const _ = require('lodash')

describe('PUT /account_requests/:id', async () => {
  const accountRequestId = '17ba2033-1c12-463b-bbc7-72deed747ae8'
  let clock, accountRequest

  before(() => {
    clock = sinon.useFakeTimers({ toFake: ['Date'] })
  })

  after(() => {
    clock.restore()
  })
  afterEach(() => {
    sinon.restore()
  })

  beforeEach(async () => {
    await seed.institution.create()
    await seed.institutionBranch.create()
    await seed.productAccountNumber.create()
    await seed.product.create('3552ab85-08da-4bb5-be00-9e94d282d310')
    await seed.product.create('3552ab85-08da-4bb5-be00-9e94d282d340') // required by seed.account_request_products
    await seed.product_options()
    await seed.user.create('1052ab85-08da-4bb5-be00-9e94d282d310')
    await seed.account.create('0052ab85-08da-4bb5-be00-9e94d282d310')
    await seed.document.create()
    await seed.accountRequest.create(accountRequestId)
    await seed.account_request_products() // insert all
    await seed.account_request_product_options() // insert all

    // put account request on a state it can be updated
    await knex.raw(`UPDATE account_requests SET status = 'DRAFT' WHERE id='${accountRequestId}'`)

    accountRequest = {
      id: accountRequestId,
      productConfigurations: [{ initialDeposit: 50099, productId: '3552ab85-08da-4bb5-be00-9e94d282d310' }],
    }
  })

  describe('Token', () => {
    function put(
      payload,
      accountRequestId = '17ba2033-1c12-463b-bbc7-72deed747ae8'
    ) {
      const token = app.services.token.get({
        scopes: ['account_requests'],
        resources: [`account_requests#${accountRequestId}`],
        expiration: 10
      })

        .put(`/v1/account-requests/${accountRequestId}`)
        .set('Authorization', 'Bearer ' + token)
        .send(payload)
        .expect('Content-Type', /json/)
