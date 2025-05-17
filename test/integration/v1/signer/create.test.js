const _ = require('lodash')

describe('POST /signers', async () => {
  const sleep = async ms => new Promise(resolve => setTimeout(resolve, ms))
  let clock,
    newSigner,
    inviteSignerEmailSpy,
    eventPublishSpy,
    verifyEmailSpy
  before(() => {
    nock.enable()
    verifyEmailSpy = sinon.replace(app.services.email, 'emailVerification', sinon.fake.returns(Promise.resolve()))
    inviteSignerEmailSpy = sinon.replace(app.services.email, 'inviteSigner', sinon.fake.returns(Promise.resolve()))
    eventPublishSpy = sinon.replace(app.services.eventStream, 'publish', sinon.fake.returns(Promise.resolve()))
  })

  after(() => {
    sinon.restore()
    nock.enableNetConnect()
  })

  beforeEach(async () => {
    clock = sinon.useFakeTimers({ toFake: ['Date'] })

    await seed.institution.create('2552ab85-08da-4bb5-be00-9e94d282d312')
    await seed.document.create('a74f9092-5889-430a-9c19-6712f9f68090')
    await seed.productAccountNumber.create()
    // account request
    await seed.accountRequest.create('00000000-0000-AAAA-AAAA-000000000333')

    newSigner = {
      accountRequestId: '00000000-0000-AAAA-AAAA-000000000333',
      role: 'PRIMARY',
      firstName: 'John',
      middleName: 'MF',
      lastName: 'McClane',
      dateOfBirth: '1955-05-22T00:00:00.000Z',
      email: 'john.mf.mcclane@wearesingular.com',
      phoneNumber: '+1718-953-8465',
      address: '1381 Atlantic Ave, Brooklyn',
      employer: 'New York Police Dep.',
      city: 'New York',
      state: 'NY',
      zipCode: 'NY11216',
      ssn: '111-22-3333',
      consent: true,
      consentAccountOpening: true,
      consentPrivacyPolicy: true,
      consentCommunication: false,
      idProofDocument: {
        backDocumentId: 'a74f9092-5889-430a-9c19-6712f9f68090',
        frontDocumentId: 'a74f9092-5889-430a-9c19-6712f9f68090',
        type: 'USDL',
        number: '1231231230',
        issuedDate: '2000-11-22',
        issuer: 'WY',
        expirationDate: '2030-11-22'
      },
      selfieDocumentId: 'a74f9092-5889-430a-9c19-6712f9f68090'
    }
  })

  afterEach(() => {
    clock.restore()
    sinon.reset()
    nock.cleanAll()
  })

  function post(
    payload,
    accountRequestId = '00000000-0000-AAAA-AAAA-000000000333'
  ) {
    const token = app.services.token.get({
      scopes: ['account_requests'],
      resources: [`account_requests#${accountRequestId}`],
      expiration: 10
    })

    return request(app.server)
      .post(`/v1/signers`)
      .set('Authorization', 'Bearer ' + token)
      .send(payload)
      .expect('Content-Type', /json/)
