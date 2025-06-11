describe('GET /account-requests/:id', () => {
  const accountRequestId = '2552ab85-08da-4bb5-be00-9e94d282d348'
  let clock

  before(() => {
    clock = sinon.useFakeTimers({ toFake: ['Date'] })
  })

  after(() => {
    clock.restore()
  })

  beforeEach(async () => {
    await seed.institution.create()
    await seed.institutionBranch.create()
    await seed.product.create('3552ab85-08da-4bb5-be00-9e94d282d310')
    await seed.product.create('3552ab85-08da-4bb5-be00-9e94d282d340') // required by seed.account_request_products
    await seed.product.create('3552ab85-08da-4bb5-be00-9e94d282d360') // required by seed.account_request_products
    await seed.productOption.create('3552ab85-0000-0000-0000-9e94d282d312')
    await seed.product_options()
    await seed.user.create('1052ab85-08da-4bb5-be00-9e94d282d310')
    await seed.user.create('1052ab85-08da-4bb5-be00-9e94d282d360') // required by seed.accountRequest
    await seed.account.create('0052ab85-08da-4bb5-be00-9e94d282d310')
    await seed.document.create()
    await seed.accountRequest.create(accountRequestId)
    await seed.accountRequest.create('17ba2033-1c12-463b-bbc7-72deed747ae7') // required by seed.account_request_products
    await seed.accountRequest.create('da31cf6d-f10c-43a1-a67e-e80ad124c223') // required by seed.account_request_products
    await seed.accountRequest.create('17ba2033-1c12-463b-bbc7-72deed747ae8')
    await seed.account_request_products() // insert all
    await seed.account_request_product_options() // insert all
    await seed.signer.create('2e31d8c0-1226-4651-8a5d-4bd8aa454722')
    await seed.signer.create('2e31d8c0-1226-4651-8a5d-4bd8aa454721')
  })

  describe('Token', () => {
    function getToken(accountRequestId) {
      return app.services.token.get({
        scopes: ['account_requests'],
        resources: [`account_requests#${accountRequestId}`],
        expiration: 10
      })
