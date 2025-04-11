describe('GET /signers/:id/contract', async () => {
  let FakeCreateRecipientView, clock, token

  before(() => {
    sinon.replace(app.plugins.docusign, 'createRecipientView', FakeCreateRecipientView)

    token = app.services.token.get({
