const { v4: uuid } = require('uuid')

describe('GET /signers/:id', async () => {
  let clock

  before(async () => {
    clock = sinon.useFakeTimers({
    })
  })

  after(() => {
    clock.restore()
  })

  beforeEach(async () => {
    await seed.institution.create('2552ab85-08da-4bb5-be00-9e94d282d311')
    await seed.institutionBranch.create('2552ab85-0000-0000-0000-000000000001')
    await seed.user.create('1052ab85-08da-4bb5-be00-9e94d282d310')
    await seed.account.create('0052ab85-08da-4bb5-be00-9e94d282d310')
    await seed.document.create()
    await seed.accountRequest.create('2552ab85-08da-4bb5-be00-9e94d282d348')
    await seed.signer.create('2e31d8c0-1226-4651-8a5d-4bd8aa454722')
    await seed.signer.create('2e31d8c0-1226-4651-8a5d-4bd8aa454721')
  })

  describe('Token', () => {
    function getToken(signerId) {
      return app.services.token.get({
        scopes: ['signers'],
        resources: [`signers#${signerId}`],
        expiration: 10
      })
