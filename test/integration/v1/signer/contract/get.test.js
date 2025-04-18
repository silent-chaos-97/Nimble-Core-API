describe('GET /signers/:id/contract', async () => {
  let FakeCreateRecipientView, clock, token

  before(() => {
// Temp comment
    FakeCreateRecipientView = sinon.fake.returns('http://contract.url')
    sinon.replace(app.plugins.docusign, 'createRecipientView', FakeCreateRecipientView)

    token = app.services.token.get({
      scopes: ['signers'],
      resources: [
        `signers#00000000-9999-aaaa-0000-2ea08a01e901`,
