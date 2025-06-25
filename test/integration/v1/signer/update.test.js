const { v4: uuid } = require('uuid')
const sinon = require('sinon')

describe('PUT /signers/:id', async () => {
  let defaultAccountRequestId, signer, FakeUpdateEnvelopeRecipients

  let clock

  before(async () => {
    nock.enable({ s3: true })
  })

  beforeEach(async () => {
    clock = sinon.useFakeTimers({ toFake: ['Date'] })

    await seed.institution.create('2552ab85-08da-4bb5-be00-9e94d282d312')
    await seed.institutionBranch.create('2552ab85-0000-0000-0000-000000000020')
    await seed.document.create('a74f9092-5889-430a-9c19-6712f9f68090')
    // account request for prospect
    await seed.accountRequest.create('00000000-0000-AAAA-AAAA-000000000333')
    // create invited signers for this prospect with different roles and status
    // pending status
    await seed.signer.create('00000000-9999-aaaa-0000-2ea08a01e902')
    // invited status and secondary
    await seed.signer.create('00000000-9999-aaaa-0000-2ea08a01e901')
    // invited status and primary role
    await seed.signer.create('00000000-9999-aaaa-0000-2ea08a01e903')

    defaultAccountRequestId = '00000000-0000-AAAA-AAAA-000000000333'
    signer = {
      id: '00000000-9999-aaaa-0000-2ea08a01e903',
      firstName: 'John',
      middleName: 'MF',
      lastName: 'McClane',
      email: 'john.mf.mcclane@wearesingular.com',
      phoneNumber: '+1718-953-8465',
      address: '1381 Atlantic Ave, Brooklyn',
      city: 'New York',
      state: 'NY',
      zipCode: 'NY11216',
      ssn: '111-22-3333',
      employer: 'New York Police Dep.',
      consent: true,
      consentAccountOpening: true,
      consentPrivacyPolicy: true,
      consentCommunication: false,
      idProofDocument: {
        backDocumentId: 'a74f9092-5889-430a-9c19-6712f9f68090',
        frontDocumentId: 'a74f9092-5889-430a-9c19-6712f9f68090',
        type: 'USDL',
        number: '1231231230',
        issuer: 'WY',
        issuedDate: '2000-11-22T00:00:00.000Z',
        expirationDate: '2030-11-22T00:00:00.000Z'
      },
      selfieDocumentId: 'a74f9092-5889-430a-9c19-6712f9f68090'
    }

    FakeUpdateEnvelopeRecipients = sinon.replace(app.plugins.docusign, 'updateEnvelopeRecipients', sinon.fake.returns(Promise.resolve()))

    // fake set a contract id
    await knex('account_requests')
      .update('contract_document_envelope_id', 'CCCC00CC-BBBB-AAAA-AAAA-000000000CCC')
      .where('id', '00000000-0000-AAAA-AAAA-000000000333')
    // set state to INCOMPLETE simulating the end of adding signers
    await knex('account_requests').update('status', 'INCOMPLETE').where('id', '00000000-0000-AAAA-AAAA-000000000333')
  })

  afterEach(() => {
    clock.restore()
    sinon.restore()
    nock.cleanAll()
  })

  // helper for certain tests, creates an aproved account request
  async function seedAprovedAccountRequest() {
    const id = '00000000-0000-AAAA-AAAA-000000000444'
    await seed.institution.create('2552ab85-08da-4bb5-be00-9e94d282d311')
    await seed.institutionBranch.create('2552ab85-0000-0000-0000-000000000001')
    await seed.user.create('1052ab85-08da-4bb5-be00-9e94d282d310')
    await seed.user.create('1052ab85-08da-4bb5-be00-9e94d282d350')
    await seed.account.create('0052ab85-08da-4bb5-be00-9e94d282d310')
    await seed.accountRequest.create(id)
    return id
