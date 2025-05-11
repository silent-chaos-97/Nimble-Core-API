const nock = require('nock')
const mocks = require('../../../support/mock/docusign')
const { expect } = require('chai')

describe('GET /webhooks/docusign/connect/:id/contract/:token', () => {
  const sleep = async (ms) => new Promise(resolve => setTimeout(resolve, ms))

  before(() => {
    nock.disableNetConnect()
    nock.enableNetConnect(/^(127\.0\.0\.1|localhost)/)
  })

  describe('when the signers email are unique', () => {
    let token
    const accountRequestId = '2552ab85-08da-4bb5-be00-9e94d282d348'
    const goodToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpZCI6IjI1NTJhYjg1LTA4ZGEtNGJiNS1iZTAwLTllOTRkMjgyZDM0OCIsImF0IjoxNTg2MzEzNTMyNjc0fQ.IMpdgF-SQ5kwoHp8WC66TkeP9QNTQqSy0xiSbFs7BR8t0hGVhKkEktlZ9AFCPjjBcFSFH6hlUQbKpToN0NZK5g'
    const badToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
    let downloadScope

    beforeEach(async () => {
      await seed.institution.create('2552ab85-08da-4bb5-be00-9e94d282d311')
      await seed.institutionBranch.create('2552ab85-0000-0000-0000-000000000001')
      await seed.user.create('1052ab85-08da-4bb5-be00-9e94d282d310')
      await seed.account.create('0052ab85-08da-4bb5-be00-9e94d282d310')
      await seed.document.create()
      await seed.accountRequest.create(accountRequestId)
      await seed.signer.create('2e31d8c0-1226-4651-8a5d-4bd8aa454722')
      await seed.signer.create('2e31d8c0-1226-4651-8a5d-4bd8aa454721')
      await seed.signer.create('ef3c30f8-fb32-4d1f-9fd9-211637ab1111')

      // this is cheating but to be accurate with real case we need status to be PENDING
      await knex('account_requests').update('status', 'PENDING').where('id', accountRequestId)

      // Note from Pedro: I'm not sure about the state of the account_request seed but
      // in this case, the contract_document_id should be null
      await knex('account_requests').update('contract_document_id', null).where('id', accountRequestId)

      // make sure the signer status is pending
      await knex('signers').update('status', 'PENDING').where('id', "2e31d8c0-1226-4651-8a5d-4bd8aa454722")
      await knex('signers').update('status', 'PENDING').where('id', "2e31d8c0-1226-4651-8a5d-4bd8aa454721")

      token = await helpers.getAuthToken()

      nock(`https://${app.config.get('docusign').oauthPath}`)
        .post('/oauth/token').times(2)
        .reply(200, mocks.mockToken)

      nock(app.config.get('docusign').basePath)
        .get(`/v2.1/accounts/8872016/envelopes/5d715751-e027-45e4-884b-99bb85c357dc?include=recipients`)
        .reply(200, mocks.webhookRequest)

      downloadScope = nock(app.config.get('docusign').basePath)
        .get('/v2.1/accounts/8872016/envelopes/5d715751-e027-45e4-884b-99bb85c357dc/documents/combined')
        .replyWithFile(200, __dirname + '/../../../support/mock/example.pdf', {
          'Content-Type': 'application/pdf',
        })
    })

    afterEach(() => nock.cleanAll())

    it('should return 200', done => {
      request(app.server)
        .post(`/v1/webhooks/docusign/connect/${accountRequestId}/contract/${goodToken}`)
        .set('Authorization', 'Bearer ' + token)
        .expect('Content-Type', /json/)
        .expect(200)
        .end(async (err) => {
          if (err) return done(err)
          await sleep(50)
          downloadScope.done()
          done()
        })
    })

    it('should return 400 if account request does not exist', done => {
      request(app.server)
        .post(`/v1/webhooks/docusign/connect/xxx/contract/${goodToken}`)
        .set('Authorization', 'Bearer ' + token)
        .expect('Content-Type', /json/)
        .expect(400)
        .end(done)
    })

    it('should return 401 if token does not match signature', done => {
      request(app.server)
        .post(`/v1/webhooks/docusign/connect/${accountRequestId}/contract/${badToken}`)
        .set('Authorization', 'Bearer ' + token)
        .expect('Content-Type', /json/)
        .expect(401)
        .end(done)
    })

    it('should update account request with new data', done => {
      request(app.server)
        .post(`/v1/webhooks/docusign/connect/${accountRequestId}/contract/${goodToken}`)
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err) => {
          if (err) return done(err)

          request(app.server)
            .set('Authorization', 'Bearer ' + token)
