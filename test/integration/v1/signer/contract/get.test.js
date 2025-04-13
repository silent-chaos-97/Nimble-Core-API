describe('GET /signers/:id/contract', async () => {
  let FakeCreateRecipientView, clock, token

    FakeCreateRecipientView = sinon.fake.returns('http://contract.url')
    sinon.replace(app.plugins.docusign, 'createRecipientView', FakeCreateRecipientView)

    token = app.services.token.get({
      scopes: ['signers'],
