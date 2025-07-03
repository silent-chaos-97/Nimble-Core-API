const _ = require('lodash')

describe('POST /account-requests/:id/bsa-risk-results', async () => {
  const pendingAccountRequestId = '17ba2033-1c12-463b-bbc7-72deed747ae7'
  let bsaRiskResults

  beforeEach(async () => {
    await seed.institution.create('2552ab85-08da-4bb5-be00-9e94d282d311')
    await seed.institutionBranch.create('2552ab85-0000-0000-0000-000000000001')
    await seed.user.create('1052ab85-08da-4bb5-be00-9e94d282d310')
    await seed.account.create('0052ab85-08da-4bb5-be00-9e94d282d310')
    await seed.document.create()
    await seed.accountRequest.create(pendingAccountRequestId)

    bsaRiskResults = [
      {
        position: 0,
        questionId: 'are-all-account-owners',
        answer: 'Yes'
      },
      {
        position: 1,
        questionId: 'will-you-mantain',
        answer: null
      },
      {
        position: 3,
        questionId: 'name-bank',
        answer: 'Gotham City Bank'
      },
      {
        position: 4,
        questionId: 'usCitizen',
        answer: 'No'
      }
    ]
  })

  function getToken(signerId) {
    return app.services.token.get({
      scopes: ['account_requests'],
      resources: [`account_requests#${signerId}`],
      expiration: 10
    })
