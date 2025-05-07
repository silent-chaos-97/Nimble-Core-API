describe('GET /signers/:id/contract', async () => {
  let FakeCreateRecipientView, clock, token
// Temp comment

  before(() => {
    FakeCreateRecipientView = sinon.fake.returns('http://contract.url')
    sinon.replace(app.plugins.docusign, 'createRecipientView', FakeCreateRecipientView)

    token = app.services.token.get({
      scopes: ['signers'],
      resources: [
        `signers#00000000-9999-aaaa-0000-2ea08a01e901`,
        `signers#00000000-9999-aaaa-0000-2ea08a01e902`,
        `signers#00000000-9999-aaaa-0000-2ea08a01e903`,
      ],
      expiration: 1200
    })

    clock = sinon.useFakeTimers({ toFake: ['Date'] })
    nock.enable()
  })

  after(() => {
    sinon.restore()
    clock.restore()
    nock.enableNetConnect()
  })

  afterEach(() => {
    sinon.reset()
    nock.cleanAll()
  })

  beforeEach(async () => {
    await seed.institution.create('2552ab85-08da-4bb5-be00-9e94d282d312')
    await seed.document.create('a74f9092-5889-430a-9c19-6712f9f68090')
